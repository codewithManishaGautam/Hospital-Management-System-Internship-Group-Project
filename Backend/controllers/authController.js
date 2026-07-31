const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const Doctor = require("../models/Doctor");

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await Staff.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    let isMatch = false;

    if (user.password && user.password.startsWith("$2")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const doctor =
      role === "doctor" ? await Doctor.findOne({ mobile: user.mobile }) : null;

    console.log("Staff User =", user);
    console.log("Doctor Found =", doctor);

    res.status(200).json({
      success: true,
      role: user.role,
      user,
      doctor,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const testEmail = async (req, res) => {
  try {
    await sendEmail(
      process.env.EMAIL_USER,
      "Hospital Management Test",
      "Congratulations! Email service is working successfully.",
    );

    res.json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  console.log("VERIFY API CALLED");
  console.log(req.body);
  try {
    const { email, otp, password } = req.body;

    const user = await Staff.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isVerified = true;
    user.otp = "";

    console.log("Before Save");
    console.log(user);

    await user.save();

    console.log("After Save");

    console.log(user);

    res.json({
      success: true,
      message: "Account Verified Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const sendRegistrationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Staff.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;

    await user.save();

    await sendEmail(
      user.email,
      "Shraddha Hospital Registration OTP",
      `Your OTP is : ${otp}

Use this OTP to activate your account.`,
    );

    res.json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Staff.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;

    await user.save();

    await sendEmail(
      user.email,
      "Shraddha Hospital Password Reset",
      `Your OTP is: ${otp}

Use this OTP to reset your password.`,
    );

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await Staff.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = "";

    await user.save();

    res.json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  login,
  testEmail,
  verifyOtp,
  forgotPassword,
  resetPassword,
  sendRegistrationOtp,
};
