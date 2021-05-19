"use strict";

const { Course, request } = require('../commonJest.js')

const testCourseData = {
  title: "Test subject",
  description: "This is for test purpose only",
  maxStudents: 25,
  cost: 100
}
describe('coursesController', function () {
  describe('CREATE course', function () {
    it('should create new course', function (done) {
      let courseParams = new Course(testCourseData);
      Course.create(courseParams)
            .then(course => {
              expect(course.title).not.toBe("");
              expect(course.description).not.toBe("");
              expect(course.maxStudents > 0).toBeTruthy();
              expect(course.cost).not.toBeLessThan(0);
              done();
            })
            .catch(error => {
              console.log(`Error saving user: ${error.message}`);
              done(error)
            });
    })
  })
})
