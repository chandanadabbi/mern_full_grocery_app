const Coupon = require("../models/couponModel");

const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(
      req.body
    );

    res.status(201).json({
      success: true,
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { code, amount } = req.body;

    const coupon =
      await Coupon.findOne({
        code: code.toUpperCase(),
      });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon",
      });
    }

    if (
      !coupon.isActive ||
      coupon.expiryDate < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Coupon expired",
      });
    }

    const discount =
      (amount *
        coupon.discountPercentage) /
      100;

    const finalAmount =
      amount - discount;

    res.status(200).json({
      success: true,
      discount,
      finalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  applyCoupon,
};