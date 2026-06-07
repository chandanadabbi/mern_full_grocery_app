const createProduct = async (
  req,
  res
) => {
  try {
    res.status(201).json({
      success: true,
      message: "Product created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
};