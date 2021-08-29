const router = require('express').Router()
const {
  createPayment,
  executePayment,
  completePayment,
  reports
} = require('../../controllers/Payment/Payment.controller')

const { middleware } = require('../../middlewares/middleware')

router.get('/', middleware.authUser, middleware.isAdmin, reports)
router.post('/create', middleware.authUser, createPayment, executePayment)
router.get('/execute', middleware.authPayment, completePayment)

module.exports = router
