const { tokens } = require('../config/tokens')
const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')
const sanitizeHTML = require('sanitize-html')

const ErrorResponse = require('../classes/ErrorResponse')
const {
  HANDLER_ERRORS,
  includeAdminRole,
  includeRole,
  startWithBearerSign,
  getPaymentInfo,
  ATTEMPTS
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

  register: async (req, res, next) => {
    const { TOKEN_REGISTER_KEY } = process.env
    const token = req.header('pre-register')

    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const { content } = tokens.verifyToken(token, TOKEN_REGISTER_KEY)
    req.verifiedToken = content
    next()
  },

  authUser: (req, res, next) => {
    const { TOKEN_LOGIN_KEY } = process.env
    const authorization = req.get('Authorization')

    if (!(authorization && startWithBearerSign(authorization))) {
      throw new ErrorResponse('UnauthorizedError', 'Access denied')
    }

    const [_, token] = authorization.split(' ')
    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const { success, content } = tokens.verifyToken(token, TOKEN_LOGIN_KEY)
    if (!success) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    if (!includeRole(content)) {
      throw new ErrorResponse('UnauthorizedError', 'Access denied')
    }

    const userInformation = { id: content.id }
    const userRole = { role: content.role }

    req.user = userInformation
    req.role = userRole
    next()
  },

  isAdmin: (req, res, next) => {
    if (!includeAdminRole(req.role)) {
      throw new ErrorResponse('UnauthorizedError', 'Unauthorized action')
    }

    next()
  },

  authPayment: (req, res, next) => {
    const { PAYMENT_SECRET_KEY } = process.env
    const token = req.header('auth-payment')
    const { success, content } = tokens.verifyToken(token, PAYMENT_SECRET_KEY)

    if (!success) throw new ErrorResponse('PaymentError', 'Invalid information')

    const paymentInformation = getPaymentInfo(content)

    req.paymentInformation = paymentInformation
    next()
  },

  errorHandling: (error, req, res, next) => {
    console.log(error.name)
    const handler = HANDLER_ERRORS[error.name] || HANDLER_ERRORS.defaultError
    handler(res, error)
  },

  rateLimiterMiddleware: (req, res, next) => {
    const path = req.route.path.substring(1) || ''

    const pathConfig = ATTEMPTS[path] ?? ATTEMPTS.default

    const config = { storeClient: mongoose.connection, ...pathConfig }
    const rateLimiter = new RateLimiterMongo(config)

    rateLimiter
      .consume(req.ip)
      .then(() => {
        next()
      })
      .catch((error) => {
        res.status(429).json({
          success: false,
          message: `You've tried to many times. try again later`
        })
      })
  },

  unknownEndpoint: (req, res) => {
    res.status(404).json({ success: false, message: 'Unknown endpoint' })
  },

  authToken: (req, res, next) => {
    const { TOKEN_LOGIN_KEY } = process.env
    const authorization = req.get('Authorization')

    if (!(authorization && startWithBearerSign(authorization))) {
      throw new ErrorResponse('UnauthorizedError', 'Access denied')
    }

    const [_, token] = authorization.split(' ')
    if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const { success, content } = tokens.verifyToken(token, TOKEN_LOGIN_KEY)
    if (!success) throw new ErrorResponse('UnauthorizedError', 'Access denied')

    const userInformation = { id: content.id }

    req.user = userInformation
    next()
  }
}

module.exports = { middleware }
