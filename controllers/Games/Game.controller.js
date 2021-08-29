const { uniqueFields } = require('../../utils/helper')
const gamesServices = require('../../services/Game.service')
const ErrorResponse = require('../../classes/ErrorResponse')
const { createGameBody, updateGameFields } = require('./helper')
const gameResponse = require('../../responses/Game.response')
const gameValidator = require('../../validators/Game.validator')

const gameController = {
  insertNewGame: async (req, res) => {
    const validatedGame = await gameValidator.validateNewGame(req)

    const { content: game } = await gamesServices.findOneByTitle(validatedGame)
    if (game) throw new ErrorResponse('RepeatError', 'Title already exist')

    const { content: savedGame } = await gamesServices.saveGame(validatedGame)
    if (!savedGame) throw new ErrorResponse('SaveError', 'Cannot save the game')

    return gameResponse.successfullySave(res, savedGame)
  },

  updateGame: async (req, res) => {
    const { id } = await gameValidator.validateId(req.params)
    const validatedGame = await gameValidator.validateUpdate(req.body)

    const { content: game } = await gamesServices.findOneById(id)
    if (!game) throw new ErrorResponse('UnExistError', 'Cannot find the game')

    const { content: games } = await gamesServices.findByTitle(validatedGame)

    if (!uniqueFields(games, game))
      throw new ErrorResponse('RepeatError', 'Title is already taken')

    const newGame = updateGameFields(validatedGame, game)
    const { content: updatedGame } = await gamesServices.updateGameById(newGame)

    return gameResponse.successfullyUpdate(res, updatedGame)
  },

  deleteGame: async (req, res) => {
    const { id } = await gameValidator.validateId(req.params)

    await gamesServices.deleteGameById(id)

    return gameResponse.successfullyDelete(res)
  },

  allGames: async (req, res) => {
    const { content: games } = await gamesServices.getAllGames()

    return gameResponse.successfullyGames(res, games)
  }
}

module.exports = gameController
