const express = require("express");
const verifyUser = require("../middlewares/jwtVerifier");
const recipeControllers = require("../controllers/recipeControllers");

const recipesRoute = express.Router();

// Base route for recipes
recipesRoute.get("/", recipeControllers.fetchAllRecipes);
recipesRoute.get("/get-users-recipe", verifyUser, recipeControllers.fetchUserRecipes);
recipesRoute.post("/new", verifyUser, recipeControllers.addNewRecipe);
recipesRoute.put("/edit/:id", verifyUser, recipeControllers.editRecipe);
recipesRoute.post("/comment/:id", verifyUser, recipeControllers.addComment);
recipesRoute.delete("/comment/:id", verifyUser, recipeControllers.deleteComment);
recipesRoute.get("/:id", verifyUser, recipeControllers.fetchRecipeById);
recipesRoute.delete("/:id", verifyUser, recipeControllers.deleteRecipe);

module.exports = recipesRoute;
