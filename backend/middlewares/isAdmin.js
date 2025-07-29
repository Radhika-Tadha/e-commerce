module.exports = (req, res, next) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (err) {
    console.error("Admin check failed:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
