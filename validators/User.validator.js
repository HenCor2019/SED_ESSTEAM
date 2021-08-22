const Joi = require('joi')

const userValidator = {
  validateRegister: (data) => {
    const schema = Joi.object({
      fullname: Joi.string().min(4).max(40).required(),
      username: Joi.string().min(4).max(10).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(16).required()
    })

    return schema.validateAsync(data)
  },

  validateLogin: (data) => {
    const schema = Joi.object({
      field: Joi.string().required(),
      password: Joi.string().required()
    })
    return schema.validateAsync(data)
  },

  validateUserInformation: (data) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      fullname: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      role: Joi.string().required()
    })

    return schema.validateAsync(data)
  },

  validateRequestPassword: (data) => {
    const schema = Joi.object({
      id: Joi.string().required()
    })

    return schema.validateAsync(data)
  },

  requestPassword: (data) => {
    const schema = Joi.object({
      field: Joi.string().required()
    })

    return schema.validateAsync(data)
  },

  resetPassword: (data) => {
    const schema = Joi.object({
      newPassword: Joi.string().required()
    })

    return schema.validateAsync(data)
  },

  update: (data) => {
    const schema = Joi.object({
      fullname: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email()
    }).or('fullname', 'username', 'email')

    return schema.validateAsync(data)
  },

  delete: (data) => {
    const schema = Joi.object({
      id: Joi.string().required()
    })

    return schema.validateAsync(data)
  }
}

module.exports = { userValidator }
