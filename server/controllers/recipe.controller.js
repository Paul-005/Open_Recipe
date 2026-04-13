const { GoogleGenerativeAI } = require("@google/generative-ai");
const Comments = require("../models/CommentsModal");
const RecipeModal = require("../models/RecipeModal");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getEmbedding = require("../utils/embedding");

// Add new recipe
exports.addNewRecipe = async (req, res) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: "Invalid token not found in token" });
        }
        const user_id = decoded.id;
        const { recipeName, ingredients, RecipeContent, thumbnail, cookingTime, servings } = req.body;

        if (!recipeName || !RecipeContent || !ingredients || !cookingTime || servings == null) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const embeddingText = `Recipe Name: ${recipeName}. Ingredients: ${ingredients} Cooking Time: ${cookingTime} Servings: ${servings}.`;
        const embedding = await getEmbedding(embeddingText);

        const RecipeData = new RecipeModal({
            recipeName,
            ingredients,
            RecipeContent,
            thumbnail,
            cookingTime,
            servings,
            user_id,
            embedding
        });

        await RecipeData.save();


        res.status(200).json({
            message: "Recipe added successfully!"
        });
    } catch (error) {
        console.error("Error adding recipe:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.semanticSearch = async (req, res) => {
    try {
        const query = req.body.query || req.query.q;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        const queryEmbedding = await getEmbedding(query);

        const recipes = await RecipeModal.find({}, {
            embedding: 1,
            recipeName: 1,
            ingredients: 1,
            cookingTime: 1,
            servings: 1,
            user_id: 1,
        });

        // cosine similarity
        function cosineSimilarity(a, b) {
            const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
            const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
            const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
            return dot / (magA * magB);
        }

        const scored = recipes.map((r) => ({
            recipe: r,
            score: cosineSimilarity(queryEmbedding, r.embedding),
        }))

        scored.sort((a, b) => b.score - a.score);

        res.json(scored.slice(0, 10).map((s) => s.recipe));
    } catch (error) {
        console.error("Error in semantic search:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get a recipe by id
exports.fetchRecipeById = async (req, res) => {
    try {
        const recipeId = req.params.id;


        // Use aggregation with $match and $lookup for optimal performance
        const result = await RecipeModal.aggregate([
            { $match: { _id: new ObjectId(recipeId) } },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "recipe_id",
                    as: "comments"
                }
            },

        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error fetching recipe by id:", error);
        res.status(500).json({ error: "Internal server error" });
    }




};

// Fetch all recipes
exports.fetchAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipeModal.find({}, {
            _id: 1, recipeName: 1, RecipeContent: { $substrCP: ["$RecipeContent", 0, 20] },
            thumbnail: 1,
        });
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Fetch all recipes error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Fetch recipe by ID and delete it
exports.deleteRecipe = async (req, res) => {
    try {
        const token = req.headers.token;
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const recipe_id = req.params.id;
        if (!recipe_id) {
            return res.status(400).json({ error: "Recipe ID is required" });
        }
        const recipe = await RecipeModal.findById(recipe_id);

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }


        if (recipe.user_id.toString() !== id) {
            return res.status(403).json({ error: "You don't have permission to delete this recipe" });
        }


        RecipeModal.findByIdAndDelete(recipe_id).then(() => {
            return res.status(200).json({ message: "Recipe deleted successfully" });
        }).catch((error) => {
            return res.status(500).json({ error: error.message });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.editRecipe = async (req, res) => {
    const recipe_id = req.params.id;
    const recipe = await RecipeModal.findById(recipe_id);

    const token = req.headers.token;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    console.log(recipe.user_id.toString(),);

    if (recipe.user_id.toString() !== id) {
        return res.status(403).json({ error: "You don't have permission to edit this recipe" });
    }


    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
    }

    const { recipeName, ingredients, RecipeContent, thumbnail, cookingTime, servings } = req.body;


    // make an object with the changed variables
    const changedVariables = {};
    if (recipeName && recipeName.trim()) {
        changedVariables.recipeName = recipeName;
    }
    if (ingredients && ingredients.trim()) {
        changedVariables.ingredients = ingredients;
    }
    if (RecipeContent && RecipeContent.trim()) {
        changedVariables.RecipeContent = RecipeContent;
    }
    if (thumbnail && thumbnail.trim()) {
        changedVariables.thumbnail = thumbnail;
    }
    if (cookingTime && cookingTime.trim()) {
        changedVariables.cookingTime = cookingTime;
    }
    if (servings != null) {
        changedVariables.servings = servings;
    }

    await RecipeModal.findByIdAndUpdate(recipe_id, changedVariables, { runValidators: true }).then(() => {
        res.status(200).json({ message: "Recipe updated successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

exports.addComment = async (req, res) => {
    const { comment } = req.body;
    const recipe_id = req.params.id;
    const token = req.headers.token;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const commentData = new Comments({ comment, recipe_id, user_id: id });
    await commentData.save().then(() => {
        res.status(200).json({ message: "Comment added successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

exports.deleteComment = async (req, res) => {
    console.log(req.body);
    const comment_id = req.params.id;
    const token = req.headers.token;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!comment_id) {
        return res.status(400).json({ error: "Comment ID is required" });
    }


    const comment = await Comments.findById(comment_id);

    if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
    }


    if (comment.user_id.toString() !== id) {
        return res.status(403).json({ error: "You don't have permission to delete this comment" });
    }

    await Comments.findByIdAndDelete(comment_id).then(() => {
        res.status(200).json({ message: "Comment deleted successfully" });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

exports.fetchUserRecipes = async (req, res) => {
    if (!req.headers.token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        const id = decoded.id;

        console.log("this is id", id);


        const recipes = await RecipeModal.find({ user_id: new ObjectId(id) }, { _id: 1, recipeName: 1 });
        console.log(recipes);


        return res.status(200).json(recipes);

    } catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.askGemini = async (req, res) => {
    try {
        const { recipeId, question } = req.body;

        if (!recipeId || !question) {
            return res.status(400).json({ error: "Recipe ID and question are required" });
        }

        const recipe = await RecipeModal.findById(recipeId).lean();
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "Gemini API Key is not configured" });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `
        You are a helpful cooking assistant.
        Here is the recipe:
        Name: ${recipe.recipeName}
        Ingredients: ${recipe.Incredients}
        Content: ${recipe.RecipeContent}
        Cooking Time: ${recipe.cookingTime || 'Not specified'}
        Servings: ${recipe.servings || 'Not specified'}

        User Question: ${question}

        Answer the user's question based on the recipe above. 
        If the user asks to adjust ingredients, provide the adjusted amounts. 
        If they ask for spicy suggestions, suggest relevant spices. 
        Keep the answer concise and helpful.
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.status(200).json({ answer: text });

    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to get answer from AI" });
    }
};

