const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  fullname: { type: String, unique: true },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  hashedPassword: { type: String, unique: true }
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
