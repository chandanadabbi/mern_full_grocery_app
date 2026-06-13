const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRevenueStats,
  getMonthlySales,
  getTopProducts,
} = require("../controllers/analyticsController");


/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics and Reporting APIs
 */

/**
 * @swagger
 * /api/analytics/revenue:
 *   get:
 *     summary: Get Revenue Statistics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue statistics fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/revenue",
  protect,
  getRevenueStats
);

/**
 * @swagger
 * /api/analytics/monthly-sales:
 *   get:
 *     summary: Get Monthly Sales Data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly sales data fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/monthly-sales",
  protect,
  getMonthlySales
);

/**
 * @swagger
 * /api/analytics/top-products:
 *   get:
 *     summary: Get Top Selling Products
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top products fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/top-products",
  protect,
  getTopProducts
);

module.exports = router;