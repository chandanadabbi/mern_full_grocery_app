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
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
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

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user,
    });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
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

const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user,
    });

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity += 1;

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

const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user,
    });

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
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

const checkoutCart = async (
  req,
  res
) => {
  try {
    const cart =
      await Cart.findOne({
        user: req.user,
      });

    if (
      !cart ||
      cart.items.length === 0
    ) {
      return res
        .status(400)
        .json({
          message:
            "Cart is empty",
        });
    }

    res.status(200).json({
      success: true,
      message:
        "Proceed to payment",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  checkoutCart
};
