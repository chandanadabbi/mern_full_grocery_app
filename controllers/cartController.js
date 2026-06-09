const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity +=
        quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user,
    }).populate("items.product");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromCart = async (
  req,
  res
) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user,
    });

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};