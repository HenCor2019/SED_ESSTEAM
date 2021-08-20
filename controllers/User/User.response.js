const { tokens } = require('../../utils/tokens')
const { RESET_PASSWORD_HEADER } = process.env

const userResponse = {
  successfullyRegister: (res) =>
    res.status(201).json({ success: true, message: 'User was created' }),

  successfullyLogin: (res, { id, fullname, username, email }) => {
    const payload = { id, fullname, username, email }
    const token = tokens.createLoginToken(payload)

    return res.status(200).json({ success: true, token }).end()
  },

  successfullyRequest: (res, token) =>
    res
      .header(RESET_PASSWORD_HEADER, token)
      .status(200)
      .json({ success: true, message: 'Request was send successfully' })
      .end(),

  successfullyUpdate: (res) =>
    res
      .status(200)
      .json({ success: true, message: 'Updated successfully' })
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
module.exports = { userResponse }
