const express = require("express");
const router = express.Router();

const cropList = require("../data/cropNPK");

// GET all crops
router.get("/", (req, res) => {
  res.json({
    crops: cropList
  });
});

module.exports = router;
