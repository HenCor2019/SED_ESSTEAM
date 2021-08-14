const ErrorResponse = require('../classes/ErrorResponse')
const { tokens } = require('../utils/tokens')
const HANDLER_ERRORS = require('./helper')

const middleware = {
  resetPassword: async (req, res, next) => {
    const { RESET_PASSWORD_HEADER, TOKEN_RESET_PASSWORD_KEY } = process.env
    const token = req.header(RESET_PASSWORD_HEADER)

    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const { content } = tokens.verifyToken(token, TOKEN_RESET_PASSWORD_KEY)

    req.userContent = content
    next()
  },

  updateUser: async (req, res, next) => {
    const { TOKEN_LOGIN_KEY, TOKEN_LOGIN_HEADER } = process.env
    const token = req.header(TOKEN_LOGIN_HEADER)
    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')
    const { content } = tokens.verifyToken(token, TOKEN_LOGIN_KEY)

    req.body.id = content.id
    next()
  },

  errorHandling: (error, req, res, next) => {
    console.log(error.name)
    const handler = HANDLER_ERRORS[error.name] || HANDLER_ERRORS.defaultError
    handler(res, error)
  },

  unknownEndpoint: (req, res) => {
    res.status(404).json({ success: false, message: 'Unknown endpoint' })
  }
}

module.exports = { middleware }
