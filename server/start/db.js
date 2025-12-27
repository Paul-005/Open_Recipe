const mongoose = require("mongoose");

const mongodb_url = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);

const connect_db = () => {
  mongoose
    .connect(mongodb_url)
    .then(() => console.log("DB connected successfully...."))
    .catch((err) => {
      console.log("Mongodb connection error: ", err);
      process.exit(1);
    });
};

module.exports = connect_db;
