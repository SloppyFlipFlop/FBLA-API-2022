const express = require("express");
const { register, login } = require("../controllers/authController");
const authRouter = express.Router();

// route for /register
authRouter.route("/login").post(login);
authRouter.route("/register").post(register);

module.exports = authRouter;