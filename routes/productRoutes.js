const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createProduct,
} = require("../controllers/productController");

router.post(
  "/",
  protect,
  admin,
  createProduct
);

module.exports = router;