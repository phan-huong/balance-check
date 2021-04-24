"use strict";

exports.homePage = (req, res) => {
  res.render("index");
}

exports.showSignUp = (req, res) => {
  res.render("contact");
}

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
}
