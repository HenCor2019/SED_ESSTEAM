const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const ErrorResponse = require('../classes/ErrorResponse')

const isAnImage = (image) => {
  const PATTERN = /\.(png|jpe?g)$/
  return image.match(PATTERN)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/resources/images')
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})

const fileFilter = function (req, file, cb) {
  if (!isAnImage(file.originalname))
    return cb(new ErrorResponse('InvalidImage', 'Upload an image'))

  return cb(undefined, true)
}

const upload = multer({ storage, fileFilter })
module.exports = { upload }
