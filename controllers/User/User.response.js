const { tokens } = require('../../utils/tokens')
const userResponse = {
  successfullyRegister: (res) => {
    return res.status(201).json({ success: true, message: 'User was created' })
  },
  successfullyLogin: (res, { id, fullname, username, email }) => {
    const payload = { id, fullname, username, email }
    const token = tokens.createLoginToken(payload)

    return res.status(200).json({ success: true, token })
  }
}
module.exports = { userResponse }
