import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { React_Backend } from "../backend_url";
import Footer from "../components/Footer";

export default function OneRecipe() {
  const [recipeData, setrecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    verifyUser();
    getOneRecipe();
  }, []);

  const getOneRecipe = () => {
    axios
      .get(`${React_Backend}/recipes/${id}`)
      .then((res) => {
        setrecipeData(res.data);
        console.log(res.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  function verifyUser() {
    if (!localStorage.getItem("jwt")) history.push("/login");
  }

  return (
    <>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className=" align-items-center justify-content-center">
            {error.length !== 0 && (
              <div class="alert alert-danger" role="alert">
                Error: {error}
              </div>
            )}

            {loading && <div class="spinner-border" role="status" />}
            <div>
              {/* Recipe Header */}

              <section className="my-3">
                <h1 className="display-5 fw-bolder ">
                  {recipeData.recipeName}
                </h1>
                <div className="d-sm-flex ">
                  <p className="lead text-info mx-sm-3 ">{recipeData.email}</p>
                  <div className=" mt-sm-2 ">
                    <i
                      className="bi bi-hand-thumbs-up-fill mx-2 "
                      style={{
                        color: "yellow"
                      }}
                    />
                    2k likes
                  </div>
                </div>
              </section>

              {/* Incredeints */}
              <section className="my-4">
                <p className="lead">
                  <h1 className="fw-bold text-primary">Incredients</h1>
                  {recipeData.Incredients}
                </p>
              </section>

              {/* Recipe Method */}

              <section className="my-4">
                <h1 className="h1 fw-bold text-warning my-2">Recipe Method</h1>
                <p className="lead">{recipeData.RecipeContent}</p>
              </section>
              <button className="btn btn-warning bi-hand-thumbs-up-fill mx-2">
                Like
              </button>
            </div>
            <div class="form-floating m-sm-5 ">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="type the message"
              />
              <label for="floatingInput">Send a comment</label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
