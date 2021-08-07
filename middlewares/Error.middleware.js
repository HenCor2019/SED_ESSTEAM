const HANDLER_ERRORS = {
  CastError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  ValidationError: (res, { message }) =>
    res.status(206).json({ success: false, message }),

  RepeatError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  SaveError: (res, { message }) =>
    res.status(503).json({ success: false, message }),

  UnExistError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  LoginError: (res, { message }) =>
    res.status(400).json({ success: false, message }),

  defaultError: (res, { name, message }) => {
    console.log({ name, message })
    return res
      .status(500)
      .json({ success: false, message: 'Something was wrong' })
  }
}

module.exports = (error, req, res, next) => {
  const handler = HANDLER_ERRORS[error.name] || HANDLER_ERRORS.defaultError
  handler(res, error)
}
