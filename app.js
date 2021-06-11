"use strict";

const port = process.env.PORT || ((process.env.NODE_ENV === 'test') ? 30010 : 3000),
      User = require("./models/user"),
      express = require("express"),
      app = express(),
      layouts = require("express-ejs-layouts"),
      methodOverride = require("method-override"),
      expressSession = require("express-session"),
      cookieParser = require("cookie-parser"),
      connectFlash = require("connect-flash"),
      expressValidator = require("express-validator"),
      passport = require("passport"),
      router = require("./routes/index");

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

// requiring flash messaging
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
  secret: "secret_passcode",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));

// adding flash messaging
app.use(connectFlash());

// requiring and initializing passport
app.use(passport.initialize());
app.use(passport.session());

// setting up passport serializing
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Tell Express.js app to use body-parser for processing URL- encoded and JSON parameters
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// use express validator
app.use(expressValidator());

// custom middleware
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  // adding local variables
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

//Routes
app.use("/", router);

// simple security
app.set("token", process.env.TOKEN);
app.get("token");

module.exports = app
