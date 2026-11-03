import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [usersRecipe, setUsersRecipe] = useState([]);
  const [userForks, setUserForks] = useState([]);
  const [activeTab, setActiveTab] = useState("recipes");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = () => {
    const json = localStorage.getItem("user");
    if (json) {
      const parsedData = JSON.parse(json);
      setUser(parsedData);
    }
  };

  const getUsersRecipe = async () => {
    setPending(true);
    try {
      const recipes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/get-users-recipe`, {
        headers: { token: localStorage.getItem("jwt") },
      });

      if (recipes.data) {
        setUsersRecipe(recipes.data);
      } else {
        setUsersRecipe([]);
      }
    } catch (error) {
      setError(error.message);
      setUsersRecipe([]);
    } finally {
      setPending(false);
    }
  };

  const getUserForks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/my-forks`, {
        headers: { token: localStorage.getItem("jwt") },
      });
      setUserForks(res.data || []);
    } catch (err) {
      console.warn("Failed to load user forks:", err.message);
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
    if (!localStorage.getItem("jwt")) navigate("/login");
  }

  useEffect(() => {
    verifyUser();
    getUserInfo();
    getUsersRecipe();
    getUserForks();
  }, []);

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete._id);
      setShowDeleteModal(false);
      setRecipeToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setRecipeToDelete(null);
  };

  const deleteRecipe = (id) => {
    setPending(true);

    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        setPending(false);
        getUsersRecipe();
        getUserForks();
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
    margin: 0,
    color: 'white'
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

  const editButtonStyle = {
    background: '#f0f9ff',
    color: '#0284c7',
    border: '1px solid #bae6fd',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)'
  };

  const modalContentStyle = {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  const modalHeaderStyle = {
    padding: '2rem 2rem 1rem 2rem',
    borderBottom: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const modalTitleStyle = {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: '1.25rem',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#64748b',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const modalBodyStyle = {
    padding: '0 2rem'
  };

  const modalFooterStyle = {
    padding: '1rem 2rem 2rem 2rem',
    borderTop: 'none',
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end'
  };

  const cancelButtonStyle = {
    background: '#f8fafc',
    color: '#475569',
    border: '1px solid #e2e8f0',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const confirmDeleteButtonStyle = {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
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
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("recipes")}
                  style={{
                    background: activeTab === "recipes" ? "white" : "rgba(255, 255, 255, 0.2)",
                    color: activeTab === "recipes" ? "#ea580c" : "white",
                    border: "none",
                    padding: "0.6rem 1.5rem",
                    borderRadius: "2rem",
                    fontWeight: "700",
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="bi bi-book me-2"></i>
                  Original Recipes ({usersRecipe.length})
                </button>
                <button
                  onClick={() => setActiveTab("forks")}
                  style={{
                    background: activeTab === "forks" ? "white" : "rgba(255, 255, 255, 0.2)",
                    color: activeTab === "forks" ? "#ea580c" : "white",
                    border: "none",
                    padding: "0.6rem 1.5rem",
                    borderRadius: "2rem",
                    fontWeight: "700",
                    fontSize: "1.05rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="bi bi-diagram-2 me-2"></i>
                  My Forks ({userForks.length})
                </button>
              </div>
            </div>

            {/* Loading Spinner */}
            {pending && (
              <div style={spinnerStyle}></div>
            )}

            {/* TAB: ORIGINAL RECIPES */}
            {activeTab === "recipes" && (
              <>
                {usersRecipe.length === 0 && !pending && (
                  <div style={emptyStateStyle}>
                    <i className="bi bi-journal-x" style={emptyIconStyle}></i>
                    <h3 style={{ color: '#475569', marginBottom: '0.5rem' }}>No recipes yet</h3>
                    <p>Start sharing your culinary creations with the community!</p>
                    <button
                      onClick={() => navigate("/content-editing")}
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

                {usersRecipe.length > 0 &&
                  usersRecipe.map((data) => (
                    <div key={data._id}>
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
                          onClick={() => navigate(`/recipe/${data._id}`)}
                          onMouseEnter={(e) => {
                            e.target.style.color = '#f2750a';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#0f172a';
                          }}
                        >
                          <i className="bi bi-journal-text me-2"></i>
                          {data.recipeName}
                        </div>
                        <div style={{ display: 'flex' }}>
                          <button
                            style={editButtonStyle}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/edit-recipe/${data._id}`);
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#e0f2fe';
                              e.target.style.borderColor = '#bae6fd';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = '#f0f9ff';
                              e.target.style.borderColor = '#bae6fd';
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            style={deleteButtonStyle}
                            onClick={() => handleDeleteClick(data)}
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
                    </div>
                  ))}
              </>
            )}

            {/* TAB: MY FORKS */}
            {activeTab === "forks" && (
              <>
                {userForks.length === 0 && !pending && (
                  <div style={emptyStateStyle}>
                    <i className="bi bi-diagram-2" style={emptyIconStyle}></i>
                    <h3 style={{ color: '#475569', marginBottom: '0.5rem' }}>No recipe forks yet</h3>
                    <p>Discover community recipes and fork them to create your own personalized variations!</p>
                    <button
                      onClick={() => navigate("/recipes")}
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
                      <i className="bi bi-search me-2"></i>
                      Explore Recipes to Fork
                    </button>
                  </div>
                )}

                {userForks.length > 0 &&
                  userForks.map((data) => {
                    const isPublic = data.visibility === "public";
                    return (
                      <div key={data._id}>
                        <div
                          style={recipeItemStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(242, 117, 10, 0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0, marginRight: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                              <span
                                style={recipeNameStyle}
                                onClick={() => navigate(`/recipe/${data._id}`)}
                                onMouseEnter={(e) => {
                                  e.target.style.color = '#f2750a';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.color = '#0f172a';
                                }}
                              >
                                <i className="bi bi-diagram-2 me-2" style={{ color: "#ea580c" }}></i>
                                {data.recipeName}
                              </span>

                              {/* Status Badge */}
                              <span
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: "700",
                                  padding: "0.2rem 0.65rem",
                                  borderRadius: "1rem",
                                  background: isPublic ? "#dcfce7" : "#fef3c7",
                                  color: isPublic ? "#15803d" : "#b45309",
                                  border: `1px solid ${isPublic ? "#bbf7d0" : "#fde68a"}`,
                                }}
                              >
                                {isPublic ? "Published" : "Draft (Private)"}
                              </span>

                              {data.variationTitle && (
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "600",
                                    padding: "0.2rem 0.65rem",
                                    borderRadius: "1rem",
                                    background: "#fff7ed",
                                    color: "#c2410c",
                                    border: "1px solid #ffedd5",
                                  }}
                                >
                                  {data.variationTitle}
                                </span>
                              )}
                            </div>

                            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                              Forked from{" "}
                              <span
                                onClick={() => data.sourceRecipeId && navigate(`/recipe/${data.sourceRecipeId}`)}
                                style={{ color: "#ea580c", fontWeight: "600", cursor: "pointer", textDecoration: "underline" }}
                              >
                                {data.originalRecipeName || "Original Recipe"}
                              </span>
                              {data.originalAuthorName && (
                                <span> by {data.originalAuthorName}</span>
                              )}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: "center", gap: "0.4rem" }}>
                            <button
                              style={{
                                ...editButtonStyle,
                                marginRight: 0,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/edit-recipe/${data._id}`);
                              }}
                              title="Edit variation"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              style={deleteButtonStyle}
                              onClick={() => handleDeleteClick(data)}
                              title="Delete fork"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>

        {/* Custom Delete Confirmation Modal */}
        {showDeleteModal && (
          <div style={modalOverlayStyle} onClick={cancelDelete}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={modalHeaderStyle}>
                <h5 style={modalTitleStyle}>
                  <i className="bi bi-exclamation-triangle"></i>
                  Delete Recipe
                </h5>
                <button style={closeButtonStyle} onClick={cancelDelete}>
                  &times;
                </button>
              </div>
              <div style={modalBodyStyle}>
                <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '1rem' }}>
                  Are you sure you want to delete <strong>&quot;{recipeToDelete?.recipeName}&quot;</strong>?
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                  This action cannot be undone.
                </p>
              </div>
              <div style={modalFooterStyle}>
                <button
                  style={cancelButtonStyle}
                  onClick={cancelDelete}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f8fafc';
                  }}
                >
                  Cancel
                </button>
                <button
                  style={confirmDeleteButtonStyle}
                  onClick={confirmDelete}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                  }}
                >
                  <i className="bi bi-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
