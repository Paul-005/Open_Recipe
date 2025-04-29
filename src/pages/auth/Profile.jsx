import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { React_Backend } from "../backend_url";
import man from "../../assets/man.png";

export default function ProfilePageT() {
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
        headers: { token: localStorage.getItem("jwt") },
      });
      setusersRecipe(recipes.data.recipe);
      setPending(false);
      console.log(recipes.data.recipe);
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

  const deleteRecipe = async (id) => {
    setPending(true);
    setError("");
    
    try {
      console.log("Deleting recipe with ID:", id);
      console.log("Full URL:", `${React_Backend}/recipes/${id}`);
      
      const response = await axios.delete(`${React_Backend}/recipes/${id}`, {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      });
      
      console.log("Delete response:", response.data);
      
      if (response.data.message) {
        // Success - refresh the recipe list
        await getUsersRecipe();
      }
    } catch (err) {
      console.error("Delete error:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.error || "Failed to delete recipe");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <div className="bg-light container py-5">
        <div
          className="card shadow-sm mx-auto d-flex"
          style={{ maxWidth: "800px" }}
        >
          <div className="card-body text-center">
            <img
              src={man}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
              alt="Profile Picture"
              className="profile-pic rounded-circle mb-4"
            />
            <h2 className="mb-0">{user.name}</h2>
            <p className="text-muted">{user.email}</p>
            {/* <!-- Followers and Following --> */}
            <div className="d-flex justify-content-around mb-4">
              <div>
                <span className="h4 d-block">123</span>
                Followers
              </div>
              <div>
                <span className="h4 d-block">456</span>
                Following
              </div>
            </div>
            {/* Sign Out Button */}
            <button className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
            {/* User's Added Recipes */}
            {pending ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span className="d-block text-center">
                <div className="card shadow m-4">
                  <div className="card-header">
                    <span className="text-center fw-bold m-5">Your Recipes</span>
                  </div>
                  {usersRecipe.length !== 0 &&
                    usersRecipe.map((data) => (
                      <>
                        <div
                          className="modal fade"
                          id={`deleteModal-${data.recipe_id}`}
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title text-danger"
                                  id="exampleModalLabel"
                                >
                                  Delete Recipe
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
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
                                  data-bs-dismiss="modal"
                                  onClick={() => deleteRecipe(data.recipe_id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <ul className="list-group list-group-flush p-3">
                          <li className="d-flex justify-content-center align-items-start">
                            <div
                              onClick={() => history.push(`/recipe/${data.recipe_id}`)}
                              className="ms-2 me-auto"
                            >
                              <div className="fw-bold">{data.recipe}</div>
                            </div>
                            <span
                              className="badge bg-danger rounded-pill"
                              data-bs-toggle="modal"
                              data-bs-target={`#deleteModal-${data.recipe_id}`}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </span>
                          </li>
                        </ul>
                      </>
                    ))}
                </div>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
