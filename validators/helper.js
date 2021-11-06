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

const regex = {
  spaces: (value, helper) => {
    const [name] = helper.state.path
    const pattern = /[\n# $&:\n\t]/g

    if (value.match(pattern))
      return helper.message(`${name} cannot contain spaces`)

    return value
  },

  password: (value, helper) => {
    const [name] = helper.state.path
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    if (!value.match(pattern))
      return helper.message(
        `${name} must contain at least 1 letter and 1 special character`
      )

    return value
  }
}

const isUsernamePassword = (value, helpers) => {
  const [body] = helpers.state.ancestors

  if (body.username.trim() === body.password.trim())
    return helpers.message('Username cannot be your password')

  return value
}

const changeValue = (value, helpers) => {
  const [body] = helpers.state.ancestors

  return `${body.firstname} ${body.lastname}`
}

module.exports = {
  transformToNumber,
  setUrlImage,
  mapToArray,
  mapToPercentage,
  samePassword,
  sanitizeHTML,
  generateFullname,
  regex,
  changeValue,
  isUsernamePassword
}
