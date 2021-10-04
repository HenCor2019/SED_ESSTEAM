const gameServices = require('../../services/Game.service')
const homeResponse = require('../../responses/Home.response')

const homeController = {
  allGames: async (req, res) => {
    const { content: games } = await gameServices.find()

    return homeResponse.successfullyGames(res, games)
  }
}

module.exports = homeController
