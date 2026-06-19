const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  checkoutCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

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
router.post("/", protect, addToCart);

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
router.get("/", protect, getCart);

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
router.delete("/:productId", protect, removeFromCart);

/**
 * @swagger
 * /api/cart/increase/{productId}:
 *   put:
 *     summary: Increase Product Quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Quantity increased successfully
 *       404:
 *         description: Item not found
 */
router.put("/increase/:productId", protect, increaseQuantity);

/**
 * @swagger
 * /api/cart/decrease/{productId}:
 *   put:
 *     summary: Decrease Product Quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Quantity decreased successfully
 *       404:
 *         description: Item not found
 */
router.put("/decrease/:productId", protect, decreaseQuantity);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout Cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Proceed to payment
 *       400:
 *         description: Cart is empty
 */
router.post("/checkout", protect, checkoutCart);

module.exports = router;
