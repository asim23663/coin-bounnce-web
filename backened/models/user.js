const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    author: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  { timeStamps: true }
);

// export it
// "User" is the model name which is used in db
module.exports = mongoose.model("User", userSchema, "users");
