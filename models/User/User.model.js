const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  fullname: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  active: { type: Boolean },
  hashedPassword: { type: String }
})

UserSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.hashedPassword
  }
})

module.exports = model('User', UserSchema)
