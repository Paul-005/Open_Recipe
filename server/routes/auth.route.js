const express = require("express");

const { loginUser, regsiterUser } = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/signup", regsiterUser);
authRoute.post("/login", loginUser);

module.exports = authRoute;
