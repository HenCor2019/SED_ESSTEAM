function setUrlImage(path) {
  const { BASE_URL_CLIENT } = process.env
  return `${BASE_URL_CLIENT}${path.substring(7)}`
}

function createGameBody({ body, file }) {
  const { path: thumbnail } = file
  const { information } = body

  const gameInformation = JSON.parse(information)
  gameInformation.thumbnail = setUrlImage(thumbnail)

  return gameInformation
}

function createNewGame(preGame, lastGame) {
  const newGame = {
    id: lastGame.id,
    title: preGame.title || lastGame.title,
    thumbnail: lastGame.thumbnail,
    description: preGame.description || lastGame.description,
    discount: preGame.discount || lastGame.discount,
    basePrice: preGame.basePrice || lastGame.basePrice,
    creator: preGame.creator || lastGame.creator,
    platforms: preGame.platforms || lastGame.platforms,
    genders: preGame.genders || lastGame.genders
  }

  return newGame
}

module.exports = { setUrlImage, createGameBody, createNewGame }
