const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");

router.get("/dashboard", protect, admin, getDashboardStats);
router.get("/products", protect, admin, getAllProducts);

router.post("/products", protect, admin, createProduct);

router.put("/products/:id", protect, admin, updateProduct);

router.delete("/products/:id", protect, admin, deleteProduct);

module.exports = router;
