const bcrypt = require('bcrypt')

const hashingService = {
  generateHash: async (plainPassword, salt) => {
    const hashedPassword = bcrypt.hash(plainPassword, salt * 1)
    return hashedPassword
  },
  compareHash: (plainPassword, hashedPassword) =>
    bcrypt.compare(plainPassword, hashedPassword)
}

module.exports = { hashingService }
