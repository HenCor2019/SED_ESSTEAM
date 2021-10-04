const Game = require('../models/Games/Game.model')

const gameRepository = {
  find: () => Game.find(),

  findOneByTitle: (title) => Game.findOne({ title }),

  findByTitle: (title) => Game.find({ title }),

  findOneById: (id) => Game.findById(id),

  deleteGameById: (id) => Game.findByIdAndDelete(id),

  getAllGames: () => Game.find(),

  insertNewGame: async (body) => {
    const newGame = new Game({
      title: body.title,
      description: body.description,
      discount: body.discount || 0,
      basePrice: body.basePrice,
      creator: body.creator,
      thumbnail: body.thumbnail,
      genders: body.genders,
      platforms: body.platforms
    })

    const savedGame = await newGame.save()

    return savedGame
  },

  updateGameById: async (newGame) => {
    const { id } = newGame
    const toUpdate = {
      title: newGame.title,
      description: newGame.description,
      discount: newGame.discount,
      basePrice: newGame.basePrice,
      thumbnail: newGame.thumbnail,
      genders: newGame.genders,
      platforms: newGame.platforms
    }

    const options = { new: true }

    const updateGame = await Game.findByIdAndUpdate(id, toUpdate, options)

    return updateGame
  }
}

module.exports = gameRepository
