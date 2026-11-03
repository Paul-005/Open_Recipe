/* eslint-disable no-undef */
const mongoose = require("mongoose");
const RecipeModal = require("../models/RecipeModal");

describe("Recipe Model Schema & Fork Support", () => {
  const dummyUserId = new mongoose.Types.ObjectId();
  const dummyRecipeId = new mongoose.Types.ObjectId();

  describe("Schema preservation and collection naming", () => {
    it("should preserve the model name 'Recipes' and default collection 'recipes'", () => {
      expect(RecipeModal.modelName).toBe("Recipes");
      expect(RecipeModal.collection.name).toBe("recipes");
    });

    it("should validate a valid recipe with required existing fields", async () => {
      const recipe = new RecipeModal({
        recipeName: "Classic Margherita Pizza",
        ingredients: "Dough, Tomato sauce, Mozzarella, Basil",
        RecipeContent: ["Roll dough", "Spread sauce", "Add cheese", "Bake"],
        cookingTime: "15 mins",
        servings: 2,
        user_id: dummyUserId,
      });

      const err = recipe.validateSync();
      expect(err).toBeUndefined();
    });

    it("should fail validation if required legacy fields are missing", () => {
      const recipe = new RecipeModal({
        recipeName: "Incomplete Recipe",
      });

      const err = recipe.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.ingredients).toBeDefined();
      expect(err.errors.RecipeContent).toBeDefined();
      expect(err.errors.cookingTime).toBeDefined();
      expect(err.errors.servings).toBeDefined();
      expect(err.errors.user_id).toBeDefined();
    });
  });

  describe("Backward compatibility with legacy documents", () => {
    it("should treat legacy documents without fork metadata as original recipes", () => {
      // Simulating a legacy document payload from MongoDB
      const legacyRaw = {
        _id: dummyRecipeId,
        recipeName: "Grandma's Apple Pie",
        ingredients: "Apples, Flour, Sugar, Butter",
        RecipeContent: ["Peel apples", "Make crust", "Bake at 375F"],
        thumbnail: "https://example.com/pie.jpg",
        cookingTime: "60 mins",
        servings: 8,
        user_id: dummyUserId,
      };

      const doc = new RecipeModal(legacyRaw);

      // Verify fork metadata defaults
      expect(doc.sourceRecipeId).toBeNull();
      expect(doc.rootRecipeId).toBeNull();
      expect(doc.forkedFromRevision).toBeNull();
      expect(doc.revision).toBe(1);
      expect(doc.variationTitle).toBe("");
      expect(doc.variationDescription).toBe("");
      expect(doc.visibility).toBe("public");
      expect(doc.publishedAt).toBeNull();

      // Virtual helpers
      expect(doc.isFork).toBe(false);
      expect(doc.isOriginal).toBe(true);
    });

    it("should not make sourceRecipeId or rootRecipeId required", () => {
      const original = new RecipeModal({
        recipeName: "Spaghetti Aglio e Olio",
        ingredients: "Spaghetti, Garlic, Olive oil, Chili flakes, Parsley",
        RecipeContent: ["Boil pasta", "Saute garlic in oil", "Toss pasta with oil"],
        cookingTime: "15 mins",
        servings: 2,
        user_id: dummyUserId,
      });

      const err = original.validateSync();
      expect(err).toBeUndefined();
      expect(original.sourceRecipeId).toBeNull();
      expect(original.rootRecipeId).toBeNull();
    });
  });

  describe("Fork metadata & variation properties", () => {
    it("should correctly store fork metadata referencing an original recipe", () => {
      const originalRecipeId = new mongoose.Types.ObjectId();
      const forkOwnerUserId = new mongoose.Types.ObjectId();

      const fork = new RecipeModal({
        recipeName: "Spicy Garlic Butter Shrimp",
        ingredients: "Shrimp, Butter, Garlic, Extra Chili Flakes, Lemon",
        RecipeContent: ["Sear shrimp", "Add extra garlic and chili", "Finish with lemon"],
        cookingTime: "15 mins",
        servings: 3,
        user_id: forkOwnerUserId, // Current owner of the fork document
        sourceRecipeId: originalRecipeId, // Direct parent
        rootRecipeId: originalRecipeId, // Root recipe
        forkedFromRevision: 2,
        variationTitle: "Extra Spicy",
        variationDescription: "Added extra hot pepper flakes and smoked paprika",
        visibility: "public",
        publishedAt: new Date("2026-04-15T12:00:00Z"),
      });

      const err = fork.validateSync();
      expect(err).toBeUndefined();

      expect(fork.sourceRecipeId.toString()).toBe(originalRecipeId.toString());
      expect(fork.rootRecipeId.toString()).toBe(originalRecipeId.toString());
      expect(fork.forkedFromRevision).toBe(2);
      expect(fork.revision).toBe(1);
      expect(fork.variationTitle).toBe("Extra Spicy");
      expect(fork.variationDescription).toBe("Added extra hot pepper flakes and smoked paprika");
      expect(fork.visibility).toBe("public");
      expect(fork.publishedAt).toEqual(new Date("2026-04-15T12:00:00Z"));

      // Ownership separation
      expect(fork.user_id.toString()).toBe(forkOwnerUserId.toString());
      expect(fork.user_id.toString()).not.toBe(originalRecipeId.toString());

      // Virtual helpers
      expect(fork.isFork).toBe(true);
      expect(fork.isOriginal).toBe(false);
    });

    it("should allow any user to fork a recipe created by another chef with correct attribution", () => {
      const originalChefId = new mongoose.Types.ObjectId();
      const otherChefId = new mongoose.Types.ObjectId();
      const originalRecipeId = new mongoose.Types.ObjectId();

      const originalRecipe = new RecipeModal({
        _id: originalRecipeId,
        recipeName: "Chef Mario's Authentic Carbonara",
        ingredients: "Spaghetti, Guanciale, Pecorino, Eggs, Black Pepper",
        RecipeContent: ["Boil pasta", "Crisp guanciale", "Mix eggs and cheese", "Toss together"],
        cookingTime: "20 mins",
        servings: 2,
        user_id: originalChefId, // Original chef
        revision: 3,
        visibility: "public"
      });

      // Another user forks Chef Mario's recipe
      const forkedVariation = new RecipeModal({
        recipeName: `${originalRecipe.recipeName} (Variation)`,
        ingredients: "Spaghetti, Bacon, Parmesan, Cream, Eggs, Black Pepper",
        RecipeContent: originalRecipe.RecipeContent,
        cookingTime: originalRecipe.cookingTime,
        servings: originalRecipe.servings,
        user_id: otherChefId, // New owner is the other chef
        sourceRecipeId: originalRecipe._id, // Attributed to original recipe
        rootRecipeId: originalRecipe._id,
        forkedFromRevision: originalRecipe.revision,
        variationTitle: "Quick Weeknight Carbonara",
        variationDescription: "Substituted guanciale with bacon and added cream for easier weeknight prep",
        visibility: "private"
      });

      const err = forkedVariation.validateSync();
      expect(err).toBeUndefined();

      // The fork is owned by the forking chef, not the original chef
      expect(forkedVariation.user_id.toString()).toBe(otherChefId.toString());
      expect(forkedVariation.user_id.toString()).not.toBe(originalChefId.toString());

      // Lineage is accurately attributed to the original recipe
      expect(forkedVariation.sourceRecipeId.toString()).toBe(originalRecipe._id.toString());
      expect(forkedVariation.forkedFromRevision).toBe(3);
      expect(forkedVariation.isFork).toBe(true);
    });

    it("should allow future fork-of-fork by having distinct sourceRecipeId and rootRecipeId", () => {
      const rootOriginalId = new mongoose.Types.ObjectId();
      const parentForkId = new mongoose.Types.ObjectId();
      const secondForkOwnerId = new mongoose.Types.ObjectId();

      const subFork = new RecipeModal({
        recipeName: "Dairy-Free Extra Spicy Garlic Butter Shrimp",
        ingredients: "Shrimp, Olive oil, Garlic, Extra Chili Flakes, Lemon",
        RecipeContent: ["Sear shrimp in olive oil", "Add chili and garlic"],
        cookingTime: "15 mins",
        servings: 3,
        user_id: secondForkOwnerId,
        sourceRecipeId: parentForkId, // Immediate parent fork
        rootRecipeId: rootOriginalId, // Ultimate root recipe
        forkedFromRevision: 1,
        variationTitle: "Dairy-Free Spicy",
        variationDescription: "Substituted butter with olive oil",
        visibility: "private",
      });

      const err = subFork.validateSync();
      expect(err).toBeUndefined();
      expect(subFork.sourceRecipeId.toString()).toBe(parentForkId.toString());
      expect(subFork.rootRecipeId.toString()).toBe(rootOriginalId.toString());
      expect(subFork.visibility).toBe("private");
      expect(subFork.isFork).toBe(true);
    });
  });

  describe("Visibility validation", () => {
    it("should accept 'private' and 'public' visibility", () => {
      const publicRecipe = new RecipeModal({
        recipeName: "Public Recipe",
        ingredients: "Ing",
        RecipeContent: ["Step 1"],
        cookingTime: "10 mins",
        servings: 1,
        user_id: dummyUserId,
        visibility: "public",
      });
      expect(publicRecipe.validateSync()).toBeUndefined();

      const privateRecipe = new RecipeModal({
        recipeName: "Private Recipe",
        ingredients: "Ing",
        RecipeContent: ["Step 1"],
        cookingTime: "10 mins",
        servings: 1,
        user_id: dummyUserId,
        visibility: "private",
      });
      expect(privateRecipe.validateSync()).toBeUndefined();
    });

    it("should reject any invalid visibility value", () => {
      const invalidRecipe = new RecipeModal({
        recipeName: "Invalid Visibility Recipe",
        ingredients: "Ing",
        RecipeContent: ["Step 1"],
        cookingTime: "10 mins",
        servings: 1,
        user_id: dummyUserId,
        visibility: "unlisted",
      });

      const err = invalidRecipe.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.visibility).toBeDefined();
    });
  });

  describe("Revision increment behavior", () => {
    it("should start a new document at revision 1 without incrementing on initial creation", (done) => {
      const newRecipe = new RecipeModal({
        recipeName: "New Recipe",
        ingredients: "Ingredients",
        RecipeContent: ["Step 1"],
        cookingTime: "20 mins",
        servings: 4,
        user_id: dummyUserId,
      });

      expect(newRecipe.revision).toBe(1);

      // Execute pre-save hook for brand new document
      newRecipe.schema.s.hooks.execPre("save", newRecipe, (err) => {
        expect(err).toBeFalsy();
        expect(newRecipe.revision).toBe(1);
        done();
      });
    });

    it("should increment revision when recipe content is modified on an existing document", (done) => {
      const existingRecipe = RecipeModal.hydrate({
        _id: dummyRecipeId,
        recipeName: "Original Stew",
        ingredients: "Beef, Potatoes",
        RecipeContent: ["Boil beef", "Add potatoes"],
        cookingTime: "40 mins",
        servings: 4,
        user_id: dummyUserId,
        revision: 1,
      });

      expect(existingRecipe.revision).toBe(1);

      // Modify content field
      existingRecipe.recipeName = "Rich Beef Stew";
      expect(existingRecipe.isModified("recipeName")).toBe(true);

      // Execute pre-save hook on existing document
      existingRecipe.schema.s.hooks.execPre("save", existingRecipe, (err) => {
        expect(err).toBeFalsy();
        expect(existingRecipe.revision).toBe(2);
        done();
      });
    });

    it("should not increment revision when only non-content metadata is changed", (done) => {
      const existingRecipe = RecipeModal.hydrate({
        _id: dummyRecipeId,
        recipeName: "Original Stew",
        ingredients: "Beef, Potatoes",
        RecipeContent: ["Boil beef", "Add potatoes"],
        thumbnail: "https://example.com/old.jpg",
        cookingTime: "40 mins",
        servings: 4,
        user_id: dummyUserId,
        revision: 1,
        visibility: "public",
        publishedAt: null,
      });

      // Modify only non-content fields
      existingRecipe.thumbnail = "https://example.com/new.jpg";
      existingRecipe.visibility = "private";
      existingRecipe.publishedAt = new Date();

      existingRecipe.schema.s.hooks.execPre("save", existingRecipe, (err) => {
        expect(err).toBeFalsy();
        expect(existingRecipe.revision).toBe(1);
        done();
      });
    });

    it("should inject $inc: { revision: 1 } in findOneAndUpdate when content is modified", (done) => {
      const query = RecipeModal.findOneAndUpdate(
        { _id: dummyRecipeId },
        { recipeName: "Updated Name via Query" }
      );

      query.schema.s.hooks.execPre("findOneAndUpdate", query, (err) => {
        expect(err).toBeFalsy();
        const update = query.getUpdate();
        expect(update.$inc).toBeDefined();
        expect(update.$inc.revision).toBe(1);
        done();
      });
    });

    it("should not inject $inc: { revision: 1 } in findOneAndUpdate when only non-content fields are updated", (done) => {
      const query = RecipeModal.findOneAndUpdate(
        { _id: dummyRecipeId },
        { thumbnail: "https://example.com/updated.jpg" }
      );

      query.schema.s.hooks.execPre("findOneAndUpdate", query, (err) => {
        expect(err).toBeFalsy();
        const update = query.getUpdate();
        expect(update.$inc).toBeUndefined();
        done();
      });
    });
  });
});
