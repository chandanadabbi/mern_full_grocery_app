const User = require("../models/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProfile = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user
    );

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const changePassword = async (
  req,
  res
) => {
  try {
    const {
      oldPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(
      req.user
    );

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Old password is incorrect",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    user.password =
      await bcrypt.hash(
        newPassword,
        salt
      );

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addAddress = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user
    );

    user.addresses.push(req.body);

    await user.save();

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAddresses = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user
    );

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAddress = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user
    );

    user.addresses =
      user.addresses.filter(
        (address) =>
          address._id.toString() !==
          req.params.id
      );

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  getAddresses,
  deleteAddress,
};