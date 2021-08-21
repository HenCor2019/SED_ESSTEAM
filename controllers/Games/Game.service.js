const gameRepository = require('../../repository/Game.repository')
const ServiceResponse = require('../../classes/ServiceResponse')

const gameServices = {
  findOneByTitle: async ({ title }) => {
    const game = await gameRepository.findOneByTitle(title)

    return new ServiceResponse(true, game)
  },

  insertNewGame: async (body) => {
    const savedGame = await gameRepository.insertNewGame(body)

    return new ServiceResponse(true, savedGame)
  },


}

module.exports = gameServices
