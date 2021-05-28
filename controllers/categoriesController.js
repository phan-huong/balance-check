"use strict";

const Category = require("../models/category"),
      getCategoryParams = (body) => {
        return {
          category: body.category,
          nominal: parseInt(body.nominal),
          description: body.description
        };
      };

module.exports = {
  // index action
  index: (req, res, next) => {
    Category.find()
      .then(category => {
        res.locals.categories = category;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("categories/index");
  },
  // new action
  new: (req, res) => {
    res.render("categories/new");
  },
  // create action
  create: (req, res, next) => {
    let categoryParams = getCategoryParams(req.body);
    Category.create(categoryParams)
        .then(category => {
          res.locals.redirect = "/categories";
          res.locals.category = category;
          next();
        })
        .catch(error => {
          console.log(`Error saving user: ${error.message}`);
          next(error);
        });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if(redirectPath) res.redirect(redirectPath);
    else next();
  },
  // show action
  show: (req, res, next) => {
    let categoryId = req.params.id;
    Category.findById(categoryId)
        .then(category => {
          res.locals.category = category;
          next();
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
  },
  showView: (req, res) => {
    res.render("categories/show");
  },
  // edit and update action
  edit: (req, res, next) => {
    let categoryId = req.params.id;
    Category.findById(categoryId)
        .then(category => {
          res.render("categories/edit", {
            category: category
          });
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
  },
  update: (req, res, next) => {
    let categoryId = req.params.id,
        categoryParams = getCategoryParams(req.body);
    Category.findByIdAndUpdate(categoryId, {
          $set: categoryParams
        })
        .then(category => {
          res.locals.redirect = `/categories/${categoryId}`;
          res.locals.category = category;
          next();
        })
        .catch(error => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
  },
  // delete action
  delete: (req, res, next) => {
    let categoryId = req.params.id;
    Category.findByIdAndRemove(categoryId)
        .then(() => {
          res.locals.redirect = "/categories";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next(error);
        });
  }
};
