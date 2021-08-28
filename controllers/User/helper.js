const validateNullFields = (body, user) => ({
  id: user.id,
  fullname: body.fullname || user.fullname,
  username: body.username || user.username,
  email: body.email || user.email,
  hashedPassword: user.hashedPassword
})

module.exports = { validateNullFields }
