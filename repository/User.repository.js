const User = require('../models/User/User.model')

const userRepository = {
  findByUsernameOrEmail: async ({ username, email }) => {
    const users = await User.find({ $or: [{ username }, { email }] })
    return users
  },

  findOneByUsernameOrEmail: async ({ field }) => {
    const user = await User.findOne({
      $or: [{ username: field }, { email: field }]
    })

    return user
  },

  findOneById: async (id) => {
    const user = await User.findById(id)

    return user
  },

  create: async ({ fullname, username, email, hashedPassword }) => {
    const newUser = new User({ fullname, username, email, hashedPassword })

    const userSaved = await newUser.save()

    return userSaved
  },

  update: async ({ id, username, email, fullname, hashedPassword }) => {
    await User.findByIdAndUpdate(id, {
      username,
      email,
      fullname,
      hashedPassword
    })

    const updatedUser = await User.findById(id)

    return updatedUser
  }
}

module.exports = { userRepository }
