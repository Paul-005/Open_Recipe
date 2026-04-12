import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContentEditingPage() {
  const [recipeName, setRecipeName] = useState("");
  const [Incredients, setIncredients] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [RecipeContent, setRecipeContent] = useState("");

  const handleAddIngredient = (value) => {
    const component = value.trim();
    if (component && !ingredientsList.includes(component)) {
      const newList = [...ingredientsList, component];
      setIngredientsList(newList);
      setIncredients(newList.join(", "));
    }
  };

  const handleIngredientKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient(ingredientInput);
      setIngredientInput("");
    }
  };

  const handleIngredientChange = (e) => {
    const val = e.target.value;
    if (val.includes(",")) {
      const parts = val.split(",");
      const newParts = parts.map(p => p.trim()).filter(p => p !== "");

      let newList = [...ingredientsList];
      newParts.forEach(part => {
        if (!newList.includes(part)) {
          newList.push(part);
        }
      });

      setIngredientsList(newList);
      setIncredients(newList.join(", "));
      setIngredientInput("");
    } else {
      setIngredientInput(val);
    }
  };

  const removeIngredient = (index) => {
    const newList = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newList);
    setIncredients(newList.join(", "));
  };
  const [FoodImg, setFoodImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  // Cloudinary credentials
  const CLOUDINARY_CLOUD_NAME = 'dqboa6lkh';
  const CLOUDINARY_UPLOAD_PRESET = 'Open Recipe';

  useEffect(() => {
    verifyUser();
  }, []);

  function verifyUser() {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
    }
  }

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

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
      return response.data.secure_url;
    } catch (uploadError) {
      console.error("Error uploading image to Cloudinary:", uploadError);
      setError("Failed to upload image. Please try again.");
      throw uploadError;
    }
  };

  const publishContent = async () => {
    setError("");

    if (!recipeName || !Incredients || !RecipeContent || !FoodImg) {
      setError("Please fill all forms and select an image.");
      return;
    }

    if (
      localStorage.getItem("name") === null ||
      localStorage.getItem("username") === null
    ) {
      setError("Please Login To Retrieve Your Name And Email.");
      return;
    }

    setPending(true);

    try {
      const imageUrl = await uploadImageToCloudinary(FoodImg);

      if (!imageUrl) {
        setError("Image upload failed. Cannot publish content.");
        setPending(false);
        return;
      }

      const postData = {
        recipeName,
        Incredients,
        RecipeContent,
        thumbnail: imageUrl,
      };

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/new`,
        postData,
        {
          headers: {
            token: localStorage.getItem("jwt"),
            'Content-Type': 'application/json',
          },
        }
      );

      navigate("/recipes");

    } catch (e) {
      console.error("Error publishing content:", e);
      setError(e.message || "An error occurred while publishing content.");
    } finally {
      setPending(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
    padding: '2rem 0'
  };

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '2rem',
    padding: '3rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const logoStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#64748b'
  };

  const inputGroupStyle = {
    marginBottom: '2rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.75rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: '#fafafa'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const chipStyle = {
    background: '#fff7ed',
    border: '1px solid #fdba74',
    color: '#9a3412',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(249, 115, 22, 0.1)',
    transition: 'all 0.2s ease',
    animation: 'slideIn 0.2s ease-out'
  };

  const chipCloseStyle = {
    marginLeft: '0.5rem',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f97316',
    transition: 'color 0.2s ease'
  };

  const largeTextareaStyle = {
    ...inputStyle,
    minHeight: '200px',
    resize: 'vertical'
  };

  const inputFocusStyle = {
    outline: 'none',
    borderColor: '#f2750a',
    background: 'white',
    boxShadow: '0 0 0 3px rgba(242, 117, 10, 0.1)'
  };

  const fileInputStyle = {
    ...inputStyle,
    padding: '1rem',
    cursor: 'pointer'
  };

  const imagePreviewStyle = {
    width: '100%',
    maxWidth: '300px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '1rem',
    marginTop: '1rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1.25rem',
    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
    color: 'white',
    border: 'none',
    borderRadius: '1rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)',
    marginTop: '2rem'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 35px rgba(242, 117, 10, 0.4)'
  };

  const alertStyle = {
    background: '#fef2f2',
    color: '#991b1b',
    padding: '1rem 1.5rem',
    borderRadius: '1rem',
    marginBottom: '2rem',
    border: '1px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const spinnerStyle = {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '0.5rem'
  };

  const loadingOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  };

  const loadingCardStyle = {
    background: 'white',
    padding: '3rem',
    borderRadius: '1.5rem',
    textAlign: 'center',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
  };

  const largeSpinnerStyle = {
    width: '60px',
    height: '60px',
    border: '6px solid rgba(242, 117, 10, 0.2)',
    borderTop: '6px solid #f2750a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 1rem auto'
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={containerStyle}>
        <div className="container">
          <div style={formContainerStyle}>
            {/* Header */}
            <div style={headerStyle}>
              <img
                src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
                alt="Open Recipe"
                style={logoStyle}
              />
              <h1 style={titleStyle}>Share Your Recipe</h1>
              <p style={subtitleStyle}>
                Create and share your culinary masterpiece with the community
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div style={alertStyle}>
                <i className="bi bi-exclamation-triangle"></i>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); publishContent(); }}>
              {/* Recipe Name */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <i className="bi bi-journal-text me-2"></i>
                  Recipe Name
                </label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Enter your recipe name"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  onFocus={(e) => {
                    Object.assign(e.target.style, inputFocusStyle);
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#fafafa';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Food Image */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <i className="bi bi-image me-2"></i>
                  Recipe Image
                </label>
                <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  style={fileInputStyle}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFoodImage(file);
                    if (file) {
                      if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
                        const imageUrl = URL.createObjectURL(file);
                        setImagePreviewUrl(imageUrl);
                        setError("");
                      } else {
                        setImagePreviewUrl(null);
                        setFoodImage(null);
                        setError("Currently we only support JPEG and PNG images");
                      }
                    } else {
                      setImagePreviewUrl(null);
                      setFoodImage(null);
                    }
                  }}
                  onFocus={(e) => {
                    Object.assign(e.target.style, inputFocusStyle);
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#fafafa';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Recipe preview"
                    style={imagePreviewStyle}
                  />
                )}
              </div>

              {/* Ingredients */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <i className="bi bi-list-ul me-2"></i>
                  Ingredients
                </label>
                <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {ingredientsList.map((ing, index) => (
                    <div key={index} style={chipStyle}>
                      <span>{ing}</span>
                      <i
                        className="bi bi-x"
                        style={chipCloseStyle}
                        onClick={() => removeIngredient(index)}
                        onMouseEnter={(e) => e.target.style.color = '#c2410c'}
                        onMouseLeave={(e) => e.target.style.color = '#f97316'}
                      ></i>
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Type ingredient and press comma or enter"
                  value={ingredientInput}
                  onChange={handleIngredientChange}
                  onKeyDown={handleIngredientKeyDown}
                  onFocus={(e) => {
                    Object.assign(e.target.style, inputFocusStyle);
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#fafafa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <small style={{ color: '#6b7280', marginTop: '0.5rem', display: 'block', fontSize: '0.8rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Type an ingredient and press <b>Comma</b> or <b>Enter</b> to add it.
                </small>
              </div>

              {/* Recipe Instructions */}
              <div style={inputGroupStyle}>
                <label style={labelStyle}>
                  <i className="bi bi-clipboard-check me-2"></i>
                  Cooking Instructions
                </label>
                <textarea
                  style={largeTextareaStyle}
                  placeholder="Write detailed step-by-step cooking instructions..."
                  value={RecipeContent}
                  onChange={(e) => setRecipeContent(e.target.value)}
                  onFocus={(e) => {
                    Object.assign(e.target.style, inputFocusStyle);
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.background = '#fafafa';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={buttonStyle}
                disabled={pending}
                onMouseEnter={(e) => {
                  if (!pending) {
                    Object.assign(e.target.style, buttonHoverStyle);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pending) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px rgba(242, 117, 10, 0.3)';
                  }
                }}
              >
                {pending && <div style={spinnerStyle}></div>}
                <i className={`bi ${pending ? 'bi-hourglass-split' : 'bi-upload'} me-2`}></i>
                {pending ? 'Publishing Recipe...' : 'Publish Recipe'}
              </button>
            </form>
          </div>
        </div>

        {/* Loading Overlay */}
        {pending && (
          <div style={loadingOverlayStyle}>
            <div style={loadingCardStyle}>
              <div style={largeSpinnerStyle}></div>
              <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>
                Publishing Your Recipe
              </h3>
              <p style={{ color: '#64748b', margin: 0 }}>
                Please wait while we upload your delicious creation...
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}