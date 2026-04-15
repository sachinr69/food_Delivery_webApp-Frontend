const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  label: String,
  line1: String,
  line2: String,
  city: String,
  pincode: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Address", addressSchema);