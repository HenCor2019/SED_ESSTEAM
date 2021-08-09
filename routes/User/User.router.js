const {
  register,
  login,
  requestPassword,
  requestPasswordHandler,
  updateUser,
  deleteUser
} = require('../../controllers/User/User.controller')

const { Auth } = require('../../middlewares/Auth.middleware')

const router = require('express').Router()

router.post('/signin', register)
router.post('/login', login)
router.post('/request-password', requestPassword)

router.put('/reset-password', Auth.resetPassword, requestPasswordHandler)
router.put('/update', Auth.updateUser, updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router
