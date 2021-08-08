const User = require('../../models/User/User.model')
const { hashingService } = require('../../utils/hashingService')
const { emailing } = require('../../utils/emailing')
const ErrorResponse = require('../../classes/ErrorResponse')
const ServiceResponse = require('../../classes/ServiceResponse')

const { SALT } = process.env

const userService = {
  findByUsernameOrEmail: async ({ username, email }) => {
    const users = await User.find({
      $or: [{ username: username }, { email: email }]
    })

    return new ServiceResponse(true, users)
  },
  findOneByUsernameOrEmail: async ({ field }) => {
    const user = await User.findOne({
      $or: [{ username: field }, { email: field }]
    })

    if (!user) return new ServiceResponse(false, user)

    return new ServiceResponse(true, user)
  },
  register: async ({ fullname, username, email, password }) => {
    const hashedPassword = await hashingService.generateHash(password, SALT)

    const newUser = new User({ fullname, username, email, hashedPassword })

    const userSaved = await newUser.save()
    if (!userSaved) throw new ErrorResponse('SaveError', 'Cannot save the user')

    await emailing.sendRegisterEmail({ username, email })
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
