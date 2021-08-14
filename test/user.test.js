const request = require('supertest')
const mongoose = require('mongoose')
const { userService } = require('../controllers/User/User.service')
const app = require('../app')

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

beforeAll(async () => {
  await userService.deleteAll()
  for (user of initialUsers) await userService.register(user)
})

test('Missing field return status code 206', async () => {
  const userTest = {
    fullname: 'foo',
    username: 'bar'
  }

  await api.post('/api/v1/signin').send(userTest).expect(206)
})

test('User is not added to the database with partial content', async () => {
  const userTest = {
    fullname: 'foo',
    username: 'bar'
  }

  await api.post('/api/v1/signin').send(userTest)
  const { content: users } = await userService.find()

  expect(users).toHaveLength(initialUsers.length)
})

test('User is added when all files are correctly', async () => {
  const userTest = {
    fullname: 'foo bar',
    username: 'foobar',
    password: '12345',
    email: 'userTest@gmail.com'
  }

  await api.post('/api/v1/signin').send(userTest)
  const { content: users } = await userService.find()

  expect(users).toHaveLength(initialUsers.length + 1)
})

test('Unauthorized login when user and password not match', async () => {
  const userTest = {
    field: '00095119@uca.edu.sv',
    password: '1234r5312kdlkfjdl'
  }

  await api.post('/api/v1/login').send(userTest).expect(400)
})

test('Returned a token with successfully login', async () => {
  const userTest = {
    field: '00095119@uca.edu.sv',
    password: '12345'
  }

  const response = await api.post('/api/v1/login').send(userTest)
  expect('token' in response.body).toBe(true)
})

test('Returned unauthorized status code with missing header on handler password', async () => {
  await api.put('/api/v1/reset-password').expect(401)
})

test('Returned unauthorized status code with invalid token on handler password', async () => {
  await api
    .put('/api/v1/reset-password')
    .set('reset', 'kfajflkafjlkaf')
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})
