import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { React_Backend } from "../backend_url";
import Footer from "../components/Footer";
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
      <main className="mb-5">
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Recipes</h1>
              <p className="lead text-muted">
                Recipe made by others for you and others.
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            {error && <div classNameName="alert alert-danger">{error}</div>}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {loading && (
                <div className="d-flex align-items-center">
                  <div
                    className="spinner-border ms-auto "
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

      <span style={{
        position: "fixed",
        bottom: 0,
      }}>
        <Footer />
      </span>
    </>
  );
}
