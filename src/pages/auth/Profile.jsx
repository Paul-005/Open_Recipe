import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { React_Backend } from "../backend_url";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [usersRecipe, setUsersRecipe] = useState([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
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
      setUsersRecipe(recipes.data.recipe);
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

  const deleteRecipe = (id) => {
    setPending(true);
    console.log(`Attempting to delete recipe with ID: ${id}`);

    axios
      .delete(`${React_Backend}/recipes/${id}/`, {
        headers: {
          token: localStorage.getItem("jwt"),
        },
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

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
    padding: '2rem 0'
  };

  const profileHeaderStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '2rem',
    padding: '3rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const avatarStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto',
    fontSize: '3rem',
    color: 'white',
    fontWeight: '700',
    boxShadow: '0 15px 35px rgba(242, 117, 10, 0.3)'
  };

  const userNameStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '0.5rem'
  };

  const userEmailStyle = {
    fontSize: '1.1rem',
    color: '#64748b',
    marginBottom: '2rem'
  };

  const signOutButtonStyle = {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
  };

  const recipesCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '2rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden'
  };

  const cardHeaderStyle = {
    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
    color: 'white',
    padding: '2rem',
    textAlign: 'center'
  };

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: 0
  };

  const recipeItemStyle = {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease'
  };

  const recipeNameStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#0f172a',
    cursor: 'pointer',
    flex: 1
  };

  const deleteButtonStyle = {
    background: '#fef2f2',
    color: '#ef4444',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const modalStyle = {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
  };

  const alertStyle = {
    background: '#fef2f2',
    color: '#991b1b',
    padding: '1rem 1.5rem',
    borderRadius: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(242, 117, 10, 0.2)',
    borderTop: '4px solid #f2750a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '2rem auto'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '3rem',
    color: '#64748b'
  };

  const emptyIconStyle = {
    fontSize: '4rem',
    color: '#cbd5e1',
    marginBottom: '1rem'
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
        <div className="container">
          {/* Profile Header */}
          <div style={profileHeaderStyle}>
            <div style={avatarStyle}>
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h1 style={userNameStyle}>{user.name || 'User'}</h1>
            <p style={userEmailStyle}>{user.email}</p>
            <button
              style={signOutButtonStyle}
              onClick={signOut}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Sign Out
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div style={alertStyle}>
              <i className="bi bi-exclamation-triangle"></i>
              {error}
            </div>
          )}

          {/* Recipes Card */}
          <div style={recipesCardStyle}>
            <div style={cardHeaderStyle}>
              <h2 style={cardTitleStyle}>
                <i className="bi bi-book me-2"></i>
                Your Recipes
              </h2>
            </div>

            {/* Loading Spinner */}
            {pending && (
              <div style={spinnerStyle}></div>
            )}

            {/* Empty State */}
            {usersRecipe.length === 0 && !pending && (
              <div style={emptyStateStyle}>
                <i className="bi bi-journal-x" style={emptyIconStyle}></i>
                <h3 style={{ color: '#475569', marginBottom: '0.5rem' }}>No recipes yet</h3>
                <p>Start sharing your culinary creations with the community!</p>
                <button
                  onClick={() => history.push("/content-editing")}
                  style={{
                    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Create Your First Recipe
                </button>
              </div>
            )}

            {/* Recipe List */}
            {usersRecipe.length > 0 &&
              usersRecipe.map((data) => (
                <div key={data.recipe_id}>
                  {/* Delete Confirmation Modal */}
                  <div
                    className="modal fade"
                    id={`deleteRecipeModal-${data.recipe_id}`}
                    tabIndex="-1"
                    aria-labelledby={`deleteRecipeModalLabel-${data.recipe_id}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content" style={modalStyle}>
                        <div className="modal-header" style={{ border: 'none', padding: '2rem 2rem 1rem 2rem' }}>
                          <h5
                            className="modal-title"
                            id={`deleteRecipeModalLabel-${data.recipe_id}`}
                            style={{ color: '#ef4444', fontWeight: '700', fontSize: '1.25rem' }}
                          >
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            Delete Recipe
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            style={{ fontSize: '1.5rem' }}
                          ></button>
                        </div>
                        <div className="modal-body" style={{ padding: '0 2rem' }}>
                          <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1rem' }}>
                            Are you sure you want to delete <strong>"{data.recipe}"</strong>?
                          </p>
                          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            This action cannot be undone.
                          </p>
                        </div>
                        <div className="modal-footer" style={{ border: 'none', padding: '1rem 2rem 2rem 2rem' }}>
                          <button
                            type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            style={{
                              background: '#f8fafc',
                              color: '#475569',
                              border: '1px solid #e2e8f0',
                              padding: '0.75rem 1.5rem',
                              borderRadius: '0.75rem',
                              fontWeight: '500'
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn"
                            data-bs-dismiss="modal"
                            onClick={() => deleteRecipe(data.recipe_id)}
                            style={{
                              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                              color: 'white',
                              border: 'none',
                              padding: '0.75rem 1.5rem',
                              borderRadius: '0.75rem',
                              fontWeight: '600',
                              marginLeft: '0.5rem'
                            }}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recipe Item */}
                  <div
                    style={recipeItemStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(242, 117, 10, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      style={recipeNameStyle}
                      onClick={() => history.push(`/recipe/${data._id}`)}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#f2750a';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#0f172a';
                      }}
                    >
                      <i className="bi bi-journal-text me-2"></i>
                      {data.recipe}
                    </div>
                    <button
                      style={deleteButtonStyle}
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteRecipeModal-${data.recipe_id}`}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#fee2e2';
                        e.target.style.borderColor = '#fca5a5';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#fef2f2';
                        e.target.style.borderColor = '#fecaca';
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}