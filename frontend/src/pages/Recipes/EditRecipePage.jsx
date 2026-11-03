import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipePage() {
    const [originalRecipe, setOriginalRecipe] = useState({});
    const [recipeName, setRecipeName] = useState("");
    const [Incredients, setIncredients] = useState("");
    const [RecipeContent, setRecipeContent] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [servings, setServings] = useState("");
    const [FoodImg, setFoodImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fork and variation metadata
    const [isFork, setIsFork] = useState(false);
    const [variationTitle, setVariationTitle] = useState("");
    const [variationDescription, setVariationDescription] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [sourceRecipeInfo, setSourceRecipeInfo] = useState(null);
    const [isOwner, setIsOwner] = useState(true);
    const [forking, setForking] = useState(false);

    const handleForkAndEdit = async () => {
        if (!localStorage.getItem("jwt")) {
            navigate("/login");
            return;
        }
        setForking(true);
        setError("");
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/recipes/${id}/fork`,
                {},
                {
                    headers: {
                        token: localStorage.getItem("jwt"),
                    },
                }
            );
            navigate(`/edit-recipe/${res.data.forkId}`);
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Failed to fork recipe.");
            setForking(false);
        }
    };

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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipes/${id}`, {
                headers: {
                    token: localStorage.getItem("jwt"),
                },
            });

            const recipe = response.data;
            setOriginalRecipe(recipe);
            setRecipeName(recipe.recipeName || "");
            setIncredients(recipe.ingredients || recipe.Incredients || "");
            setRecipeContent(
                Array.isArray(recipe.RecipeContent)
                    ? recipe.RecipeContent.join("\n")
                    : (recipe.RecipeContent || "")
            );
            const rawTime = recipe.cookingTime || "";
            setCookingTime(rawTime.replace(/[^0-9]/g, ""));
            setServings(recipe.servings || "");
            setImagePreviewUrl(recipe.thumbnail || null);

            // Fork metadata
            const forkDetected = Boolean(recipe.sourceRecipeId);
            setIsFork(forkDetected);
            setVariationTitle(recipe.variationTitle || "");
            setVariationDescription(recipe.variationDescription || "");
            setVisibility(recipe.visibility || (forkDetected ? "private" : "public"));
            setSourceRecipeInfo(recipe.sourceRecipeInfo || null);

            // Verify ownership: Match by ID or Email
            const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
            const currentUserId = localStorage.getItem("userId") || currentUser.id || currentUser._id;
            const recipeOwnerId = recipe.user_id?._id || recipe.user_id;
            const currentUserEmail = currentUser.email || localStorage.getItem("username");
            const recipeEmail = recipe.email || (recipe.author && recipe.author[0]?.email);

            const emailMatches = Boolean(
                currentUserEmail &&
                recipeEmail &&
                currentUserEmail.toLowerCase() === recipeEmail.toLowerCase()
            );
            const idMatches = Boolean(
                currentUserId &&
                recipeOwnerId &&
                currentUserId.toString() === recipeOwnerId.toString()
            );

            if (emailMatches || idMatches) {
                setIsOwner(true);
            } else if (currentUserId && recipeOwnerId) {
                setIsOwner(false);
            }

            setLoading(false);
        } catch (error) {
            if (error.response?.status === 403) {
                setIsOwner(false);
                setError("You don't have permission to edit this recipe.");
            } else {
                setError("Failed to fetch recipe: " + (error.response?.data?.error || error.message));
            }
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

    const getChangedFields = (targetVisibility) => {
        const changes = {};

        if (recipeName !== originalRecipe.recipeName) {
            changes.recipeName = recipeName;
        }

        if (Incredients !== originalRecipe.ingredients && Incredients !== originalRecipe.Incredients) {
            changes.ingredients = Incredients;
        }

        if (RecipeContent !== originalRecipe.RecipeContent) {
            changes.RecipeContent = RecipeContent;
        }

        if (cookingTime !== (originalRecipe.cookingTime ? originalRecipe.cookingTime.replace(/[^0-9]/g, "") : "")) {
            changes.cookingTime = `${cookingTime} mins`;
        }

        if (servings !== originalRecipe.servings) {
            changes.servings = Number(servings);
        }

        if (isFork) {
            if (variationTitle !== (originalRecipe.variationTitle || "")) {
                changes.variationTitle = variationTitle;
            }
            if (variationDescription !== (originalRecipe.variationDescription || "")) {
                changes.variationDescription = variationDescription;
            }
            const desiredVisibility = targetVisibility || visibility;
            if (desiredVisibility !== originalRecipe.visibility) {
                changes.visibility = desiredVisibility;
            }
        }

        return changes;
    };

    const updateRecipe = async (targetVisibility) => {
        setError("");

        if (!recipeName || !Incredients || !RecipeContent) {
            setError("Please fill all required fields.");
            return;
        }

        const effectiveVisibility = targetVisibility || visibility;
        const changedFields = getChangedFields(effectiveVisibility);

        if (Object.keys(changedFields).length === 0 && !FoodImg && !targetVisibility) {
            setError("No changes detected. Please make some changes before updating.");
            return;
        }

        if (targetVisibility && changedFields.visibility !== targetVisibility) {
            changedFields.visibility = targetVisibility;
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
                `${process.env.REACT_APP_BACKEND_URL}/recipes/edit/${id}`,
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
            setError(e.response?.data?.error || e.message || "Failed to update recipe.");
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

    if (!isOwner) {
        return (
            <div style={containerStyle}>
                <div className="container">
                    <div style={{ ...formContainerStyle, textAlign: 'center', padding: '3.5rem 2rem' }}>
                        <div style={{
                            width: '75px',
                            height: '75px',
                            borderRadius: '50%',
                            background: '#ffedd5',
                            color: '#ea580c',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.2rem',
                            margin: '0 auto 1.5rem auto'
                        }}>
                            <i className="bi bi-diagram-2"></i>
                        </div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                            Fork This Recipe to Edit Your Own Twist
                        </h2>
                        <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
                            This recipe belongs to {originalRecipe.authorName ? <strong>{originalRecipe.authorName}</strong> : "another community chef"}.
                            To preserve the original, fork it to your personal kitchen so you can freely customize ingredients, cooking steps, and variation notes.
                        </p>
                        {error && (
                            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
                                {error}
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={handleForkAndEdit}
                                disabled={forking}
                                style={{
                                    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.85rem 1.75rem',
                                    borderRadius: '0.75rem',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    cursor: forking ? 'not-allowed' : 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 15px rgba(242, 117, 10, 0.35)'
                                }}
                            >
                                {forking ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Forking to your kitchen...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-diagram-2"></i>
                                        Fork &amp; Edit My Variation
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => navigate(`/recipe/${id}`)}
                                style={{
                                    background: 'white',
                                    color: '#0f172a',
                                    border: '1px solid #cbd5e1',
                                    padding: '0.85rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                View Original Recipe
                            </button>
                            <button
                                onClick={() => navigate('/recipes')}
                                style={{
                                    background: '#f8fafc',
                                    color: '#475569',
                                    border: '1px solid #e2e8f0',
                                    padding: '0.85rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                <i className="bi bi-book me-2"></i>
                                Browse Recipes
                            </button>
                        </div>
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
                            <h1 style={titleStyle}>
                                {isFork ? 'Edit Community Variation' : 'Edit Recipe'}
                            </h1>
                            <p style={subtitleStyle}>
                                {isFork
                                    ? 'Customize your personal copy and publish variations for other home cooks'
                                    : 'Update your delicious recipe and share it with the community'}
                            </p>
                        </div>

                        {/* Fork Notice Banner */}
                        {isFork && (
                            <div style={{
                                background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
                                border: '1.5px solid #fed7aa',
                                borderRadius: '1.25rem',
                                padding: '1.25rem 1.5rem',
                                marginBottom: '2rem',
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'flex-start'
                            }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f2750a, #ea580c)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.1rem',
                                    flexShrink: 0
                                }}>
                                    <i className="bi bi-diagram-2"></i>
                                </div>
                                <div>
                                    <div style={{ fontWeight: '700', color: '#9a3412', fontSize: '1.05rem' }}>
                                        Editing Your Personal Variation
                                    </div>
                                    <div style={{ color: '#7c2d12', fontSize: '0.9rem', lineHeight: '1.5', marginTop: '0.2rem' }}>
                                        Forked from <strong>{sourceRecipeInfo?.recipeName || 'the original recipe'}</strong>.
                                        Any changes saved here belong solely to your personal copy and will never alter or merge into the original recipe.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Alert */}
                        {error && (
                            <div style={alertStyle}>
                                <i className="bi bi-exclamation-triangle"></i>
                                {error}
                            </div>
                        )}

                        {/* Edit Form */}
                        <form onSubmit={(e) => { e.preventDefault(); updateRecipe(); }}>
                            {/* Variation Title (Forks only) */}
                            {isFork && (
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>
                                        <i className="bi bi-tag me-2" style={{ color: '#f2750a' }}></i>
                                        Variation Title
                                    </label>
                                    <input
                                        type="text"
                                        style={inputStyle}
                                        placeholder="e.g. Gluten-Free Crust, Extra Spicy Version, Vegan Twist"
                                        value={variationTitle}
                                        onChange={(e) => setVariationTitle(e.target.value)}
                                        onFocus={(e) => { Object.assign(e.target.style, inputFocusStyle); }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none'; }}
                                    />
                                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.4rem' }}>
                                        Give your variation a short title highlighting what you customized.
                                    </div>
                                </div>
                            )}

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

                            {/* Variation Description / Notes (Forks only) */}
                            {isFork && (
                                <div style={inputGroupStyle}>
                                    <label style={labelStyle}>
                                        <i className="bi bi-card-text me-2" style={{ color: '#f2750a' }}></i>
                                        Variation Description & Notes
                                    </label>
                                    <textarea
                                        style={textareaStyle}
                                        placeholder="Explain what you tweaked (e.g. substituted ingredients, adjusted baking temperature, spicy twist)..."
                                        value={variationDescription}
                                        onChange={(e) => setVariationDescription(e.target.value)}
                                        onFocus={(e) => { Object.assign(e.target.style, inputFocusStyle); }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            )}

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

                            {/* Cooking Time and Servings */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>
                                        <i className="bi bi-clock me-2"></i>
                                        Cooking Time (Minutes)
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="number"
                                            style={{ ...inputStyle, paddingRight: '4rem' }}
                                            placeholder="e.g. 30"
                                            value={cookingTime}
                                            onChange={(e) => setCookingTime(e.target.value)}
                                            onFocus={(e) => { Object.assign(e.target.style, inputFocusStyle); }}
                                            onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none'; }}
                                            required
                                            min="1"
                                        />
                                        <span style={{
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#64748b',
                                            fontWeight: '600',
                                            pointerEvents: 'none'
                                        }}>mins</span>
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>
                                        <i className="bi bi-people me-2"></i>
                                        No. of People (Servings)
                                    </label>
                                    <input
                                        type="number"
                                        style={inputStyle}
                                        placeholder="e.g. 4"
                                        value={servings}
                                        onChange={(e) => setServings(e.target.value)}
                                        onFocus={(e) => { Object.assign(e.target.style, inputFocusStyle); }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none'; }}
                                        required
                                        min="1"
                                    />
                                </div>
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

                            {/* Visibility / Publishing Controls for Forks */}
                            {isFork && (
                                <div style={{
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '1.25rem',
                                    padding: '1.5rem',
                                    marginBottom: '2rem'
                                }}>
                                    <label style={{ ...labelStyle, marginBottom: '0.75rem' }}>
                                        <i className="bi bi-globe me-2" style={{ color: '#f2750a' }}></i>
                                        Visibility & Publication Status
                                    </label>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <label style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '1rem',
                                            borderRadius: '0.85rem',
                                            border: visibility === 'private' ? '2px solid #f2750a' : '1px solid #e2e8f0',
                                            background: visibility === 'private' ? '#fff7ed' : 'white',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                        }}>
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value="private"
                                                checked={visibility === 'private'}
                                                onChange={() => setVisibility('private')}
                                            />
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#0f172a' }}>
                                                    <i className="bi bi-lock-fill me-1" style={{ color: '#d97706' }}></i>
                                                    Private Draft
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                    Only you can view and edit this fork under My Forks.
                                                </div>
                                            </div>
                                        </label>

                                        <label style={{
                                            flex: 1,
                                            minWidth: '220px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '1rem',
                                            borderRadius: '0.85rem',
                                            border: visibility === 'public' ? '2px solid #f2750a' : '1px solid #e2e8f0',
                                            background: visibility === 'public' ? '#fff7ed' : 'white',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                        }}>
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value="public"
                                                checked={visibility === 'public'}
                                                onChange={() => setVisibility('public')}
                                            />
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#0f172a' }}>
                                                    <i className="bi bi-globe me-1" style={{ color: '#16a34a' }}></i>
                                                    Public Variation
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                    Visible to the community under Community Variations.
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Submit Buttons */}
                            {isFork ? (
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <button
                                        type="button"
                                        disabled={pending}
                                        onClick={() => updateRecipe('private')}
                                        style={{
                                            flex: 1,
                                            minWidth: '200px',
                                            background: '#f8fafc',
                                            color: '#475569',
                                            border: '1.5px solid #cbd5e1',
                                            padding: '1rem 1.5rem',
                                            borderRadius: '1rem',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: pending ? 'wait' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <i className="bi bi-file-earmark-lock"></i>
                                        Save as Private Draft
                                    </button>

                                    <button
                                        type="button"
                                        disabled={pending}
                                        onClick={() => updateRecipe('public')}
                                        style={{
                                            flex: 1,
                                            minWidth: '200px',
                                            ...buttonStyle
                                        }}
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
                                        <i className="bi bi-globe me-2"></i>
                                        {originalRecipe.visibility === 'public' ? 'Save Published Changes' : 'Publish Variation'}
                                    </button>
                                </div>
                            ) : (
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
                            )}
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