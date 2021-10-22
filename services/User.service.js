const { tokens } = require('../config/tokens')
const { emailing } = require('../config/emailing')
const ErrorResponse = require('../classes/ErrorResponse')
const ServiceResponse = require('../classes/ServiceResponse')
const { hashingService } = require('../config/hashingService')
const { userRepository } = require('../repository/User.repository')
const { questionRepository } = require('../repository/Question.repository')

const { SALT } = process.env
const userServices = {
  findOneByEmail: async (body) => {
    const user = await userRepository.findOneByEmail(body)

    return new ServiceResponse(true, user)
  },

  findOneByUsername: async (body) => {
    const user = await userRepository.findOneByUsername(body)

    if (!user) return new ServiceResponse(false, user)

    return new ServiceResponse(true, user)
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

    const hashedResponses = await hashingService.generateResponsesHash(
      body,
      SALT
    )

    const savedResponses = await questionRepository.saveResponse({
      hashedResponses
    })

    body.responses = savedResponses
    const userSaved = await userRepository.create(body)
    if (!userSaved) throw new ErrorResponse('SaveError', 'Cannot save the user')

    // TODO: comment for test
    // await emailing.sendRegisterEmail(userSaved)
    return new ServiceResponse(true, userSaved)
  },

  sendRequestPasswordEmail: async (body) => {
    const user = await userRepository.findOneByUsernameOrEmail(body)

    if (!user)
      throw new ErrorResponse(
        'UnExistError',
        'Cannot find the username or email!'
      )

    const token = tokens.createResetPasswordToken(user)
    console.log({ body: body.responses, user: user.responses.questions })
    const sameResponses = await hashingService.compareResponses(
      body.responses,
      user.responses.questions
    )

    if (!sameResponses)
      throw new ErrorResponse(
        'UnExistError',
        'Cannot find the username or email!'
      )

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
      throw new ErrorResponse(
        'LoginError',
        'The credentials you entered are invalid'
      )

    return new ServiceResponse(true)
  },

  identifyUser: async (body) => {
    const user = await userRepository.findOneByUsernameOrEmail(body)

    if (!user) return new ServiceResponse(true, null)

    const isCorrectPassword = await hashingService.compareHash(
      body.password,
      user.hashedPassword
    )

    if (!isCorrectPassword) return new ServiceResponse(true, null)

    return new ServiceResponse(false, user)
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
    const updatedUser = await userRepository.updateFavoriteGames(user)
    return new ServiceResponse(true, updatedUser)
  },

  updateGames: async (user, newGame) => {
    user.games = [...user.games, newGame]
    const updatedUser = await userRepository.updateGames(user)

    return new ServiceResponse(true, updatedUser)
  },

  deleteOneById: (id) => userRepository.deleteOneById(id),

  deleteAll: () => userRepository.deleteAll()
}

const areSameResponses = (responses, user) => {
  const [firstDBResponse, secondDBResponse] = user.responses.questions
  const [firstRecoverResponse, secondRecoverResponse] = responses

  return (
    firstDBResponse === firstRecoverResponse &&
    secondRecoverResponse === secondDBResponse
  )
}

module.exports = userServices
