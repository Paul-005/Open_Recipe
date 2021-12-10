import axios from "axios";
import { useState } from "react";

import "../../styles/auth/Login.css";
import Navbar from "../components/NavBar";
import "../../styles/auth/Login.css";
import Logo from "../../assets/cook-book.png";

import { useHistory } from "react-router-dom";

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
      .post("https://ir77r.sse.codesandbox.io/LoginAccount", {
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
          history.push("/");
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
      <Navbar />
      <h1 className="title ">Open Recipe</h1>
      <main className="form-signin ">
        <form>
          <img className="mb-4" src={Logo} alt="" width="85" height="85" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        </form>
      </main>
    </div>
  );
}
