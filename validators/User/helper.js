const Joi = require('joi')

const validatorSchemas = {
  preRegisterSchema: Joi.object({
    fullname: Joi.string().min(4).max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(16).required()
  }).required(),

  registerSchema: Joi.object({
    username: Joi.string().min(4).max(10).required(),
    dob: Joi.string()
      .regex(
        /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19[1-9][0-9]|20[01][0-9]|202[01])$/
      )
      .message(' "dob" invalid')
      .required(),
    about: Joi.string().min(10).max(50).required()
  }),

  loginSchema: Joi.object({
    username: Joi.string().required(),
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
