const { tokens } = require('../config/tokens')
const { RESET_PASSWORD_HEADER } = process.env
const { emailing } = require('../config/emailing')

const userResponse = {
  successfullyRegister: async (res, { id, fullname, active, email }) => {
    const payload = { id, fullname, active }
    const token = tokens.createRegisterToken(payload)

    await emailing.sendRegisterEmail({ fullname, email, token })
    return res
      .header('pre-register', token)
      .status(201)
      .json({ success: true, message: 'User was created' })
  },

  successfullyLogin: (res, { id, fullname, username, email, role }) => {
    const payload = { id, fullname, username, email, role }
    const token = tokens.createLoginToken(payload)

    return res.status(200).json({ success: true, token }).end()
  },

  successfullyRequest: (res, token) =>
    res
      .header(RESET_PASSWORD_HEADER, token)
      .status(200)
      .json({ success: true, message: 'Request was send successfully' })
      .end(),

  successfullyUpdate: (res, isFavorite) =>
    res
      .status(200)
      .json({ success: true, message: 'Updated successfully', isFavorite })
      .end(),

  successfullyDelete: (res, count) =>
    res
      .status(200)
      .json({
        success: true,
        message: `${count} files was deleted successfully`
      })
      .end()
}

module.exports = userResponse
