const validateNullFields = (body, user) => ({
  id: user.id,
  fullname: body.fullname || user.fullname,
  username: body.username || user.username,
  email: body.email || user.email,
  hashedPassword: user.hashedPassword,
  active: body.active || user.active,
  dob: body.dob || user.dob,
  about: body.about || user.about
})

module.exports = { validateNullFields }
