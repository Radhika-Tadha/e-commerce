const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/multer");


router.post('/insert', authMiddleware, upload.single("image"), async (req, res) => {
    try {
        const { role } = req.user;
        console.log("REQ.USER:", req.user);
        console.log("User role from token:", role);

        if (!req.user || role !== "admin") {
            console.log("Unauthorized access attempt by:", req.user?.email);
            return res.status(403).json({ message: "Unauthorized. Only admins can add products." });
        }

        const { name, price, p_detail, size, category } = req.body;
        let image = req.file?.filename;

        if (!name || !price || !category) {
            return res.status(400).json("Full fill this Field");
        }
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const newProduct = new Product({
            name,
            price,
            p_detail,
            size,
            image,
            category,
        });

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        // console.error(err);
        await newProduct.save();
        console.log("Product save succesfully");
        res.status(201).json({ message: "Product created", product: newProduct });

    } catch (err) {
        console.error("❌ Insert product error:", err); // SHOW FULL ERROR
        console.error("Product not insert", err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message // <-- add this
        });
    }
});

// Update All Product
// ✅ UPDATE PRODUCT route
router.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);
        const { name, price, size, category, p_detail } = req.body;
        const updateFields = { name, price, size, category, p_detail };

        if (req.file) {
            updateFields.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );
        console.log("Product save succesfully");

        res.status(200).json({ message: "Product updated", product: updatedProduct });
    } catch (err) {
        if (err.response) {
            console.error("Product Update error:", err.response.data);
        } else {
            console.error("Product Submit error: Server unreachable or crashed", err.message);
        }
    }
});
// Delete Product
router.delete("/:id", authMiddleware, async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "product not found" });

        // if (product.author.toString() !== req.user) {
        //     return res.status(403).json({ message: "You can only delete your own blogs" });
        // }

        // Safe image deletion
        const fs = require("fs");
        const path = require("path");

        const imagePath = path.join(__dirname, "../uploads", product.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // deletes the file
        }


        await product.deleteOne();
        res.status(200).json({ message: "product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});


// get all product
router.get("/allproduct", async (req, res) => {
    try {
        const { category, role } = req.query;
        const filter = category ? { category: category.toLowerCase() } : {};

        let products = await Product.find(filter).sort({ createdAt: -1 });

        if (role === 'admin') {
            // ✅ return all product fields to admin
            return res.json({ product: products });
        } else {
            // ✅ return only public-safe fields
            const publicProducts = products.map(({ _id, name, image, price, category }) => ({
                _id,
                name,
                image,
                price,
                category
            }));
            console.log("Received category:", category);
            console.log("Filter applied:", filter);
            return res.json({ product: publicProducts });
        }

    } catch (error) {
        console.error("Error fetching product:", error.message);
        return res.status(500).json({ message: "Error fetching product", error });
    }
});


// fetch a product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({product});
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// category search
// GET/api/blog search=keyword
router.get("/", async (req, res) => {
    const search = req.query.search || "";

    try {
        const products = await Product.find({
            category: { $regex: search, $options: "i" }
        });

        res.status(200).json({ product: products });
    } catch (err) {
        console.error("Error searching product:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Search by Navber
// router.get("/",async (req,res)=>{
//     const search = req.query.search
// })
module.exports = router;


