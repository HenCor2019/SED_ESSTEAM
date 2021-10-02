const User = require('../models/User/User.model')

const userRepository = {
  findOneByEmail: async ({ email }) => {
    const user = await User.findOne({ email: new RegExp(`^${email}`, 'i') })

    return user
  },

  findOneByUsername: async ({ username }) => {
    const user = await User.findOne({ username })
    return user
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

  find: async () => await User.find({}),

  create: async ({ fullname, username, email, hashedPassword }) => {
    const newUser = new User({ fullname, username, email, hashedPassword })
    const userSaved = await newUser.save()

    return userSaved
  },

  updateById: async (user) => {
    const {
      id,
      username,
      email,
      fullname,
      hashedPassword,
      active,
      dob,
      about
    } = user

    const newFields = {
      username,
      email,
      fullname,
      hashedPassword,
      active,
      dob,
      about
    }

    const options = { new: true }

    const updatedUser = await User.findByIdAndUpdate(id, newFields, options)
    return updatedUser
  },

  updateFavoriteGames: async ({ favoriteGames, id }) => {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { favoriteGames },
      { new: true }
    )

    return updatedUser
  },

  updateGames: async ({ games, id }) => {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { games },
      { new: true }
    )

    return updateUser
  },

  deleteOneById: (id) => User.findByIdAndDelete(id),

  deleteAll: () => User.deleteMany({})
}

module.exports = { userRepository }
