import axios from "axios";
import { useState } from "react";

import "../../styles/auth/Login.css";
import "../../styles/auth/Login.css";

import { useHistory } from "react-router-dom";
import { React_Backend } from "../backend_url";

export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  // const [authState, setauthState] = useState(false);

  const history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${React_Backend}/LoginAccount`, {
        email,
        password
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.err) {
          setLoading(false);
          seterror(response.data.err);
        }
        if (response.data.token !== undefined) {
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("username", response.data.user.email);
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href = "/";
          seterror("");
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        seterror(error.toString());
      });
  };

  return (
    <div className="text-center">
      <h1 className="title ">Open Recipe</h1>
      <main className="form-signin ">
        <form>
          <img
            className="mb-4"
            src="https://i.ibb.co/8PsvNSN/download.png"
            alt=""
            width="85"
            height="85"
          />
          <h1 className="h2 mb-3 fw-bold">Sign In</h1>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {loading && (
            <div className="spinner-border text-primary m-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={(e) => submitForm(e)}
          >
            Sign in
          </button>
          <p
            onClick={() => history.push("/signup")}
            className="mt-5 mb-3 text-muted"
          >
            Don't Have An Account? Sign Up
          </p>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>
    </div>
  );
}
