const gameResponse = require('./Game.response')
const gamesServices = require('./Game.service')
const gameValidator = require('./Game.validator')
const ErrorResponse = require('../../classes/ErrorResponse')

const gameController = {
  insertNewGame: async (req, res) => {
    await gameValidator.validateInsert(req.body)

    const { content: game } = await gamesServices.findOneByTitle(req.body)
    if (game) throw new ErrorResponse('RepeatError', 'Title already exist')

    const { content: newGame } = await gamesServices.insertNewGame(req.body)
    if (!newGame) throw new ErrorResponse('SaveError', 'Cannot save the game')

    return gameResponse.successfullySave(res, newGame)
  },

  updateGame: async (req, res) => {
    await gameValidator.validateUpdate(req.body)

    const { content: game } = await gamesServices.findOneByTitle(req.body)
    if (game) throw new ErrorResponse('RepeatError', 'Title is already taken')
  }
}

module.exports = gameController
