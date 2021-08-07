const userResponse = {
  create: (res) => {
    return res.status(201).json({ success: true, message: 'User was created' })
  }
}
module.exports = { userResponse }
