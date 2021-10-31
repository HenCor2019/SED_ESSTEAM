const Payment = require('../models/Payment/Payment.model')

const paymentRepository = {
  savePayment: ({ users, netAmount, game }) => {
    const newPayment = new Payment({ users, netAmount, game })

    return newPayment.save().then((savedPayment) => savedPayment)
  },

  updatePayments: ({ id, netAmount, users, date, sells }) => {
    return Payment.findByIdAndUpdate(
      id,
      { netAmount, users, date, sells },
      { new: true }
    )
  },

  findOneByGame: (id) => {
    return Payment.findOne({ game: id })
  },

  getPayments: ({ limit, offset }) =>
    Payment.find()
      .skip(offset * limit)
      .limit(limit)
      .populate('game'),

  getAllPayments: () => Payment.find(),

  countPayments: () => Payment.find().countDocuments()
}

module.exports = paymentRepository
