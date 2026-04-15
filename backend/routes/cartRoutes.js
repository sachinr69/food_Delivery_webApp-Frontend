const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/:itemId", protect, updateQuantity);
router.delete("/:itemId", protect, removeFromCart);

module.exports = router;