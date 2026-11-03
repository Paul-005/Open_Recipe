const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const CONTENT_FIELDS = [
  "recipeName",
  "ingredients",
  "RecipeContent",
  "cookingTime",
  "servings",
  "variationTitle",
  "variationDescription",
];

const RecipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    RecipeContent: {
      type: Schema.Types.Mixed,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
      default: "",
    },
    cookingTime: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    embedding: {
      type: [Number], // array of floats
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    // Fork metadata
    sourceRecipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipes",
      default: null,
    },
    rootRecipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipes",
      default: null,
    },
    forkedFromRevision: {
      type: Number,
      default: null,
    },
    revision: {
      type: Number,
      default: 1,
      min: 1,
    },
    variationTitle: {
      type: String,
      default: "",
    },
    variationDescription: {
      type: String,
      default: "",
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "public",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: false,
    autoIndex: false,
  }
);

// Virtual helpers to identify fork vs original
RecipeSchema.virtual("isFork").get(function () {
  return Boolean(this.sourceRecipeId);
});

RecipeSchema.virtual("isOriginal").get(function () {
  return !this.sourceRecipeId;
});

// Pre-save hook to increment revision when recipe content is modified
RecipeSchema.pre("save", function (next) {
  if (!this.isNew) {
    const isContentModified = CONTENT_FIELDS.some((field) =>
      this.isModified(field)
    );
    if (isContentModified) {
      this.revision = (this.revision || 1) + 1;
    }
  }
  next();
});

// Pre-findOneAndUpdate hook to increment revision when content fields are modified via query
RecipeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (!update) return next();

  const hasContentField = (obj) => {
    if (!obj || typeof obj !== "object") return false;
    return CONTENT_FIELDS.some((field) =>
      Object.prototype.hasOwnProperty.call(obj, field)
    );
  };

  const isContentModified =
    hasContentField(update) || (update.$set && hasContentField(update.$set));

  if (isContentModified) {
    if (!update.revision && (!update.$set || !update.$set.revision)) {
      if (!update.$inc) {
        update.$inc = {};
      }
      if (!update.$inc.revision) {
        update.$inc.revision = 1;
      }
    }
  }
  next();
});

const RecipeModal = Mongoose.model("Recipes", RecipeSchema);

module.exports = RecipeModal;
