const { register, login } = require('../../controllers/User/User.controller')

const router = require('express').Router()

router.post('/signin', register)
router.post('/login', login)

module.exports = router
