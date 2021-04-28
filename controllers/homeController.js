"use strict";

exports.homePage = (req, res) => {
  res.render("index");
}

exports.signUp = (req, res) => {
  res.render("signUp");
}

exports.succeed = (req, res) => {
  res.render("thanks");
}

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
exports.myAccount = (req, res) => {
  if (req.body.username === "") {
    res.send(`<h1>Empty Field</h1>`);
  } else {
    res.render("myAccount", {
      username: req.body.username.trim().toLowerCase(),
      spendingCategory: categories
    });
  }
}
