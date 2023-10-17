const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaTypes.ObjectId, ref: "blogs" },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timeStamps: true }
);

// export it
// "User" is the model name which is used in db
module.exports = mongoose.model("Comment", commentSchema, "comments");
