const router = require('express').Router()
const {
  createPayment,
  executePayment,
  completePayment,
  reports
} = require('../../controllers/Payment/Payment.controller')

const paymentValidator = require('../../validators/Payment/Payment.validator')

const { middleware } = require('../../middlewares/middleware')

router.get(
  '/',
  middleware.authUser,
  middleware.isAdmin,
  paymentValidator.validateQuery,
  reports
)

router.post(
  '/create',
  middleware.authUser,
  paymentValidator.validateId,
  createPayment,
  executePayment
)

router.post(
  '/execute',
  middleware.authPayment,
  paymentValidator.validatePaymentContent,
  paymentValidator.validatePaymentAccount,
  completePayment
)

module.exports = router
