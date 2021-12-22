import { BrowserRouter, Route, Switch } from "react-router-dom";

//file imports
import LoginPage from "./pages/auth/Login";
import Home from "./pages/home/HomePage";
import SignUp from "./pages/auth/SignUp";
import "./styles.css";
import ContentEditingPage from "./pages/home/ContentPage";
import Recipes from "./pages/recipes/recipes";
import OneRecipe from "./pages/recipes/OneRecipe";
import ProfilePage from "./pages/auth/Profile";
import Footer from "./pages/components/Footer";
import Navbar from "./pages/components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/content-editing" component={ContentEditingPage} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe/:id" component={OneRecipe} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  );
}
