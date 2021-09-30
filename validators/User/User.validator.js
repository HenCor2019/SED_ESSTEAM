const {
  registerSchema,
  loginSchema,
  requestPasswordSchema,
  resetPasswordSchema,
  updateSchema,
  idSchema
} = require('./helper')

const userValidator = {
  validateRegister: async (req, res, next) => {
    const { body } = req
    req.validatedBody = await registerSchema.validateAsync(body)
    next()
  },

  validateLogin: async (req, res, next) => {
    const { body } = req
    req.validatedBody = await loginSchema.validateAsync(body)
    next()
  },

  validateRequestPassword: async (req, res, next) => {
    const { body } = req
    req.validatedBody = await requestPasswordSchema.validateAsync(body)
    next()
  },

  validateResetPassword: async (req, res, next) => {
    const { body } = req
    req.validatedBody = await resetPasswordSchema.validateAsync(body)
    next()
  },

  validateUpdate: async (req, res, next) => {
    const { body } = req
    req.validatedBody = await updateSchema.validateAsync(body)
    next()
  },

  validateId: async (req, res, next) => {
    const { params } = req
    req.validatedId = await idSchema.validateAsync(params)
    next()
  }
}

module.exports = userValidator
