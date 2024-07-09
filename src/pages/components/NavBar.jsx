import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      setauthState(true);
      setname(localStorage.getItem("name"));
    }
  }, []);

  const [authState, setauthState] = useState(false);
  const [name, setname] = useState("");

  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark text-center bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand" onClick={() => history.push("/")}>
          <img
            src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top mx-2"
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div
                onClick={() => history.push("/")}
                className="nav-link"
                aria-current="page"
              >
                Home
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link  "
                onClick={() => history.push("/recipes")}
              >
                Recipes
              </div>
            </li>

            {!authState && (
              <>
                <li className="nav-item">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      className="btn btn-light "
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
                </li>
              </>
            )}
            {authState && (
              <>
                <li className="nav-item">
                  <div
                    className="nav-link  "
                    onClick={() => history.push("/content-editing")}
                  >
                    Post Recipe
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link  "
                    onClick={() => history.push("/profile")}
                  >
                    Profile
                  </div>
                </li>
                <div className="d-flex">
                  <span className="navbar-text navbar-brand container-fluid">
                    {name}
                  </span>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
