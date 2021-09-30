const Joi = require('joi')

const validatorSchemas = {
  registerSchema: Joi.object({
    fullname: Joi.string().min(4).max(40).required(),
    username: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(16).required()
  }).required(),

  loginSchema: Joi.object({
    field: Joi.string().required(),
    password: Joi.string().required()
  }).required(),

  requestPasswordSchema: Joi.object({
    field: Joi.string().required()
  }).required(),

  resetPasswordSchema: Joi.object({
    newPassword: Joi.string().required()
  }).required(),

  updateSchema: Joi.object({
    fullname: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email()
  })
    .min(1)
    .required(),

  idSchema: Joi.object({
    id: Joi.string().required()
  }).required()
}

module.exports = validatorSchemas
