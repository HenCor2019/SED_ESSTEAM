const { tokens } = require('../../utils/tokens')
const { RESET_PASSWORD_HEADER } = process.env

const userResponse = {
  successfullyRegister: (res) =>
    res.status(201).json({ success: true, message: 'User was created' }),

  successfullyLogin: (res, { id, fullname, username, email }) => {
    const payload = { id, fullname, username, email }
    const token = tokens.createLoginToken(payload)

    return res.status(200).json({ success: true, token })
  },

  successfullyRequest: (res, token) =>
    res
      .header(RESET_PASSWORD_HEADER, token)
      .status(200)
      .json({ success: true, message: 'Request was send successfully' })
}
module.exports = { userResponse }
