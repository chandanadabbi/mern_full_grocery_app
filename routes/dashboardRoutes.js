const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getRecentOrders,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard APIs
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get Dashboard Statistics
 *     description: Fetch total users, orders, revenue and other dashboard statistics.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/stats", protect, getDashboardStats);

/**
 * @swagger
 * /api/dashboard/recent-orders:
 *   get:
 *     summary: Get Recent Orders
 *     description: Fetch recently placed orders for dashboard display.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/recent-orders", protect, getRecentOrders);

module.exports = router;
