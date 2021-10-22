const { uniqueFields } = require('../../utils/helper')
const gamesServices = require('../../services/Game.service')
const ErrorResponse = require('../../classes/ErrorResponse')
const { updateGameFields, generatePattern } = require('./helper')
const gameResponse = require('../../responses/Game/Game.response')

const gameController = {
  insertNewGame: async (req, res) => {
    const { validatedGame } = req

    const { content: game } = await gamesServices.findOneByTitle(validatedGame)
    if (game) throw new ErrorResponse('RepeatError', 'Title already exist')

    const { content: savedGame } = await gamesServices.saveGame(validatedGame)
    if (!savedGame) throw new ErrorResponse('SaveError', 'Cannot save the game')

    return gameResponse.successfullySave(res, savedGame)
  },

  updateGame: async (req, res) => {
    const { validatedId: id, validatedUpdate: validatedGame } = req

    console.log({ id, validatedGame })
    const { content: game } = await gamesServices.findOneById(id)
    if (!game) throw new ErrorResponse('UnExistError', 'Cannot find the game')

    const { content: games } = await gamesServices.findByTitle(validatedGame)

    if (!uniqueFields(games, game)) {
      throw new ErrorResponse('RepeatError', 'Title is already taken')
    }

    const newGame = updateGameFields(validatedGame, game)
    const { content: updatedGame } = await gamesServices.updateGameById(newGame)

    return gameResponse.successfullyUpdate(res, updatedGame)
  },

  deleteGame: async (req, res) => {
    const { validatedId: id } = req

    await gamesServices.deleteGameById(id)

    return gameResponse.successfullyDelete(res)
  },

  oneGame: async (req, res) => {
    const { validatedId: id } = req

    const { content: game } = await gamesServices.findOneById(id)
    if (!game) return new ErrorResponse('UnExistError', 'Cannot find the game')

    return gameResponse.successfullyGame(res, game)
  },

  allGames: async (req, res) => {
    const { content: games } = await gamesServices.getAllGames()

    return gameResponse.successfullyGames(res, games)
  },

  recommendedGames: async (req, res) => {
    const { validatedId: id } = req
    const { content: game } = await gamesServices.findOneById(id)

    if (!game) throw new ErrorResponse('UnExistError', 'Cannot find the game')

    const { genders } = game
    const pattern = genders.reduce(generatePattern, '')

    const filters = { pattern, title: game.title }
    const { content: similarGames } = await gamesServices.findByGenders(filters)

    return res
      .status(200)
      .json({ success: true, count: similarGames.length, similarGames })
  }
}

module.exports = gameController
