const gameResponse = {
  successfullySave: (res, newGame) =>
    res
      .status(200)
      .json({ success: true, message: 'Game was inserted correctly', newGame })
}

module.exports = gameResponse
