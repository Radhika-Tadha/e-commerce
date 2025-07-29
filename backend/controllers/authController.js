const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, picture } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).json({ message: "Successfully signed up" });
    } catch (err) {
        console.error("Signup failed", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Invalid email or user not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.SECRETE_KEY,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            message: "Login successful",
            user: { name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.json("Logout successful");
};
