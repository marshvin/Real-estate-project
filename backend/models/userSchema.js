const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  avatar_image: {
    type: String,
    default: "default_avatar.png",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["seller", "buyer"],
    default: "buyer",
  },
});

module.exports = mongoose.model("User", UserSchema);
