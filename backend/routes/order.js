const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

//  USER: Place order
router.post('/place', authMiddleware, orderController.placeOrder);

//  USER: View own orders
router.get('/my-orders', authMiddleware, orderController.getMyOrders);

//  ADMIN: View all orders
router.get('/all', authMiddleware, isAdmin, orderController.getAllOrders);


module.exports = router;
