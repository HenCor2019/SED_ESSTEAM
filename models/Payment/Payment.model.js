const { Schema, model } = require('mongoose')

const paymentSchema = new Schema({
  users: [{ type: Schema.ObjectId, ref: 'User', required: true }],
  game: { type: Schema.ObjectId, ref: 'Game' },
  netAmount: { type: Object, required: true },
  date: { type: Date, default: new Date() },
  sells: { type: Number, default: 1 }
})

paymentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.users
    delete returnedObject.game.thumbnail
    delete returnedObject.game.genders
    delete returnedObject.game.platforms
  }
})

module.exports = model('Payment', paymentSchema)
