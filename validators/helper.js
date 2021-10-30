const sanitize = require('sanitize-html')

const transformToNumber = (value, helpers) => {
  const [name] = helpers.state.path

  const valueNumber = Number(value)
  if (isNaN(valueNumber)) return helpers.message(`${name} must be number`)

  if (valueNumber < 0) return helpers.message(`${name} must be positive number`)

  return valueNumber
}

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

const sanitizeHTML = (value, helper) => {
  const [name] = helper.state.path

  const cleaned = sanitize(value, { allowedTags: [], allowedAttributes: [] })
  if (!cleaned) return helper.message(`Invalid ${name}`)

  return cleaned
}

const generateFullname = (parent, helpers) => {
  const { firstname, lastname } = parent
  return `${firstname} ${lastname}`
}

module.exports = {
  transformToNumber,
  setUrlImage,
  mapToArray,
  mapToPercentage,
  samePassword,
  sanitizeHTML,
  generateFullname
}
