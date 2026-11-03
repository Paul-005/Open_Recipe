import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Recipe Card Component
const RecipeCard = ({ data, onFork, isForking }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const isFork = Boolean(data.isFork || data.sourceRecipeId);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isMyRecipe = Boolean(
    currentUser?._id &&
    data.user_id &&
    (currentUser._id === data.user_id ||
      currentUser._id === data.user_id?._id ||
      currentUser.id === data.user_id)
  );

  const cardStyle = {
    background: 'white',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    boxShadow: isHovered ? '0 25px 50px rgba(0, 0, 0, 0.15)' : '0 10px 25px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s ease',
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    border: isFork ? '1.5px solid rgba(242, 117, 10, 0.3)' : '1px solid rgba(0, 0, 0, 0.05)',
    cursor: 'pointer'
  };

  const imageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  };

  const contentStyle = {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.75rem',
    lineHeight: '1.3'
  };

  const descriptionStyle = {
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    flex: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const buttonStyle = {
    background: isHovered ? 'linear-gradient(135deg, #f2750a, #ea580c)' : '#f8fafc',
    color: isHovered ? 'white' : '#475569',
    border: '1px solid #e2e8f0',
    padding: '0.7rem 1.25rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const forkCardButtonStyle = {
    background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
    color: '#ea580c',
    border: '1.5px solid #fed7aa',
    padding: '0.7rem 1.15rem',
    borderRadius: '0.75rem',
    fontWeight: '700',
    cursor: isForking ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    boxShadow: '0 2px 4px rgba(234, 88, 12, 0.08)'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(242, 117, 10, 0.95)',
    color: 'white',
    padding: '0.4rem 0.9rem',
    borderRadius: '2rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  };

  const forkBadgeStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#ea580c',
    border: '1px solid rgba(234, 88, 12, 0.3)',
    padding: '0.4rem 0.9rem',
    borderRadius: '2rem',
    fontSize: '0.8rem',
    fontWeight: '700',
    backdropFilter: 'blur(10px)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    boxShadow: '0 4px 12px rgba(234, 88, 12, 0.15)'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative' }}>
        {data.thumbnail ? (
          <img
            src={data.thumbnail}
            alt={data.recipeName}
            style={{
              ...imageStyle,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '180px',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#cbd5e1',
              fontSize: '3rem'
            }}
          >
            <i className="bi bi-card-image"></i>
          </div>
        )}

        <div style={isFork ? forkBadgeStyle : badgeStyle}>
          {isFork ? (
            <>
              <i className="bi bi-diagram-2"></i>
              Community variation
            </>
          ) : (
            'Recipe'
          )}
        </div>
      </div>

      <div style={contentStyle}>
        {isFork && data.variationTitle && (
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#ea580c',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.35rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <i className="bi bi-tag-fill" style={{ fontSize: '0.7rem' }}></i>
            {data.variationTitle}
          </div>
        )}

        <h3 style={titleStyle}>{data.recipeName}</h3>

        {/* Author & Attribution info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: '#64748b' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <i className="bi bi-person-circle" style={{ color: '#ea580c' }}></i>
            <span>{isMyRecipe ? "You (Your Recipe)" : (data.authorName ? `by ${data.authorName}` : 'by Community Chef')}</span>
          </span>
          {data.cookingTime && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0, fontWeight: 500 }}>
              <i className="bi bi-clock"></i>
              {data.cookingTime}
            </span>
          )}
        </div>

        {isFork && data.originalRecipeName && (
          <div style={{ fontSize: '0.8rem', color: '#ea580c', marginBottom: '0.75rem', fontWeight: 600 }}>
            <i className="bi bi-diagram-2 me-1"></i>
            Forked from {data.originalRecipeName}
          </div>
        )}

        <p style={descriptionStyle}>
          {Array.isArray(data.RecipeContent) ? data.RecipeContent.join(". ") : data.RecipeContent}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <button
            style={{ ...buttonStyle, flex: 1 }}
            onClick={() => navigate(`/recipe/${data._id}`)}
          >
            <i className="bi bi-eye"></i>
            View
          </button>
          <button
            style={forkCardButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              onFork(data._id);
            }}
            disabled={isForking}
            onMouseEnter={(e) => {
              if (!isForking) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f2750a, #ea580c)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#ea580c';
              }
            }}
            onMouseLeave={(e) => {
              if (!isForking) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #fff7ed, #ffedd5)';
                e.currentTarget.style.color = '#ea580c';
                e.currentTarget.style.borderColor = '#fed7aa';
              }
            }}
            title={isMyRecipe ? "Fork this recipe to create another variation" : `Fork this recipe by ${data.authorName || 'chef'} to make your own variation`}
          >
            {isForking ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <i className="bi bi-diagram-2"></i>
                Fork
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Recipes() {
  const navigate = useNavigate();
  const [RecipesData, setRecipesData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [forkingId, setForkingId] = useState(null);
  const [forkError, setForkError] = useState("");

  const handleFork = async (recipeId) => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return;
    }
    setForkingId(recipeId);
    setForkError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/${recipeId}/fork`,
        {},
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      );
      navigate(`/edit-recipe/${res.data.forkId}`);
    } catch (err) {
      setForkError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fork recipe. Please try again."
      );
      setForkingId(null);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/recipes`)
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      getRecipes();
      return;
    }

    setIsSearching(true);
    setLoading(true);
    setError("");

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/recipes/search`, { query: searchQuery })
      .then((res) => {
        setRecipesData(res.data);
        setIsSearching(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError("AI Search failed. Please try again later.");
        setIsSearching(false);
        setLoading(false);
      });
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef7ed 0%, #ffffff 100%)'
  };

  const heroStyle = {
    background: 'linear-gradient(135deg, #f2750a 0%, #ea580c 100%)',
    color: 'white',
    padding: '5rem 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const heroTitleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'white'
  };

  const heroSubtitleStyle = {
    fontSize: '1.25rem',
    opacity: '0.9',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  };

  const sectionStyle = {
    padding: '4rem 0'
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
    minHeight: '300px'
  };

  const spinnerStyle = {
    width: '60px',
    height: '60px',
    border: '6px solid rgba(242, 117, 10, 0.2)',
    borderTop: '6px solid #f2750a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#64748b'
  };

  const emptyIconStyle = {
    fontSize: '5rem',
    color: '#cbd5e1',
    marginBottom: '1.5rem'
  };

  const decorativeCircle1 = {
    position: 'absolute',
    top: '20%',
    right: '10%',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    filter: 'blur(40px)'
  };

  const decorativeCircle2 = {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.15)',
    filter: 'blur(30px)'
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
          <div style={decorativeCircle1}></div>
          <div style={decorativeCircle2}></div>

          <div className="container" style={{ position: 'relative', zIndex: 10, color: 'white' }}>
            <h1 style={heroTitleStyle}>
              <i className="bi bi-book me-3"></i>
              Recipe Collection
            </h1>
            <p style={heroSubtitleStyle}>
              Discover amazing recipes crafted by our passionate community of home cooks and professional chefs from around the world.
            </p>

            {/* Semantic AI Search Bar */}
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
              <form onSubmit={handleSearch} style={{ position: 'relative', width: '100%', maxWidth: '650px' }}>
                <input
                  type="text"
                  placeholder="Spicy Mexican dinner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    paddingRight: '5rem',
                    borderRadius: '4rem',
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.1rem',
                    color: '#1e293b',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'}
                  onBlur={(e) => e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)'}
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                    color: 'white',
                    border: 'none',
                    height: '3.5rem',
                    width: '3.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isSearching ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSearching) {
                      e.target.style.transform = 'translateY(-50%) scale(1.05)';
                      e.target.style.background = 'linear-gradient(135deg, #1e293b, #334155)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                    e.target.style.background = 'linear-gradient(135deg, #0f172a, #1e293b)';
                  }}
                >
                  {isSearching ? (
                    <div style={{
                      width: '1.2rem', height: '1.2rem',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  ) : (
                    <i className="bi bi-search" style={{ fontSize: '1.2rem' }}></i>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Recipes Section */}
        <section style={sectionStyle}>
          <div className="container">
            {/* Error Alert */}
            {error && (
              <div style={alertStyle}>
                <i className="bi bi-exclamation-triangle"></i>
                Error loading recipes: {error}
              </div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div style={spinnerContainerStyle}>
                <div style={spinnerStyle}></div>
              </div>
            )}

            {/* Empty State */}
            {!loading && RecipesData.length === 0 && !error && (
              <div style={emptyStateStyle}>
                <i className="bi bi-journal-x" style={emptyIconStyle}></i>
                <h3 style={{ color: '#475569', marginBottom: '1rem', fontSize: '2rem' }}>
                  No recipes found
                </h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                  Be the first to share a delicious recipe with our community!
                </p>
                <button
                  onClick={() => navigate("/content-editing")}
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
                    boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)'
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
                  <i className="bi bi-plus-circle me-2"></i>
                  Share Your Recipe
                </button>
              </div>
            )}

            {/* Fork Error Alert */}
            {forkError && (
              <div
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "1px solid #fca5a5",
                  padding: "0.9rem 1.25rem",
                  borderRadius: "1rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <i className="bi bi-exclamation-triangle"></i>
                  <span>{forkError}</span>
                </div>
                <button
                  onClick={() => setForkError("")}
                  style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "1.2rem" }}
                >
                  &times;
                </button>
              </div>
            )}

            {/* Recipe Grid */}
            {!loading && RecipesData.length > 0 && (
              <div className="row g-4">
                {RecipesData.filter((r) => r.visibility !== "private").map((data) => (
                  <div key={data._id} className="col-lg-4 col-md-6">
                    <RecipeCard
                      data={data}
                      onFork={handleFork}
                      isForking={forkingId === data._id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}