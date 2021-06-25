"use strict";

const Balances = require("../models/balance"),
      getBalanceParams = (body) => {
        return {
          date: body.date,
          balance: parseInt(body.balance)
        };
      };

module.exports = {
  // index action
  index: (req, res, next) => {
    Balances.find()
      .then(balance => {
        res.locals.balances = balance;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("balances/index");
  },
  // new action
  new: (req, res) => {
    res.render("balances/new");
  },
  // create action
  create: (req, res, next) => {
    let balanceParams = getBalanceParams(req.body);
    Balances.create(balanceParams)
        .then(balance => {
          res.locals.redirect = "/balances";
          res.locals.balance = balance;
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
  // edit and update action
  edit: (req, res, next) => {
    let balanceId = req.params.id;
    Balances.findById(balanceId)
        .then(balance => {
          res.render("balances/edit", {
            balance: balance
          });
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
  },
  update: (req, res, next) => {
    let balanceId = req.params.id,
        balanceParams = getBalanceParams(req.body);
    Balances.findByIdAndUpdate(balanceId, {
          $set: balanceParams
        })
        .then(balance => {
          res.locals.redirect = `/balances`;
          res.locals.balance = balance;
          next();
        })
        .catch(error => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
  },
  // delete action
  delete: (req, res, next) => {
    let balanceId = req.params.id;
    Balances.findByIdAndRemove(balanceId)
        .then(() => {
          res.locals.redirect = "/balances";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next(error);
        });
  }
};
