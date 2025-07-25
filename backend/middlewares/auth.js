const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
    const token = req.cookies.token; //|| req.headers.token?.split(" ")[1];

    if (!token) {
        return res.status(404).json({ message: "Cookie UnAuthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        console.log("DECODED:", decoded);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not fount" });
        }
        req.user = user;
        next();

    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(500).json({ message: "Invalid or expired token" });
    }
}
