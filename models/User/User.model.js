const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  fullname: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  active: { type: Boolean },
  hashedPassword: { type: String },
  role: { type: String, default: process.env.USER_ROLE }
})

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.hashedPassword
  }
})

module.exports = model('User', UserSchema)
