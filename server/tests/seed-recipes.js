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
    thumbnail: '',
    cookingTime: '15 mins',
    servings: 3
  },
  {
    recipeName: 'Spicy Mexican Dinner Tacos',
    ingredients: '500g ground beef, 1 packet taco seasoning, 8 taco shells, 1 cup shredded cheese, 1/2 cup salsa, lettuce, jalapeños',
    RecipeContent: 'Cook ground beef in a skillet until browned. Drain fat, add taco seasoning and 1/2 cup water. Simmer until thickened. Warm taco shells. Assemble tacos with beef, cheese, salsa, lettuce, and jalapeños.',
    thumbnail: '',
    cookingTime: '20 mins',
    servings: 4
  },
  {
    recipeName: 'Quick Vegan Breakfast Bowl',
    ingredients: '1 cup oats, 2 cups almond milk, 1 banana sliced, 2 tbsp chia seeds, 1 tbsp maple syrup, mixed berries',
    RecipeContent: 'Cook oats with almond milk over medium heat until creamy. Stir in maple syrup. Top with sliced banana, chia seeds, and mixed berries.',
    thumbnail: '',
    cookingTime: '10 mins',
    servings: 1
  },
  {
    recipeName: 'Creamy Mushroom Pasta',
    ingredients: '250g pasta, 200g mushrooms sliced, 2 cloves garlic minced, 1 cup heavy cream, 1/2 cup grated parmesan, salt, pepper, parsley',
    RecipeContent: 'Boil pasta in salted water until al dente. In a pan, sauté mushrooms and garlic until tender. Pour in heavy cream and simmer for 3 minutes. Stir in parmesan and cooked pasta. Season with salt and pepper. Garnish with parsley.',
    thumbnail: '',
    cookingTime: '25 mins',
    servings: 2
  },
  {
    recipeName: 'Teriyaki Chicken Stir-Fry',
    ingredients: '400g chicken breast cubed, 2 cups broccoli florets, 1 bell pepper sliced, 1/2 cup teriyaki sauce, 1 tbsp sesame oil, sesame seeds',
    RecipeContent: 'Heat sesame oil in a wok. Cook chicken until browned. Add broccoli and bell pepper, stir-fry for 5 minutes. Pour in teriyaki sauce and simmer until it thickens and coats the chicken. Sprinkle with sesame seeds and serve with rice.',
    thumbnail: '',
    cookingTime: '20 mins',
    servings: 3
  },
  {
    recipeName: 'Avocado Toast with Poached Egg',
    ingredients: '2 slices sourdough bread, 1 ripe avocado, 2 eggs, 1 tsp lemon juice, salt, pepper, chili flakes',
    RecipeContent: 'Toast the bread. Mash avocado with lemon juice, salt, and pepper. Poach eggs in simmering water for 3 minutes. Spread avocado on toast, top with poached eggs, and sprinkle with chili flakes.',
    thumbnail: '',
    cookingTime: '10 mins',
    servings: 2
  },
  {
    recipeName: 'Classic Tomato Basil Bruschetta',
    ingredients: '1 baguette sliced, 4 tomatoes diced, 2 cloves garlic minced, 1/4 cup fresh basil chopped, 2 tbsp olive oil, balsamic glaze',
    RecipeContent: 'Toast baguette slices until golden. In a bowl, mix tomatoes, garlic, basil, and olive oil. Season with salt. Spoon the mixture onto toasted bread and drizzle with balsamic glaze.',
    thumbnail: '',
    cookingTime: '15 mins',
    servings: 4
  },
  {
    recipeName: 'Lemon Herb Baked Salmon',
    ingredients: '2 salmon fillets, 1 lemon sliced, 2 tbsp olive oil, 1 tsp dried dill, salt, pepper',
    RecipeContent: 'Preheat oven to 400F. Place salmon on a baking sheet. Drizzle with olive oil, sprinkle with dill, salt, and pepper. Top with lemon slices. Bake for 12-15 minutes until salmon flakes easily.',
    thumbnail: '',
    cookingTime: '20 mins',
    servings: 2
  },
  {
    recipeName: 'Vegan Lentil Curry',
    ingredients: '1 cup red lentils, 1 can coconut milk, 1 onion diced, 2 tbsp curry powder, 1 tsp ginger grated, 1 cup spinach',
    RecipeContent: 'Sauté onion and ginger until soft. Stir in curry powder. Add lentils and coconut milk, cover and simmer for 20 minutes until lentils are tender. Stir in spinach until wilted. Serve with warm naan.',
    thumbnail: '',
    cookingTime: '30 mins',
    servings: 4
  },
  {
    recipeName: 'Margherita Pizza',
    ingredients: '1 pizza dough, 1/2 cup tomato sauce, 1 cup fresh mozzarella sliced, fresh basil leaves, 1 tbsp olive oil',
    RecipeContent: 'Preheat oven to 475F. Roll out pizza dough. Spread tomato sauce evenly. Top with mozzarella slices. Bake for 10-12 minutes until crust is golden. Top with fresh basil and a drizzle of olive oil.',
    thumbnail: '',
    cookingTime: '20 mins',
    servings: 2
  },
  {
    recipeName: 'Greek Salad with Feta',
    ingredients: '2 cucumbers chopped, 3 tomatoes chopped, 1 red onion sliced, 1/2 cup kalamata olives, 100g feta cheese, 3 tbsp olive oil, 1 tbsp oregano',
    RecipeContent: 'In a large bowl, combine cucumbers, tomatoes, red onion, and olives. Top with feta cheese crumbles. Drizzle with olive oil and sprinkle with oregano. Toss lightly before serving.',
    thumbnail: '',
    cookingTime: '10 mins',
    servings: 3
  },
  {
    recipeName: 'Beef and Broccoli Bowl',
    ingredients: '300g thinly sliced beef, 2 cups broccoli, 1/4 cup soy sauce, 2 tbsp brown sugar, 1 clove garlic, 1 tbsp cornstarch',
    RecipeContent: 'Mix soy sauce, brown sugar, garlic, and cornstarch. Sear beef in a hot pan until browned. Remove beef, add broccoli and a splash of water, cover to steam for 3 mins. Return beef, pour in sauce, and simmer until thick.',
    thumbnail: '',
    cookingTime: '20 mins',
    servings: 2
  },
  {
    recipeName: 'Pancakes with Maple Syrup',
    ingredients: '1 cup flour, 1 cup milk, 1 egg, 2 tbsp melted butter, 1 tbsp sugar, 1 tsp baking powder, maple syrup',
    RecipeContent: 'Whisk flour, sugar, and baking powder. In another bowl, mix milk, egg, and melted butter. Combine wet and dry ingredients. Pour batter onto a hot greased griddle. Cook until bubbles form, then flip. Serve with maple syrup.',
    thumbnail: '',
    cookingTime: '15 mins',
    servings: 3
  },
  {
    recipeName: 'Chicken Caesar Wrap',
    ingredients: '2 tortillas, 1 cup grilled chicken sliced, 1 cup romaine lettuce chopped, 2 tbsp Caesar dressing, 1/4 cup parmesan cheese',
    RecipeContent: 'Lay tortillas flat. Spread Caesar dressing in the center. Top with lettuce, grilled chicken, and parmesan cheese. Fold edges and roll up tightly. Slice in half and serve.',
    thumbnail: '',
    cookingTime: '10 mins',
    servings: 2
  },
  {
    recipeName: 'Spicy Potato Wedges',
    ingredients: '3 large potatoes cut into wedges, 2 tbsp olive oil, 1 tsp paprika, 1/2 tsp cayenne pepper, 1 tsp garlic powder, salt',
    RecipeContent: 'Preheat oven to 400F. Toss potato wedges with olive oil, paprika, cayenne, garlic powder, and salt. Spread on a baking sheet. Bake for 30-35 minutes until crispy and golden brown.',
    thumbnail: '',
    cookingTime: '40 mins',
    servings: 4
  },
  {
    recipeName: 'Vegetable Fried Rice',
    ingredients: '3 cups cooked day-old rice, 1 cup mixed vegetables (peas, carrots, corn), 2 eggs beaten, 3 tbsp soy sauce, 1 tbsp sesame oil, 1 green onion sliced',
    RecipeContent: 'Heat sesame oil in a wok. Scramble the eggs, then set aside. Add mixed vegetables and stir-fry for 3 minutes. Add cooked rice and soy sauce, tossing to combine. Stir in the eggs and green onion. Serve hot.',
    thumbnail: '',
    cookingTime: '15 mins',
    servings: 3
  },
  {
    recipeName: 'Classic Cheeseburger',
    ingredients: '400g ground beef, 2 hamburger buns, 2 slices cheddar cheese, lettuce, tomato slices, ketchup, mustard, salt, pepper',
    RecipeContent: 'Form ground beef into two patties and season with salt and pepper. Grill or pan-fry for 4 minutes per side. Add cheddar cheese during the last minute to melt. Toast the buns. Assemble with lettuce, tomato, ketchup, and mustard.',
    thumbnail: '',
    cookingTime: '15 mins',
    servings: 2
  },
  {
    recipeName: 'Caprese Chicken Skillet',
    ingredients: '2 chicken breasts, 2 tomatoes sliced, 1/2 cup fresh mozzarella sliced, fresh basil, 1 tbsp balsamic glaze',
    RecipeContent: 'Pan-sear chicken breasts until fully cooked. Arrange tomato and mozzarella slices over the chicken. Cover the pan for 2 minutes to melt the cheese. Garnish with fresh basil and drizzle with balsamic glaze.',
    thumbnail: '',
    cookingTime: '25 mins',
    servings: 2
  },
  {
    recipeName: 'Blueberry Muffin Batch',
    ingredients: '2 cups flour, 1/2 cup sugar, 2 tsp baking powder, 1/2 cup milk, 1/4 cup oil, 1 egg, 1.5 cups blueberries',
    RecipeContent: 'Preheat oven to 375F. Mix dry ingredients. Stir in milk, oil, and egg until just moistened. Fold in blueberries. Fill greased muffin cups 2/3 full. Bake for 20 minutes.',
    thumbnail: '',
    cookingTime: '30 mins',
    servings: 6
  },
  {
    recipeName: 'Crispy Tofu Stir-Fry',
    ingredients: '1 block firm tofu pressed and cubed, 2 tbsp cornstarch, 1 cup snap peas, 1 red bell pepper sliced, 3 tbsp hoisin sauce, 1 tbsp soy sauce',
    RecipeContent: 'Toss tofu in cornstarch. Pan-fry until crispy on all sides, then remove. Sauté snap peas and bell pepper until crisp-tender. Return tofu to pan, add hoisin and soy sauce, and toss until coated.',
    thumbnail: '',
    cookingTime: '20 mins',
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
