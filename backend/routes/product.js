const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const {
  insertProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchByCategory,
} = require("../controllers/productController");

// Routes
router.post("/insert", authMiddleware, upload.single("image"), insertProduct);
router.put("/update/:id", upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.get("/allproduct", getAllProducts);
router.get("/:id", getProductById);
router.get("/", searchByCategory);

module.exports = router;
