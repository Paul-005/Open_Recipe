import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Hero Section Component
const HeroSection = () => {
  const history = useHistory();
  
  const heroStyle = {
    background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const decorativeCircle1 = {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(242, 117, 10, 0.1)',
    filter: 'blur(40px)',
    animation: 'float 6s ease-in-out infinite'
  };

  const decorativeCircle2 = {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(251, 146, 60, 0.15)',
    filter: 'blur(30px)',
    animation: 'float 8s ease-in-out infinite reverse'
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        
        .animate-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
      `}</style>
      
      <section style={heroStyle}>
        <div style={decorativeCircle1}></div>
        <div style={decorativeCircle2}></div>
        
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="animate-fade-in-up">
                <h1 
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '800',
                    color: '#0f172a',
                    marginBottom: '1.5rem',
                    lineHeight: '1.1'
                  }}
                >
                  Share Your
                  <span 
                    style={{
                      background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'block'
                    }}
                  >
                    Culinary Magic
                  </span>
                </h1>
              </div>
              
              <div className="animate-fade-in-up animate-delay-200">
                <p 
                  style={{
                    fontSize: '1.25rem',
                    color: '#475569',
                    marginBottom: '2rem',
                    lineHeight: '1.6',
                    maxWidth: '500px'
                  }}
                >
                  Open source your recipes and let the community help you perfect them. 
                  Share, discover, and create amazing dishes together.
                </p>
              </div>
              
              <div className="animate-fade-in-up animate-delay-400">
                <div className="d-flex flex-wrap gap-3">
                  <button
                    onClick={() => history.push("/recipes")}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '1rem',
                      background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
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
                    <i className="bi bi-search"></i>
                    Explore Recipes
                  </button>
                  
                  <button
                    onClick={() => history.push("/content-editing")}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '1rem',
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: '#f2750a',
                      border: '2px solid rgba(242, 117, 10, 0.2)',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.borderColor = '#f2750a';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.borderColor = 'rgba(242, 117, 10, 0.2)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="bi bi-plus-circle"></i>
                    Share Recipe
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div 
                className="animate-fade-in-up animate-delay-200"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '400px',
                    height: '400px',
                    maxWidth: '100%'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: '0',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '2rem',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transform: 'rotate(6deg)'
                    }}
                  ></div>
                  <img
                    src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
                    alt="Open Recipe"
                    style={{
                      position: 'relative',
                      zIndex: 10,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '2rem',
                      filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Recipe Card Component
const RecipeCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

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

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => history.push("/recipes")}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={item.img}
          alt={item.name}
          style={{
            ...imageStyle,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div style={badgeStyle}>
          Featured
        </div>
      </div>
      
      <div style={contentStyle}>
        <h3 style={titleStyle}>{item.name}</h3>
        <p style={descriptionStyle}>{item.content}</p>
        
        <button style={buttonStyle}>
          <i className="bi bi-arrow-right"></i>
          View Recipe
        </button>
      </div>
    </div>
  );
};

// Stats Section Component
const StatsSection = () => {
  const stats = [
    { number: '1000+', label: 'Recipes Shared', icon: 'bi-book' },
    { number: '500+', label: 'Active Cooks', icon: 'bi-people' },
    { number: '50+', label: 'Countries', icon: 'bi-globe' },
    { number: '24/7', label: 'Community Support', icon: 'bi-chat-heart' }
  ];

  const sectionStyle = {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '5rem 0',
    color: 'white'
  };

  const statCardStyle = {
    textAlign: 'center',
    padding: '2rem 1rem'
  };

  const iconStyle = {
    fontSize: '3rem',
    color: '#f2750a',
    marginBottom: '1rem'
  };

  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '0.5rem'
  };

  const labelStyle = {
    fontSize: '1.1rem',
    color: '#cbd5e1',
    fontWeight: '500'
  };

  return (
    <section style={sectionStyle}>
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div style={statCardStyle}>
                <i className={stat.icon} style={iconStyle}></i>
                <div style={numberStyle}>{stat.number}</div>
                <div style={labelStyle}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Home Component
export default function Home() {
  const [items] = useState([
    {
      img: "https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlJTIwYnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Cheese Burger",
      content: "To prepare this easy cheesy burger, put a pan on medium flame and heat oil in it. Once the oil is sufficiently hot, add the chopped onions, carrots, capsicum and saute these ingredients for few minutes."
    },
    {
      img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwdmVsdmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Red Velvet Cake",
      content: "This red velvet cake has been adapted with slight adjustments to the ingredients and the addition of oil for an even softer, richer and buttery melt-in-your-mouth cake."
    },
    {
      img: "https://media.istockphoto.com/photos/pilaf-on-a-wooden-background-picture-id934255730?b=1&k=20&m=934255730&s=170667a&w=0&h=9bvWKkR03hKgf5CSgUmaglxI6ctzjZvWdDEG4Bwj7qw=",
      name: "Chicken Biryani",
      content: "Chicken Biryani is a savory chicken and rice dish that includes layers of chicken, rice, and aromatics that are steamed together for rich flavor and tender texture."
    }
  ];

  const featuredSectionStyle = {
    padding: '5rem 0',
    background: '#fefefe'
  };

  const sectionHeaderStyle = {
    textAlign: 'center',
    marginBottom: '4rem'
  };

  const sectionTitleStyle = {
    fontSize: '3rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '1rem'
  };

  const sectionSubtitleStyle = {
    fontSize: '1.25rem',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto'
  };

  return (
    <div style={{ background: '#fefefe' }}>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Featured Recipes Section */}
      <section style={featuredSectionStyle}>
        <div className="container">
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Featured Recipes</h2>
            <p style={sectionSubtitleStyle}>
              Discover amazing recipes shared by our community of passionate cooks from around the world.
            </p>
          </div>
          
          <div className="row g-4">
            {items.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <RecipeCard item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}