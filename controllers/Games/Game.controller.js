const { uniqueFields } = require('../../utils/helper')
const gamesServices = require('../../services/Game.service')
const ErrorResponse = require('../../classes/ErrorResponse')
const { createGameBody, createNewGame } = require('./helper')
const gameResponse = require('../../responses/Game.response')
const gameValidator = require('../../validators/Game.validator')

const gameController = {
  insertNewGame: async (req, res) => {
    await gameValidator.validateNewGame(req.body)
    const newGame = createGameBody(req)

    const { content: game } = await gamesServices.findOneByTitle(newGame)
    if (game) throw new ErrorResponse('RepeatError', 'Title already exist')

    const { content: savedGame } = await gamesServices.insertNewGame(newGame)
    if (!savedGame) throw new ErrorResponse('SaveError', 'Cannot save the game')

    return gameResponse.successfullySave(res, newGame)
  },

  updateGame: async (req, res) => {
    await gameValidator.validateId(req.params)
    await gameValidator.validateUpdate(req.body)

    const { id } = req.params
    const { content: game } = await gamesServices.findOneById(id)
    if (!game) throw new ErrorResponse('UnExistError', 'Cannot find the game')

    const { content: games } = await gamesServices.findByTitle(req.body)

    if (!uniqueFields(games, game))
      throw new ErrorResponse('RepeatError', 'Title is already taken')

    const newGame = createNewGame(req.body, game)
    const { content: updatedGame } = await gamesServices.updateGameById(newGame)

    return gameResponse.successfullyUpdate(res, updatedGame)
  },

  deleteGame: async (req, res) => {
    await gameValidator.validateId(req.params)
    const { id } = req.params

    await gamesServices.deleteGameById(id)

    return gameResponse.successfullyDelete(res)
  },

  allGames: async (req, res) => {
    const { content: games } = await gamesServices.getAllGames()

    console.log({ games })
    return gameResponse.successfullyGames(res, games)
  }
}

module.exports = gameController
