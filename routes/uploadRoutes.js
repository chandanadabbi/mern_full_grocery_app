const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const {
  uploadImage,
} = require("../controllers/uploadController");


/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Image Upload APIs
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload Product Image
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Image uploaded
 */
router.post(
  "/",
  upload.single("image"),
  uploadImage
);
module.exports = router;