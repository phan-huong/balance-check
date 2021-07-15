"use strict";

const { User, request } = require('../commonJest.js')

const testUserData = {
  name: {
    first: "Martin Christian",
    last: "Solihin"
  },
  email: "martin@solihin.com",
  password: "12345",
  zipCode: "10367"
}
describe('usersController', function () {
  describe('CREATE user', function () {
    it('should create new user', function (done) {
      let userParams = new User(testUserData);
      User.create(userParams)
            .then(user => {
              expect(user.first).not.toBe("");
              expect(user.last).not.toBe("");
              expect(user.email).not.toBe("");
              expect(user.password).not.toBe("");
              expect(user.zipCode > 0).toBeTruthy();
              done();
            })
            .catch(error => {
              console.log(`Error saving user: ${error.message}`);
              done(error)
            });
    })
  })
})
