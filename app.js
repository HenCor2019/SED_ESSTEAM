require('dotenv').config()
require('express-async-errors')

const http = require('http')
const cors = require('cors')
const express = require('express')
const database = require('./utils/database')
const userRouter = require('./routes/User/User.router')
const { middleware } = require('./middlewares/middleware')
const handlerErrors = require('./middlewares/Error.middleware')

const app = express()
const port = process.env.PORT || 5000

database.connect()

app.set('port', port)
app.use(express.json())
app.use(cors())

const server = http.createServer(app)
server.listen(port)

server.on('error', (error) => {
  console.error(error)
})

server.on('listening', () => {
  console.log(`Listening on port ${port}`)
})

app.use('/api/v1', userRouter)
app.use(middleware.errorHandling)
app.use(middleware.unknownEndpoint)
