module.exports = HANDLER_ERRORS = {
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

  UnauthorizedError: (res, { message }) =>
    res.status(401).json({ success: false, message }).end(),

  JsonWebTokenError: (res, { message }) =>
    res.status(409).json({ success: false, message }).end(),

  TokenExpiredError: (res, { message }) =>
    res.status(409).json({ success: false, message: 'Invalid token' }).end(),

  LoginError: (res, { message }) =>
    res.status(400).json({ success: false, message }).end(),

  defaultError: (res, { name, message }) => {
    console.log({ name, message })
    return res
      .status(500)
      .json({ success: false, message: 'Something was wrong' })
      .end()
  }
}
