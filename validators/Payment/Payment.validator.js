const Joi = require('joi')
const {
  idSchema,
  paymentContentSchema,
  querySchema,
  accountSchema
} = require('./helper')

const paymentValidator = {
  validateId: async (req, res, next) => {
    req.validatedId = await idSchema.validateAsync(req.body)
    next()
  },

  validatePaymentContent: async (req, res, next) => {
    req.validatedPayment = await paymentContentSchema.validateAsync(
      req.paymentInformation
    )
    next()
  },

  validateQuery: async (req, res, next) => {
    req.filters = await querySchema.validateAsync(req.query)

    next()
  },

  validatePaymentAccount: async (req, res, next) => {
    const { password, email: field } = await accountSchema.validateAsync(
      req.body
    )
    req.userSession = { field, password }

    next()
  }
}

module.exports = paymentValidator
