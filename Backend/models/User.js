// =====================================
// User Model - AgriConnect
// =====================================

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["farmer", "consumer"],
      default: "farmer"
    },

    state: {
      type: String,
      required: true
    },

    district: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
