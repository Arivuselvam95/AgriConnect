// =====================================
// Product Routes - FarmHub
// =====================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getMyProducts
} = require("../controllers/productController");

// Create product (Farmer only)
router.post("/", authMiddleware, createProduct);

// Get all products (Public)
router.get("/", getAllProducts);

// Get logged-in farmer products
router.get("/my", authMiddleware, getMyProducts);

module.exports = router;
