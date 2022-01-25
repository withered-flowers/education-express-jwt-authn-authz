const express = require("express");
const router = express.Router();

const userRoutes = require("./users.js");
const smartphoneRoutes = require("./smartphones.js");

router.use("/users", userRoutes);
router.use("/smartphones", smartphoneRoutes);

module.exports = router;
