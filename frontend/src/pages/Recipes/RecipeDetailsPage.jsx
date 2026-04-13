import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";


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
  // AI Assistant State
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const aiSectionRef = useRef(null);

  const scrollToAI = () => {
    aiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    verifyUser();
    getOneRecipe();
  }, []);

  const getOneRecipe = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, {
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
      .post(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, {
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

  const askAI = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiError("");
    setAiResponse("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/ask-ai`,
        {
          recipeId: id,
          question: aiQuery
        },
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      );
      setAiResponse(res.data.answer);
    } catch (err) {
      setAiError(err.response?.data?.error || "Failed to get an answer from AI.");
    } finally {
      setAiLoading(false);
    }
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

  const ingredientPillContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '1rem'
  };

  const ingredientPillStyle = {
    background: 'white',
    padding: '0.6rem 1.25rem',
    borderRadius: '2rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#ea580c',
    border: '1px solid rgba(242, 117, 10, 0.2)',
    boxShadow: '0 2px 5px rgba(242, 117, 10, 0.05)',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
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
        
        .main-content-grid {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        
        .recipe-main-column {
          min-width: 0;
        }
        
        .comment-sidebar {
          position: sticky;
          top: 2rem;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
        }
        
        /* Mobile Responsive */
        @media (max-width: 992px) {
          .main-content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .comment-sidebar {
            position: static;
            max-height: none;
          }
        }
        
        @media (max-width: 768px) {
          .comment-section {
            padding: 1.5rem 1rem !important;
          }
          
          .comment-title {
            font-size: 1.4rem !important;
          }
          
          .comment-card {
            padding: 0.9rem !important;
            gap: 0.7rem !important;
          }
          
          .comment-avatar {
            width: 34px !important;
            height: 34px !important;
            font-size: 1.1rem !important;
          }
          
          .comment-text {
            font-size: 0.95rem !important;
          }
          
          .comment-date {
            font-size: 0.85rem !important;
          }
          
          .comment-textarea {
            font-size: 1rem !important;
            padding: 0.75rem !important;
          }
          
          .comment-button {
            padding: 0.7rem 1.4rem !important;
            font-size: 0.95rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .comment-section {
            padding: 1.25rem 0.85rem !important;
            border-radius: 1.25rem !important;
          }
          
          .comment-title {
            font-size: 1.25rem !important;
            gap: 0.5rem !important;
          }
          
          .comment-card {
            padding: 0.8rem !important;
          }
          
          .comment-avatar {
            width: 30px !important;
            height: 30px !important;
            font-size: 1rem !important;
          }
          
          .comment-text {
            font-size: 0.9rem !important;
          }
          
          .comment-date {
            font-size: 0.8rem !important;
          }
          
          .comment-textarea {
            font-size: 0.95rem !important;
            padding: 0.65rem !important;
          }
          
          .comment-button {
            padding: 0.65rem 1.2rem !important;
            font-size: 0.9rem !important;
            width: 100%;
          }
        }
        
        /* Custom Scrollbar */
        .comment-sidebar::-webkit-scrollbar {
          width: 6px;
        }
        
        .comment-sidebar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .comment-sidebar::-webkit-scrollbar-thumb {
          background: #fed7aa;
          border-radius: 10px;
        }
        
        .comment-sidebar::-webkit-scrollbar-thumb:hover {
          background: #f2750a;
        }
        
        .comments-list::-webkit-scrollbar {
          width: 5px;
        }
        
        .comments-list::-webkit-scrollbar-track {
          background: #f8f8f8;
          border-radius: 10px;
        }
        
        .comments-list::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 10px;
        }

        .ai-response-container p {
          margin-bottom: 0.5rem;
        }
        .ai-response-container ul, .ai-response-container ol {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
        }
        .ai-response-container li {
          margin-bottom: 0.25rem;
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
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={authorStyle}>
                    <i className="bi bi-person-circle"></i>
                    Created by {recipeData.email}
                  </div>
                  {recipeData.cookingTime && (
                    <div style={authorStyle}>
                      <i className="bi bi-clock"></i>
                      Time: {recipeData.cookingTime}
                    </div>
                  )}
                  {recipeData.servings && (
                    <div style={authorStyle}>
                      <i className="bi bi-people"></i>
                      Servings: {recipeData.servings}
                    </div>
                  )}
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

          {/* Recipe Content with Sidebar Layout */}
          {!loading && recipeData.recipeName && (
            <div className="main-content-grid">
              {/* Main Recipe Content - Left Side (3fr) */}
              <div className="recipe-main-column">
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
                    <div style={ingredientPillContainerStyle}>
                      {recipeData.ingredients ? recipeData.ingredients.split(',').map((ingredient, index) => (
                        ingredient.trim() && (
                          <div key={index} style={ingredientPillStyle} className="ingredient-pill">
                            <i className="bi bi-check2-circle me-2" style={{ color: '#f97316' }}></i>
                            {ingredient.trim()}
                          </div>
                        )
                      )) : <div style={contentStyle}>No ingredients listed</div>}
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

                {/* AI Assistant Section */}
                <div style={contentCardStyle} ref={aiSectionRef}>
                  <div style={{
                    background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
                    padding: '2rem',
                    borderRadius: '1.5rem'
                  }}>
                    <h2 style={sectionTitleStyle}>
                      <i className="bi bi-stars" style={{ color: '#0ea5e9' }}></i>
                      Cooking Assistant
                    </h2>
                    <p style={{ marginBottom: '1.5rem', color: '#475569' }}>
                      Ask questions about this recipe, get calorie estimates, or ask for ingredient adjustments!
                    </p>

                    <form onSubmit={askAI} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <input
                        type="text"
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        placeholder="e.g., How can I make this spicy? or Estimate calories needed for 6 people."
                        style={{
                          flex: 1,
                          padding: '0.8rem 1.2rem',
                          borderRadius: '0.75rem',
                          border: '1px solid #bae6fd',
                          outline: 'none',
                          fontSize: '1rem'
                        }}
                      />
                      <button
                        type="submit"
                        disabled={aiLoading}
                        style={{
                          background: '#0ea5e9',
                          color: 'white',
                          border: 'none',
                          padding: '0.8rem 1.5rem',
                          borderRadius: '0.75rem',
                          fontWeight: '600',
                          cursor: aiLoading ? 'wait' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        {aiLoading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <i className="bi bi-magic"></i>
                        )}
                        Ask
                      </button>
                    </form>

                    {aiError && (
                      <div style={{ padding: '1rem', background: '#fee2e2', color: '#dc2626', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                        {aiError}
                      </div>
                    )}

                    {aiResponse && (
                      <div style={{ padding: '1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid #bae6fd' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>AI Answer:</h4>
                        <div className="ai-response-container" style={{ lineHeight: '1.5', color: '#334155' }}>
                          <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
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
              </div>

              {/* Comments Section - Right Sidebar (1fr) */}
              <div className="comment-sidebar">
                <div className="comment-section" style={{
                  background: 'white',
                  borderRadius: '1.25rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #fed7aa',
                  padding: '1.5rem 1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h2 className="comment-title" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#ea580c',
                      margin: 0,
                    }}>
                      <i className="bi bi-chat-dots"></i>
                      Comments ({recipeData.comments?.length || 0})
                    </h2>

                    <button
                      onClick={scrollToAI}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'white',
                        color: '#ea580c',
                        border: '1px solid #ea580c',
                        padding: '0.4rem 0.9rem',
                        borderRadius: '2rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#ea580c';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.color = '#ea580c';
                      }}

                    >
                      <i className="bi bi-stars" style={{ color: '#ea580c' }}></i>
                      Ask AI
                    </button>
                  </div>

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
                          `${process.env.REACT_APP_BACKEND_URL}/recipes/comment/${id}`,
                          { comment },
                          { headers: { token: localStorage.getItem("jwt") } }
                        );
                        setCommentSuccess("Comment added!");
                        setComment("");
                        getOneRecipe();
                      } catch (err) {
                        setCommentError(err.response?.data?.message || err.message || "Failed to add comment");
                      } finally {
                        setCommentLoading(false);
                      }
                    }}
                    style={{
                      marginBottom: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                    }}
                  >
                    <textarea
                      className="comment-textarea"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      rows={3}
                      maxLength={300}
                      placeholder="Add a comment..."
                      style={{
                        borderRadius: '0.65rem',
                        border: '1.5px solid #fed7aa',
                        padding: '0.75rem',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                        outline: 'none',
                        boxShadow: '0 2px 6px rgba(242, 117, 10, 0.05)',
                        background: '#fffbf5',
                        color: '#1e293b',
                        transition: 'border 0.2s',
                        fontFamily: 'inherit',
                      }}
                      disabled={commentLoading}
                    />

                    {commentError && (
                      <div style={{ color: '#dc2626', fontWeight: 500, fontSize: '0.85rem' }}>
                        <i className="bi bi-exclamation-triangle" style={{ marginRight: '0.4rem' }}></i>
                        {commentError}
                      </div>
                    )}
                    {commentSuccess && (
                      <div style={{ color: '#10b981', fontWeight: 500, fontSize: '0.85rem' }}>
                        <i className="bi bi-check-circle" style={{ marginRight: '0.4rem' }}></i>
                        {commentSuccess}
                      </div>
                    )}

                    <button
                      className="comment-button"
                      type="submit"
                      disabled={commentLoading || !comment.trim()}
                      style={{
                        background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                        color: 'white',
                        border: 'none',
                        padding: '0.7rem 1.5rem',
                        borderRadius: '0.65rem',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        cursor: commentLoading || !comment.trim() ? 'not-allowed' : 'pointer',
                        boxShadow: '0 3px 10px rgba(242, 117, 10, 0.2)',
                        transition: 'all 0.2s',
                        opacity: commentLoading || !comment.trim() ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      {commentLoading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <i className="bi bi-send"></i>
                      )}
                      {commentLoading ? 'Posting...' : 'Comment'}
                    </button>
                  </form>

                  {/* Comments List */}
                  {recipeData.comments && recipeData.comments.length > 0 ? (
                    <div className="comments-list" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      maxHeight: '600px',
                      overflowY: 'auto',
                      paddingRight: '0.25rem'
                    }}>
                      {recipeData.comments.map((c) => (
                        <div key={c._id} className="comment-card" style={{
                          background: '#fafafa',
                          borderRadius: '0.75rem',
                          border: '1px solid #f0f0f0',
                          padding: '0.9rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          position: 'relative',
                        }}>
                          <div className="comment-avatar" style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f2750a, #fed7aa)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1.15rem',
                            flexShrink: 0,
                          }}>
                            <i className="bi bi-person-circle"></i>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="comment-text" style={{
                              fontSize: '0.95rem',
                              color: '#1e293b',
                              fontWeight: 400,
                              marginBottom: '0.3rem',
                              wordWrap: 'break-word',
                              lineHeight: '1.5',
                            }}>{c.comment}</div>
                            <div className="comment-date" style={{
                              fontSize: '0.8rem',
                              color: '#64748b',
                            }}>{new Date(c.createdAt).toLocaleString()}</div>
                          </div>
                          {localStorage.getItem("userId") === c.user_id && (
                            <button
                              onClick={async () => {
                                try {
                                  await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipes/comment/${c._id}`, {
                                    headers: { token: localStorage.getItem("jwt") }
                                  });
                                  getOneRecipe();
                                } catch (err) {
                                  alert("Failed to delete comment");
                                }
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#ef4444',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                padding: '0.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
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
                      color: '#94a3b8',
                      fontWeight: 400,
                      fontSize: '0.9rem',
                      padding: '1.5rem 0',
                    }}>
                      <i className="bi bi-chat" style={{ fontSize: '1.75rem', color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}></i>
                      No comments yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ paddingBottom: '3rem' }}></div>
      </div>
    </>
  );
}