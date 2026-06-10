const Product = require("../models/Product");

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product =
      await Product.findById(
        req.params.productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingReview =
      product.reviews.find(
        (review) =>
          review.user.toString() ===
          req.user.toString()
      );

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      product.reviews.push({
        user: req.user,
        name: req.userName || "User",
        rating,
        comment,
      });
    }

    product.numReviews =
      product.reviews.length;

    product.averageRating =
      product.reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviews = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.productId
      ).populate(
        "reviews.user",
        "name"
      );

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.productId
      );

    product.reviews =
      product.reviews.filter(
        (review) =>
          review._id.toString() !==
          req.params.reviewId
      );

    product.numReviews =
      product.reviews.length;

    product.averageRating =
      product.reviews.length
        ? product.reviews.reduce(
            (acc, item) =>
              acc + item.rating,
            0
          ) /
          product.reviews.length
        : 0;

    await product.save();

    res.status(200).json({
      success: true,
      message:
        "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getReviews,
  deleteReview,
};