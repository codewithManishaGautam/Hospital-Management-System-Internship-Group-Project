const express = require("express");
const router = express.Router();

const payment  = require("../controllers/paymentController");
const createQR  = require("../controllers/paymentController");


router.post("/order", payment);

router.post("/qr", createQR);

module.exports = router;

