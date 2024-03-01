const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: [String],
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Property", PropertySchema);
