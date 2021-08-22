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

  successfullyGames: (res, results) =>
    res.status(200).json({ success: true, count: results.length, results })
}

module.exports = gameResponse
