const { filtersSchema } = require('./helper')

const searchValidator = {
  validateFilters: async (req, res, next) => {
    const { query } = req

    req.validatedFilters = await filtersSchema.validateAsync(query)
    next()
  }
}

module.exports = searchValidator
