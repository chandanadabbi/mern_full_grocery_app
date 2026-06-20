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

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: req.user,
      orderItems,
      totalPrice,
      paymentMethod: "Cash On Delivery",
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

module.exports = {
  createOrder,
};
