const uploadImage = async (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
    error,
  });
}
};

module.exports = {
  uploadImage,
};