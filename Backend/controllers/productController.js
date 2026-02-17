// =====================================
// Product Controller - FarmHub
// =====================================

const Product = require("../models/Product");

// ===============================
// Create Product (Farmer)
// ===============================
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, image } = req.body;

    if (!name || !price || !quantity) {
      return res.status(400).json({
        message: "Name, price and quantity are required."
      });
    }

    const product = await Product.create({
      farmer: req.user.id,
      name,
      price,
      quantity,
      description,
      image
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// Get All Products (Public)
// ===============================
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("farmer", "name state district");

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// Get My Products (Farmer)
// ===============================
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      farmer: req.user.id
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
