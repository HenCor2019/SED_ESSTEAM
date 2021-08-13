const ErrorResponse = require('../classes/ErrorResponse')
const { tokens } = require('../utils/tokens')
const HANDLER_ERRORS = require('./helper')

const {
  TOKEN_RESET_PASSWORD_KEY,
  RESET_PASSWORD_HEADER,
  TOKEN_LOGIN_KEY,
  TOKEN_LOGIN_HEADER
} = process.env

const middleware = {
  resetPassword: async (req, res, next) => {
    const token = req.header(RESET_PASSWORD_HEADER)

    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const { content } = tokens.verifyToken(token, TOKEN_RESET_PASSWORD_KEY)

    req.userContent = content
    next()
  },

  updateUser: async (req, res, next) => {
    const token = req.header(TOKEN_LOGIN_HEADER)
    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')
    const { content } = tokens.verifyToken(token, TOKEN_LOGIN_KEY)

    req.body.id = content.id
    next()
  },

  errorHandling: (error, req, res, next) => {
    const handler = HANDLER_ERRORS[error.name] || HANDLER_ERRORS.defaultError
    handler(res, error)
  },

  unknownEndpoint: (req, res) => {
    res.status(404).json({ success: false, message: 'Unknown endpoint' })
  }
}

module.exports = { middleware }
