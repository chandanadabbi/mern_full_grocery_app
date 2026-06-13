const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;