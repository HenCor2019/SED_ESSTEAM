const Joi = require('joi')
const { transformToNumber } = require('../helper')

const validatorSchemas = {
  idSchema: Joi.object({
    id: Joi.string().required()
  }).required(),

  paymentContentSchema: Joi.object({
    intent: Joi.string()
      .uppercase()
      .rule({ message: 'Invalid payment method' })
      .required(),
    amount: Joi.object({
      currencyCode: Joi.string()
        .length(3)
        .valid('USD', 'MEX')
        .default('USD')
        .lowercase()
        .uppercase()
        .message('Invalid ISO code')
        .required(),
      value: Joi.number().min(0).required()
    }).required(),
    application_context: Joi.object({
      brand_name: Joi.string().valid(`ESASteam.com`).required(),
      landing_page: Joi.string().valid('NO_PREFERENCE').uppercase().required(),
      user_action: Joi.string().valid('PAY_NOW').uppercase().required(),
      user: Joi.object({
        id: Joi.string().required(),
        fullname: Joi.string(),
        email: Joi.string().email(),
        username: Joi.string(),
        active: Joi.bool(),
        hashedPassword: Joi.string(),
        role: Joi.string(),
        favoriteGames: Joi.array().items(Joi.string()),
        games: Joi.array().items(Joi.string())
      }).required(),
      game: Joi.object({
        id: Joi.string().required(),
        title: Joi.string(),
        thumbnail: Joi.string(),
        description: Joi.string(),
        discount: Joi.number(),
        basePrice: Joi.number(),
        creator: Joi.string(),
        platforms: Joi.array().items(Joi.string()),
        genders: Joi.array().items(Joi.string())
      }).required(),
      return_url: Joi.string()
        .valid(`http://localhost:3000/execute-payment`)
        .required(),
      cancel_url: Joi.string()
        .valid(`http://localhost:3000/cancel-payment`)
        .required()
    }).required()
  }).required(),

  querySchema: Joi.object({
    l: Joi.string()
      .regex(/^[0-9]+$/)
      .message('limit must be a number')
      .default(5)
      .custom(transformToNumber),
    s: Joi.string()
      .regex(/^[0-9]+$/)
      .message('s must be a number')
      .default(0)
      .custom(transformToNumber)
  }),

  accountSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

module.exports = validatorSchemas
