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

module.exports = { setUrlImage, createGameBody }
