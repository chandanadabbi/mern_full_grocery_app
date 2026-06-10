const express = require("express");

const router = express.Router();

const {
  createCoupon,
  getCoupons,
  applyCoupon,
} = require("../controllers/couponController");

const protect = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createCoupon
);

router.get(
  "/",
  protect,
  getCoupons
);

router.post(
  "/apply",
  protect,
  applyCoupon
);

module.exports = router;