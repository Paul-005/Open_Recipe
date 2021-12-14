import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

import bannerImg from "../../assets/cooking.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { React_Backend } from "../backend_url";

export default function ContentEditingPage() {
  const [recipeName, setRecipeName] = useState("");
  const [Incredients, setIncredients] = useState("");
  const [RecipeContent, setRecipeContent] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    verifyUser();
  }, []);

  function verifyUser() {
    if (!localStorage.getItem("jwt")) {
      history.push("/login");
    }
  }

  const history = useHistory();

  const publishContent = () => {
    if (
      recipeName.length === 0 ||
      Incredients.length === 0 ||
      RecipeContent.length === 0
    ) {
      setError("No Content To Publish");
    } else if (
      localStorage.getItem("name") == null ||
      localStorage.getItem("username") == null
    ) {
      setError("Please RE Login To Retrieve Your Name And Email");
    } else {
      setError("");

      axios({
        method: "post",
        headers: {
          token: localStorage.getItem("jwt")
        },
        url: `${React_Backend}/content-edit`,
        data: {
          recipeName,
          Incredients,
          RecipeContent
        }
      })
        .then(() => history.push("/"))
        .catch((e) => setError(e.message));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src={bannerImg}
              alt=""
              width="100"
              height="100"
            />
            <h2>Open Recipe</h2>
            <p className="lead">Write Your Recipe Here</p>
          </div>

          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label">Recipe Name</label>
              <input
                onChange={(e) => setRecipeName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Food Item"
                value={recipeName}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="text" className="form-label">
              Incredients
            </label>

            <div className="d-sm-flex">
              <textarea
                onChange={(e) => setIncredients(e.target.value)}
                className="form-control"
                row="6"
                placeholder="Cheese, Egg etc"
              />

              {/* <input
                type="time"
                className="form-control mx-3"
                style={{ width: "30%" }}
              /> */}
            </div>
          </div>

          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Enter Your Recipe
            </label>
            <textarea
              onChange={(e) => setRecipeContent(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="20"
              placeholder="Recipe Here"
            />
          </div>
          <button
            className="  btn btn-primary m-4 "
            type="submit"
            onClick={publishContent}
            whileHover={{ opacity: 0.5, scale: 1.2 }}
          >
            Publish
          </button>
        </main>
      </div>{" "}
      <Footer />
    </>
  );
}