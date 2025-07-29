const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: Number,
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Processing", // Admin can update this
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
