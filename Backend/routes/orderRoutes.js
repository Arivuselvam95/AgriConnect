// =====================================
// Order Routes - FarmHub
// =====================================

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders
} = require("../controllers/orderController");

// Place order (Consumer)
router.post("/", authMiddleware, createOrder);

// Get logged-in user's orders
router.get("/my", authMiddleware, getMyOrders);

module.exports = router;
