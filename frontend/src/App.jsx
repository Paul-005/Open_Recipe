import { BrowserRouter, Route, Routes } from "react-router-dom";


import Navbar from "./components/layout/NavBar";
import AppRoutes from "./app/routes";

export default function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}
