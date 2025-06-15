import React, { useEffect, useState } from "react";

// Recipe Card Component with glassmorphism and reflection effects
const RecipeCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    position: 'relative',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    transition: 'all 0.7s ease',
    animationDelay: `${index * 150}ms`,
    animation: 'fadeInUp 0.8s ease-out forwards',
    opacity: 0
  };

  const glassCardStyle = {
    position: 'relative',
    background: isHovered ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.02)', // Adjusted for white background
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)', // Adjusted for white background
    borderRadius: '24px',
    padding: '24px',
    boxShadow: isHovered ? '0 35px 60px -12px rgba(0, 0, 0, 0.2)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)', // Adjusted for white background
    transition: 'all 0.5s ease',
    marginBottom: '24px'
  };

  const reflectionStyle = {
    position: 'absolute',
    bottom: '-24px',
    left: '0',
    right: '0',
    height: '100%',
    opacity: '0.1', // Reduced opacity for white background
    transform: 'scaleY(-1)',
    filter: 'blur(2px)',
    pointerEvents: 'none',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent)', // Adjusted for white background
    borderRadius: '24px'
  };

  const imageContainerStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
    marginBottom: '24px',
    boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 10px 20px rgba(0, 0, 0, 0.1)', // Adjusted for white background
    transition: 'all 0.5s ease'
  };

  const imageStyle = {
    width: '100%',
    height: '256px',
    objectFit: 'cover',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 0.7s ease'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(0, 0, 0, 0.7)', // Changed to black background for contrast
    backdropFilter: 'blur(10px)',
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white', // Changed to white text
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid rgba(0, 0, 0, 0.3)' // Adjusted for white background
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: isHovered ? 'black' : '#4B5563', // Changed text color
    marginBottom: '12px',
    transition: 'color 0.3s ease'
  };

  const contentStyle = {
    color: '#4B5563', // Changed text color
    lineHeight: '1.6',
    marginBottom: '24px',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px 24px',
    borderRadius: '12px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    background: isHovered
      ? 'linear-gradient(to right, #FBBF24, #F97316)'
      : 'rgba(0, 0, 0, 0.1)', // Adjusted for white background
    color: isHovered ? 'black' : 'black', // Changed text color to black
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.2)' : 'none',
    transition: 'all 0.3s ease'
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Reflection Effect */}
      <div style={reflectionStyle}></div>

      {/* Main Card */}
      <div style={glassCardStyle}>
        {/* Image Container */}
        <div style={imageContainerStyle}>
          <img
            src={item.img}
            alt={item.name}
            style={imageStyle}
          />
          {/* Floating Badge */}
          <div style={badgeStyle}>
            Recipe #{index + 1}
          </div>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h3 style={titleStyle}>
            {item.name}
          </h3>
          <p style={contentStyle}>
            {item.content}
          </p>

          {/* Action Button */}
          <button style={buttonStyle}>
            View Recipe
          </button>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          width: '8px',
          height: '8px',
          background: '#FBBF24',
          borderRadius: '50%',
          opacity: '0.6',
          animation: 'pulse 2s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          width: '4px',
          height: '4px',
          background: '#60A5FA',
          borderRadius: '50%',
          opacity: '0.4',
          animation: 'pulse 2s infinite',
          animationDelay: '1s'
        }}></div>
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const heroStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  };

  const backgroundStyle = {
    position: 'absolute',
    inset: '0',
    background: 'white' // Changed to white
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '0 24px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '24px',
    background: 'linear-gradient(to right, #FBBF24, #EC4899, #EF4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'black', // Changed to black
    animation: 'pulse 3s infinite'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    color: 'black', // Changed to black
    maxWidth: '600px',
    margin: '0 auto 48px auto',
    lineHeight: '1.6'
  };

  const imageContainerStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const imageBackgroundStyle = {
    position: 'absolute',
    inset: '0',
    background: 'rgba(0, 0, 0, 0.05)', // Adjusted for white background
    backdropFilter: 'blur(4px)',
    borderRadius: '24px',
    transform: 'rotate(3deg) scale(1.05)'
  };

  const imageStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '400px',
    width: '100%',
    borderRadius: '24px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    transform: 'rotate(-2deg)',
    transition: 'transform 0.7s ease'
  };

  return (
    <div style={heroStyle}>
      {/* Animated Background */}
      <div style={backgroundStyle}></div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            background: 'rgba(0, 0, 0, 0.1)', // Changed for white background
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pulse ${2 + Math.random() * 3}s infinite`,
            animationDelay: `${Math.random() * 3}s`
          }}
        ></div>
      ))}

      <div style={contentStyle}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={titleStyle}>
            Open Recipe
          </h1>
          <p style={subtitleStyle}>
            Open source your recipe by sharing it with others. They will suggest the changes needed to make it perfect.
          </p>
        </div>

        {/* Hero Image with Glass Effect */}
        <div style={imageContainerStyle}>
          <div style={imageBackgroundStyle}></div>
          <img
            src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
            style={imageStyle}
            alt="Open Recipe"
            onMouseEnter={(e) => e.target.style.transform = 'rotate(0deg)'}
            onMouseLeave={(e) => e.target.style.transform = 'rotate(-2deg)'}
          />
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function Home() {
  const [items] = useState([
    {
      img: "https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlJTIwYnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Cheese Burger",
      content: "To prepare this easy cheesy burger, put a pan on medium flame and heat oil in it. Once the oil is sufficiently hot, add the chopped onions, carrots, capsicum and saute these ingredients for few minutes. Then add tomato ketchup in it and give it a nice stir."
    },
    {
      img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwdmVsdmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Red Velvet",
      content: "This red velvet cake has been adapted from The New York Times, with slight adjustments to the ingredients and the addition of oil for an even softer, richer and buttery melt-in-your-mouth cake. We tested a few versions with just butter, some with only oil, and some with half a dozen eggs!"
    },
    {
      img: "https://media.istockphoto.com/photos/pilaf-on-a-wooden-background-picture-id934255730?b=1&k=20&m=934255730&s=170667a&w=0&h=9bvWKkR03hKgf5CSgUmaglxI6ctzjZvWdDEG4Bwj7qw=",
      name: "Chicken Biriyani",
      content: "Chicken Biryani is a savory chicken and rice dish that includes layers of chicken, rice, and aromatics that are steamed together. The bottom layer of rice absorbs all the chicken juices as it cooks, giving it a tender texture and rich flavor, while the top layer of rice turns out white and fluffy."
    }
  ]);

  const containerStyle = {
    minHeight: '100vh',
    background: 'white' // Changed to white
  };

  const sectionStyle = {
    position: 'relative',
    padding: '80px 24px'
  };

  const sectionHeaderStyle = {
    textAlign: 'center',
    marginBottom: '64px'
  };

  const sectionTitleStyle = {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '24px',
    background: 'linear-gradient(to right, #FBBF24, #F97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'black' // Changed to black
  };

  const dividerStyle = {
    width: '96px',
    height: '4px',
    background: 'linear-gradient(to right, #FBBF24, #F97316)',
    margin: '0 auto',
    borderRadius: '2px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '48px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const decorativeStyle1 = {
    position: 'absolute',
    top: '40px',
    left: '40px',
    width: '128px',
    height: '128px',
    background: 'rgba(0, 0, 0, 0.05)', // Adjusted for white background
    borderRadius: '50%',
    filter: 'blur(40px)',
    animation: 'pulse 4s infinite'
  };

  const decorativeStyle2 = {
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    width: '160px',
    height: '160px',
    background: 'rgba(0, 0, 0, 0.05)', // Adjusted for white background
    borderRadius: '50%',
    filter: 'blur(40px)',
    animation: 'pulse 4s infinite',
    animationDelay: '2s'
  };

  return (
    <div style={containerStyle}>
      {/* Add keyframe animations */}
      <style>{`
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

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <HeroSection />

      {/* Recipes Section */}
      <section style={sectionStyle}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>
              Featured Recipes
            </h2>
            <div style={dividerStyle}></div>
          </div>

          {/* Recipe Cards Grid */}
          <div style={gridStyle}>
            {items.map((item, index) => (
              <RecipeCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div style={decorativeStyle1}></div>
        <div style={decorativeStyle2}></div>
      </section>
    </div>
  );
}
