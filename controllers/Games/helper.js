function updateGameFields(preGame, lastGame) {
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

function generatePattern(accumulator, gender, index) {
  return index === 0 ? `${gender}` : `${accumulator}|${gender}`
}

module.exports = { updateGameFields, generatePattern }
