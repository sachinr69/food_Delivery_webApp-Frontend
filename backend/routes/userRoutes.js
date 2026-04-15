const express = require("express");
const router = express.Router();

const { getProfile, updateProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const { changePassword } = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

module.exports = router;