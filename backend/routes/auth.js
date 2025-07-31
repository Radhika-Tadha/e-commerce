const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const {
  signup,
  login,
  logout,
  me,
} = require("../controllers/authController");

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);


module.exports = router;
