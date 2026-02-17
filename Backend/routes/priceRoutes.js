// =====================================
// Price Prediction Routes
// =====================================

const express = require("express");
const router = express.Router();

const { predictPrice } = require("../controllers/priceController");

// POST /api/price/predict
router.post("/predict", predictPrice);

module.exports = router;
