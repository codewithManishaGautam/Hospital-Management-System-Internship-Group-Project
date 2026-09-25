const express = require("express");
const router = express.Router();

const payment = require("../controllers/paymentController");

router.post("/order", payment.payment);

router.post(
    "/final-hospital-bill",
    payment.saveFinalHospitalBill
);


module.exports = router;


