const ServiceResponse = require('../classes/ServiceResponse')
const paymentRepository = require('../repository/Payment.repository')

const paymentServices = {
  savePayment: async (data) => {
    const savedPayment = await paymentRepository.savePayment(data)

    return new ServiceResponse(true, savedPayment)
  },

  updatePayment: async (newPayment) => {
    const updatedPayment = await paymentRepository.updatePayments(newPayment)

    return new ServiceResponse(true, updatedPayment)
  },

  findOneByGame: async (id) => {
    const payment = await paymentRepository.findOneByGame(id)

    return new ServiceResponse(true, payment)
  },

  countPayments: async () => {
    const count = await paymentRepository.countPayments()

    return new ServiceResponse(true, count)
  },

  getReports: async (filters) => {
    const payments = await paymentRepository.getPayments(filters)

    const mappedPayments = payments.map(
      ({ id, date, netAmount, game, sells }) => {
        return {
          lastPurchase: date.toString().substring(0, 15),
          id: id,
          sells: sells,
          earnings: netAmount.value,
          title: game.title
        }
      }
    )

    return new ServiceResponse(true, mappedPayments)
  },

  getAllPayments: async () => {
    const payments = await paymentRepository.getAllPayments()
    const count = payments
      .map((payment) => payment.game.toString())
      .filter((id, index, elements) => index === elements.indexOf(id))
    return new ServiceResponse(true, Math.ceil(count.length / 5))
  }
}

module.exports = paymentServices
