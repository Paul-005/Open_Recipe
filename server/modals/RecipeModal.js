const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const RecipeModal = Mongoose.model("Recipes", {
  recipeName: {
    type: String,
    required: true,
  },
  Incredients: {
    type: String,
    required: true,
  },
  RecipeContent: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId, ref: 'Users', required: true,
  },
});

module.exports = RecipeModal;
