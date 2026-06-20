const express = require("express");

const router = express.Router();

const { createOrder } = require("../controllers/orderController");

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

module.exports = router;
