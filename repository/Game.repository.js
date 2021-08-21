const Game = require('../models/Games/Game.model')

const gameRepository = {
  findOneByTitle: (title) => Game.findOne({ title }),

  insertNewGame: async (body) => {
    const {
      title,
      description,
      discount = 0,
      basePrice = 0,
      thumbnail,
      genders,
      platforms
    } = body
    const newGame = new Game({
      title,
      description,
      discount,
      basePrice,
      thumbnail,
      genders,
      platforms
    })

    const savedGame = await newGame.save()

    return savedGame
  }
}

module.exports = gameRepository
