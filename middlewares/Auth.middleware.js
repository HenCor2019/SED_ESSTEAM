const ErrorResponse = require('../classes/ErrorResponse')
const { tokens } = require('../utils/tokens')

const { TOKEN_RESET_PASSWORD_KEY, RESET_PASSWORD_HEADER } = process.env

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
  }
}

module.exports = { Auth }
