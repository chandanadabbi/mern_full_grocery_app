const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category Management APIs
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a Category
 *     description: Create a new category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post("/", protect, admin, createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get All Categories
 *     description: Fetch all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */
router.get("/", getCategories);

module.exports = router;
