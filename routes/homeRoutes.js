"use strict";

const router = require("express").Router(),
      homeController = require("../controllers/homeController");

router.get("/", homeController.homePage);
router.post("/myAccount", homeController.myAccount);

module.exports = router;
