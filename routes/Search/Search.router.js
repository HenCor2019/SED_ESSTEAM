const router = require('express').Router()
const { findByFilters } = require('../../controllers/Search/Search.controller')
const searchValidator = require('../../validators/Search/Search.validator')

router.get('/', searchValidator.validateFilters, findByFilters)

module.exports = router
