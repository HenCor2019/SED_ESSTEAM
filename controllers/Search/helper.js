const PLATFORMS = {
  pc: ['pc'],
  playstation: ['playstation'],
  xbox: ['xbox'],
  switch: ['switch'],
  default: ['pc', 'playstation', 'xbox', 'switch']
}

const GENDERS = {
  fear: ['fear'],
  'single-player': ['single-player'],
  default: ['fear', 'single-player']
}

const transformIntoArray = (base, type) => {
  const typeLowerCase = type.toLowerCase()

  return base[typeLowerCase] ?? base.default
}

const transformToLowerCase = (word) => word.toLowerCase()

const getFilters = ({
  q,
  mn = '0',
  mx = '1000',
  pt = 'all',
  gd = 'all',
  limit = 10
}) => {
  const platforms =
    typeof pt === 'string'
      ? transformIntoArray(PLATFORMS, pt)
      : pt.map(transformToLowerCase)

  const genders =
    typeof gd === 'string'
      ? transformIntoArray(GENDERS, gd)
      : gd.map(transformToLowerCase)

  return {
    title: q,
    minprice: +mn,
    maxprice: +mx,
    platforms,
    genders,
    limit
  }
}

module.exports = { getFilters }
