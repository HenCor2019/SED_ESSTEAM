const transformToNumber = (value) => +value

const setUrlImage = (path) => {
  const { BASE_URL_CLIENT } = process.env
  return `${BASE_URL_CLIENT}${path.substring(7)}`
}

const mapToArray = (value) => (typeof value === 'string' ? [value] : value)

const mapToPercentage = (value) => value / 100

const samePassword = (value, helper) => {
  const [body] = helper.state.ancestors
  if (body['newPassword'] !== value)
    return helper.message('Passwords are not equals')

  return value
}

module.exports = {
  transformToNumber,
  setUrlImage,
  mapToArray,
  mapToPercentage,
  samePassword
}
