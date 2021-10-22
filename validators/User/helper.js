const Joi = require('joi')
const { samePassword } = require('../helper')

const validatorSchemas = {
  preRegisterSchema: Joi.object({
    fullname: Joi.string().min(4).max(40).required(),
    username: Joi.string().min(4).max(20).required(),
    questions: Joi.array()
      .items(Joi.string().required().lowercase())
      .min(2)
      .max(2)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(16).required()
  }).required(),

  registerSchema: Joi.object({
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
    field: Joi.string().required(),
    responses: Joi.array()
      .items(Joi.string().required())
      .min(2)
      .max(2)
      .required()
  }).required(),

  resetPasswordSchema: Joi.object({
    newPassword: Joi.string().required(),
    confirmedPassword: Joi.string().custom(samePassword).required()
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
