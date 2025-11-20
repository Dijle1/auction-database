// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Item title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },

    startingPrice: {
      type: Number,
      required: [true, "Starting price is required"],
      min: [1, "Price must be at least 1"],
    },

    currentBid: {
      type: Number,
      default: null,
    },

    category: {
      type: String,
      required: true,
      enum: {
        values: [
          "Electronics",
          "Fashion",
          "Collectibles",
          "Home",
          "Vehicles",
          "Sports",
          "Other",
        ],
        message: "Invalid category",
      },
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller ID is required"],
    },

    bidHistory: [
      {
        bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
