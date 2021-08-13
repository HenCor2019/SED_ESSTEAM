module.exports = HANDLER_ERRORS = {
  CastError: (res, { message }) =>
    res.status(400).json({ success: false, message: 'Id is malformed' }),

  ValidationError: (res, { message }) =>
    res.status(206).json({ success: false, message }),

  RepeatError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  SaveError: (res, { message }) =>
    res.status(503).json({ success: false, message }),

  UnExistError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  UnauthorizedError: (res, { message }) =>
    res.status(401).json({ success: false, message }),

  JsonWebTokenError: (res, { message }) =>
    res.status(409).json({ success: false, message }),

  TokenExpiredError: (res, { message }) =>
    res.status(409).json({ success: false, message: 'Invalid token' }),

  LoginError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  defaultError: (res, { name, message }) => {
    console.log({ name, message })
    return res
      .status(500)
      .json({ success: false, message: 'Something was wrong' })
  }
}
