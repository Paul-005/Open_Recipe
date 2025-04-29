import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { React_Backend } from "./backend_url";
import Footer from "./components/Footer";
import "./profile.css";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    verifyUser();
    fetchUserData();
    fetchUserRecipes();
  }, []);

  const verifyUser = () => {
    if (!localStorage.getItem("jwt")) {
      history.push("/login");
    }
  };

  const fetchUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
  };

  const fetchUserRecipes = () => {
    const token = localStorage.getItem("jwt");
    axios
      .get(`${React_Backend}/recipes/user`, {
        headers: { token }
      })
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDeleteRecipe = (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    const token = localStorage.getItem("jwt");
    setLoading(true);

    axios
      .delete(`${React_Backend}/recipes/${recipeId}`, {
        headers: { token }
      })
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="profile-header">
        <h1 className="profile-title">Welcome, {userData.name}</h1>
        <button 
          className="new-recipe-btn"
          onClick={() => history.push("/new-recipe")}
        >
          Add New Recipe
        </button>
      </div>

      <div className="recipes-section">
        <h2 className="section-title">Your Recipes</h2>
        {recipes.length === 0 ? (
          <div className="no-recipes">
            <p>You haven't created any recipes yet.</p>
            <button 
              className="cta-button"
              onClick={() => history.push("/new-recipe")}
            >
              Create Your First Recipe
            </button>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card">
                <img 
                  src={recipe.thumbnail} 
                  alt={recipe.recipeName} 
                  className="recipe-image"
                  onClick={() => history.push(`/recipes/${recipe._id}`)}
                />
                <div className="recipe-content">
                  <h3 className="recipe-title">{recipe.recipeName}</h3>
                  <div className="recipe-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => history.push(`/edit-recipe/${recipe._id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteRecipe(recipe._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
} 