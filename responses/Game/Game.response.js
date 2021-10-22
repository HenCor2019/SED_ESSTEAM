const { mapCategories } = require('./helper')

const gameResponse = {
  successfullySave: (res, newGame) =>
    res
      .status(200)
      .json({ success: true, message: 'Game was inserted correctly', newGame }),

  successfullyUpdate: (res, updateGame) =>
    res.status(200).json({
      success: true,
      message: 'Game successfully updated',
      updateGame
    }),

  successfullyDelete: (res) =>
    res.status(200).json({ success: true, message: 'Game was deleted' }),

  successfullyGames: (res, games) => {
    return res.status(200).json({
      success: true,
      count: games.length,
      categories: mapCategories(games)
    })
  },

  successfullyGame: (res, game) => {
    return res.status(200).json({
      success: true,
      game
    })
  }
}

module.exports = gameResponse
