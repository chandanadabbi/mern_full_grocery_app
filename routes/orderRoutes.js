const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderDetails,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create Order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order Created
 */
router.post("/", protect, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get My Orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get("/", protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get Order Details
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 */
router.get("/:id", protect, getOrderDetails);

module.exports = router;
