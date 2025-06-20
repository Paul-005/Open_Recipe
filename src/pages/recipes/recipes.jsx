import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { React_Backend } from "../backend_url";

// Recipe Card Component
const RecipeCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const cardStyle = {
    background: 'white',
    borderRadius: '1.5rem',
    overflow: 'hidden',
    boxShadow: isHovered ? '0 25px 50px rgba(0, 0, 0, 0.15)' : '0 10px 25px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s ease',
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    height: '100%'
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
    flexDirection: 'column',
    height: 'calc(100% - 250px)'
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
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(242, 117, 10, 0.9)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    backdropFilter: 'blur(10px)'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={data.thumbnail}
          alt={data.recipeName}
          style={{
            ...imageStyle,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div style={badgeStyle}>
          Recipe
        </div>
      </div>

      <div style={contentStyle}>
        <h3 style={titleStyle}>{data.recipeName}</h3>
        <p style={descriptionStyle}>{data.RecipeContent}</p>

        <button
          style={buttonStyle}
          onClick={() => navigate(`/recipe/${data._id}`)}
        >
          <i className="bi bi-eye"></i>
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default function Recipes() {
  const navigate = useNavigate();
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

            {/* Recipe Grid */}
            {!loading && RecipesData.length > 0 && (
              <div className="row g-4">
                {RecipesData.map((data) => (
                  <div key={data._id} className="col-lg-4 col-md-6">
                    <RecipeCard data={data} />
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