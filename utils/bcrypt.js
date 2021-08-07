const bcrypt = require('bcrypt')

const bcryptService = {
  generateHash: async (plainPassword, salt) => {
    const hashedPassword = bcrypt.hash(plainPassword, salt * 1)
    return hashedPassword
  }
}

module.exports = { bcryptService }
