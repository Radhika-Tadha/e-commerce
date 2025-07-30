const Product = require("../models/product");
const fs = require("fs");
const path = require("path");
const product = require("../models/product");

exports.insertProduct = async (req, res) => {
  try {
    const { role } = req.user;

    if (!req.user || role !== "admin") {
      return res.status(403).json({ message: "Unauthorized. Only admins can add products." });
    }

    const { name, price, p_detail, size, category } = req.body;
    let image = req.file?.filename;

    if (!name || !price || !category) {
      return res.status(400).json("Full fill this Field");
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newProduct = new Product({ name, price, p_detail, size, image, category });
    await newProduct.save();

    res.status(201).json({ message: "Product created", product: newProduct });

  } catch (err) {
    console.error(" Insert product error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, size, category, p_detail } = req.body;
    const updateFields = { name, price, size, category, p_detail };

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const imagePath = path.join(__dirname, "../uploads", product.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { category, role } = req.query;
    const filter = category ? { category: category.toLowerCase() } : {};

    let products = await Product.find(filter).sort({ createdAt: -1 });

    if (role === "admin") {
      return res.json({ product: products });
    } else {
      const publicProducts = products.map(({ _id, name, image, price, category }) => ({
        _id, name, image, price, category
      }));
      return res.json({ product: publicProducts });
    }

  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getProducts = async (req, res) => {
  const search = req.query.search || "";
  const category = req.query.category || "";

  const filter = {};

  if (category) {
    // partial, case-insensitive match on category
    filter.category = { $regex: `^${category}$`, $options: "i" };
  }

  if (search) {
    // partial, case-insensitive match on name
    filter.name = { $regex: search, $options: "i" };
  }

  try {
    const products = await Product.find(filter);
    res.status(200).json({ product: products });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

