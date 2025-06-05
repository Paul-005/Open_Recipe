import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { React_Backend } from "../backend_url"; // Assuming this holds your backend URL

export default function ContentEditingPage() {
  const [recipeName, setRecipeName] = useState("");
  const [Incredients, setIncredients] = useState("");
  const [RecipeContent, setRecipeContent] = useState("");
  const [FoodImg, setFoodImage] = useState(null); // Initialize with null
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const history = useHistory(); // Initialize useHistory here

  // Cloudinary credentials (replace with your actual values)
  const CLOUDINARY_CLOUD_NAME = 'dqboa6lkh'; // Your Cloudinary cloud name
  const CLOUDINARY_UPLOAD_PRESET = 'Open Recipe'; // Your unsigned upload preset

  useEffect(() => {
    verifyUser();
  }, []);

  function verifyUser() {
    if (!localStorage.getItem("jwt")) {
      history.push("/login");
    }
  }

  // This function is now specifically for uploading to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    if (!file) return null; // Handle case where no file is selected

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.secure_url; // Cloudinary returns 'secure_url' for HTTPS
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary:", uploadError);
      setError("Failed to upload image. Please try again.");
      throw uploadError; // Re-throw to be caught by publishContent
    }
  };

  const publishContent = async () => {
    // Clear previous errors
    setError("");

    // 1. Basic Form Validation
    if (
      !recipeName ||
      !Incredients ||
      !RecipeContent ||
      !FoodImg
    ) {
      setError("Please fill all forms and select an image.");
      return;
    }

    // 2. User Authentication Check
    if (
      localStorage.getItem("name") === null ||
      localStorage.getItem("username") === null
    ) {
      setError("Please Login To Retrieve Your Name And Email.");
      return;
    }

    setPending(true); // Start pending state

    try {
      // 3. Upload Image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(FoodImg);

      if (!imageUrl) {
        setError("Image upload failed. Cannot publish content.");
        setPending(false);
        return;
      }

      // 4. Prepare data for backend
      const postData = {
        recipeName,
        Incredients,
        RecipeContent,
        thumbnail: imageUrl, // Send the Cloudinary URL to your backend
        // Assuming your backend expects author information from JWT or context
      };

      // 5. Send data to your backend
      await axios.post(
        `${React_Backend}/recipes/new`,
        postData, // Send as JSON, not FormData, if backend is expecting JSON
        {
          headers: {
            token: localStorage.getItem("jwt"),
            'Content-Type': 'application/json', // Specify content type for JSON
          },
        }
      );

      // 6. On success
      history.push("/recipes");

    } catch (e) {
      console.error("Error publishing content:", e);
      setError(e.message || "An error occurred while publishing content.");
    } finally {
      setPending(false); // End pending state
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
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {pending && (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border"
                style={{ height: 100, width: 100, color: "orange" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
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
              accept="image/jpeg, image/jpg"
              className="form-control"
              placeholder="Food Item"
              onChange={(e) => {
                const file = e.target.files[0];
                setFoodImage(file);
                if (file) {
                  if (file.type === "image/jpeg" || file.type === "image/jpg") {
                    const imageUrl = URL.createObjectURL(file);
                    setImagePreviewUrl(imageUrl);
                    setError(""); // Clear error if image type is correct
                  } else {
                    setImagePreviewUrl(null); // Clear preview for invalid file type
                    setFoodImage(null); // Don't set the invalid file
                    setError("Currently we only support JPEG images");
                  }
                } else {
                  setImagePreviewUrl(null); // Clear preview if no file is selected
                  setFoodImage(null);
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
                rows="6" // Changed row to rows for correct HTML attribute
                placeholder="Cheese, Egg etc"
                value={Incredients}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Enter Your Recipe
            </label>
            <textarea
              onChange={(e) => setRecipeContent(e.target.value)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="20"
              placeholder="Recipe Here"
              value={RecipeContent}
            />
          </div>
          <button
            className="btn btn-primary m-4"
            type="submit"
            onClick={publishContent}
            disabled={pending} // Disable button while pending
          >
            {pending ? "Publishing..." : "Publish"}
          </button>
        </main>
      </div>
      <Footer />
    </>
  );
}