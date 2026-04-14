require("dotenv").config();
const mongoose = require("mongoose");
const RecipeModal = require("../models/RecipeModal");
const getEmbedding = require("../utils/embedding");

const userIds = [
  "69db6251f5aca920cd45f70c",
  "69dd105fe32b15480ad25d2a",
  "69dd168c6f0c585c62cb97bc",
  "69dd16b06f0c585c62cb97bf"
];

const sampleRecipes = [
  {
    recipeName: 'Classic Garlic Butter Shrimp',
    ingredients: '500g large shrimp, 4 tbsp butter, 3 cloves garlic, 1 tbsp olive oil, 1 tsp lemon juice, 1/2 tsp red pepper flakes, salt, pepper, fresh parsley',
    RecipeContent: 'In a large skillet, heat the olive oil and 2 tablespoons of butter. Season the shrimp with salt and pepper, add to the pan. Sear for 2 minutes per side. Add the remaining butter, minced garlic, and red pepper flakes. Stir for 1 minute. Remove from heat, stir in lemon juice, garnish with parsley. Serve immediately.',
    thumbnail: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?auto=format&fit=crop&q=80&w=800',
    cookingTime: '15 mins',
    servings: 3
  },
  {
    recipeName: 'Teriyaki Chicken Stir-Fry',
    ingredients: '400g chicken breast cubed, 2 cups broccoli florets, 1 bell pepper sliced, 1/2 cup teriyaki sauce, 1 tbsp sesame oil, sesame seeds',
    RecipeContent: 'Heat sesame oil in a wok. Cook chicken until browned. Add broccoli and bell pepper, stir-fry for 5 minutes. Pour in teriyaki sauce and simmer until it thickens and coats the chicken. Sprinkle with sesame seeds and serve with rice.',
    thumbnail: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
    cookingTime: '20 mins',
    servings: 3
  },
  {
    recipeName: 'Margherita Pizza',
    ingredients: '1 pizza dough, 1/2 cup tomato sauce, 1 cup fresh mozzarella sliced, fresh basil leaves, 1 tbsp olive oil',
    RecipeContent: 'Preheat oven to 475F. Roll out pizza dough. Spread tomato sauce evenly. Top with mozzarella slices. Bake for 10-12 minutes until crust is golden. Top with fresh basil and a drizzle of olive oil.',
    thumbnail: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800',
    cookingTime: '20 mins',
    servings: 2
  },
  {
    recipeName: 'Lemon Herb Baked Salmon',
    ingredients: '2 salmon fillets, 1 lemon sliced, 2 tbsp olive oil, 1 tsp dried dill, salt, pepper',
    RecipeContent: 'Preheat oven to 400F. Place salmon on a baking sheet. Drizzle with olive oil, sprinkle with dill, salt, and pepper. Top with lemon slices. Bake for 12-15 minutes until salmon flakes easily.',
    thumbnail: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    cookingTime: '20 mins',
    servings: 2
  },
  {
    recipeName: 'Vegan Lentil Curry',
    ingredients: '1 cup red lentils, 1 can coconut milk, 1 onion diced, 2 tbsp curry powder, 1 tsp ginger grated, 1 cup spinach',
    RecipeContent: 'Sauté onion and ginger until soft. Stir in curry powder. Add lentils and coconut milk, cover and simmer for 20 minutes until lentils are tender. Stir in spinach until wilted. Serve with warm naan.',
    thumbnail: 'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?auto=format&fit=crop&q=80&w=800',
    cookingTime: '30 mins',
    servings: 4
  },
  {
    recipeName: 'Avocado Toast with Poached Egg',
    ingredients: '2 slices sourdough bread, 1 ripe avocado, 2 eggs, 1 tsp lemon juice, salt, pepper, chili flakes',
    RecipeContent: 'Toast the bread. Mash avocado with lemon juice, salt, and pepper. Poach eggs in simmering water for 3 minutes. Spread avocado on toast, top with poached eggs, and sprinkle with chili flakes.',
    thumbnail: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
    cookingTime: '10 mins',
    servings: 2
  },
  {
    recipeName: 'Quick Vegan Breakfast Bowl',
    ingredients: '1 cup oats, 2 cups almond milk, 1 banana sliced, 2 tbsp chia seeds, 1 tbsp maple syrup, mixed berries',
    RecipeContent: 'Cook oats with almond milk over medium heat until creamy. Stir in maple syrup. Top with sliced banner, chia seeds, and mixed berries.',
    thumbnail: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80&w=800',
    cookingTime: '10 mins',
    servings: 1
  },
  {
    recipeName: 'Creamy Mushroom Pasta',
    ingredients: '250g pasta, 200g mushrooms sliced, 2 cloves garlic minced, 1 cup heavy cream, 1/2 cup grated parmesan, salt, pepper, parsley',
    RecipeContent: 'Boil pasta in salted water until al dente. In a pan, sauté mushrooms and garlic until tender. Pour in heavy cream and simmer for 3 minutes. Stir in parmesan and cooked pasta. Season with salt and pepper. Garnish with parsley.',
    thumbnail: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800',
    cookingTime: '25 mins',
    servings: 2
  },
  {
    recipeName: 'Spicy Mexican Dinner Tacos',
    ingredients: '500g ground beef, 1 packet taco seasoning, 8 taco shells, 1 cup shredded cheese, 1/2 cup salsa, lettuce, jalapeños',
    RecipeContent: 'Cook ground beef in a skillet until browned. Drain fat, add taco seasoning and 1/2 cup water. Simmer until thickened. Warm taco shells. Assemble tacos with beef, cheese, salsa, lettuce, and jalapeños.',
    thumbnail: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800',
    cookingTime: '20 mins',
    servings: 4
  },
  {
    recipeName: 'Classic Cheeseburger',
    ingredients: '400g ground beef, 2 hamburger buns, 2 slices cheddar cheese, lettuce, tomato slices, ketchup, mustard, salt, pepper',
    RecipeContent: 'Form ground beef into two patties and season with salt and pepper. Grill or pan-fry for 4 minutes per side. Add cheddar cheese during the last minute to melt. Toast the buns. Assemble with lettuce, tomato, ketchup, and mustard.',
    thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    cookingTime: '15 mins',
    servings: 2
  }
];

const seedDB = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
      console.log("No MongoDB URL found in .env");
      process.exit(1);
    }
    await mongoose.connect(MONGODB_URL);
    console.log("Database connected. Starting to seed...");

    let count = 0;
    for (const recipe of sampleRecipes) {
      // Pick random user
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      recipe.user_id = randomUserId;

      const embeddingText = `Recipe Name: ${recipe.recipeName}. Ingredients: ${recipe.ingredients}. Cooking Time: ${recipe.cookingTime} Servings: ${recipe.servings}.`;
      console.log(`Generating embedding for: ${recipe.recipeName}`);
      const embedding = await getEmbedding(embeddingText);

      recipe.embedding = embedding;

      const newRecipe = new RecipeModal(recipe);
      await newRecipe.save();
      count++;
    }

    console.log(`Successfully seeded ${count} recipes with embeddings.`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
