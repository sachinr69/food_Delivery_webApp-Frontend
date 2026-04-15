const Cart = require("../models/Cart");
const mongoose = require("mongoose"); 

// GET cart
exports.getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  res.json(cart);
};
exports.addToCart = async (req, res) => {
  const { product, name, price, image } = req.body;
    if (!mongoose.Types.ObjectId.isValid(product)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === product
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += 1;
  } else {
    cart.items.push({ product: product, name, price, image });
  }

  // update total
  cart.totalAmount = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
};
exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  let cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== itemId
  );

  cart.totalAmount = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
};
exports.updateQuantity = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  const item = cart.items.id(itemId);
  if (item) {
    item.quantity = quantity;
  }

  cart.totalAmount = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
};