// =====================================
// Order Controller - FarmHub
// =====================================

const Order = require("../models/Order");
const Product = require("../models/Product");

// ===============================
// Create Order (Consumer)
// ===============================
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Product ID and quantity are required."
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found."
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock."
      }); 
    }

    const totalPrice = product.price * quantity;

    const order = await Order.create({
      buyer: req.user.id,
      product: productId,
      quantity,
      totalPrice
    });

    // Reduce product stock
    product.quantity -= quantity;
    await product.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// Get My Orders
// ===============================
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
