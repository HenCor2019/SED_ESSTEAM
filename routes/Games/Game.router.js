const router = require('express').Router()
const { upload } = require('../../config/multer')
const { middleware } = require('../../middlewares/middleware')
const gameValidator = require('../../validators/Game/Game.validator')

const {
  insertNewGame,
  updateGame,
  deleteGame,
  allGames
} = require('../../controllers/Games/Game.controller')

router.use('/', middleware.authUser)
router.get('/', allGames)

router.use('/', middleware.isAdmin)
router.post(
  '/',
  upload.single('image'),
  gameValidator.validateNewGame,
  insertNewGame
)

router.put(
  '/:id',
  gameValidator.validateId,
  gameValidator.validateUpdate,
  updateGame
)
router.delete('/:id', gameValidator.validateId, deleteGame)

module.exports = router
