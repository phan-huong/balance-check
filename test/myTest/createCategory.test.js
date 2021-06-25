"use strict";

const { Category, request } = require('../commonJest.js')

const testCategoryData = {
  category: "Einkaufen",
  nominal: 150,
  description: "REWE"
}
describe('categoriesController', function () {
  describe('CREATE category', function () {
    it('should create new category', function (done) {
      let categoryParams = new Category(testCategoryData);
      Category.create(categoryParams)
            .then(category => {
              expect(category.category).not.toBe("");
              expect(category.nominal).not.toBeLessThan(0);
              expect(category.description).not.toBe("");
              done();
            })
            .catch(error => {
              console.log(`Error saving user: ${error.message}`);
              done(error)
            });
    })
  })
})
