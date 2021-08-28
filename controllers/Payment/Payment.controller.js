const { tokens } = require('../../config/tokens')
const userServices = require('../../services/User.service')
const gamesServices = require('../../services/Game.service')
const ErrorResponse = require('../../classes/ErrorResponse')
const paymentServices = require('../../services/Payment.service')
const paymentResponse = require('../../responses/Payment.response')
const paymentValidator = require('../../validators/payment.validator')
const { auth, generateNewPayment, generatePayment } = require('./helper')

const paymentController = {
  createPayment: async (req, res, next) => {
    const { id: idGame } = await paymentValidator.validateId(req.body)

    const { content: game } = await gamesServices.findOneById(idGame)
    if (!game) throw new ErrorResponse('UnExistError', 'Cannot find the game')

    const { content: user } = await userServices.findOneById(req.user.id)

    if (!user)
      throw new ErrorResponse('PaymentError', 'Cannot complete the payment')

    if (user.games.includes(idGame))
      throw new ErrorResponse('PaymentError', 'Game already purchased')

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
    const validatedPaymentContent =
      await paymentValidator.validatePaymentContent(req.paymentInformation)

    const { user, game } = validatedPaymentContent.application_context
    const { content: postUser } = await userServices.findOneById(user.id)

    if (postUser.games.includes(game.id))
      throw new ErrorResponse('PaymentError', 'Game already purchased')

    const newPayment = generateNewPayment(validatedPaymentContent)
    await paymentServices.savePayment(newPayment)

    await userServices.updateGames(user, game.id)

    return paymentResponse.successfullySaved(res)
  }
}

module.exports = paymentController
