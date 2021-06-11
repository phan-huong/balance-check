"use strict";

const router = require("express").Router(),
      usersController = require("../controllers/usersController"),
      categoriesController = require("../controllers/categoriesController");

router.get("/categories", categoriesController.index, categoriesController.respondJSON);
router.use(categoriesController.errorJSON);
// IT SHOULD BE ON TOP
router.use(usersController.verifyToken);

module.exports = router;
