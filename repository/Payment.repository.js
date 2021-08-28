const Payment = require('../models/Payment/Payment.model')

const paymentRepository = {
  savePayment: ({ user, netAmount, game }) => {
    const newPayment = new Payment({ user, netAmount, game })

    return newPayment.save().then((savedPayment) => savedPayment)
  }
}

module.exports = paymentRepository
