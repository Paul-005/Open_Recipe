import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { React_Backend } from "../backend_url";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [usersRecipe, setusersRecipe] = useState([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false); // Initialize pending as boolean, not string

  const history = useHistory();

  const getUserInfo = () => {
    const json = localStorage.getItem("user");
    const parsedData = JSON.parse(json);
    setUser(parsedData);
  };

  const getUsersRecipe = async () => {
    setPending(true); // Set to true at the start of fetch

    try {
      const recipes = await axios.get(`${React_Backend}/get-users-recipe`, {
        headers: { token: localStorage.getItem("jwt") },
      });
      setusersRecipe(recipes.data.recipe);
      setPending(false); // Set to false on success
      console.log(recipes.data.recipe);
    } catch (error) {
      setError(error.message);
      setPending(false); // Set to false on error
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
  }, []); // Empty dependency array means it runs once on mount

  const deleteRecipe = (id) => {
    setPending(true); // Indicate pending state for delete operation
    console.log(`Attempting to delete recipe with ID: ${id}`); // Log the ID being deleted

    axios
      .delete(`${React_Backend}/recipes/${id}/`, {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        setPending(false);
        // After successful deletion, refresh the list of recipes
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
      <section className="container m-sm-5 d-flex justify-content-center">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <span className="name mt-3 h1">
            <i className="bi bi-person-circle mx-2"></i>
          </span>
          <button className="btn btn-warning fw-bold" onClick={signOut}>
            Sign Out
          </button>
          <span className="lead">{user.email}</span>

          {error !== "" && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
        </div>
      </section>

      <section className="container d-md-flex justify-content-center">
        {pending && (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <div className="card w-75 w-sm-25 shadow m-4">
          <div className="card-header">
            <span className="text-center fw-bold m-5">Your Recipes</span>
          </div>
          {usersRecipe.length === 0 && !pending && ( // Display message if no recipes and not loading
            <p className="p-3 text-center text-muted">No recipes found.</p>
          )}

          {usersRecipe.length > 0 &&
            usersRecipe.map((data) => (
              <div key={data.recipe_id}> {/* Add a unique key for list items */}
                {/* MODAL DEFINITION - Needs a unique ID */}
                <div
                  className="modal fade"
                  id={`deleteRecipeModal-${data.recipe_id}`}
                  tabIndex="-1"
                  aria-labelledby={`deleteRecipeModalLabel-${data.recipe_id}`} // Unique label for accessibility
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title text-danger"
                          id={`deleteRecipeModalLabel-${data.recipe_id}`}
                        >
                          Delete Recipe
                        </h5>
                        <button
                          type="button"
                          className="btn-close" // Correct Bootstrap class for close button
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body text-danger">
                        <p className="title">{data.recipe}</p>
                        Are you sure you want to delete this recipe?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal" // Close modal on delete click
                          onClick={() => deleteRecipe(data.recipe_id)} // Correct ID passed here
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RECIPE LIST ITEM */}
                <ul className="list-group list-group-flush p-3">
                  <li className="d-flex justify-content-center align-items-start">
                    <div
                      onClick={() => history.push(`/recipe/${data._id}`)}
                      className="ms-2 me-auto"
                      style={{ cursor: "pointer" }} // Add cursor for better UX
                    >
                      <div className="fw-bold">{data.recipe}</div>
                    </div>
                    <span
                      className="badge bg-danger rounded-pill"
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteRecipeModal-${data.recipe_id}`}
                      style={{ cursor: "pointer" }} // Add cursor for better UX
                    >
                      <i className="bi bi-trash-fill"></i>
                    </span>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}