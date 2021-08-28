const searchResponse = {
  successfullySearch: (res, games) =>
    res.status(200).json({ status: 200, count: games.length, games })
}

module.exports = searchResponse
