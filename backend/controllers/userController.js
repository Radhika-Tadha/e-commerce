const User = require("../models/user");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don’t return password
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};
