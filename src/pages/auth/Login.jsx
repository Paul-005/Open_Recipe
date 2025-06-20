import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { React_Backend } from "../backend_url";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${React_Backend}/login`, {
        email,
        password
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.err) {
          setLoading(false);
          setError(response.data.err);
        }
        if (response.data.token !== undefined) {
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("username", response.data.user.email);
          localStorage.setItem("name", response.data.user.name);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("userId", response.data.user._id);
          window.location.href = "/";
          setError("");
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setError(error.toString());
        setLoading(false);
      });
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem'
  };

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '2rem',
    padding: '3rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    width: '100%',
    maxWidth: '450px'
  };

  const logoStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '0.5rem',
    textAlign: 'center'
  };

  const subtitleStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#475569',
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const inputGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#fafafa'
  };

  const inputFocusStyle = {
    outline: 'none',
    borderColor: '#f2750a',
    background: 'white',
    boxShadow: '0 0 0 3px rgba(242, 117, 10, 0.1)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
    color: 'white',
    border: 'none',
    borderRadius: '1rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)',
    marginBottom: '1.5rem'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 35px rgba(242, 117, 10, 0.4)'
  };

  const linkStyle = {
    color: '#f2750a',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  };

  const alertStyle = {
    background: '#fef2f2',
    color: '#991b1b',
    padding: '1rem',
    borderRadius: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #fecaca',
    fontSize: '0.875rem'
  };

  const spinnerStyle = {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '0.5rem'
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
        <div style={formContainerStyle}>
          <div style={{ textAlign: 'center' }}>
            <img
              src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
              alt="Open Recipe"
              style={logoStyle}
            />
            <h1 style={titleStyle}>Open Recipe</h1>
            <h2 style={subtitleStyle}>Welcome Back</h2>
          </div>

          {error && (
            <div style={alertStyle}>
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={submitForm}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                style={inputStyle}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => {
                  Object.assign(e.target.style, inputFocusStyle);
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.background = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                style={inputStyle}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => {
                  Object.assign(e.target.style, inputFocusStyle);
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.background = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{
                    marginRight: '0.5rem',
                    width: '18px',
                    height: '18px',
                    accentColor: '#f2750a'
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Remember me
                </span>
              </label>
            </div>

            <button
              type="submit"
              style={buttonStyle}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  Object.assign(e.target.style, buttonHoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(242, 117, 10, 0.3)';
                }
              }}
            >
              {loading && <div style={spinnerStyle}></div>}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#6b7280' }}>Don't have an account? </span>
              <span
                style={linkStyle}
                onClick={() => navigate("/signup")}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ea580c';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#f2750a';
                }}
              >
                Sign Up
              </span>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                &copy; 2024 Open Recipe. All rights reserved.
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}