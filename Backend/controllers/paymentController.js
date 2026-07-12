const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("Received Amount:", amount);

    const options = {
      amount: amount * 100, // Rupees -> Paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log("Created Order:", order);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order Creation Failed",
    });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({
        success: true,
        message: "Payment Verified",
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid Signature",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Verification Failed",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};
