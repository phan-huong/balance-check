"use strict";

const Course = require("../models/course"),
      getCourseParams = (body) => {
        return {
          title: body.title,
          description: body.description,
          maxStudents: body.maxStudents,
          cost: body.cost
        };
      };

module.exports = {
  // index action
  index: (req, res, next) => {
    Course.find()
      .then(course => {
        res.locals.courses = course;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("courses/index");
  },
  // new action
  new: (req, res) => {
    res.render("courses/new");
  },
  // create action
  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
        .then(course => {
          res.locals.redirect = "/courses";
          res.locals.course = course;
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
    let courseId = req.params.id;
    Course.findById(courseId)
        .then(course => {
          res.locals.course = course;
          next();
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
  },
  showView: (req, res) => {
    res.render("courses/show");
  },
  // edit and update action
  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
        .then(course => {
          res.render("courses/edit", {
            course: course
          });
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
  },
  update: (req, res, next) => {
    let courseId = req.params.id,
        courseParams = getCourseParams(req.body);
    Course.findByIdAndUpdate(courseId, {
          $set: courseParams
        })
        .then(course => {
          res.locals.redirect = `/courses/${courseId}`;
          res.locals.course = course;
          next();
        })
        .catch(error => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
  },
  // delete action
  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
        .then(() => {
          res.locals.redirect = "/courses";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next(error);
        });
  }
};
