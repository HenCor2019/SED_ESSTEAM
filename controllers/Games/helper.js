const { PLATFORMS, GENDERS } = require('../../utils/constants')

function setUrlImage(path) {
  const { BASE_URL_CLIENT } = process.env
  return `${BASE_URL_CLIENT}${path.substring(7)}`
}

function transformItemToArray(field, base) {
  const transformedItem =
    typeof field === 'string'
      ? [field.toLowerCase()]
      : field.map((item) => item.toLowerCase())

  return transformedItem
}

function createGameBody({ body, file }) {
  const { title, basePrice, discount = 0, creator, platforms, genders } = body

  const transformedPlatforms = transformItemToArray(platforms, PLATFORMS)
  const transformedGenders = transformItemToArray(genders, GENDERS)

  return {
    title,
    basePrice,
    discount,
    creator,
    platforms: transformedPlatforms,
    genders: transformedGenders,
    thumbnail: setUrlImage(file.path)
  }
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
