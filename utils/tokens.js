const jwt = require('jsonwebtoken')
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

  verifyToken: (token, secretKey) => {
    const verifiedToken = jwt.verify(token, secretKey)

    if (!verifiedToken) return new ServiceResponse(false)

    return new ServiceResponse(true, verifiedToken)
  }
}

module.exports = { tokens }
