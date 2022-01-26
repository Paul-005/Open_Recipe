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
import Navbar from "./pages/components/NavBar";
import ProPaymentUI from "./pages/payment/proPayment";
import PaymentSuccessPage from "./pages/payment/SuccessPage";
import PaymentCancelPage from "./pages/payment/CancelPayment";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/content-editing" component={ContentEditingPage} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe/:id" component={OneRecipe} />
        <Route path="/profile" component={ProfilePage} />

        {/* payment Page */}
        <Route exact path="/pro-payment" component={ProPaymentUI} />
        <Route path="/pro-payment/success" component={PaymentSuccessPage} />
        <Route path="/pro-payment/cancel" component={PaymentCancelPage} />
      </Switch>
    </BrowserRouter>
  );
}
