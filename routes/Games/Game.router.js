const router = require('express').Router()
const { upload } = require('../../config/multer')

const {
  insertNewGame,
  updateGame,
  deleteGame,
  allGames
} = require('../../controllers/Games/Game.controller')

const { middleware } = require('../../middlewares/middleware')

router.use('/', middleware.authUser)
router.use('/', middleware.isAdmin)

router.get('/', allGames)
router.post('/', upload.single('image'), insertNewGame)
router.put('/:id', updateGame)
router.delete('/:id', deleteGame)

module.exports = router
