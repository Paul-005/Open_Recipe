export default function Footer() {
  const footerStyle = {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: 'white',
    padding: '3rem 0 2rem 0',
    marginTop: '4rem'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const brandStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem'
  };

  const logoStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '0.75rem'
  };

  const brandTextStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#f2750a'
  };

  const descriptionStyle = {
    color: '#cbd5e1',
    lineHeight: '1.6',
    marginBottom: '1.5rem'
  };

  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: 'white'
  };

  const linkStyle = {
    color: '#cbd5e1',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  };

  const socialStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  };

  const socialIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(242, 117, 10, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f2750a',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const dividerStyle = {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
    margin: '2rem 0'
  };

  const copyrightStyle = {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '0.875rem'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          {/* Brand Section */}
          <div>
            <div style={brandStyle}>
              <img
                src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
                alt="Open Recipe"
                style={logoStyle}
              />
              <span style={brandTextStyle}>Open Recipe</span>
            </div>
            <p style={descriptionStyle}>
              Share your culinary passion with the world. Discover, create, and perfect recipes together with our amazing community of food lovers.
            </p>
            <div style={socialStyle}>
              <div
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f2750a';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(242, 117, 10, 0.1)';
                  e.target.style.color = '#f2750a';
                }}
              >
                <i className="bi bi-facebook"></i>
              </div>
              <div
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f2750a';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(242, 117, 10, 0.1)';
                  e.target.style.color = '#f2750a';
                }}
              >
                <i className="bi bi-twitter"></i>
              </div>
              <div
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f2750a';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(242, 117, 10, 0.1)';
                  e.target.style.color = '#f2750a';
                }}
              >
                <i className="bi bi-instagram"></i>
              </div>
              <div
                style={socialIconStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f2750a';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(242, 117, 10, 0.1)';
                  e.target.style.color = '#f2750a';
                }}
              >
                <i className="bi bi-youtube"></i>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={sectionTitleStyle}>Quick Links</h3>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Home
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Recipes
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Share Recipe
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Community
            </a>
          </div>

          {/* Categories */}
          <div>
            <h3 style={sectionTitleStyle}>Categories</h3>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Appetizers
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Main Courses
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Desserts
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Beverages
            </a>
          </div>

          {/* Support */}
          <div>
            <h3 style={sectionTitleStyle}>Support</h3>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Help Center
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Contact Us
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Privacy Policy
            </a>
            <a
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#f2750a';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#cbd5e1';
              }}
            >
              Terms of Service
            </a>
          </div>
        </div>

        <div style={dividerStyle}></div>

        <div style={copyrightStyle}>
          <p>&copy; 2024 Open Recipe. All rights reserved. Made with ❤️ for food lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}