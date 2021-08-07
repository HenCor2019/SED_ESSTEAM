const { userResponse } = require('./User.response')
const { userService } = require('./User.service')
const { userValidator } = require('./User.validator')

const userController = {
  register: async (req, res, next) => {
    try {
      await userValidator.validateRegister(req.body)
      await userService.findByUsernameOrEmail(req.body)
      await userService.createUser(req.body)

      return userResponse.create(res)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
