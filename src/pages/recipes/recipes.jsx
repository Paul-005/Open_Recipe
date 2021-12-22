import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { React_Backend } from "../backend_url";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Recipecard from "../components/RecipesCard";

export default function Recipes() {
  const history = useHistory();

  const [RecipesData, setRecipesData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    axios
      .get(`${React_Backend}/recipes`)
      .then((res) => {
        setRecipesData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <main>
        <section class="py-5 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">Recipes</h1>
              <p class="lead text-muted">
                Recipe made by others for you and others.
              </p>
            </div>
          </div>
        </section>

        <div class="album py-5 bg-light">
          <div class="container">
            {error && <div className="alert alert-danger">{error}</div>}
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {loading && (
                <div class="d-flex align-items-center">
                  <div
                    class="spinner-border ms-auto "
                    style={{
                      height: "3rem",
                      width: "3rem",
                      borderWidth: "1cm"
                    }}
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              )}
              {RecipesData.length !== 0 &&
                RecipesData.map((data) => (
                  <Recipecard key={data._id} data={data} />
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
