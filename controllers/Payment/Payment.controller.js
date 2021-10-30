const { tokens } = require('../../config/tokens')
const userServices = require('../../services/User.service')
const gamesServices = require('../../services/Game.service')
const ErrorResponse = require('../../classes/ErrorResponse')
const paymentServices = require('../../services/Payment.service')
const paymentResponse = require('../../responses/Payment/Payment.response')

const {
  auth,
  generateNewPayment,
  generatePayment,
  usersAreNotEquals
} = require('./helper')

const paymentController = {
  createPayment: async (req, res, next) => {
    const { id: idGame } = req.validatedId

    const { content: game } = await gamesServices.findOneById(idGame)
    if (!game) throw new ErrorResponse('UnExistError', 'Cannot find the game')

    const { content: user } = await userServices.findOneById(req.user.id)
    if (!user)
      throw new ErrorResponse('PaymentError', 'Cannot complete the payment')

    const payment = generatePayment(game, user)

    req.headers.auth = JSON.stringify(auth)
    req.payment = payment
    next()
  },

  executePayment: async (req, res) => {
    const auth = req.get('auth')
    const isValidInfo = tokens.verifyPayment(auth)

    if (!isValidInfo) return paymentResponse.unapprovedPayment(res)

    const paymentInformation = { information: req.payment }
    const token = tokens.createApprovedToken(paymentInformation)

    return paymentResponse.approvedPayment(res, token)
  },

  completePayment: async (req, res) => {
    const { validatedPayment: validatedPaymentContent, userSession } = req

    const { content: loggedUser } = await userServices.identifyUser(userSession)

    if (!loggedUser)
      throw new ErrorResponse('PaymentError', 'Unable to process your payment')

    const { user, game } = validatedPaymentContent.application_context
    const { content: paymentUser } = await userServices.findOneById(user.id)

    if (!usersAreNotEquals(loggedUser, paymentUser))
      throw new ErrorResponse('PaymentError', 'Unable to process your payment')

    if (paymentUser.games.includes(game.id))
      throw new ErrorResponse('PaymentError', 'Game already purchased')

    const newPayment = generateNewPayment(validatedPaymentContent)
    await paymentServices.savePayment(newPayment)

    await userServices.updateGames(user, game.id)

    return paymentResponse.successfullySaved(res)
  },

  reports: async (req, res) => {
    const { filters } = req
    const { content: payments } = await paymentServices.getReports(filters)
    const { content: allPayments } = await paymentServices.getAllPayments()
    payments['count'] = allPayments

    return paymentResponse.successfullyReports(res, payments)
  }
}

module.exports = paymentController
