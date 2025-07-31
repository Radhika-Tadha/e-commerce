const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.post('/place', authMiddleware, orderController.placeOrder);

router.get('/my-orders', authMiddleware, orderController.getMyOrders);

router.get('/all', authMiddleware, isAdmin, orderController.getAllOrders);

router.put("/:id", authMiddleware, isAdmin, orderController.updateOrderStatus);


module.exports = router;
