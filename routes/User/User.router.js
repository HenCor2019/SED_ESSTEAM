const {
  register,
  login,
  requestPassword,
  requestPasswordHandler
} = require('../../controllers/User/User.controller')

const { Auth } = require('../../middlewares/Auth.middleware')

const router = require('express').Router()

router.post('/signin', register)
router.post('/login', login)
router.post('/request-password', requestPassword)
router.post('/reset-password', Auth.resetPassword, requestPasswordHandler)

module.exports = router
