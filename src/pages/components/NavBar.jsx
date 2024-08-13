import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      setAuthState(true);
      setName(localStorage.getItem("name"));
    }
  }, []);

  const [authState, setAuthState] = useState(false);
  const [name, setName] = useState("");

  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-brand cursor-pointer" onClick={() => history.push("/")}>
          <img
            src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          Open Recipe
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div
                onClick={() => history.push("/")}
                className="nav-link px-3 cursor-pointer hover:text-primary transition-colors"
                aria-current="page"
              >
                Home
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link px-3 cursor-pointer hover:text-primary transition-colors"
                onClick={() => history.push("/recipes")}
              >
                Recipes
              </div>
            </li>
            {authState && (
              <li className="nav-item">
                <div
                  className="nav-link px-3 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => history.push("/content-editing")}
                >
                  Post Recipe
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex align-items-center">
          {!authState ? (
            <div className="btn-group" role="group" aria-label="Authentication">
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={() => history.push("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => history.push("/signup")}
              >
                SignUp
              </button>
            </div>
          ) : (
            <>
              <div
                className="nav-link text-light me-3 cursor-pointer hover:text-primary transition-colors"
                onClick={() => history.push("/profile")}
              >
                Profile
              </div>
              <span className="text-light">{name}</span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}