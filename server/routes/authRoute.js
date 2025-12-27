const express = require("express");

const loginUser = require("../controllers/authentication/loginUser");
const regsiterUser = require("../controllers/authentication/registerUser");

const authRoute = express.Router();

authRoute.post("/signup", regsiterUser);
authRoute.post("/login", loginUser);

module.exports = authRoute;
