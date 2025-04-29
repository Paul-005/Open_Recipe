import React, { useState } from "react";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { React_Backend } from "../backend_url";
import "./homepage.css";

export default function ContentEditingPage() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipeContent, setRecipeContent] = useState("");
  const [foodImg, setFoodImage] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const history = useHistory();

  const publishContent = () => {
    const formData = new FormData();
    formData.append("recipeName", recipeName);
    formData.append("Incredients", ingredients);
    formData.append("RecipeContent", recipeContent);
    formData.append("FoodImg", foodImg);

    if (!recipeName || !ingredients || !recipeContent || !foodImg) {
      setError("Please fill all required fields");
      return;
    }

    if (!localStorage.getItem("name") || !localStorage.getItem("username")) {
      setError("Please login to share your recipe");
      return;
    }

    setError("");
    setPending(true);
    const token = localStorage.getItem("jwt");
    
    axios({
      method: "post",
      headers: { token },
      url: `${React_Backend}/recipes/new`,
      data: formData,
    })
      .then(() => {
        history.push("/recipes");
        setPending(false);
      })
      .catch((e) => {
        setError(e.response?.data?.error || e.message);
        setPending(false);
      });
  };

  return (
    <div className="content-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="recipe-form">
              <h2 className="section-title">Share Your Recipe</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {pending && (
                <div className="loading-spinner">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Recipe Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="Enter recipe name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Recipe Image</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    className="form-control"
                    accept="image/jpeg, image/jpg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFoodImage(file);
                      if (file) {
                        if (file.type === "image/jpeg" || file.type === "image/jpg") {
                          const imageUrl = URL.createObjectURL(file);
                          setImagePreviewUrl(imageUrl);
                          setError("");
                        } else {
                          setError("Please upload a JPEG or JPG image");
                        }
                      }
                    }}
                  />
                  {imagePreviewUrl && (
                    <div className="image-preview">
                      <img src={imagePreviewUrl} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ingredients</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="List ingredients (one per line)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Recipe Instructions</label>
                <textarea
                  className="form-control"
                  rows="8"
                  value={recipeContent}
                  onChange={(e) => setRecipeContent(e.target.value)}
                  placeholder="Write your recipe instructions here..."
                />
              </div>

              <button
                className="cta-button"
                onClick={publishContent}
                disabled={pending}
              >
                {pending ? "Publishing..." : "Publish Recipe"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
