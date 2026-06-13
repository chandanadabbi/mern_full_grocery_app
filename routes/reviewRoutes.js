const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product Review APIs
 */

/**
 * @swagger
 * /api/reviews/{productId}:
 *   post:
 *     summary: Add Review
 *     description: Add a review to a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Review added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post("/:productId", protect, addReview);

/**
 * @swagger
 * /api/reviews/{productId}:
 *   get:
 *     summary: Get Product Reviews
 *     description: Fetch all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/:productId", getReviews);

/**
 * @swagger
 * /api/reviews/{productId}/{reviewId}:
 *   delete:
 *     summary: Delete Review
 *     description: Delete a review from a product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
router.delete("/:productId/:reviewId", protect, deleteReview);

module.exports = router;
