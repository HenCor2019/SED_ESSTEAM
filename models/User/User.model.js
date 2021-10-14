const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, default: '' },
  active: { type: Boolean, default: true },
  dob: { type: String, default: '' },
  about: { type: String, default: '' },
  responses: { type: Schema.ObjectId, ref: 'Question', required: true },
  hashedPassword: { type: String, required: true },
  role: { type: String, default: process.env.USER_ROLE },
  favoriteGames: [{ type: Schema.ObjectId, ref: 'Game', default: [] }],
  games: [{ type: Schema.ObjectId, ref: 'Payment', default: [] }]
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.role

    delete returnedObject.hashedPassword
  }
})

module.exports = model('User', UserSchema)
