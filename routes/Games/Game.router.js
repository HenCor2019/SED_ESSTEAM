const router = require('express').Router()
const { upload } = require('../../config/multer')
const { middleware } = require('../../middlewares/middleware')
const {
  insertNewGame,
  updateGame,
  deleteGame,
  allGames
} = require('../../controllers/Games/Game.controller')

router.use('/', middleware.authUser)
router.get('/', allGames)

router.use('/', middleware.isAdmin)
router.post('/', upload.single('image'), insertNewGame)
router.put('/:id', updateGame)
router.delete('/:id', deleteGame)

module.exports = router
