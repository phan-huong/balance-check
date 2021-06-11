"use strict";

const router = require("express").Router(),
      balancesController = require("../controllers/balancesController");

router.get("/", balancesController.index, balancesController.indexView);
router.get("/new", balancesController.new);
router.post("/create", balancesController.create, balancesController.redirectView);
router.get("/:id/edit", balancesController.edit);
router.put("/:id/update", balancesController.update, balancesController.redirectView);
router.delete("/:id/delete", balancesController.delete, balancesController.redirectView);

module.exports = router;
