const express = require("express");

const { loginUser, registerUser } = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/signup", registerUser);
authRoute.post("/login", loginUser);

module.exports = authRoute;
