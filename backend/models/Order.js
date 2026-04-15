const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  restaurant: String,

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],

  total: Number,

  status: {
    type: String,
    default: "Preparing",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Order", orderSchema);