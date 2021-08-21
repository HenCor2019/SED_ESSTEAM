const { Schema, model } = require('mongoose')

const gameSchema = new Schema({
  title: { type: String, unique: true },
  thumbnail: String,
  description: String,
  discount: Number,
  basePrice: Number,
  creator: String,
  platforms: [String],
  genders: [String]
})

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Game', gameSchema)
