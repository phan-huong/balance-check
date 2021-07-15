"use strict";

const port = 3000,
      // express
      express = require("express"),
      app = express(),
      // express-ejs-layouts
      layouts = require("express-ejs-layouts"),
      // mongoose
      mongoose = require("mongoose"),
      db = mongoose.connection,
      // controllers
      homeController = require("./controllers/homeController"),
      errorController = require("./controllers/errorController"),
      subscribersController = require("./controllers/subscribersController");

app.set("port", process.env.PORT || 3000);

// set the application to use ejs
app.set("view engine", "ejs");

// set the application to use the layout module
app.use(layouts);

// serving of static files
app.use(express.static("public"));

// to support promise chains
mongoose.Promise = global.Promise;

// configuring mongoose with Node.js to set up database connection
mongoose.connect(
  "mongodb://localhost:27017/balance_check",
  {useNewUrlParser: true}
);

// log a message when the database is connected in main.js
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// Tell Express.js app to use body-parser for processing URL- encoded and JSON parameters
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.get("/", homeController.homePage);
app.get("/signUp", subscribersController.getSubscriptionPage);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/", homeController.homePage);
app.post("/signUp", homeController.signUp);
app.post("/thanks", homeController.succeed);
app.post("/myAccount", homeController.myAccount);
app.post("/subscribe", subscribersController.saveSubscriber);

// Add error handlers as middleware functions
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
