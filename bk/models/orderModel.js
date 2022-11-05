// todo
const mongoose = require("../middleware/mongoose");

// todo
const orderSchema = new mongoose.Schema({
  // ?
  shipped: {
    type: Boolean,
    required: true,
  },
  // ?
  paid: {
    type: Boolean,
    required: true,
  },
  // ?
  payMethod: {
    type: String,
    required: true,
  },
  // ?
  address: {
    city: String,
    region: String,
    zip: Number,
    str: String,
  },
  // ?
  user: {
    username: String,
  },
  // ?
  cartContent: [
    {
      name: String,
      qty: Number,
      maxQty: Number,
      price: String,
    },
  ],
  // ?
  created: {
    type: Date,
    default: Date.now,
  },
});

// todo
module.exports = mongoose.model("Order", orderSchema);
