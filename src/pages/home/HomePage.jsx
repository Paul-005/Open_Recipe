import React from "react";
import { useHistory } from "react-router";
import CardImg from "../components/Cards";
import Footer from "../components/Footer";
import "./homepage.css";

export default function Home() {
  const history = useHistory();

  const items = [
    {
      img: "https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlJTIwYnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Cheese Burger",
      content: "To prepare this easy cheesy burger, put a pan on medium flame and heat oil in it. Once the oil is sufficiently hot, add the chopped onions, carrots, capsicum and saute these ingredients for few minutes. Then add tomato ketchup in it and give it a nice stir..."
    },
    {
      img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwdmVsdmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Red Velvet",
      content: "This red velvet cake has been adapted from The New York Times, with slight adjustments to the ingredients and the addition of oil for an even softer, richer and buttery melt-in-your-mouth cake..."
    },
    {
      img: "https://media.istockphoto.com/photos/pilaf-on-a-wooden-background-picture-id934255730?b=1&k=20&m=934255730&s=170667a&w=0&h=9bvWKkR03hKgf5CSgUmaglxI6ctzjZvWdDEG4Bwj7qw=",
      name: "Chicken Biriyani",
      content: "Chicken Biryani is a savory chicken and rice dish that includes layers of chicken, rice, and aromatics that are steamed together. The bottom layer of rice absorbs all the chicken juices as it cooks..."
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="hero-title">Discover & Share Amazing Recipes</h1>
                <p className="hero-subtitle">
                  Join our community of food enthusiasts. Share your culinary creations, get feedback, and discover new recipes from around the world.
                </p>
                <button 
                  className="cta-button"
                  onClick={() => history.push("/new-recipe")}
                >
                  Share Your Recipe
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
                alt="Cooking Illustration"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="container">
        <h2 className="section-title">Featured Recipes</h2>
        <div className="recipe-grid">
          {items.map((item, index) => (
            <div key={index} className="recipe-card">
              <img src={item.img} alt={item.name} className="recipe-image" />
              <div className="recipe-content">
                <h3 className="recipe-title">{item.name}</h3>
                <p className="recipe-description">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
