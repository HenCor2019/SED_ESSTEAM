const ErrorResponse = require('../classes/ErrorResponse')
const { tokens } = require('../utils/tokens')

const {
  TOKEN_RESET_PASSWORD_KEY,
  RESET_PASSWORD_HEADER,
  TOKEN_LOGIN_KEY,
  TOKEN_LOGIN_HEADER
} = process.env

const Auth = {
  resetPassword: async (req, res, next) => {
    try {
      const token = req.header(RESET_PASSWORD_HEADER)

      if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')

      const { content } = tokens.verifyToken(token, TOKEN_RESET_PASSWORD_KEY)

      req.userContent = content
      next()
    } catch (error) {
      next(error)
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const token = req.header(TOKEN_LOGIN_HEADER)
      if (!token) throw new ErrorResponse('UnauthorizedError', 'Access denied')
      const { content } = tokens.verifyToken(token, TOKEN_LOGIN_KEY)

      req.body.id = content.id
      next()
    } catch (error) {
      console.log({ error })
      next(error)
    }
  }
}

module.exports = { Auth }
