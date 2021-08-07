const { register } = require('../../controllers/User/User.controller')

const router = require('express').Router()

router.post('/signin', register)

module.exports = router
