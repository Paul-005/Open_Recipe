import React from "react";

export default function Carousel() {
  return (
    <div
      id="carouselExampleControls"
      class="carousel slide  "
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active ">
          <img
            src="https://media.istockphoto.com/photos/delicious-homemade-hamburger-and-french-fries-picture-id1254672762?b=1&k=20&m=1254672762&s=170667a&w=0&h=nKrG40G2jj9O8wzJ8wDD2zmUKNp00mcdVWK_f_zixug="
            class="d-block "
            alt="..."
            // width="600"
            className="img-fluid"
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://media.istockphoto.com/photos/tasty-burgers-on-wooden-table-picture-id860411132?b=1&k=20&m=860411132&s=170667a&w=0&h=sMT5WOeKgaKv1YBdYhVilc7fs3aH7u_JbbWl92m9ifI="
            class="d-block "
            alt="..."
            className="img-fluid"
            // width="600"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}
