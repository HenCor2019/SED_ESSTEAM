const Game = require('../models/Games/Game.model')

const searchRepository = {
  findByFilters: async (filters) => {
    console.log({ filters })
    const {
      q: title,
      mn: minprice,
      mx: maxprice,
      pt: platforms,
      gd: genders,
      limit
    } = filters
    const titlePattern = new RegExp(`^${title}`, 'i')
    const games = await Game.find({
      $and: [
        { title: titlePattern },
        { platforms: { $in: platforms } },
        { genders: { $in: genders } },
        { basePrice: { $gte: minprice } },
        { basePrice: { $lte: maxprice } }
      ]
    }).limit(+limit)

    return games
  }
}

module.exports = searchRepository
