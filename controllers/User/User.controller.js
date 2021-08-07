const { userResponse } = require('./User.response')
const { userService } = require('./User.service')
const { userValidator } = require('./User.validator')
const ErrorResponse = require('../../classes/ErrorResponse')

const userController = {
  register: async (req, res, next) => {
    try {
      await Promise.all([
        userValidator.validateRegister(req.body),
        userService.findUsersByUsernameOrEmail(req.body),
        userService.createUser(req.body)
      ])

      return userResponse.create(res)
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      await userValidator.validateLogin(req.body)
      const { content: user } = await userService.findUserByUsernameOrEmail(
        req.body
      )

      // TODO: add user.active later
      if (!user) {
        throw new ErrorResponse('LoginError', 'User and password not match')
      }

      userService.comparePasswords(req.body.password, user.hashedPassword)

      return userResponse.login(res, user)
    } catch (error) {
      console.log({ error })
      next(error)
    }
  }
}

module.exports = userController
