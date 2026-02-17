const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    Nitrogen: Number,
    Phosphorus: Number,
    Potassium: Number,
    pH_Value: Number,
    district: String,
    temperature: Number,
    humidity: Number,
    rainfall: Number,
    result: Object
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Recommendation",
  recommendationSchema
);
