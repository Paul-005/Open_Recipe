import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { React_Backend } from "../backend_url";

export default function OneRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [commentSuccess, setCommentSuccess] = useState("");

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
        console.log(res.data);
        setLoading(false);
        setError("");
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
        email: user.email,
      })
      .then(() => {
        setLoading(false);
        setError("");
        setComment("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  function verifyUser() {
    if (!localStorage.getItem("jwt")) navigate("/login");
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef7ed 0%, #ffffff 100%)'
  };

  const heroStyle = {
    background: 'linear-gradient(135deg, #f2750a 0%, #ea580c 100%)',
    color: 'white',
    padding: '3rem 0',
    marginBottom: '3rem'
  };

  const backButtonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    marginBottom: '2rem'
  };

  const editButtonStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    marginBottom: '2rem',
    marginLeft: '1rem'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'white'
  };

  const authorStyle = {
    fontSize: '1.2rem',
    opacity: '0.9',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const contentCardStyle = {
    background: 'white',
    borderRadius: '2rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    marginBottom: '2rem'
  };

  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover'
  };

  const sectionStyle = {
    padding: '2rem'
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const contentStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#475569'
  };

  const ingredientsStyle = {
    background: 'linear-gradient(135deg, #fef7ed, #fed7aa)',
    padding: '2rem',
    borderRadius: '1.5rem',
    margin: '2rem 0'
  };

  const methodStyle = {
    background: '#f8fafc',
    padding: '2rem',
    borderRadius: '1.5rem'
  };

  const alertStyle = {
    background: '#fef2f2',
    color: '#991b1b',
    padding: '1rem 1.5rem',
    borderRadius: '1rem',
    marginBottom: '2rem',
    border: '1px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  };

  const spinnerStyle = {
    width: '60px',
    height: '60px',
    border: '6px solid rgba(242, 117, 10, 0.2)',
    borderTop: '6px solid #f2750a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={containerStyle}>
        {/* Hero Section */}
        <section style={heroStyle}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
              <button
                style={backButtonStyle}
                onClick={() => navigate(-1)}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Recipes
              </button>

              {/* Edit Button - Only show for recipe owner */}
              {!loading && recipeData.email && recipeData.email === JSON.parse(localStorage.getItem("user"))?.email && (
                <button
                  style={editButtonStyle}
                  onClick={() => navigate(`/edit-recipe/${id}`)}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Recipe
                </button>
              )}
            </div>

            {!loading && recipeData.recipeName && (
              <>
                <h1 style={titleStyle}>{recipeData.recipeName}</h1>
                <div style={authorStyle}>
                  <i className="bi bi-person-circle"></i>
                  Created by {recipeData.email}
                </div>
              </>
            )}
          </div>
        </section>

        <div className="container">
          {/* Error Alert */}
          {error && (
            <div style={alertStyle}>
              <i className="bi bi-exclamation-triangle"></i>
              Error: {error}
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div style={spinnerContainerStyle}>
              <div style={spinnerStyle}></div>
            </div>
          )}

          {/* Recipe Content */}
          {!loading && recipeData.recipeName && (
            <>
              {/* Recipe Image */}
              {recipeData.thumbnail && (
                <div style={contentCardStyle}>
                  <img
                    src={recipeData.thumbnail}
                    alt={recipeData.recipeName}
                    style={imageStyle}
                  />
                </div>
              )}

              {/* Ingredients Section */}
              <div style={contentCardStyle}>
                <div style={ingredientsStyle}>
                  <h2 style={sectionTitleStyle}>
                    <i className="bi bi-list-ul" style={{ color: '#f2750a' }}></i>
                    Ingredients
                  </h2>
                  <div style={contentStyle}>
                    {recipeData.Incredients}
                  </div>
                </div>
              </div>

              {/* Recipe Method */}
              <div style={contentCardStyle}>
                <div style={methodStyle}>
                  <h2 style={sectionTitleStyle}>
                    <i className="bi bi-clipboard-check" style={{ color: '#10b981' }}></i>
                    Instructions
                  </h2>
                  <div style={contentStyle}>
                    {recipeData.RecipeContent}
                  </div>
                </div>
              </div>


              {/* Comments Section */}
              <div style={{
                background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)',
                borderRadius: '2rem',
                boxShadow: '0 10px 32px rgba(242, 117, 10, 0.08)',
                border: '1px solid #fed7aa',
                padding: '2.5rem 2rem',
                margin: '2rem 0 3rem 0',
                maxWidth: '700px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                <h2 style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#ea580c',
                  marginBottom: '1.5rem',
                }}>
                  <i className="bi bi-chat-dots" style={{ fontSize: '2rem', color: '#f2750a' }}></i>
                  Comments
                </h2>
                {recipeData.comments && recipeData.comments.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {recipeData.comments.map((c) => (
                      <div key={c._id} style={{
                        background: 'white',
                        borderRadius: '1.2rem',
                        boxShadow: '0 4px 16px rgba(242, 117, 10, 0.07)',
                        border: '1px solid #fed7aa',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        position: 'relative',
                      }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f2750a, #fed7aa)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1.3rem',
                          flexShrink: 0,
                          boxShadow: '0 2px 8px rgba(242, 117, 10, 0.10)'
                        }}>
                          <i className="bi bi-person-circle"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: '1.08rem',
                            color: '#0f172a',
                            fontWeight: 500,
                            marginBottom: '0.3rem',
                          }}>{c.comment}</div>
                          <div style={{
                            fontSize: '0.95rem',
                            color: '#ea580c',
                            opacity: 0.7,
                          }}>{new Date(c.createdAt).toLocaleString()}</div>
                        </div>
                        {localStorage.getItem("userId") === c.user_id && (
                          <button
                            onClick={async () => {
                              try {
                                await axios.delete(`${React_Backend}/recipes/comment/${c._id}`, {
                                  headers: { token: localStorage.getItem("jwt") }
                                });
                                getOneRecipe();
                              } catch (err) {
                                alert("Failed to delete comment");
                              }
                            }}
                            style={{
                              position: 'absolute',
                              top: '1rem',
                              right: '1rem',
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              fontSize: '1.2rem',
                              cursor: 'pointer',
                              padding: 0
                            }}
                            title="Delete comment"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    color: '#ea580c',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    padding: '1.5rem 0 0.5rem 0',
                  }}>
                    <i className="bi bi-emoji-smile" style={{ fontSize: '1.5rem', color: '#f2750a', marginRight: '0.5rem' }}></i>
                    No comments yet. Be the first to share your thoughts!
                  </div>
                )}

                {/* Add Comment Form */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!comment.trim()) return;
                    setCommentLoading(true);
                    setCommentError("");
                    setCommentSuccess("");
                    try {
                      await axios.post(
                        `${React_Backend}/recipes/comment/${id}`,
                        { comment },
                        { headers: { token: localStorage.getItem("jwt") } }
                      );
                      setCommentSuccess("Comment added!");
                      setComment("");
                      getOneRecipe(); // Refresh comments
                    } catch (err) {
                      setCommentError(err.response?.data?.message || err.message || "Failed to add comment");
                    } finally {
                      setCommentLoading(false);
                    }
                  }}
                  style={{
                    marginTop: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'stretch',
                  }}
                >
                  <label htmlFor="comment-input" style={{
                    fontWeight: 600,
                    color: '#ea580c',
                    marginBottom: '0.5rem',
                    fontSize: '1.1rem',
                  }}>
                    <i className="bi bi-pencil-square" style={{ marginRight: '0.5rem' }}></i>
                    Add a Comment
                  </label>
                  <textarea
                    id="comment-input"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                    maxLength={300}
                    placeholder="Share your thoughts..."
                    style={{
                      borderRadius: '1rem',
                      border: '1.5px solid #fed7aa',
                      padding: '1rem',
                      fontSize: '1.08rem',
                      resize: 'vertical',
                      outline: 'none',
                      boxShadow: '0 2px 8px rgba(242, 117, 10, 0.05)',
                      background: '#fff7ed',
                      color: '#ea580c',
                      fontWeight: 500,
                      transition: 'border 0.2s',
                    }}
                    disabled={commentLoading}
                  />
                  <button
                    type="submit"
                    disabled={commentLoading || !comment.trim()}
                    style={{
                      background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                      color: 'white',
                      border: 'none',
                      padding: '0.9rem 2.2rem',
                      borderRadius: '1rem',
                      fontSize: '1.08rem',
                      fontWeight: 700,
                      cursor: commentLoading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 6px 18px rgba(242, 117, 10, 0.13)',
                      transition: 'all 0.2s',
                      alignSelf: 'flex-end',
                      opacity: commentLoading || !comment.trim() ? 0.7 : 1,
                      marginTop: '0.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    {commentLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className="bi bi-send"></i>
                    )}
                    {commentLoading ? 'Adding...' : 'Add Comment'}
                  </button>
                  {commentError && (
                    <div style={{ color: '#dc2626', fontWeight: 500, marginTop: '0.5rem' }}>
                      <i className="bi bi-exclamation-triangle" style={{ marginRight: '0.4rem' }}></i>
                      {commentError}
                    </div>
                  )}
                  {commentSuccess && (
                    <div style={{ color: '#10b981', fontWeight: 500, marginTop: '0.5rem' }}>
                      <i className="bi bi-check-circle" style={{ marginRight: '0.4rem' }}></i>
                      {commentSuccess}
                    </div>
                  )}
                </form>
              </div>
              {/* Action Buttons */}
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button
                  onClick={() => navigate("/recipes")}
                  style={{
                    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)',
                    marginRight: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(242, 117, 10, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px rgba(242, 117, 10, 0.3)';
                  }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Browse More Recipes
                </button>

                <button
                  onClick={() => navigate("/content-editing")}
                  style={{
                    background: 'white',
                    color: '#f2750a',
                    border: '2px solid #f2750a',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f2750a';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#f2750a';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Share Your Recipe
                </button>
              </div>
              <div style={{ paddingBottom: '3rem' }}></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}