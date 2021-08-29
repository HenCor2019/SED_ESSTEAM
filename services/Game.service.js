const gameRepository = require('../repository/Game.repository')
const ServiceResponse = require('../classes/ServiceResponse')

const gameServices = {
  findOneByTitle: async ({ title }) => {
    const game = await gameRepository.findOneByTitle(title)

    return new ServiceResponse(true, game)
  },

  findByTitle: async ({ title }) => {
    const games = await gameRepository.findByTitle(title)

    return new ServiceResponse(true, games)
  },

  findOneById: async (id) => {
    const game = await gameRepository.findOneById(id)
    return new ServiceResponse(true, game)
  },

  saveGame: async (body) => {
    const savedGame = await gameRepository.insertNewGame(body)

    return new ServiceResponse(true, savedGame)
  },

  updateGameById: async (newGame) => {
    const updatedGame = await gameRepository.updateGameById(newGame)

    return new ServiceResponse(true, updatedGame)
  },

  deleteGameById: async (id) => {
    await gameRepository.deleteGameById(id)

    return new ServiceResponse(true)
  },

  getAllGames: async () => {
    const games = await gameRepository.getAllGames()
    return new ServiceResponse(true, games)
  }
}

module.exports = gameServices
