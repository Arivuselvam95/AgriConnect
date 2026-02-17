// =====================================
// Price Prediction Controller
// =====================================

const axios = require("axios");

// Predict Crop Price
exports.predictPrice = async (req, res) => {
  try {
    const { crop } = req.body;

    if (!crop) {
      return res.status(400).json({ message: "Crop name is required." });
    }

    // Call Python ML API
    const response = await axios.get(
      `${process.env.ML_API_URL}/predict/${crop}`
      
    );

    res.json(response.data);

  } catch (error) {
    console.error("Price Prediction Error:", error.message);
    res.status(500).json({ message: "Price prediction service failed." });
  }
};
