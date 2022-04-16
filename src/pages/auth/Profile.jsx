import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { React_Backend } from "../backend_url";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [usersRecipe, setusersRecipe] = useState([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");

  const history = useHistory();

  const getUserInfo = () => {
    const json = localStorage.getItem("user");
    const parsedData = JSON.parse(json);
    setUser(parsedData);
  };

  const getUsersRecipe = async () => {
    setPending(true);

    try {
      const recipes = await axios.get(`${React_Backend}/get-users-recipe`, {
        headers: { token: localStorage.getItem("jwt") }
      });
      setusersRecipe(recipes.data);
      setPending(false);
    } catch (error) {
      setError(error.message);
      setPending(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  function verifyUser() {
    if (!localStorage.getItem("jwt")) history.push("/login");
  }

  useEffect(() => {
    verifyUser();
    getUserInfo();
    getUsersRecipe();
  }, []);

  const deleteRecipe = (id) => {
    setPending(true);
    console.log(`${React_Backend}/recipes/${id}/delete`);

    axios
      .get(`${React_Backend}/recipes/${id}/delete`, {
        headers: {
          token: localStorage.getItem("jwt")
        }
      })
      .then(() => {
        setPending(false);
        getUsersRecipe();
      })
      .catch((err) => {
        setError(err.message);
        setPending(false);
      });
  };

  return (
    <>
      {/* Users Profile Section  */}

      <section class="container  d-flex justify-content-center">
        <div class=" image d-flex flex-column justify-content-center align-items-center">
          <span class="name mt-3 h1">
            <i class="bi bi-person-circle mx-2"></i>
            {user.name}
          </span>
          <buttton className="btn btn-warning fw-bold" onClick={signOut}>
            Sign Out
          </buttton>
          <span class=" lead">{user.email}</span>

          <button
            onClick={() => history.push("/pro-payment")}
            className="btn btn-dark fw-bold m-4"
          >
            Upgrade To Pro
          </button>
          {error !== "" && (
            <div class="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
        </div>
      </section>
      <section className="container">
        <span className="h2 text-primary text-center fw-bold m-5">
          Your Recipes
        </span>
        {pending && (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        <div>
          {usersRecipe.map((data) => (
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div
                  onClick={() => history.push(`/recipes/${data._id}`)}
                  class="ms-2 me-auto"
                >
                  <div class="fw-bold">{data.recipeName}</div>
                </div>
                <span
                  onClick={() => deleteRecipe(data._id)}
                  class="badge bg-danger rounded-pill"
                >
                  <i
                    onClick={() => deleteRecipe(data._id)}
                    class="bi bi-trash-fill"
                  ></i>
                </span>
              </li>
            </ul>
          ))}
        </div>
      </section>
    </>
  );
}
