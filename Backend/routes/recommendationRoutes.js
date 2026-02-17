const express = require("express");
const router = express.Router();

const {
  recommendCrop
} = require("../controllers/recommendationController");

// POST route
router.post("/recommend", recommendCrop);

module.exports = router;
