const router = require('express').Router()
const { upload } = require('../../utils/multer')

const { insertNewGame } = require('../../controllers/Games/Game.controller')
const { middleware } = require('../../middlewares/middleware')

router.post(
  '/',
  middleware.authUser,
  middleware.isAdmin,
  upload.single('image'),
  insertNewGame
)

module.exports = router
