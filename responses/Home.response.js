const GENDERS = {
  action: 'action',
  adventures: 'adventures',
  survival: 'survival'
}

const homeResponse = {
  successfullyGames: (res, games) => {
    return res.status(200).json({
      success: true,
      count: games.length,
      categories: mapCategories(games)
    })
  }
}

function mapCategories(games) {
  const categories = {}

  const existCategory = (gender) => categories[gender] !== undefined

  const updateCategory = (gender, newGame) => {
    categories[gender].count++
    categories[gender].name.push(newGame)
  }

  const createCategory = (gender, newGame) => {
    categories[gender] = { name: [newGame], count: 1 }
  }

  const addOrUpdateCategory = (gender, game) => {
    if (existCategory(gender)) updateCategory(gender, game)
    else createCategory(gender, game)
  }

  games.forEach((game) => {
    const { genders } = game
    genders.forEach((gender) => addOrUpdateCategory(gender, game))
  })

  return categories
}

module.exports = homeResponse
