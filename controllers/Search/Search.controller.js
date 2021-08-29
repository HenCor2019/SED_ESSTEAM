const { getFilters } = require('./helper')
const searchServices = require('../../services/Search.service')
const searchResponse = require('../../responses/Search.response')
const searchValidator = require('../../validators/Search.validator')

const searchController = {
  findByFilters: async (req, res) => {
    const filters = await searchValidator.validateFilters(req.query)
    // const filters = getFilters(req.query)

    const { content: games } = await searchServices.findByFilters(filters)

    // return res.status(200).json({ filters })
    return searchResponse.successfullySearch(res, games)
  }
}

module.exports = searchController
