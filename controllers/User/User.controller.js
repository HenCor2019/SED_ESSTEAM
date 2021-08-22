const { userService } = require('../../services/User.service')
const { userResponse } = require('../../responses/User.response')
const { userValidator } = require('../../validators/User.validator')
const { uniqueFields } = require('../../utils/helper')
const ErrorResponse = require('../../classes/ErrorResponse')

const userController = {
  register: async (req, res) => {
    await userValidator.validateRegister(req.body)

    const { content: users } = await userService.findByUsernameOrEmail(req.body)

    if (users.length)
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')

    await userService.register(req.body)

    return userResponse.successfullyRegister(res)
  },

  login: async (req, res) => {
    await userValidator.validateLogin(req.body)
    const { content: user } = await userService.findOneByUsernameOrEmail(
      req.body
    )

    if (!user)
      throw new ErrorResponse('LoginError', 'User and password not match')

    await userService.comparePasswords(req.body.password, user.hashedPassword)

    return userResponse.successfullyLogin(res, user)
  },

  requestPassword: async (req, res) => {
    await userValidator.requestPassword(req.body)

    const { token } = await userService.sendRequestPasswordEmail(req.body)

    return userResponse.successfullyRequest(res, token)
  },

  requestPasswordHandler: async (req, res) => {
    await userValidator.validateRequestPassword(req.user)
    await userValidator.resetPassword(req.body)

    const { id } = req.user
    const { content: user } = await userService.findOneById(id)

    if (!user) throw new ErrorResponse('UnExistError', 'Cannot find the user')

    user.newPassword = req.body.newPassword
    await userService.updateById(user)

    return userResponse.successfullyUpdate(res)
  },

  updateUser: async (req, res) => {
    await userValidator.validateUserInformation(req.user)
    await userValidator.update(req.body)

    const { content: users } = await userService.findByUsernameOrEmail(req.body)
    const { content: user } = await userService.findOneById(req.user.id)

    if (!user) throw new ErrorResponse('UnExistError', 'Cannot update user')

    if (!uniqueFields(users, user))
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')

    await userService.updateById(validateNullFields(req.body, user))

    return userResponse.successfullyUpdate(res)
  },

  deleteUser: async (req, res) => {
    try {
      await userValidator.delete(req.params)
      const { id } = req.params
      await userService.deleteOneById(id)

      return userResponse.successfullyDelete(res)
    } catch (error) {
      next(error)
    }
  },

  deleteAll: async (req, res) => {
    const { deletedCount = 0 } = await userService.deleteAll()
    return userResponse.successfullyDelete(res, deletedCount)
  }
}

const validateNullFields = (body, user) => ({
  id: user.id,
  fullname: body.fullname || user.fullname,
  username: body.username || user.username,
  email: body.email || user.email,
  hashedPassword: user.hashedPassword
})

module.exports = userController
