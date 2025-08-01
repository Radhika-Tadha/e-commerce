const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const isAdmin = require('../middlewares/isAdmin');

const {
  insertProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchByCategory,
  getProducts,
} = require("../controllers/productController");

// Routes
router.post("/insert", authMiddleware, isAdmin, upload.single("image"), insertProduct);
router.get('/allProduct', getProducts);
router.put("/update/:id", isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", isAdmin, authMiddleware, deleteProduct);
// router.get("/allproduct", getAllProducts);
router.get("/:id", getProductById);
// router.get("/", searchByCategory);


module.exports = router;
