const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not found in cookies" });
    }

    const decoded = jwt.verify(token, process.env.SECRETE_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user._id;        // use this in controllers (like req.user)
    req.role = user.role;       // if need admin check later
    // req.user = decoded._id;
    req.user = user;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
