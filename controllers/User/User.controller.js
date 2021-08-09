const { userResponse } = require('./User.response')
const { userService } = require('./User.service')
const { userValidator } = require('./User.validator')
const ErrorResponse = require('../../classes/ErrorResponse')

const userController = {
  register: async (req, res, next) => {
    try {
      await userValidator.validateRegister(req.body)

      const { content: users } = await userService.findByUsernameOrEmail(
        req.body
      )

      if (users.length)
        throw new ErrorResponse('RepeatError', 'Some fields are already taken')

      await userService.register(req.body)

      return userResponse.successfullyRegister(res)
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      await userValidator.validateLogin(req.body)
      const { content: user } = await userService.findOneByUsernameOrEmail(
        req.body
      )

      // TODO: add user.active later
      if (!user)
        throw new ErrorResponse('LoginError', 'User and password not match')

      await userService.comparePasswords(req.body.password, user.hashedPassword)

      return userResponse.successfullyLogin(res, user)
    } catch (error) {
      next(error)
    }
  },

  requestPassword: async (req, res, next) => {
    try {
      await userValidator.requestPassword(req.body)

      const { token } = await userService.sendRequestPasswordEmail(req.body)

      return userResponse.successfullyRequest(res, token)
    } catch (error) {
      next(error)
    }
  },

  requestPasswordHandler: async (req, res, next) => {
    try {
      await userValidator.resetPassword(req.body)

      const { id } = req.userContent
      const { content: user } = await userService.findOneById(id)

      if (!user) throw new ErrorResponse('UnExistError', 'Cannot find the user')

      user.newPassword = req.body.newPassword
      await userService.update(user)

      return userResponse.successfullyUpdate(res)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
