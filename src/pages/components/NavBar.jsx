import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img
            src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
            alt="Logo"
            className="navbar-logo"
          />
          <span className="navbar-title">Open Recipe</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/recipes" className="nav-link">
            Recipes
          </Link>
          {user ? (
            <>
              <Link to="/new-recipe" className="nav-link">
                New Recipe
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}