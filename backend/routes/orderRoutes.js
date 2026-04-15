const express = require("express");
const router = express.Router();

const { getOrders, createOrder } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// GET user orders
router.get("/", protect, getOrders);

// CREATE order (checkout)
router.post("/", protect, createOrder);

module.exports = router;