const Razorpay = require("razorpay");
const Patient = require("../models/Patient");
const Bill = require("../models/Bill");
const Bed = require("../models/Bed");

console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const payment = async (req, res) => {
    console.log("PAYMENT API CALLED");

    try {
        const { amount } = req.body;

        // Validate amount
        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid payment amount is required",
            });
        }

        const numericAmount = Number(amount);

        console.log("Payment Amount:", numericAmount);

        const data = await razorpay.orders.create({
            amount: numericAmount * 100,
            currency: "INR",
            receipt: "RCP_ID_" + Date.now(),
        });

        console.log("ORDER CREATED:", data.id);

        res.status(200).json({
            success: true,
            amount: data.amount,
            orderId: data.id,
        });

    } catch (error) {
        console.error("RAZORPAY ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Payment order creation failed",
            error: error.message,
        });
    }
};

const saveFinalHospitalBill = async (req, res) => {
    try {
        const {
            patientId,
            dischargeDate,
            dischargeTime,
            stayDays,
            roomCharge,
            bedCharge,
            doctorConsultancyFee,
            otherCharges,
            totalAmount,
            paymentMode,
            razorpayOrderId,
            razorpayPaymentId,
        } = req.body;

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        const bill = new Bill({
            patientId: patient._id,
            patientName: patient.name,
            email: patient.email || "",
            uhid: patient.uhid || "",
            billType: patient.role || "",
            roomNo: patient.roomNo || "",
            roomType: patient.roomType || "",

            admissionDate: patient.admissionDate
                ? new Date(patient.admissionDate)
                : null,

            dischargeDate: dischargeDate
                ? new Date(dischargeDate)
                : null,

            stayDays: Number(stayDays || 0),

            roomCharge: Number(roomCharge || 0),
            bedCharge: Number(bedCharge || 0),
            doctorConsultancyFee: Number(
                doctorConsultancyFee || 0
            ),
            otherCharges: Number(otherCharges || 0),

            totalAmount: Number(totalAmount || 0),

            paymentMode: paymentMode || "Razorpay",
            paymentStatus: "Paid",
            paidAt: new Date(),

            razorpayOrderId: razorpayOrderId || "",
            razorpayPaymentId: razorpayPaymentId || "",
        });

        await bill.save();

        // Release bed
        if (patient.bedNo && patient.roomNo) {
            await Bed.findOneAndUpdate(
                {
                    roomNumber: patient.roomNo,
                    bedNo: patient.bedNo,
                },
                {
                    status: "Available",
                }
            );
        }

        // Update patient
        patient.dischargeDate = dischargeDate || "";
        patient.dischargeTime = dischargeTime || "";
        patient.status = "Discharged";
        patient.paymentStatus = "Paid";
        patient.paidAt = new Date();
        patient.paymentMode = paymentMode || "Razorpay";

        await patient.save();

        res.json({
            success: true,
            message: "Final hospital bill saved successfully",
            bill,
        });

    } catch (error) {
        console.error(
            "SAVE FINAL HOSPITAL BILL ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    payment,
    saveFinalHospitalBill,
};