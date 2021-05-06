"use strict";

const Subscriber = require("../models/subscriber");

// retrieve all subcribers
exports.getAllSubscribers = (req, res) => {
 Subscriber.find({})
  .exec()
  .then((subscribers) => {
    res.render("subscribers", {
      subscribers: subscribers
    });
  })
 .catch((error) => {
    console.log(error.message);
    return [];
 })
 .then(() => {
    console.log("promise complete");
 });
};

// render the signUp page
exports.getSubscriptionPage = (req, res) => {
  res.render("signUp");
};

// save subscribers
exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber( {
    name: req.body.name.trim().toLowerCase(),
    email: req.body.email,
    zipCode: req.body.zipCode
  });

  newSubscriber.save()
    .then( () => {
      res.render("thanks");
    })
    .catch(error => {
      res.send(error);
    });
};
