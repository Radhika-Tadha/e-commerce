// backend/seedAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("../models/user");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB connected"))
  .catch((err) => {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  });

async function seedAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin", err);
    process.exit(1);
  }
}

// seedAdmin();
