const jwt = require('jsonwebtoken')
const ErrorResponse = require('../classes/ErrorResponse')
const ServiceResponse = require('../classes/ServiceResponse')

const tokens = {
  createLoginToken: (payload) => {
    const { TOKEN_LOGIN_KEY } = process.env
    return jwt.sign(payload, TOKEN_LOGIN_KEY, { expiresIn: '1d' })
  },

  createResetPasswordToken: ({ id }) => {
    const { TOKEN_RESET_PASSWORD_KEY } = process.env
    return jwt.sign({ id }, TOKEN_RESET_PASSWORD_KEY, { expiresIn: '15m' })
  },

  createApprovedToken: (payload) => {
    const { PAYMENT_SECRET_KEY } = process.env
    return jwt.sign(payload, PAYMENT_SECRET_KEY, { expiresIn: '1d' })
  },

  verifyToken: (token, secretKey) => {
    const verifiedToken = jwt.verify(token, secretKey)

    if (!verifiedToken) return new ServiceResponse(false)

    return new ServiceResponse(true, verifiedToken)
  },

  verifyPayment: (auth) => {
    try {
      const { CLIENT, SECRET } = JSON.parse(auth)
      const { PAYMENT_CLIENT, PAYMENT_SECRET } = process.env

      if (!(CLIENT === PAYMENT_CLIENT && SECRET === PAYMENT_SECRET)) { return false }

      return true
    } catch {
      throw new ErrorResponse('PaymentError', 'Invalid Payment information')
    }
  }
}

module.exports = { tokens }
