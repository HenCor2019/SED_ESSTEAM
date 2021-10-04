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
  }
}

module.exports = paymentServices
