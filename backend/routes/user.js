const express = require('express');
const router = express.Router();
const { getUserProfile, getUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.get('/getUser', authMiddleware, getUserProfile);
router.get("/all", authMiddleware, getUser);

module.exports = router;
