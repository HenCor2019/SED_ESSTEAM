const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  questions: [{ type: String, required: true }]
})

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Question', questionSchema)
