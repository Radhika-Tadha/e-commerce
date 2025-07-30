const Order = require('../models/order');

// USER: Place an order
exports.placeOrder = async (req, res) => {
  try {
    console.log(" Incoming Order Request:", req.body);
    console.log(" Authenticated User:", req.user);

    const { userId, productId, quantity, address, price } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const newOrder = new Order({
      userId: req.user, // from authMiddleware
      productId,
      quantity,
      address,
      price,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 👉 USER: Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user })
      .populate("productId", "name image price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user orders" });
  }
};

// 👉 ADMIN: Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("productId", "name image price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("userId");

    // Optional: Notify user (e.g., via email, toast, or notification DB)
    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

