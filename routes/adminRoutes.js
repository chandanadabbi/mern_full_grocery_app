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
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
}=require("../controllers/adminController");
router.get("/dashboard", protect, admin, getDashboardStats);
router.get("/products", protect, admin, getAllProducts);

router.post("/products", protect, admin, createProduct);

router.put("/products/:id", protect, admin, updateProduct);

router.delete("/products/:id", protect, admin, deleteProduct);

router.get("/orders", protect, admin, getAllOrders);

router.put("/orders/:id", protect, admin, updateOrderStatus);

router.get("/users", protect, admin, getAllUsers);

module.exports = router;
