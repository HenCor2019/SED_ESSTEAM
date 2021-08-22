const gameResponse = require('./Game.response')
const gamesServices = require('./Game.service')
const gameValidator = require('./Game.validator')
const ErrorResponse = require('../../classes/ErrorResponse')
const { createGameBody } = require('./helper')

const gameController = {
  insertNewGame: async (req, res) => {
    await gameValidator.validateFormData(req.body)
    const newGame = createGameBody(req)
    await gameValidator.validateNewGame(newGame)

    const { content: game } = await gamesServices.findOneByTitle(newGame)
    if (game) throw new ErrorResponse('RepeatError', 'Title already exist')

    const { content: savedGame } = await gamesServices.insertNewGame(newGame)
    if (!savedGame) throw new ErrorResponse('SaveError', 'Cannot save the game')

    return gameResponse.successfullySave(res, savedGame)
  },

  updateGame: async (req, res) => {
    await gameValidator.validateUpdate(req.body)

    const { content: game } = await gamesServices.findOneByTitle(req.body)
    if (game) throw new ErrorResponse('RepeatError', 'Title is already taken')
  }
}

module.exports = gameController
