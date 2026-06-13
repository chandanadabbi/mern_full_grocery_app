const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

const protect = require(
  "../middleware/authMiddleware"
);


/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping Cart APIs
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add Product To Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Added to cart
 */
router.post(
  "/",
  protect,
  addToCart
);


/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched
 */
router.get(
  "/",
  protect,
  getCart
);


/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove Product From Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product removed
 */
router.delete(
  "/:productId",
  protect,
  removeFromCart
);

module.exports = router;