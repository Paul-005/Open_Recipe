import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const [authState, setAuthState] = useState(false);
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      setAuthState(true);
      setName(localStorage.getItem("name"));
    }
  }, []);

  const navStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease'
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#f2750a',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  const logoStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(242, 117, 10, 0.3)'
  };

  const navLinkStyle = {
    color: '#475569',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative'
  };

  const navLinkHoverStyle = {
    ...navLinkStyle,
    color: '#f2750a',
    background: 'rgba(242, 117, 10, 0.1)'
  };

  const buttonStyle = {
    padding: '0.625rem 1.25rem',
    borderRadius: '0.75rem',
    fontWeight: '500',
    fontSize: '0.875rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #f2750a, #e35d05)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(242, 117, 10, 0.3)'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'transparent',
    color: '#475569',
    border: '2px solid #e2e8f0'
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
    background: 'rgba(242, 117, 10, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const mobileMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    display: isMenuOpen ? 'block' : 'none'
  };

  return (
    <nav style={navStyle}>
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center py-3">
          {/* Brand */}
          <div style={brandStyle} onClick={() => history.push("/")}>
            <img
              src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
              alt="Open Recipe"
              style={logoStyle}
            />
            <span>Open Recipe</span>
          </div>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            <div
              style={navLinkStyle}
              onClick={() => history.push("/")}
              onMouseEnter={(e) => {
                e.target.style.color = navLinkHoverStyle.color;
                e.target.style.background = navLinkHoverStyle.background;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = navLinkStyle.color;
                e.target.style.background = 'transparent';
              }}
            >
              <i className="bi bi-house-door me-2"></i>
              Home
            </div>
            <div
              style={navLinkStyle}
              onClick={() => history.push("/recipes")}
              onMouseEnter={(e) => {
                e.target.style.color = navLinkHoverStyle.color;
                e.target.style.background = navLinkHoverStyle.background;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = navLinkStyle.color;
                e.target.style.background = 'transparent';
              }}
            >
              <i className="bi bi-book me-2"></i>
              Recipes
            </div>
            {authState && (
              <div
                style={navLinkStyle}
                onClick={() => history.push("/content-editing")}
                onMouseEnter={(e) => {
                  e.target.style.color = navLinkHoverStyle.color;
                  e.target.style.background = navLinkHoverStyle.background;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = navLinkStyle.color;
                  e.target.style.background = 'transparent';
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Post Recipe
              </div>
            )}
          </div>

          {/* Auth Section */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {!authState ? (
              <div className="d-flex gap-2">
                <button
                  style={secondaryButtonStyle}
                  onClick={() => history.push("/login")}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f1f5f9';
                    e.target.style.borderColor = '#cbd5e1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#e2e8f0';
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>
                <button
                  style={primaryButtonStyle}
                  onClick={() => history.push("/signup")}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #e35d05, #bc4508)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #f2750a, #e35d05)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Sign Up
                </button>
              </div>
            ) : (
              <div
                style={profileStyle}
                onClick={() => history.push("/profile")}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(242, 117, 10, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(242, 117, 10, 0.1)';
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f2750a, #e35d05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ color: '#475569', fontWeight: '500' }}>
                  {name || 'User'}
                </span>
                <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem', color: '#94a3b8' }}></i>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="d-lg-none btn"
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '1.5rem',
              color: '#475569'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={mobileMenuStyle}>
          <div className="d-flex flex-column gap-3">
            <div
              style={navLinkStyle}
              onClick={() => {
                history.push("/");
                setIsMenuOpen(false);
              }}
            >
              <i className="bi bi-house-door me-2"></i>
              Home
            </div>
            <div
              style={navLinkStyle}
              onClick={() => {
                history.push("/recipes");
                setIsMenuOpen(false);
              }}
            >
              <i className="bi bi-book me-2"></i>
              Recipes
            </div>
            {authState && (
              <div
                style={navLinkStyle}
                onClick={() => {
                  history.push("/content-editing");
                  setIsMenuOpen(false);
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Post Recipe
              </div>
            )}
            
            <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
            
            {!authState ? (
              <div className="d-flex flex-column gap-2">
                <button
                  style={secondaryButtonStyle}
                  onClick={() => {
                    history.push("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </button>
                <button
                  style={primaryButtonStyle}
                  onClick={() => {
                    history.push("/signup");
                    setIsMenuOpen(false);
                  }}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Sign Up
                </button>
              </div>
            ) : (
              <div
                style={profileStyle}
                onClick={() => {
                  history.push("/profile");
                  setIsMenuOpen(false);
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f2750a, #e35d05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ color: '#475569', fontWeight: '500' }}>
                  {name || 'User'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}