const jwt = require('jsonwebtoken')
const ServiceResponse = require('../classes/ServiceResponse')
const { TOKEN_KEY, TOKEN_RESET_PASSWORD_KEY } = process.env

const tokens = {
  createLoginToken: (payload) =>
    jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' }),

  // TODO: (change expiresIn)
  createResetPasswordToken: ({ id }) =>
    jwt.sign({ id }, TOKEN_RESET_PASSWORD_KEY, { expiresIn: '1d' }),

  verifyToken: (token, secretKey) => {
    const verifiedToken = jwt.verify(token, secretKey)

    if (!verifiedToken) return new ServiceResponse(false)

    return new ServiceResponse(true, verifiedToken)
  }
}

module.exports = { tokens }
