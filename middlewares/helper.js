const canRefreshToken = (expiredDate, current) => {
  const milliseconds = current - expiredDate
  const minutes = Math.floor(milliseconds / 1000 / 60)

  return minutes < 20
}

const HANDLER_ERRORS = {
  CastError: (res, { message }) =>
    res.status(400).json({ success: false, message: message }).end(),

  ValidationError: (res, { message }) =>
    res.status(206).json({ success: false, message }).end(),

  RepeatError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  SaveError: (res, { message }) =>
    res.status(503).json({ success: false, message }).end(),

  UnExistError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  ImageError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  SyntaxError: (res, { message }) =>
    res.status(405).json({ success: false, message: 'Information malformed' }),

  MulterError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  UnauthorizedError: (res, { message }) =>
    res.status(401).json({ success: false, message }).end(),

  JsonWebTokenError: (res, { message }) => {
    res.status(401).json({ success: false, message }).end()
  },

  PaymentError: (res, { message }) =>
    res.status(401).json({ success: false, message }).end(),

  AlreadyPayment: (res, { message }) =>
    res.status(303).json({ success: false, message, purchased: true }).end(),

  TokenExpiredError: (res, error) => {
    const canRefresh = canRefreshToken(Date.parse(error.expiredAt), Date.now())
    res
      .status(401)
      .json({
        success: false,
        message: error.message,
        canRefresh
      })
      .end()
  },

  LoginError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  AlreadyRegisterError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  defaultError: (res, { name, message }) => {
    console.log({ name, message })
    return res
      .status(500)
      .json({ success: false, message: 'Something was wrong' })
      .end()
  }
}

const ATTEMPTS = {
  login: { points: 5, duration: 100 }, // add more attempts login
  signin: { points: 10, duration: 75 },
  'reset-password': { points: 4, duration: 120 },
  'request-password': { points: 4, duration: 120 },
  default: { points: 5, durations: 100 }
}

function includeRole({ role }) {
  const { ADMIN_ROLE, USER_ROLE } = process.env
  const roles = [ADMIN_ROLE, USER_ROLE]

  return roles.includes(role)
}

function includeAdminRole({ role }) {
  const { ADMIN_ROLE } = process.env

  return ADMIN_ROLE === role
}

function startWithBearerSign(authorization) {
  const BEARER = 'bearer'

  return authorization.toLowerCase().startsWith(BEARER)
}

const getPaymentInfo = (content) => ({
  intent: content.information.intent,
  amount: content.information.amount,
  application_context: content.information.application_context
})

module.exports = {
  HANDLER_ERRORS,
  includeAdminRole,
  includeRole,
  startWithBearerSign,
  getPaymentInfo,
  ATTEMPTS
}
