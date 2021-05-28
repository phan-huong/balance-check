process.env.NODE_ENV = 'test'

const request = require('supertest'),
      mongoose = require('mongoose'),
      db = mongoose.connection,
      User = require('../models/user'),
      Category = require('../models/category');

module.exports = {
  app: require('../app'),
  User: User,
  Category: Category,
  request: request
}

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

afterAll(async () => {
  await db.close()
})

beforeEach(function (done) {
  User.deleteMany({})
    .then(() => {
      done()
    })
    .catch(error => {
      console.log('error caught: ' + error.message)
      done(error.message)
    })
  Category.deleteMany({})
    .then(() => {
      done()
    })
    .catch(error => {
      console.log('error caught: ' + error.message)
      done(error.message)
    })
})
