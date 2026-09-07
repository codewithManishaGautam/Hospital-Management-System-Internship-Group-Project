const Razorpay = require("razorpay");

console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const payment = async (req, res) => {

    console.log("PAYMENT API CALLED");

    try {

        const data = await razorpay.orders.create({
            amount: 500*100,
            currency: "INR",
            receipt: "RCP_ID_" + Date.now()
        });

        console.log("ORDER CREATED:", data.id);

        res.status(200).json({
          amount:data.amount,
          orderId:data.id,
        });

    } catch (error) {

        console.error("RAZORPAY ERROR:", error);

        res.status(500).json({
            message: "Payment order creation failed",
            error: error.message
        });
    }
};





module.exports = payment;




