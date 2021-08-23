const searchValidator = require('../../validators/Search.validator')
const searchServices = require('../../services/Search.service')
const { getFilters } = require('./helper')

const searchController = {
  findByFilters: async (req, res) => {
    await searchValidator.validateFilters(req.query)
    const filters = getFilters(req.query)

    const { content: games } = await searchServices.findByFilters(filters)

    return res.status(200).json({ status: 200, count: games.length, games })
  }
}
module.exports = searchController
