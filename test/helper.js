const { app, server } = require('../app')
const request = require('supertest')

const api = request(app)

const initialUsers = [
  {
    fullname: 'Henry Alexander Cortez',
    username: 'HenCor',
    password: '12345',
    email: '00095119@uca.edu.sv'
  },

  {
    fullname: 'Henry Alexander Amaya',
    username: 'HenCor2019',
    password: '12345',
    email: 'henry200amaya@gmail.com'
  }
]

module.exports = { api, initialUsers, server }
