const jwt = require('jsonwebtoken')
const { TOKEN_KEY } = process.env || 'shhh'

const tokens = {
  createLoginToken: (payload) =>
    jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' })
}

module.exports = { tokens }
