const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// Middleware: only admin allowed
const protectAdmin = [authMiddleware, isAdmin];

// Routes
router.get('/users', protectAdmin, adminController.getAllUsers);
router.get('/orders', protectAdmin, adminController.getAllOrders);

// Optional: delete user/order
router.delete('/user/:userId', protectAdmin, adminController.deleteUser);
router.delete('/order/:orderId', protectAdmin, adminController.deleteOrder);

module.exports = router;
