const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const authMiddleware = require('../middlewares/auth');

// user Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, picture } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" })
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            res.status(400).json({ message: "user Already Exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User
            ({
                name,
                email,
                password: hashedPassword
                // role will be 'user' automatically
            });
        await newUser.save();

        res.status(200).json({ message: "success fully signup" });
    } catch (err) {
        console.error("login faild", err);
        res.status(500).json({ message: "Internal server error" });

    }
});

// User and Admin Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid Email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Passord Incorrect" });
        }

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
            message: "Login Success",
            user: {
                name: user.name,
                email: user.email
            },
        });

    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// get user
router.get('/getUser', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        if (!user) {
            return res.status(404).json({ message: "user not found111" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
})
// user logout 
router.post('/logout', (req, res) => {
    res.clearCookie("token");
    return res.json("Logout succes..");
});
module.exports = router;            