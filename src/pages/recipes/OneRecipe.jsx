import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { React_Backend } from "../backend_url";
import Footer from "../components/Footer";
import "./recipe-details.css";

export default function OneRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [comments, setComments] = useState([]);

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
          token: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setRecipeData(res.data);
        setLoading(false);
        setError("");
        separateIngredients(res.data);
        if (res.data.comments) {
          setComments(res.data.comments);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const separateIngredients = (data) => {
    if (data.Incredients) {
      const ingredientsList = data.Incredients.split('\n').filter(item => item.trim());
      setIngredients(ingredientsList);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);

    axios
      .post(`${React_Backend}/recipes/${id}/comment`, {
        comment: comment.trim(),
        email: user.email,
      })
      .then((res) => {
        setComment("");
        setComments([...comments, { text: comment, email: user.email, date: new Date() }]);
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="recipe-header">
        <div className="recipe-image-container">
          <img src={recipeData.thumbnail} alt={recipeData.recipeName} className="recipe-main-image" />
        </div>
        <div className="recipe-info">
          <h1 className="recipe-title">{recipeData.recipeName}</h1>
          <div className="recipe-meta">
            <span className="author">By: {recipeData.email}</span>
            <span className="date">{new Date(recipeData.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2 className="section-title">Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-checkbox"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="method-section">
          <h2 className="section-title">Recipe Method</h2>
          <div className="method-content">
            {recipeData.RecipeContent?.split('\n').map((paragraph, index) => (
              <p key={index} className="method-step">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="comments-section">
          <h2 className="section-title">Comments</h2>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.email}</span>
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
          
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              className="comment-input"
              placeholder="Share your thoughts about this recipe..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button 
              type="submit"
              className="submit-comment-btn"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
