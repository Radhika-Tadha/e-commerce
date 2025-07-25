const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // connect with froentend
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cookieParser = require('cookie-parser');
app.use(cors({
    origin: "http://localhost:3000", // your React app origin
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
app.get('/api/test', (req, res) => {
    res.send('✅ Backend working');
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.use((err, req, res, next) => {
    console.error("Global error:", err);
    res.status(500).json({ message: "Server crashed...." });
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connection Successfull"))
    .catch(err => console.error("Connection failed", err.message));


app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});