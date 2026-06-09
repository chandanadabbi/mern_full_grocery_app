const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const orderItems = cart.items.map(
      (item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })
    );

    const totalPrice = orderItems.reduce(
      (acc, item) =>
        acc + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user,
      orderItems,
      totalPrice,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user,
    }).populate("orderItems.product");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    ).populate("orderItems.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};