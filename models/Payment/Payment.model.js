const { Schema, model } = require('mongoose')

const paymentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  game: { type: Schema.ObjectId, ref: 'Game' },
  netAmount: { type: Object, required: true },
  date: { type: Date, default: new Date() }
})

paymentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.user.active
    delete returnedObject.user.games
    delete returnedObject.user.favoriteGames
    delete returnedObject.game.thumbnail
    delete returnedObject.game.genders
    delete returnedObject.game.platforms
  }
})

module.exports = model('Payment', paymentSchema)
