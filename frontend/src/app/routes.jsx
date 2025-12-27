import { Route, Routes } from "react-router-dom";

//file imports
import LoginPage from "../pages/Auth/Login";
import Home from "../pages/Home/HomePage";
import SignUp from "../pages/Auth/SignUp";
import "../styles.css";
import ContentEditingPage from "../pages/Recipes/CreateRecipePage";
import EditRecipePage from "../pages/Recipes/EditRecipePage";
import Recipes from "../pages/Recipes/RecipeListPage";
import OneRecipe from "../pages/Recipes/RecipeDetailsPage";
import ProfilePage from "../pages/Auth/Profile";

export default function AppRoutes() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/content-editing" element={<ContentEditingPage />} />
        <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<OneRecipe />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
  );
}
