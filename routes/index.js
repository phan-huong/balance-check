"use strict";

const router = require("express").Router(),
      userRoutes = require("./userRoutes"),
      balanceRoutes = require("./balanceRoutes"),
      categoryRoutes = require("./categoryRoutes"),
      errorRoutes = require("./errorRoutes"),
      homeRoutes = require("./homeRoutes"),
      apiRoutes = require("./apiRoutes");

router.use("/users", userRoutes);
router.use("/balances", balanceRoutes);
router.use("/categories", categoryRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);
router.use("/api", apiRoutes);

module.exports = router;
