import { BrowserRouter, Route, Routes } from "react-router-dom";

//file imports
import LoginPage from "./pages/auth/Login";
import Home from "./pages/home/HomePage";
import SignUp from "./pages/auth/SignUp";
import "./styles.css";
import ContentEditingPage from "./pages/home/ContentPage";
import Recipes from "./pages/recipes/recipes";
import OneRecipe from "./pages/recipes/OneRecipe";
import ProfilePage from "./pages/auth/Profile";
import Navbar from "./pages/components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/content-editing" element={<ContentEditingPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<OneRecipe />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
