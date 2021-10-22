const searchResponse = {
  successfullySearch: (res, games) =>
    res.status(200).json({ success: true, count: games.length, games })
}

module.exports = searchResponse
