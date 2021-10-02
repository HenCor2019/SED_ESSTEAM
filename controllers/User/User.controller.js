const { validateNullFields } = require('./helper')
const userServices = require('../../services/User.service')
const gameServices = require('../../services/Game.service')
const ErrorResponse = require('../../classes/ErrorResponse')
const userResponse = require('../../responses/User.response')
const { uniqueFields, insertOrRemoveGame } = require('../../utils/helper')

const userController = {
  register: async (req, res) => {
    const { validatedBody: body } = req

    const { content: user } = await userServices.findOneByEmail(body)

    if (user?.active === false)
      return userResponse.successfullyRegister(res, user)

    if (user) throw new ErrorResponse('RepeatError', 'Email already taken')

    const { content: newUser } = await userServices.register(body)

    return userResponse.successfullyRegister(res, newUser)
  },

  registerHandler: async (req, res, next) => {
    const { validatedRegister: newUser, verifiedToken } = req
    const { id, active } = verifiedToken

    if (active)
      throw new ErrorResponse('AlreadyRegisterError', 'Already registered')

    const { content: currentUser } = await userServices.findOneById(id)

    if (!currentUser)
      throw new ErrorResponse('UnExistError', 'Cannot find the user')

    const { content: someUser } = await userServices.findOneByUsername(newUser)

    if (someUser)
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')

    newUser.active = true
    await userServices.updateById(validateNullFields(newUser, currentUser))

    return userResponse.successfullyUpdate(res)
  },

  login: async (req, res) => {
    const { validatedLogin: body } = req
    const { content: user } = await userServices.findOneByUsername(body)

    if (!(user && user.active)) {
      throw new ErrorResponse('LoginError', 'User and password not match')
    }

    await userServices.comparePasswords(body.password, user.hashedPassword)

    return userResponse.successfullyLogin(res, user)
  },

  requestPassword: async (req, res) => {
    const { validatedBody: body } = req
    const { token } = await userServices.sendRequestPasswordEmail(body)

    return userResponse.successfullyRequest(res, token)
  },

  requestPasswordHandler: async (req, res) => {
    const { validatedBody: body } = req
    const { id } = req.user
    const { content: user } = await userServices.findOneById(id)

    if (!user) throw new ErrorResponse('UnExistError', 'Cannot find the user')

    user.newPassword = body.newPassword
    await userServices.updateById(user)

    return userResponse.successfullyUpdate(res)
  },

  updateUser: async (req, res) => {
    const { id } = req.user
    const { validatedBody: body } = req

    const { content: users } = await userServices.findByUsernameOrEmail(body)
    const { content: user } = await userServices.findOneById(id)

    if (!user) throw new ErrorResponse('UnExistError', 'User not found')

    if (!uniqueFields(users, user)) {
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')
    }

    await userServices.updateById(validateNullFields(body, user))

    return userResponse.successfullyUpdate(res)
  },

  updateFavoriteGames: async (req, res) => {
    const { id: gameId } = req.validatedId
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
    const { validateId: id } = req
    await userServices.deleteOneById(id)

    return userResponse.successfullyDelete(res)
  },

  deleteAll: async (req, res) => {
    const { deletedCount = 0 } = await userServices.deleteAll()
    return userResponse.successfullyDelete(res, deletedCount)
  }
}

module.exports = userController
