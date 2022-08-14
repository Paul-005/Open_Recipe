import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { React_Backend } from "../backend_url";

export default function OneRecipe() {
  const [recipeData, setrecipeData] = useState({});
  const [comment, setcomment] = useState("");
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
      .get(`${React_Backend}/recipes/${id}`, {
        headers: {
          token: localStorage.getItem("jwt")
        }
      })
      .then((res) => {
        setrecipeData(res.data);
        console.log(res.data);
        setLoading(false);
        setError("");
        seperateIncredients(res.data);

      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const getOneRecipeComment = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .post(`${React_Backend}/recipes/${id}`, {
        comment,
        email: user.email
      })
      .then(() => {
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

  const seperateIncredients = (data) => {
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
                <h1 className="display-5 fw-bolder text-underline">
                  <u>{recipeData.recipeName}</u>
                </h1>
                <div className="d-sm-flex ">
                  <p className="lead text-info mx-sm-3 ">{recipeData.email}</p>
                </div>
              </section>

              {/* Incredeints */}
              <section className="my-4">
                <p className="lead">
                  <h1 className="fw-bold text-primary"><u>Incredients</u></h1>
                  {recipeData.Incredients}
                </p>
              </section>

              {/* Recipe Method */}

              <section className="my-4">
                <h1 className="h1 fw-bold text-warning my-2"><u>Recipe Method</u></h1>
                <p className="lead">{recipeData.RecipeContent}</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
