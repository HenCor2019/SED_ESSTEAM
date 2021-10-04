const router = require('express').Router()
const { allGames } = require('../../controllers/Home/Home.controller')

router.get('/', allGames)
module.exports = router
