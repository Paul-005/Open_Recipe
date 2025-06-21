import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { React_Backend } from "../backend_url";

export default function EditRecipePage() {
    const [originalRecipe, setOriginalRecipe] = useState({});
    const [recipeName, setRecipeName] = useState("");
    const [Incredients, setIncredients] = useState("");
    const [RecipeContent, setRecipeContent] = useState("");
    const [FoodImg, setFoodImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    // Cloudinary credentials
    const CLOUDINARY_CLOUD_NAME = 'dqboa6lkh';
    const CLOUDINARY_UPLOAD_PRESET = 'Open Recipe';

    useEffect(() => {
        verifyUser();
        fetchRecipe();
    }, [id]);

    function verifyUser() {
        if (!localStorage.getItem("jwt")) {
            navigate("/login");
        }
    }

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`${React_Backend}/recipes/${id}`, {
                headers: {
                    token: localStorage.getItem("jwt"),
                },
            });

            const recipe = response.data;
            setOriginalRecipe(recipe);
            setRecipeName(recipe.recipeName || "");
            setIncredients(recipe.Incredients || "");
            setRecipeContent(recipe.RecipeContent || "");
            setImagePreviewUrl(recipe.thumbnail || null);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch recipe: " + error.message);
            setLoading(false);
        }
    };

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

    const getChangedFields = () => {
        const changes = {};

        if (recipeName !== originalRecipe.recipeName) {
            changes.recipeName = recipeName;
        }

        if (Incredients !== originalRecipe.Incredients) {
            changes.Incredients = Incredients;
        }

        if (RecipeContent !== originalRecipe.RecipeContent) {
            changes.RecipeContent = RecipeContent;
        }

        return changes;
    };

    const updateRecipe = async () => {
        setError("");

        if (!recipeName || !Incredients || !RecipeContent) {
            setError("Please fill all required fields.");
            return;
        }

        const changedFields = getChangedFields();

        if (Object.keys(changedFields).length === 0 && !FoodImg) {
            setError("No changes detected. Please make some changes before updating.");
            return;
        }

        setPending(true);

        try {
            let imageUrl = null;

            // Only upload new image if one was selected
            if (FoodImg) {
                imageUrl = await uploadImageToCloudinary(FoodImg);
                if (!imageUrl) {
                    setError("Image upload failed. Cannot update recipe.");
                    setPending(false);
                    return;
                }
                changedFields.thumbnail = imageUrl;
            }

            // Send only the changed fields
            await axios.put(
                `${React_Backend}/recipes/edit/${id}`,
                changedFields,
                {
                    headers: {
                        token: localStorage.getItem("jwt"),
                        'Content-Type': 'application/json',
                    },
                }
            );

            navigate(`/recipe/${id}`);

        } catch (e) {
            console.error("Error updating recipe:", e);
            setError(e.message || "An error occurred while updating the recipe.");
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
        fontSize: '1.1rem',
        color: '#64748b',
        marginBottom: '2rem'
    };

    const inputGroupStyle = {
        marginBottom: '2rem'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: '0.75rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem 1.25rem',
        fontSize: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        background: '#fafafa',
        color: '#0f172a',
        transition: 'all 0.3s ease',
        outline: 'none'
    };

    const inputFocusStyle = {
        borderColor: '#f2750a',
        background: '#fff7ed',
        boxShadow: '0 0 0 3px rgba(242, 117, 10, 0.1)'
    };

    const fileInputStyle = {
        ...inputStyle,
        padding: '0.75rem 1.25rem'
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '120px',
        resize: 'vertical',
        fontFamily: 'inherit'
    };

    const largeTextareaStyle = {
        ...textareaStyle,
        minHeight: '200px'
    };

    const imagePreviewStyle = {
        width: '100%',
        maxWidth: '300px',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '1rem',
        marginTop: '1rem',
        border: '2px solid #e5e7eb'
    };

    const buttonStyle = {
        width: '100%',
        background: 'linear-gradient(135deg, #f2750a, #ea580c)',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '1rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 25px rgba(242, 117, 10, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    };

    const buttonHoverStyle = {
        transform: 'translateY(-2px)',
        boxShadow: '0 15px 35px rgba(242, 117, 10, 0.4)'
    };

    const spinnerStyle = {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
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
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
    };

    const loadingCardStyle = {
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: '3rem',
        textAlign: 'center',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    };

    const largeSpinnerStyle = {
        width: '60px',
        height: '60px',
        border: '4px solid rgba(242, 117, 10, 0.2)',
        borderTop: '4px solid #f2750a',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1.5rem auto'
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

    const loadingSpinnerStyle = {
        width: '60px',
        height: '60px',
        border: '6px solid rgba(242, 117, 10, 0.2)',
        borderTop: '6px solid #f2750a',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '2rem auto'
    };

    if (loading) {
        return (
            <div style={containerStyle}>
                <div className="container">
                    <div style={formContainerStyle}>
                        <div style={loadingSpinnerStyle}></div>
                        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1.1rem' }}>
                            Loading recipe...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

            <div style={containerStyle}>
                <div className="container">
                    <div style={formContainerStyle}>
                        {/* Header */}
                        <div style={headerStyle}>
                            <img
                                src="https://i.ibb.co/fv9NK8R/BQJl-download.png"
                                alt="Recipe Logo"
                                style={logoStyle}
                            />
                            <h1 style={titleStyle}>Edit Recipe</h1>
                            <p style={subtitleStyle}>
                                Update your delicious recipe and share it with the community
                            </p>
                        </div>

                        {/* Error Alert */}
                        {error && (
                            <div style={alertStyle}>
                                <i className="bi bi-exclamation-triangle"></i>
                                {error}
                            </div>
                        )}

                        {/* Edit Form */}
                        <form onSubmit={(e) => { e.preventDefault(); updateRecipe(); }}>
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
                                />
                                <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                                    Leave empty to keep the current image
                                </p>
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
                                <textarea
                                    style={textareaStyle}
                                    placeholder="List all ingredients (e.g., 2 cups flour, 1 tsp salt, etc.)"
                                    value={Incredients}
                                    onChange={(e) => setIncredients(e.target.value)}
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
                                <i className={`bi ${pending ? 'bi-hourglass-split' : 'bi-check-circle'} me-2`}></i>
                                {pending ? 'Updating Recipe...' : 'Update Recipe'}
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
                                Updating Your Recipe
                            </h3>
                            <p style={{ color: '#64748b', margin: 0 }}>
                                Please wait while we save your changes...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
} 