import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { React_Backend } from "../backend_url";

export default function ContentEditingPage() {
  const [recipeName, setRecipeName] = useState("");
  const [Incredients, setIncredients] = useState("");
  const [RecipeContent, setRecipeContent] = useState("");
  const [FoodImg, setFoodImage] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function verifyUser() {
    if (!localStorage.getItem("jwt")) {
      history.push("/login");
    }
  }
  useEffect(() => {
    verifyUser();
  }, []);

  const history = useHistory();

  const publishContent = () => {
    const formData = new FormData();
    formData.append("recipeName", recipeName);
    formData.append("Incredients", Incredients);
    formData.append("RecipeContent", RecipeContent);
    formData.append("FoodImg", FoodImg);

    if (
      recipeName.length === 0 ||
      Incredients.length === 0 ||
      RecipeContent.length === 0 ||
      FoodImg === undefined
    )
      setError("Please fill all forms..");
    else if (
      localStorage.getItem("name") == null ||
      localStorage.getItem("username") == null
    )
      setError("Please Login To Retrieve Your Name And Email");
    else {
      setError("");
      setPending(true);
      axios({
        method: "post",
        headers: {
          token: localStorage.getItem("jwt"),
        },
        url: `${React_Backend}/new-recipe-post`,
        data: formData,
      })
        .then(() => {
          history.push("/recipes");
          setPending(false);
        })
        .catch((e) => setError(e.message));
    }
  };
  return (
    <>
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <img
              className="d-block mx-auto mb-4"
              src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
              alt=""
              width="100"
              height="100"
            />
            <h2>Open Recipe</h2>
            <p className="lead">Write Your Recipe Here</p>
          </div>

          {error && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {pending && (
            <div className="d-flex justify-content-center">
              <div
                class="spinner-border"
                style={{ height: 100, width: 100, color: "orange" }}
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {imagePreviewUrl && (
            <div>
              <img
                src={imagePreviewUrl}
                alt="Selected"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          )}

          <div className="col-sm-6">
            <label className="form-label">Food Image</label>
            <input
              type="file"
              name="foodImage"
              accept=" image/jpeg, image/jpg"
              className="form-control"
              placeholder="Food Item"
              onChange={(e) => {
                var file = e.target.files[0];
                setFoodImage(file);
                if (file) {
                  if (file.type === "image/jpeg" || file.type === "image/jpg") {
                    const imageUrl = URL.createObjectURL(file);
                    setImagePreviewUrl(imageUrl);
                    setError("");
                  } else {
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1854334933.
                    setError("Currently we only support jpeg images")
                  }
                }
              }}
              required
            />
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label">Recipe Name</label>
              <input
                onChange={(e) => setRecipeName(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Food Item"
                value={recipeName}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="text" className="form-label">
              Incredients
            </label>

            <div className="d-sm-flex">
              <textarea
                onChange={(e) => setIncredients(e.target.value)}
                className="form-control"
                row="6"
                placeholder="Cheese, Egg etc"
              />

              {/* <input
                type="time"
                className="form-control mx-3"
                style={{ width: "30%" }}
              /> */}
            </div>
          </div>

          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Enter Your Recipe
            </label>
            <textarea
              onChange={(e) => setRecipeContent(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="20"
              placeholder="Recipe Here"
            />
          </div>
          <button
            className="  btn btn-primary m-4 "
            type="submit"
            onClick={publishContent}
          >
            Publish
          </button>
        </main>
      </div>{" "}
      <Footer />
    </>
  );
}
