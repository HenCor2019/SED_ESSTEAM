const Game = require('../models/Games/Game.model')

const searchRepository = {
  findByFilters: async (filters) => {
    const { q, mn, mx, pt, gd, limit } = filters
    const titlePattern = new RegExp(`^${q}`, 'i')

    const games = await Game.find({
      $and: [
        { title: titlePattern },
        { platforms: { $in: pt } },
        { genders: { $in: gd } },
        { basePrice: { $gte: mn } },
        { basePrice: { $lte: mx } }
      ]
    }).limit(+limit)

    return games
  }
}

module.exports = searchRepository
