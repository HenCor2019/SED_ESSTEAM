function uniqueFields(items, item) {
  if (!items.length) return true

  const itemsId = items.map(({ id }) => id).filter((id) => id != item.id)
  return itemsId.length === 0
}

const checkSameId = (gameId, newId) => gameId.toString() !== newId.toString()

function insertOrRemoveGame(favoriteGames = [], newGame) {
  if (!favoriteGames.length) return { favGames: [newGame.id], isFav: true }

  if (!newGame) return { favGames: favoriteGames, isFav: false }

  const filteredId = favoriteGames.filter((id) => checkSameId(id, newGame.id))

  return filteredId.length === favoriteGames.length
    ? { favGames: [...favoriteGames, newGame], isFav: true }
    : { favGames: filteredId, isFav: false }
}

module.exports = { uniqueFields, insertOrRemoveGame }
