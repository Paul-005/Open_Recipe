import React, { useEffect, useState } from "react";

// Recipe Card Component with enhanced glassmorphism and clean design
const RecipeCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    position: 'relative',
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    animationDelay: `${index * 100}ms`,
    animation: 'fadeInUp 0.8s ease-out forwards',
    opacity: 0
  };

  const glassCardStyle = {
    position: 'relative',
    background: isHovered
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '24px',
    padding: '0',
    boxShadow: isHovered
      ? '0 32px 64px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      : '0 20px 40px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    height: '100%'
  };

  const imageContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '24px 24px 0 0',
    height: '240px'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: '6px 14px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '13px',
    fontWeight: '600',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    letterSpacing: '0.5px'
  };

  const contentStyle = {
    padding: '28px',
    height: 'calc(100% - 240px)',
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '12px',
    lineHeight: '1.3',
    transition: 'color 0.3s ease'
  };

  const descriptionStyle = {
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '24px',
    fontSize: '15px',
    flex: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px 24px',
    borderRadius: '16px',
    fontWeight: '600',
    fontSize: '15px',
    border: 'none',
    cursor: 'pointer',
    background: isHovered
      ? 'linear-gradient(135deg, #f59e0b, #f97316)'
      : 'rgba(0, 0, 0, 0.04)',
    color: isHovered ? 'white' : '#4a5568',
    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: isHovered
      ? '0 8px 25px rgba(245, 158, 11, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isHovered
      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1))'
      : 'transparent',
    transition: 'all 0.5s ease',
    borderRadius: '24px'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={glassCardStyle}>
        <div style={overlayStyle}></div>

        {/* Image Container */}
        <div style={imageContainerStyle}>
          <img
            src={item.img}
            alt={item.name}
            style={imageStyle}
          />
          <div style={badgeStyle}>
            Recipe #{index + 1}
          </div>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          <h3 style={titleStyle}>
            {item.name}
          </h3>
          <p style={descriptionStyle}>
            {item.content}
          </p>

          <button style={buttonStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

// Hero Section Component with refined design
const HeroSection = () => {
  const heroStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
    padding: '0 24px'
  };

  const contentWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    maxWidth: '1100px',
    width: '100%',
    flexWrap: 'wrap',
  };

  const imageContainerStyle = {
    flex: '1 1 340px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '260px',
    marginBottom: 0
  };

  const imageStyle = {
    maxWidth: '420px',
    width: '100%',
    borderRadius: '32px',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    transform: 'rotate(-1deg)',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'brightness(1.05) saturate(1.1)'
  };

  const textContainerStyle = {
    flex: '1 1 340px',
    minWidth: '260px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '1.5rem',
    padding: '0 1rem'
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #f59e0b, #f97316, #ef4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    textAlign: 'left'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    color: '#7c2d12',
    maxWidth: '650px',
    margin: 0,
    lineHeight: '1.7',
    fontWeight: '500',
    textAlign: 'left'
  };

  const floatingElementStyle = (delay, size, left, top) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    left: `${left}%`,
    top: `${top}%`,
    animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    filter: 'blur(1px)'
  });

  return (
    <div style={heroStyle}>
      {/* Floating Elements */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={floatingElementStyle(
            i * 0.5,
            20 + Math.random() * 40,
            Math.random() * 100,
            Math.random() * 100
          )}
        />
      ))}
      <div style={contentWrapperStyle}>
        <div style={imageContainerStyle}>
          <img
            src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
            style={imageStyle}
            alt="Open Recipe"
            onMouseEnter={(e) => e.target.style.transform = 'rotate(0deg) scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'rotate(-1deg) scale(1)'}
          />
        </div>
        <div style={textContainerStyle}>
          <h1 style={titleStyle}>Open Recipe</h1>
          <p style={subtitleStyle}>
            Open source your recipe by sharing it with others. They will suggest the changes needed to make it perfect and help you create culinary masterpieces.
          </p>
        </div>
      </div>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .hero-content-flex {
            flex-direction: column !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

// Main App Component
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
      content: "This red velvet cake has been adapted with slight adjustments to the ingredients and the addition of oil for an even softer, richer and buttery melt-in-your-mouth cake experience."
    },
    {
      img: "https://media.istockphoto.com/photos/pilaf-on-a-wooden-background-picture-id934255730?b=1&k=20&m=934255730&s=170667a&w=0&h=9bvWKkR03hKgf5CSgUmaglxI6ctzjZvWdDEG4Bwj7qw=",
      name: "Chicken Biryani",
      content: "Chicken Biryani is a savory chicken and rice dish that includes layers of chicken, rice, and aromatics that are steamed together. The bottom layer absorbs all the chicken juices."
    }
  ]);

  const containerStyle = {
    minHeight: '100vh',
    background: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const sectionStyle = {
    position: 'relative',
    padding: '100px 24px',
    background: 'linear-gradient(135deg, #fef7ed 0%, #ffffff 100%)'
  };

  const sectionHeaderStyle = {
    textAlign: 'center',
    marginBottom: '80px'
  };

  const sectionTitleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: '800',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em'
  };

  const sectionSubtitleStyle = {
    fontSize: '18px',
    color: '#64748b',
    maxWidth: '600px',
    margin: '0 auto 32px auto',
    lineHeight: '1.6'
  };

  const dividerStyle = {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
    margin: '0 auto',
    borderRadius: '2px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      {/* Add keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #f59e0b, #f97316);
          border-radius: 4px;
        }
      `}</style>

      {/* Hero Section */}
      <HeroSection />

      {/* Recipes Section */}
      <section style={sectionStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>
              Featured Recipes
            </h2>
            <p style={sectionSubtitleStyle}>
              Discover amazing recipes crafted by our passionate community of home cooks and professional chefs
            </p>
            <div style={dividerStyle}></div>
          </div>

          {/* Recipe Cards Grid */}
          <div style={gridStyle}>
            {items.map((item, index) => (
              <RecipeCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}