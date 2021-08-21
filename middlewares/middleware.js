const { tokens } = require('../utils/tokens')
const ErrorResponse = require('../classes/ErrorResponse')
const {
  HANDLER_ERRORS,
  includeAdminRole,
  includeRole,
  startWithBearerSign
} = require('./helper')

const middleware = {
  resetPassword: async (req, res, next) => {
    const { RESET_PASSWORD_HEADER, TOKEN_RESET_PASSWORD_KEY } = process.env
    const token = req.header(RESET_PASSWORD_HEADER)

    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const { content } = tokens.verifyToken(token, TOKEN_RESET_PASSWORD_KEY)

    req.user = content
    next()
  },

  authUser: (req, res, next) => {
    const { TOKEN_LOGIN_KEY } = process.env
    const authorization = req.get('Authorization')

    if (!(authorization && startWithBearerSign(authorization)))
      throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const [_, token] = authorization.split(' ')
    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const { success, content } = tokens.verifyToken(token, TOKEN_LOGIN_KEY)
    if (!success) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    if (!includeRole(content))
      throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const userInformation = {
      id: content.id,
      fullname: content.fullname,
      username: content.username,
      email: content.email,
      role: content.role
    }

    req.user = userInformation
    next()
  },

  isAdmin: (req, res, next) => {
    if (!includeAdminRole(req.user))
      throw new ErrorResponse('UnauthorizedError', 'Access denied')

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
