import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyForksPage() {
  const [forks, setForks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'published' | 'private'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [forkToDelete, setForkToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyUser();
    fetchUserForks();
  }, []);

  const verifyUser = () => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  };

  const fetchUserForks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/my-forks`,
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      );
      setForks(response.data || []);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
      setError(err.response?.data?.error || err.message || "Failed to fetch forks.");
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!forkToDelete) return;
    setIsDeleting(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/${forkToDelete._id}`,
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      );
      setForks(forks.filter((f) => f._id !== forkToDelete._id));
      setShowDeleteModal(false);
      setForkToDelete(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete fork.");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredForks = forks.filter((f) => {
    if (filter === "published") return f.visibility === "public";
    if (filter === "private") return f.visibility === "private";
    return true;
  });

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #ffffff 100%)",
    padding: "3rem 0",
  };

  const headerCardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "2rem",
    padding: "2.5rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    marginBottom: "2rem",
  };

  const filterButtonStyle = (active) => ({
    padding: "0.6rem 1.4rem",
    borderRadius: "2rem",
    border: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: active
      ? "linear-gradient(135deg, #f2750a, #ea580c)"
      : "white",
    color: active ? "white" : "#64748b",
    boxShadow: active
      ? "0 4px 12px rgba(242, 117, 10, 0.3)"
      : "0 2px 6px rgba(0, 0, 0, 0.05)",
  });

  const cardStyle = {
    background: "white",
    borderRadius: "1.5rem",
    border: "1px solid rgba(0, 0, 0, 0.06)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <>
      <style>{`
        .forks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .forks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={containerStyle}>
        <div className="container">
          {/* Header Card */}
          <div style={headerCardStyle}>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      background: "linear-gradient(135deg, #f2750a, #ea580c)",
                      color: "white",
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      boxShadow: "0 4px 12px rgba(242, 117, 10, 0.3)",
                    }}
                  >
                    <i className="bi bi-diagram-2"></i>
                  </span>
                  <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                    My Recipe Forks
                  </h1>
                </div>
                <p style={{ color: "#64748b", margin: 0, fontSize: "1.05rem" }}>
                  Manage your personal recipe variations, draft experiments, and published community contributions.
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => navigate("/recipes")}
                  style={{
                    background: "white",
                    color: "#f2750a",
                    border: "2px solid #f2750a",
                    padding: "0.6rem 1.4rem",
                    borderRadius: "0.75rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f2750a";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "white";
                    e.target.style.color = "#f2750a";
                  }}
                >
                  <i className="bi bi-compass me-2"></i>
                  Explore Recipes to Fork
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <button
                style={filterButtonStyle(filter === "all")}
                onClick={() => setFilter("all")}
              >
                All Forks ({forks.length})
              </button>
              <button
                style={filterButtonStyle(filter === "published")}
                onClick={() => setFilter("published")}
              >
                <i className="bi bi-globe me-2"></i>
                Published ({forks.filter((f) => f.visibility === "public").length})
              </button>
              <button
                style={filterButtonStyle(filter === "private")}
                onClick={() => setFilter("private")}
              >
                <i className="bi bi-lock me-2"></i>
                Drafts ({forks.filter((f) => f.visibility === "private").length})
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#991b1b",
                padding: "1rem 1.5rem",
                borderRadius: "1rem",
                marginBottom: "2rem",
                border: "1px solid #fecaca",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <i className="bi bi-exclamation-triangle-fill"></i>
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "5px solid rgba(242, 117, 10, 0.2)",
                  borderTop: "5px solid #f2750a",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 1rem auto",
                }}
              ></div>
              <div style={{ color: "#64748b", fontWeight: "500" }}>Loading your forks...</div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredForks.length === 0 && (
            <div
              style={{
                background: "white",
                borderRadius: "2rem",
                padding: "4rem 2rem",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "#fef7ed",
                  color: "#ea580c",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <i className="bi bi-diagram-2"></i>
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>
                {filter === "all"
                  ? "No recipe forks yet"
                  : filter === "published"
                  ? "No published variations yet"
                  : "No private drafts yet"}
              </h3>
              <p style={{ color: "#64748b", maxWidth: "520px", margin: "0 auto 2rem auto", lineHeight: "1.6" }}>
                Forking allows you to take any existing recipe, tweak the ingredients or instructions to your liking,
                and maintain your own private or public variation.
              </p>
              <button
                onClick={() => navigate("/recipes")}
                style={{
                  background: "linear-gradient(135deg, #f2750a, #ea580c)",
                  color: "white",
                  border: "none",
                  padding: "0.85rem 2rem",
                  borderRadius: "0.75rem",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(242, 117, 10, 0.3)",
                }}
              >
                <i className="bi bi-search me-2"></i>
                Browse Recipes to Fork
              </button>
            </div>
          )}

          {/* Forks Grid */}
          {!loading && filteredForks.length > 0 && (
            <div className="forks-grid">
              {filteredForks.map((fork) => {
                const isPublic = fork.visibility === "public";
                return (
                  <div
                    key={fork._id}
                    style={cardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.05)";
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: "relative", height: "180px", background: "#f1f5f9" }}>
                      {fork.thumbnail ? (
                        <img
                          src={fork.thumbnail}
                          alt={fork.recipeName}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#cbd5e1",
                            fontSize: "3rem",
                          }}
                        >
                          <i className="bi bi-card-image"></i>
                        </div>
                      )}

                      {/* Status Badge */}
                      <span
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          padding: "0.35rem 0.85rem",
                          borderRadius: "2rem",
                          fontSize: "0.8rem",
                          fontWeight: "700",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          background: isPublic ? "#dcfce7" : "#fef3c7",
                          color: isPublic ? "#15803d" : "#b45309",
                          border: `1px solid ${isPublic ? "#bbf7d0" : "#fde68a"}`,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        }}
                      >
                        <i className={isPublic ? "bi bi-globe" : "bi bi-lock-fill"}></i>
                        {isPublic ? "Public Variation" : "Private Draft"}
                      </span>

                      {/* Revision Pill */}
                      <span
                        style={{
                          position: "absolute",
                          top: "1rem",
                          left: "1rem",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "2rem",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          background: "rgba(15, 23, 42, 0.75)",
                          color: "white",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        Rev. {fork.revision || 1}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Variation Title or Recipe Name */}
                      <div style={{ marginBottom: "0.5rem" }}>
                        {fork.variationTitle && (
                          <div
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: "700",
                              color: "#ea580c",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              marginBottom: "0.25rem",
                            }}
                          >
                            <i className="bi bi-tag me-1"></i>
                            {fork.variationTitle}
                          </div>
                        )}
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "700",
                            color: "#0f172a",
                            margin: 0,
                            lineHeight: "1.4",
                          }}
                        >
                          {fork.recipeName}
                        </h3>
                      </div>

                      {/* Attribution */}
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#64748b",
                          marginBottom: "1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        <i className="bi bi-diagram-2" style={{ color: "#f2750a" }}></i>
                          <span>
                            Forked from{" "}
                            <span
                              onClick={() => fork.sourceRecipeId && navigate(`/recipe/${fork.sourceRecipeId}`)}
                              style={{
                                fontWeight: "600",
                                color: "#ea580c",
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                            >
                              {fork.originalRecipeName || "Original Recipe"}
                            </span>
                            {fork.originalAuthorName && (
                              <span style={{ color: "#64748b", fontWeight: "normal" }}>
                                {" "}by {fork.originalAuthorName}
                              </span>
                            )}
                          </span>
                      </div>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: "0.95rem",
                          color: "#475569",
                          lineHeight: "1.5",
                          flex: 1,
                          margin: "0 0 1.25rem 0",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {fork.variationDescription ||
                          "Personal customized variation of the recipe. Open recipe to view ingredients and preparation method."}
                      </p>

                      {/* Meta badges */}
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          fontSize: "0.85rem",
                          color: "#64748b",
                          marginBottom: "1.25rem",
                          paddingTop: "0.75rem",
                          borderTop: "1px solid #f1f5f9",
                        }}
                      >
                        {fork.cookingTime && (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <i className="bi bi-clock"></i>
                            {fork.cookingTime}
                          </div>
                        )}
                        {fork.servings && (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                            <i className="bi bi-people"></i>
                            {fork.servings} Servings
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                        <button
                          onClick={() => navigate(`/recipe/${fork._id}`)}
                          style={{
                            flex: 1,
                            background: "linear-gradient(135deg, #f2750a, #ea580c)",
                            color: "white",
                            border: "none",
                            padding: "0.65rem 1rem",
                            borderRadius: "0.65rem",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.4rem",
                          }}
                        >
                          <i className="bi bi-eye"></i>
                          View
                        </button>

                        <button
                          onClick={() => navigate(`/edit-recipe/${fork._id}`)}
                          style={{
                            background: "#f8fafc",
                            color: "#0284c7",
                            border: "1px solid #e2e8f0",
                            padding: "0.65rem 1rem",
                            borderRadius: "0.65rem",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.4rem",
                          }}
                          title="Edit this variation"
                        >
                          <i className="bi bi-pencil"></i>
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setForkToDelete(fork);
                            setShowDeleteModal(true);
                          }}
                          style={{
                            background: "#fef2f2",
                            color: "#ef4444",
                            border: "1px solid #fecaca",
                            padding: "0.65rem",
                            borderRadius: "0.65rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Delete this fork"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "1.5rem",
              padding: "2rem",
              maxWidth: "460px",
              width: "90%",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                }}
              >
                <i className="bi bi-exclamation-triangle"></i>
              </span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                Delete Recipe Fork?
              </h3>
            </div>
            <p style={{ color: "#475569", lineHeight: "1.5", marginBottom: "1.5rem" }}>
              Are you sure you want to delete <strong>{forkToDelete?.recipeName}</strong>?
              This action cannot be undone. The original recipe will remain untouched.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setForkToDelete(null);
                }}
                disabled={isDeleting}
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  border: "none",
                  padding: "0.7rem 1.4rem",
                  borderRadius: "0.75rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  border: "none",
                  padding: "0.7rem 1.4rem",
                  borderRadius: "0.75rem",
                  fontWeight: "600",
                  cursor: isDeleting ? "wait" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {isDeleting ? "Deleting..." : "Delete Fork"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
