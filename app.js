"use strict";

const port = 3000,
      express = require("express"),
      app = express(),
      layouts = require("express-ejs-layouts"),
      methodOverride = require("method-override"),
      router = express.Router(),
      // controllers
      homeController = require("./controllers/homeController"),
      errorController = require("./controllers/errorController"),
      subscribersController = require("./controllers/subscribersController"),
      usersController = require("./controllers/usersController"),
      coursesController = require("./controllers/coursesController");

app.set("port", process.env.PORT || ((process.env.NODE_ENV === 'test') ? 3001 : 3000));

// set the application to use ejs
app.set("view engine", "ejs");

// set the application to use the layout module
app.use(layouts);

// serving of static files
app.use(express.static("public"));

// configure the application router to use methodOverride as middleware
app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

// Tell Express.js app to use body-parser for processing URL- encoded and JSON parameters
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use("/", router);

router.get("/", homeController.homePage);
router.post("/myAccount", homeController.myAccount);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// Add error handlers as middleware functions
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = app
