const User = require('../models/User/User.model')

const userRepository = {
  findByUsernameOrEmail: async ({ username, email }) => {
    const users = await User.find({
      $or: [{ username }, { email: new RegExp(`^${email}`, 'i') }]
    })
    return users
  },

  findOneByUsernameOrEmail: async ({ field }) => {
    const user = await User.findOne({
      $or: [{ username: field }, { email: new RegExp(`^${field}`, 'i') }]
    })

    return user
  },

  findOneById: async (id) => {
    const user = await User.findById(id)

    return user
  },

  find: async () => await User.find({}),

  create: async ({ fullname, username, email, hashedPassword }) => {
    const newUser = new User({ fullname, username, email, hashedPassword })

    const userSaved = await newUser.save()

    return userSaved
  },

  updateById: async ({ id, username, email, fullname, hashedPassword }) => {
    await User.findByIdAndUpdate(id, {
      username,
      email,
      fullname,
      hashedPassword
    })

    const updatedUser = await User.findById(id)

    return updatedUser
  },

  deleteOneById: (id) => User.findByIdAndDelete(id),

  deleteAll: () => User.deleteMany({})
}

module.exports = { userRepository }
