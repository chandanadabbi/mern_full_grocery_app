const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/orderModel");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts =
      await Product.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const orders =
      await Order.find();

    const revenue = orders.reduce(
      (acc, order) =>
        acc + order.totalPrice,
      0
    );

    res.status(200).json({
      success: true,
      totalProducts,
      totalUsers,
      totalOrders,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};