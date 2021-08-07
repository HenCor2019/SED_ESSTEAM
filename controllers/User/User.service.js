const User = require('../../models/User/User.model')
const { hashingService } = require('../../utils/hashingService')
const ErrorResponse = require('../../classes/ErrorResponse')
const ServiceResponse = require('../../classes/ServiceResponse')

const { SALT } = process.env

const userService = {
  findUsersByUsernameOrEmail: async ({ username, email }) => {
    const users = await User.find({
      $or: [{ username: username, email: email }]
    })

    if (users.length) {
      throw new ErrorResponse('RepeatError', 'Some fields are already taken')
    }
  },
  findUserByUsernameOrEmail: async ({ field }) => {
    const user = await User.findOne({
      $or: [{ username: field }, { email: field }]
    })

    if (!user) return new ServiceResponse(false, user)
    return new ServiceResponse(false, user)
  },
  createUser: async ({ fullname, username, email, password }) => {
    const newUser = new User({
      fullname,
      username,
      email,
      password
    })

    const hashedPassword = await hashingService.generateHash(password, SALT)
    newUser.hashedPassword = hashedPassword

    const userSaved = await newUser.save()
    if (!userSaved) throw new ErrorResponse('SaveError', 'Cannot save the user')
  },
  comparePasswords: (plainPassword, hashedPassword) => {
    const passwordAreEquals = hashingService.compareHash(
      plainPassword,
      hashedPassword
    )

    if (!passwordAreEquals) {
      throw new ErrorResponse('LoginError', 'User and password not match')
    }
  }
}

module.exports = { userService }
