const {
  register,
  login,
  requestPassword,
  requestPasswordHandler,
  updateUser,
  deleteUser,
  deleteAll,
  updateFavoriteGames
} = require('../../controllers/User/User.controller')

const { middleware } = require('../../middlewares/middleware')

const router = require('express').Router()

router.post('/signin', register)
router.post('/login', login)
router.post('/request-password', requestPassword)

router.put('/reset-password', middleware.resetPassword, requestPasswordHandler)
router.put('/:id', middleware.authUser, updateUser)
router.put('/', middleware.authUser, updateFavoriteGames)

router.delete('/:id', middleware.authUser, middleware.isAdmin, deleteUser)
router.delete('/', middleware.authUser, middleware.isAdmin, deleteAll)

module.exports = router
