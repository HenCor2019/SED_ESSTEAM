const { newGameSchema, updateGameSchema, idSchema } = require('./helper')

const gameValidator = {
  validateNewGame: async (req, res, next) => {
    const { body } = req
    const { path } = req.file

    body.thumbnail = path
    req.validatedGame = await newGameSchema.validateAsync(body)
    next()
  },

  validateUpdate: async (req, res, next) => {
    const { body } = req
    req.validatedUpdate = await updateGameSchema.validateAsync(body)
    next()
  },

  validateId: async (req, res, next) => {
    const { params } = req

    const { id } = await idSchema.validateAsync(params)
    req.validatedId = id
    next()
  }
}

module.exports = gameValidator
