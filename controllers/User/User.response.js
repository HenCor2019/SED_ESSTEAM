const { tokens } = require('../../utils/tokens')
const userResponse = {
  create: (res) => {
    return res.status(201).json({ success: true, message: 'User was created' })
  },
  login: (res, { fullname, username, email }) => {
    const payload = { fullname, username, email }
    const token = tokens.createLoginToken(payload)

    return res.status(200).json({ success: true, token })
  }
}
module.exports = { userResponse }
