const Mongoose = require("mongoose");

const UserModal = Mongoose.model("Users", {
  email: {
    type: String,
    index: { unique: true },
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
  }
});

module.exports = UserModal;
