const User = require('../../models/User/User.model')
const { bcryptService } = require('../../utils/bcrypt')
const ErrorResponse = require('../../classes/ErrorResponse')

const { SALT } = process.env

const userService = {
  findByUsernameOrEmail: async ({ username, email }) => {
    const users = await User.find({ $or: [{ username, email }] })
    if (users.length) {
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')
    }
  },

  createUser: async ({ fullname, username, email, password }) => {
    const newUser = new User({
      fullname,
      username,
      email,
      password
    })

    const hashedPassword = await bcryptService.generateHash(password, SALT)
    newUser.hashedPassword = hashedPassword

    const userSaved = await newUser.save()
    if (!userSaved) throw new ErrorResponse('SaveError', 'Cannot save the user')
  }
}

module.exports = { userService }
