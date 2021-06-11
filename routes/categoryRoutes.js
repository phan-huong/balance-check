"use strict";

const router = require("express").Router(),
      categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.index, categoriesController.indexView);
router.get("/new", categoriesController.new);
router.post("/create", categoriesController.create, categoriesController.redirectView);
router.get("/:id", categoriesController.show, categoriesController.showView);
router.get("/:id/edit", categoriesController.edit);
router.put("/:id/update", categoriesController.update, categoriesController.redirectView);
router.delete("/:id/delete", categoriesController.delete, categoriesController.redirectView);

module.exports = router;
