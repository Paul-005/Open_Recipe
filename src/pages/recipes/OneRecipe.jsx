export default function OneRecipe() {
  return (
    <>
      <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
          <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6">
              <h1 class="display-5 fw-bolder">Recipe Item</h1>

              <p class="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium at dolorem quidem modi. Nam sequi consequatur
                obcaecati excepturi alias magni, accusamus eius blanditiis
                delectus ipsam minima ea iste laborum vero?
              </p>
              <div class="d-flex">
                <input
                  class="form-control text-center me-3"
                  id="inputQuantity"
                  type="num"
                  value="1"
                />
                <button
                  class="btn btn-outline-dark flex-shrink-0"
                  type="button"
                >
                  <i class="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
