const router = require('express').Router()
const {
  createPayment,
  executePayment,
  completePayment
} = require('../../controllers/Payment/Payment.controller')

const { middleware } = require('../../middlewares/middleware')

router.post(
  '/create-payment',
  middleware.authUser,
  createPayment,
  executePayment
)

router.post('/execute-payment', middleware.authPayment, completePayment)

module.exports = router
