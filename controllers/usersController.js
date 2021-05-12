"use strict";

const User = require("../models/user");

module.exports = {
  // index action
  index: (req, res, next) => {
    User.find()
      .then(user => {
        res.locals.users = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  // new action
  new: (req, res) => {
    res.render("users/new");
  },
  // create action
  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    User.create(userParams)
        .then(user => {
          res.locals.redirect = "/users";
          res.locals.user = user;
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
    let userId = req.params.id;
    User.findById(userId)
        .then(user => {
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  // edit and update action
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
        .then(user => {
          res.render("users/edit", {
            user: user
          });
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
  },
  update: (req, res, next) => {
    let userId = req.params.id,
        userParams = {
          name: {
            first: req.body.first,
            last: req.body.last
          },
          email: req.body.email,
          password: req.body.password,
          zipCode: req.body.zipCode
        };
    User.findByIdAndUpdate(userId, {
          $set: userParams
        })
        .then(user => {
          res.locals.redirect = `/users/${userId}`;
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
  },
  // delete action
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
        .then(() => {
          res.locals.redirect = "/users";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next(error);
        });
  }
};
