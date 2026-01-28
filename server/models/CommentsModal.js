const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const CommentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  recipe_id: {
    type: Schema.Types.ObjectId, ref: 'Recipes', required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId, ref: 'Users', required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comments = Mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
