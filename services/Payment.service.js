const ServiceResponse = require('../classes/ServiceResponse')
const paymentRepository = require('../repository/Payment.repository')

const paymentServices = {
  savePayment: async (data) => {
    const savedPayment = await paymentRepository.savePayment(data)

    return new ServiceResponse(true, savedPayment)
  },

  getReports: async (filters) => {
    const payments = await paymentRepository.getPayments(filters)

    const mappedPayments = payments.map(({ date, netAmount, game }) => {
      return {
        date: date,
        currencyCode: netAmount.currencyCode,
        originalPrice: game.basePrice,
        discountPrice: netAmount.value,
        discountLoss: game.basePrice - netAmount.value,
        game
      }
    })

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
