const {
  register,
  registerHandler,
  login,
  requestPassword,
  requestPasswordHandler,
  updateUser,
  deleteUser,
  deleteAll,
  updateFavoriteGames
} = require('../../controllers/User/User.controller')

const { middleware } = require('../../middlewares/middleware')
const userValidator = require('../../validators/User/User.validator')

const router = require('express').Router()

router.post( '/signin', middleware.rateLimiterMiddleware, userValidator.validatePreRegister, register)

router.post( '/login', middleware.rateLimiterMiddleware, userValidator.validateLogin, login)

router.post(
  '/request-password',
  middleware.rateLimiterMiddleware,
  userValidator.validateRequestPassword,
  requestPassword
)

router.put(
  '/reset-password',
  middleware.rateLimiterMiddleware,
  middleware.resetPassword,
  userValidator.validateResetPassword,
  requestPasswordHandler
)

router.put(
  '/register',
  middleware.register,
  userValidator.validateRegister,
  registerHandler
)

router.put('/', middleware.authUser, userValidator.validateUpdate, updateUser)

router.put(
  '/games/:id',
  middleware.authUser,
  userValidator.validateId,
  updateFavoriteGames
)

router.delete(
  '/:id',
  middleware.authUser,
  middleware.isAdmin,
  userValidator.validateId,
  deleteUser
)
router.delete('/', middleware.authUser, middleware.isAdmin, deleteAll)

module.exports = router
