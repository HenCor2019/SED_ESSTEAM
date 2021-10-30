const searchServices = require('../../services/Search.service')
const searchResponse = require('../../responses/Search.response')

const searchController = {
  findByFilters: async (req, res) => {
    const { validatedFilters: filters } = req

    const { content: games } = await searchServices.findByFilters(filters)

    return searchResponse.successfullySearch(res, games)
  }
}

module.exports = searchController
