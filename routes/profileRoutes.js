const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  getAddresses,
  deleteAddress,
} = require("../controllers/profileController");

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User Profile Management APIs
 */
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get User Profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update User Profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/", protect, updateProfile);

/**
 * @swagger
 * /api/profile/change-password:
 *   put:
 *     summary: Change Password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized
 */
router.put("/change-password", protect, changePassword);

/**
 * @swagger
 * /api/profile/address:
 *   post:
 *     summary: Add Address
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Address added successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/address", protect, addAddress);

/**
 * @swagger
 * /api/profile/address:
 *   get:
 *     summary: Get User Addresses
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/address", protect, getAddresses);

/**
 * @swagger
 * /api/profile/address/{id}:
 *   delete:
 *     summary: Delete Address
 *     tags: [Profile]
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
 *         description: Address deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */
router.delete("/address/:id", protect, deleteAddress);

module.exports = router;
