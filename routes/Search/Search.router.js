const router = require('express').Router()
const { findByFilters } = require('../../controllers/Search/Search.controller')

router.get('/', findByFilters)

module.exports = router
