const { PLATFORMS, GENDERS } = require('../../utils/constants')

const transformIntoArray = (base, type) => {
  const transformedType = !type ? type : type.toLowerCase()

  return base[transformedType] ?? base.default
}

const transformToLowerCase = (word) => word.toLowerCase()
const isArray = (item) => Array.isArray(item)

const getFilters = (game) => {
  const { q, mn = '0', mx = '100', pt, gd, limit = 10 } = game

  const platforms = !isArray(pt)
    ? transformIntoArray(PLATFORMS, pt)
    : pt.map(transformToLowerCase)

  const genders = !isArray(gd)
    ? transformIntoArray(GENDERS, gd)
    : gd.map(transformToLowerCase)

  return {
    title: q,
    minprice: +mn,
    maxprice: +mx,
    platforms,
    genders,
    limit: +limit
  }
}

module.exports = { getFilters }
