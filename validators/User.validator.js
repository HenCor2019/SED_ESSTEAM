const Joi = require('joi')

const userValidator = {
  validateRegister: (data) => {
    const schema = Joi.object({
      fullname: Joi.string().min(4).max(40).required(),
      username: Joi.string().min(4).max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(16).required()
    }).required()

    return schema.validateAsync(data)
  },

  validateLogin: (data) => {
    const schema = Joi.object({
      field: Joi.string().required(),
      password: Joi.string().required()
    }).required()
    return schema.validateAsync(data)
  },

  validateRequestPassword: (data) => {
    const schema = Joi.object({
      field: Joi.string().required()
    }).required()

    return schema.validateAsync(data)
  },

  validateResetPassword: (data) => {
    const schema = Joi.object({
      newPassword: Joi.string().required()
    }).required()

    return schema.validateAsync(data)
  },

  validateUpdate: (data) => {
    const schema = Joi.object({
      fullname: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email()
    })
      .min(1)
      .required()

    return schema.validateAsync(data)
  },

  validateId: (data) => {
    const schema = Joi.object({
      id: Joi.string().required()
    }).required()

    return schema.validateAsync(data)
  }
}

module.exports = userValidator
