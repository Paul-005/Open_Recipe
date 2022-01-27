import axios from "axios";
import { useState } from "react";
import { React_Backend } from "../backend_url";

export default function ProPaymentUI() {
  const [pending, setpedning] = useState(false);

  const PayForPro = () => {
    setpedning(true);

    axios
      .get(`${React_Backend}/propayment`)
      .then((res) => {
        setpedning(false);
        window.location.href = res.data.url;
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className="container py-3">
        <header>
          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-bold">Pricing</h1>

            {/* Payment Loader */}
            {pending && (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </header>

        <main>
          <div className=" d-flex  justify-content-center align-items-center my-3 text-center">
            <div className="card mb-4 w-sm-50 rounded-5 shadow-lg">
              <div className="card-header py-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1086/1086741.png"
                  alt=""
                  style={{ height: 100, width: 100 }}
                />
                <h4 className="my-0 fw-normal">
                  Pro <i className="bi bi-emoji-smile-fill"></i> MemberShip
                </h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">Rs. 200.0</h1>
                <p className="lead">You'll get a pro badge in acount</p>
                <p className="lead">
                  Others would see the badge while you post recipe or mention
                  any comment in others r ecipe
                </p>
                <button
                  onClick={PayForPro}
                  className="w-50 btn btn-lg btn-primary"
                >
                  Pay <i className="bi bi-currency-exchange"></i> Now
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
