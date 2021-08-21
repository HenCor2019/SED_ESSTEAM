const router = require('express').Router()

const { insertNewGame } = require('../../controllers/Games/Game.controller')
const { middleware } = require('../../middlewares/middleware')

router.post('/', middleware.authUser, middleware.isAdmin, insertNewGame)

module.exports = router
