"use strict";

var categories = [
  {
    category: "Fix Costs"
  },
  {
    category: "Groceries"
  },
  {
    category: "Shopping"
  },
  {
    category: "Outside Spendings"
  },
  {
    category: "Pets"
  },
  {
    category: "Custom"
  }
];

module.exports = {
  homePage: (req, res) => {
    res.render("index");
  },
  myAccount: (req, res) => {
    if (req.body.username === "") {
      res.send(`<h1>Empty Field</h1>`);
    } else {

      // check whether req.body.username.trim().toLowerCase() is availabe in collection

      res.render("myAccount", {
        username: req.body.username.trim().toLowerCase(),
        spendingCategory: categories
      });

      // else throws error

    }
  },
  chat: (req, res) => {
    res.render("chat");
  }
};
