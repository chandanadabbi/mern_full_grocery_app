const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist Management APIs
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add Product to Wishlist
 *     description: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, addToWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get Wishlist
 *     description: Fetch all wishlist items for the logged-in user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getWishlist);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Remove Product from Wishlist
 *     description: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in wishlist
 */
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;
