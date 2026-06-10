const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getRecentOrders,
} = require("../controllers/dashboardController");

const protect = require(
  "../middleware/authMiddleware"
);

router.get(
  "/stats",
  protect,
  getDashboardStats
);

router.get(
  "/recent-orders",
  protect,
  getRecentOrders
);

module.exports = router;