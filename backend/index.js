const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
// const { sendEmail } = require("./controllers/emailController");

//  Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//  Route Imports
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/email");


//  Test Route
app.get('/api/test', (req, res) => {
    res.send('Backend working');
});


//  API Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", emailRoutes);

app.use((req, res, next) => {
    console.log("404 - Route not found:", req.method, req.originalUrl);
    res.status(404).json({ message: "Route not found" });
});
//  Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global error:", err);
    res.status(500).json({ message: "Server crashed...." });
});

//  MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => console.error(" MongoDB Connection Failed:", err.message));

//  Start Server
app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
