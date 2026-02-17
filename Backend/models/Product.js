// =====================================
// Product Model - FarmHub
// =====================================

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
