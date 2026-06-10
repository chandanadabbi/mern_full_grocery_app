const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post(
  "/:productId",
  protect,
  addReview
);

router.get(
  "/:productId",
  getReviews
);

router.delete(
  "/:productId/:reviewId",
  protect,
  deleteReview
);

module.exports = router;