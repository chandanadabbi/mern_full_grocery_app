const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

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

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: req.user,
      orderItems,
      totalPrice,
    });

    cart.items = [];
    await cart.save();
    const user = await User.findById(req.user);

    await sendEmail(
      user.email,
      "Order Confirmation",
      `
  <h2>Order Confirmed</h2>

  <p>Hello ${user.name},</p>

  <p>Your order has been placed successfully.</p>

  <p><strong>Order ID:</strong> ${order._id}</p>

  <p><strong>Total Amount:</strong> ₹${totalPrice}</p>

  <p>Thank you for shopping with us!</p>
  `,
    );
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
    const order = await Order.findById(req.params.id).populate(
      "orderItems.product",
    );

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

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

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
