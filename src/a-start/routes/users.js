const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller.js");

// POST /users/register
router.post("/register", userController.postRegisterUserHandler);

// POST /users/login
router.post("/login", userController.postLoginUserHandler);

module.exports = router;
