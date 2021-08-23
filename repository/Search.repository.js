const Game = require('../models/Games/Game.model')

const searchRepository = {
  findByFilters: async ({
    title,
    minprice,
    maxprice,
    platforms,
    genders,
    limit
  }) => {
    console.log({ title, minprice, maxprice, platforms, genders })
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
