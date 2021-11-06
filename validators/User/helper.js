const Joi = require('joi')
const {
  samePassword,
  sanitizeHTML,
  generateFullname,
  regex,
  changeValue,
  isUsernamePassword
} = require('../helper')

const validatorSchemas = {
  preRegisterSchema: Joi.object({
    firstname: Joi.string()
      .trim()
      .custom(regex.spaces)
      .custom(sanitizeHTML)
      .min(4)
      .max(30)
      .required(),
    lastname: Joi.string()
      .trim()
      .custom(regex.spaces)
      .custom(sanitizeHTML)
      .min(4)
      .max(30)
      .required(),
    fullname: Joi.string().custom(changeValue).default(generateFullname),
    username: Joi.string()
      .trim()
      .min(4)
      .custom(regex.spaces)
      .custom(sanitizeHTML)
      .max(20)
      .required(),
    questions: Joi.array()
      .items(Joi.string().trim().required().lowercase())
      .min(2)
      .max(2)
      .required(),
    email: Joi.string().trim().custom(sanitizeHTML).email().required(),
    password: Joi.string()
      .min(8)
      .custom(isUsernamePassword)
      .custom(regex.password)
      .required()
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
    newPassword: Joi.string().min(8).custom(regex.password).required(),
    confirmedPassword: Joi.string().custom(samePassword).required()
  }).required(),

  updateSchema: Joi.object({
    fullname: Joi.string().custom(sanitizeHTML),
    username: Joi.string().custom(sanitizeHTML)
  })
    .min(1)
    .required(),

  idSchema: Joi.object({
    id: Joi.string().required()
  }).required()
}

module.exports = validatorSchemas
