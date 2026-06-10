const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  getProfile,
  updateProfile,
  changePassword,
  addAddress,
  getAddresses,
  deleteAddress,
} = require("../controllers/profileController");

router.get(
  "/",
  protect,
  getProfile
);

router.put(
  "/",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.post(
  "/address",
  protect,
  addAddress
);

router.get(
  "/address",
  protect,
  getAddresses
);

router.delete(
  "/address/:id",
  protect,
  deleteAddress
);

module.exports = router;