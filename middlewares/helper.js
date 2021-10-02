const HANDLER_ERRORS = {
  CastError: (res, { message }) =>
    res.status(400).json({ success: false, message: 'Id is malformed' }).end(),

  ValidationError: (res, { message }) =>
    res.status(206).json({ success: false, message }).end(),

  RepeatError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  SaveError: (res, { message }) =>
    res.status(503).json({ success: false, message }).end(),

  UnExistError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  InvalidImage: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  SyntaxError: (res, { message }) =>
    res.status(405).json({ success: false, message: 'Information malformed' }),

  MulterError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  UnauthorizedError: (res, { message }) =>
    res.status(401).json({ success: false, message }).end(),

  JsonWebTokenError: (res, { message }) =>
    res.status(401).json({ success: false, message }).end(),

  PaymentError: (res, { message }) =>
    res.status(401).json({ success: false, message }).end(),

  TokenExpiredError: (res, { message }) =>
    res.status(401).json({ success: false, message: 'Invalid token' }).end(),

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
  getPaymentInfo
}
