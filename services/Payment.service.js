const ServiceResponse = require('../classes/ServiceResponse')
const paymentRepository = require('../repository/Payment.repository')

const paymentServices = {
  savePayment: async (data) => {
    const savedPayment = await paymentRepository.savePayment(data)

    return new ServiceResponse(true, savedPayment)
  }
}

module.exports = paymentServices
