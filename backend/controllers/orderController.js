const Order = require("../models/Order");
const Cart = require("../models/Cart");

// GET orders
exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
};

// PLACE ORDER (CART → ORDER)
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { restaurant } = req.body;

    const order = await Order.create({
      user: userId,
      restaurant: restaurant || "Food App",
      items: cart.items,          // ✅ from DB (important)
      total: cart.totalAmount,    // ✅ from DB
    });

    // 🧹 CLEAR CART AFTER ORDER
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};