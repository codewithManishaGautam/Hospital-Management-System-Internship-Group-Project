const express = require("express");
const router = express.Router();

const {
  login,
  testEmail,
  verifyOtp,
  forgotPassword,
  resetPassword,
  sendRegistrationOtp,
} = require("../controllers/authController");

router.post("/login", login);

router.post("/send-registration-otp", sendRegistrationOtp);

router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/test-email", testEmail);

module.exports = router;
