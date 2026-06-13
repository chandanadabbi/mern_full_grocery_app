const express = require("express");

const router = express.Router();

const {
  createCoupon,
  getCoupons,
  applyCoupon,
} = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon Management APIs
 */

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create Coupon
 *     description: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, createCoupon);

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get All Coupons
 *     description: Fetch all available coupons
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupons fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getCoupons);

/**
 * @swagger
 * /api/coupons/apply:
 *   post:
 *     summary: Apply Coupon
 *     description: Apply a coupon code and get discounted amount
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *       400:
 *         description: Invalid coupon
 *       401:
 *         description: Unauthorized
 */
router.post("/apply", protect, applyCoupon);

module.exports = router;
