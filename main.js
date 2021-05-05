"use strict";

const port = 3000,
      express = require("express"),
      mongoose = require("mongoose"),
      db = mongoose.connection, //only for visiual purposes (line 17)
      app = express(),
      layouts = require("express-ejs-layouts"),
      homeController = require("./controllers/homeController"),
      errorController = require("./controllers/errorController"),
      subscribersController = require("./controllers/subscribersController");

mongoose.Promise = global.Promise;

//Set up database connection
mongoose.connect("mongodb://localhost:27017/balance_check", {useNewUrlParser: true});

//tell me in the console if database is connected
db.once("open", () => {
 console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);

// set the application to use ejs
app.set("view engine", "ejs");

// set the application to use the layout module
app.use(layouts);

// serving of static files
app.use(express.static("public"));

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
