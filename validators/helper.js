const transformToNumber = (value) => +value

const setUrlImage = (path) => {
  const { BASE_URL_CLIENT } = process.env
  return `${BASE_URL_CLIENT}${path.substring(7)}`
}

const mapToArray = (value) => (typeof value === 'string' ? [value] : value)

const mapToPercentage = (value) => value / 100

module.exports = { transformToNumber, setUrlImage, mapToArray, mapToPercentage }
