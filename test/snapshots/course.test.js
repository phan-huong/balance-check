const { app, request } = require('../commonJest')

it('renders courses page correctly', (done) => {
  request(app)
    .get('/courses')
    .then((response) => {
      expect(response.text).toMatchSnapshot()
      done()
    })
})
