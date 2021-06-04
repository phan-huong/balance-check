"use strict";

const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 30010 : 3000),
      express = require("express"),
      app = express(),
      layouts = require("express-ejs-layouts"),
      methodOverride = require("method-override"),
      router = express.Router(),
      expressSession = require("express-session"),
      cookieParser = require("cookie-parser"),
      connectFlash = require("connect-flash"),

      // controllers
      homeController = require("./controllers/homeController"),
      errorController = require("./controllers/errorController"),
      usersController = require("./controllers/usersController"),
      balancesController = require("./controllers/balancesController"),
      categoriesController = require("./controllers/categoriesController");

app.set("port", port);

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

// using router
app.use("/", router);

//flash message usage
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
router.use(connectFlash());
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//Routes
router.get("/", homeController.homePage);
router.post("/myAccount", homeController.myAccount);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/balances", balancesController.index, balancesController.indexView);
router.get("/balances/new", balancesController.new);
router.post("/balances/create", balancesController.create, balancesController.redirectView);
router.get("/balances/:id/edit", balancesController.edit);
router.put("/balances/:id/update", balancesController.update, balancesController.redirectView);
router.delete("/balances/:id/delete", balancesController.delete, balancesController.redirectView);

router.get("/categories", categoriesController.index, categoriesController.indexView);
router.get("/categories/new", categoriesController.new);
router.post("/categories/create", categoriesController.create, categoriesController.redirectView);
router.get("/categories/:id", categoriesController.show, categoriesController.showView);
router.get("/categories/:id/edit", categoriesController.edit);
router.put("/categories/:id/update", categoriesController.update, categoriesController.redirectView);
router.delete("/categories/:id/delete", categoriesController.delete, categoriesController.redirectView);

// Add error handlers as middleware functions
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = app
