const { tokens } = require('../config/tokens')
const { emailing } = require('../config/emailing')
const ErrorResponse = require('../classes/ErrorResponse')
const ServiceResponse = require('../classes/ServiceResponse')
const { hashingService } = require('../config/hashingService')
const { userRepository } = require('../repository/User.repository')

const { SALT } = process.env
const userServices = {
  findByUsernameOrEmail: async (body) => {
    const users = await userRepository.findByUsernameOrEmail(body)

    return new ServiceResponse(true, users)
  },

  findOneByUsernameOrEmail: async (body) => {
    const user = await userRepository.findOneByUsernameOrEmail(body)
    if (!user) return new ServiceResponse(false, user)

    return new ServiceResponse(true, user)
  },

  findOneById: async (id) => {
    const user = await userRepository.findOneById(id)

    return new ServiceResponse(true, user)
  },

  find: async () => {
    const users = await userRepository.find()

    return new ServiceResponse(true, users)
  },

  register: async (body) => {
    const { password } = body

    const hashedPassword = await hashingService.generateHash(password, SALT)
    body.hashedPassword = hashedPassword

    const userSaved = await userRepository.create(body)
    if (!userSaved) throw new ErrorResponse('SaveError', 'Cannot save the user')

    // TODO: comment for test
    // await emailing.sendRegisterEmail(userSaved)
  },

  sendRequestPasswordEmail: async (body) => {
    const user = await userRepository.findOneByUsernameOrEmail(body)

    if (!user)
      throw new ErrorResponse(
        'UnExistError',
        'Cannot find the username or email!'
      )

    const token = tokens.createResetPasswordToken(user)

    user.token = token
    // await emailing.sendRequestPasswordEmail(user)

    return { token }
  },

  comparePasswords: async (plainPassword, hashedPassword) => {
    const passwordAreEquals = await hashingService.compareHash(
      plainPassword,
      hashedPassword
    )

    if (!passwordAreEquals)
      throw new ErrorResponse('LoginError', 'User and password not match')

    return new ServiceResponse(true)
  },

  updateById: async (user) => {
    if (user?.newPassword) {
      const { newPassword } = user

      user.hashedPassword = await hashingService.generateHash(newPassword, SALT)
    }

    const updatedUser = await userRepository.updateById(user)
    return new ServiceResponse(true, updatedUser)
  },

  updateFavoriteGames: async (user) => {
    await userRepository.updateFavoriteGames(user)
  },

  updateGames: async (user, newGame) => {
    user.games = [...user.games, newGame]
    const updatedUser = await userRepository.updateGames(user)

    return new ServiceResponse(true, updatedUser)
  },

  deleteOneById: (id) => userRepository.deleteOneById(id),

  deleteAll: () => userRepository.deleteAll()
}

module.exports = userServices
