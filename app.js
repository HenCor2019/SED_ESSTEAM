require('dotenv').config()
require('express-async-errors')

const http = require('http')
const path = require('path')
const cors = require('cors')
const express = require('express')
const database = require('./config/database')
const userRouter = require('./routes/User/User.router')
const gameRouter = require('./routes/Games/Game.router')
const { middleware } = require('./middlewares/middleware')
const searchRouter = require('./routes/Search/Search.router')
const paymentRouter = require('./routes/Payment/Payment.router')
const app = express()
const port = process.env.PORT || 5000

database.connect()

app.set('port', port)
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
server.listen(port)

server.on('error', (error) => {
  console.error(error)
})

server.on('listening', () => {
  console.log(`Listening on port ${port}`)
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/game', gameRouter)
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/payment', paymentRouter)

app.use(middleware.errorHandling)
app.use(middleware.unknownEndpoint)
module.exports = { app, server }
