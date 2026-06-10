const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },
    reviews: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
],

numReviews: {
  type: Number,
  default: 0,
},

averageRating: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
