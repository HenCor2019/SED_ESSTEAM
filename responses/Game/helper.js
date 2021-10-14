const isNewGender = (categories, gender) => categories[gender] === undefined

const updateCategories = (categories, gender, newGame) => {
  categories[gender].count++
  categories[gender].name.push(newGame)
}

const addOrUpdateCategory = (categories, gender, game) => {
  if (isNewGender(categories, gender))
    return createNewCategory(categories, gender, game)

  return updateCategories(categories, gender, game)
}

const createNewCategory = (categories, gender, newGame) =>
  (categories[gender] = { name: [newGame], count: 1 })

const mapCategories = (games) => {
  const categories = {}

  games.forEach((game) => {
    const { genders } = game
    genders.forEach((gender) => addOrUpdateCategory(categories, gender, game))
  })

  return categories
}

module.exports = { mapCategories }
