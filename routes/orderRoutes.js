const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");


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
 *         description: Order created
 */
router.post(
  "/",
  protect,
  createOrder
);


/**
 * @swagger
 * /api/orders/myorders:
 *   get:
 *     summary: Get My Orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched
 */
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

router.get(
  "/:id",
  protect,
  getOrderById
);

router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);

module.exports = router;