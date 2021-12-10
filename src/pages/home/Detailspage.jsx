import Navbar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function DetailsPage() {
  const [items, setItems] = useState([]);
  const [pending, setpending] = useState(true);

  const history = useHistory();
  const params = useParams();

  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <section class="py-5 bg-light">
        <div class="col mb-5">
          <div class="card h-100">
            <div class="badge bg-dark text-white position-absolute">Sale</div>
            {!pending && (
              <img
                class="card-img-top  img-fluid"
                src={items.fields.thumbNail.fields.file.url}
                alt="..."
              />
            )}

            <div class="card-body p-4">
              <div class="text-center">
                <h5 class="fw-bolder">Sale Item</h5>
                <span class="text-muted text-decoration-line-through">
                  $50.00
                </span>
                $25.00
              </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <a class="btn btn-outline-dark mt-auto">Add to cart</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
