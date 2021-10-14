const bcrypt = require('bcrypt')

const hashingService = {
  generateHash: async (plainPassword, salt) => {
    const hashedPassword = bcrypt.hash(plainPassword, salt * 1)
    return hashedPassword
  },

  generateResponsesHash: async ({ questions: responses }, salt) => {
    const hashedResponses = []
    const firstResponse = await bcrypt.hash(responses[0], salt * 1)
    const secondResponse = await bcrypt.hash(responses[1], salt * 1)
    hashedResponses.push(firstResponse)
    hashedResponses.push(secondResponse)

    return hashedResponses
  },

  compareHash: (plainPassword, hashedPassword) =>
    bcrypt.compare(plainPassword, hashedPassword),

  compareResponses: (responses, originalResponses) => {
    return (
      bcrypt.compare(responses[0], originalResponses[0]) &&
      bcrypt.compare(responses[1], originalResponses[1])
    )
  }
}

module.exports = { hashingService }
