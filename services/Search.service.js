const searchRepository = require('../repository/Search.repository')
const ServiceResponse = require('../classes/ServiceResponse')

const searchServices = {
  findByFilters: async (filters) => {
    const games = await searchRepository.findByFilters(filters)
    return new ServiceResponse(true, games)
  }
}

module.exports = searchServices
