const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

//file imports
const connect_db = require("./config/db");
const authRoute = require("./routes/auth.route");
const recipesRoute = require("./routes/recipe.route");
const app = express();
var port = process.env.PORT || 5000;

// Security middleware
app.use(helmet());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true
}));


app.use("/api", authRoute);
app.use("/api/recipes", recipesRoute);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Welcome to the Open Recipe API" });
});


// connect to mongodb
if (process.env.NODE_ENV !== "test") {
  connect_db();
  app.listen(port, () => console.log(`server listening on port http://localhost:${port}....`));
}

module.exports = app;
