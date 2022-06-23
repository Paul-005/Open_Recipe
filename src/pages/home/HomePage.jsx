import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import CardImg from "../components/Cards";
import Footer from "../components/Footer";

export default function Home() {
  // const [items, setItems] = useState([]);

  const history = useHistory();

  const items = [
    {
      img:
        "https://images.unsplash.com/photo-1605789538467-f715d58e03f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlJTIwYnVyZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Cheese Burger",
      content:
        "To prepare this easy cheesy burger, put a pan on medium flame and heat oil in it. Once the oil is sufficiently hot, add the chopped onions, carrots, capsicum and saute these ingredients for few minutes. Then add tomato ketchup in it and give it a nice stir..........      "
    },
    {
      img:
        "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwdmVsdmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      name: "Red Velvet",
      content:
        "This red velvet cake has been adapted from The New York Times, with slight adjustments to the ingredients and the addition of oil for an even softer, richer and buttery melt-in-your-mouth cake. We tested a few versions with just butter, some with only oil, and some with half a dozen eggs! Truthfully, the one we are publishing is the best and received high praise from everyone who tried it. Both young and old!"
    },
    {
      img:
        "https://media.istockphoto.com/photos/pilaf-on-a-wooden-background-picture-id934255730?b=1&k=20&m=934255730&s=170667a&w=0&h=9bvWKkR03hKgf5CSgUmaglxI6ctzjZvWdDEG4Bwj7qw=",
      name: "Chicken Biriyani",
      content:
        "Chicken Biryani is a savory chicken and rice dish that includes layers of chicken, rice, and aromatics that are steamed together. The bottom layer of rice absorbs all the chicken juices as it cooks, giving it a tender texture and rich flavor, while the top layer of rice turns out white and fluffy. Buried in the Biryani, you’ll find whole cuts of succulent chicken bursting with flavor from the potent array of spices, herbs, and aromatics it’s marinated in.   "
    }
  ];

  return (
    <div>
      {/* Food banner */}
      <header className="masthead bg-dark ">
        <div className="container p-5">
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
            <div className="flex-column m-sm-4">
              <h1 className="display-3 lh-1 my-3 px-sm-5 text-light">
                Open Recipe
              </h1>
              <p className="lead fw-normal text-muted fs-sm-1 mb-5 justify-content-left text-left">
                Open source your recipe by sharing it with others. They will suggest the changes needed to make it.
              </p>{" "}
            </div>
            <img
              src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
              className="d-block img-fluid m-3  "
              alt="..."
              // width="600"
            />
          </div>
        </div>
      </header>

      <header className="masthead bg-dark text-white text-center"></header>
      <section className="page-section portfolio" id="portfolio">
        <div className="container">
          <h2 className="page-section-heading text-center text-uppercase text-secondary m-5">
            Some Recipes
          </h2>
          <div className="row justify-content-center">
            {/* Image maping */}
            {items.map((items, index) => (
              <CardImg key={index} items={items} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
