const { validateNullFields } = require('./helper')
const userServices = require('../../services/User.service')
const gameServices = require('../../services/Game.service')
const ErrorResponse = require('../../classes/ErrorResponse')
const userResponse = require('../../responses/User.response')
const userValidator = require('../../validators/User.validator')
const { uniqueFields, insertOrRemoveGame } = require('../../utils/helper')

const userController = {
  register: async (req, res) => {
    const body = await userValidator.validateRegister(req.body)

    const { content: users } = await userServices.findByUsernameOrEmail(body)

    if (users.length)
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')

    await userServices.register(body)

    return userResponse.successfullyRegister(res)
  },

  login: async (req, res) => {
    const body = await userValidator.validateLogin(req.body)

    const { content: user } = await userServices.findOneByUsernameOrEmail(body)

    if (!user)
      throw new ErrorResponse('LoginError', 'User and password not match')

    await userServices.comparePasswords(body.password, user.hashedPassword)

    return userResponse.successfullyLogin(res, user)
  },

  requestPassword: async (req, res) => {
    const body = await userValidator.validateRequestPassword(req.body)

    const { token } = await userServices.sendRequestPasswordEmail(body)

    return userResponse.successfullyRequest(res, token)
  },

  requestPasswordHandler: async (req, res) => {
    const body = await userValidator.validateResetPassword(req.body)

    const { content: user } = await userServices.findOneById(req.user.id)

    if (!user) throw new ErrorResponse('UnExistError', 'Cannot find the user')

    user.newPassword = body.newPassword
    await userServices.updateById(user)

    return userResponse.successfullyUpdate(res)
  },

  updateUser: async (req, res) => {
    const { id } = await userValidator.validateId(req.params)
    const body = await userValidator.validateUpdate(req.body)

    const { content: users } = await userServices.findByUsernameOrEmail(body)
    const { content: user } = await userServices.findOneById(id)

    if (!user) throw new ErrorResponse('UnExistError', 'Cannot update user')

    if (!uniqueFields(users, user))
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')

    await userServices.updateById(validateNullFields(body, user))

    return userResponse.successfullyUpdate(res)
  },

  updateFavoriteGames: async (req, res) => {
    const { id: gameId } = await userValidator.validateId(req.body)
    const { id } = req.user

    const { content: user } = await userServices.findOneById(id)
    const { content: game } = await gameServices.findOneById(gameId)

    if (!user) throw new ErrorResponse('UnExistError', 'User not found')
    if (!game) throw new ErrorResponse('UnExistError', 'Game not found')

    const { favGames, isFav } = insertOrRemoveGame(user.favoriteGames, game)

    user.favoriteGames = favGames
    await userServices.updateFavoriteGames(user)

    return userResponse.successfullyUpdate(res, isFav)
  },

  deleteUser: async (req, res) => {
    const { id } = await userValidator.validateId(req.params)
    await userServices.deleteOneById(id)

    return userResponse.successfullyDelete(res)
  },

  deleteAll: async (req, res) => {
    const { deletedCount = 0 } = await userServices.deleteAll()
    return userResponse.successfullyDelete(res, deletedCount)
  }
}

module.exports = userController
