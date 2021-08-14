const mongoose = require('mongoose')

const DB_URI = (NODE_ENV = 'test'
  ? process.env.MONGO_URI_TEST
  : process.env.MONGO_URI)

const connect = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('Database connected')
  } catch (error) {
    console.error({ error })
  }
}
module.exports = { connect }
