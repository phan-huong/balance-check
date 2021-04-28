"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      layouts = require("express-ejs-layouts"),
      homeController = require("./controllers/homeController"),
      errorController = require("./controllers/errorController");

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
app.post("/", homeController.homePage);
app.post("/signUp", homeController.signUp);
app.post("/thanks", homeController.succeed);
app.post("/myAccount", homeController.myAccount);

// Add error handlers as middleware functions
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
