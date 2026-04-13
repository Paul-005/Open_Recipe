const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const RecipeModal = Mongoose.model("Recipes", {
  recipeName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  RecipeContent: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
    default: "",
  },
  cookingTime: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  embedding: {
    type: [Number], // array of floats
  },
  user_id: {
    type: Schema.Types.ObjectId, ref: 'Users', required: true,
  },
});

module.exports = RecipeModal;
