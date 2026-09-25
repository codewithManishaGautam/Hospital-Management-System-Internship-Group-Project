import React from "react";
import { useRazorpay } from "react-razorpay";

function Razorpay({
    patientName,
    patientMob,
    patientId,
    source,
    finalBill,
}) {
    const { Razorpay } = useRazorpay();

// ==========================
// Cash Payment
// ==========================
const payByCash = async () => {
    try {
        if (!patientId) {
            alert("Patient ID is not available");
            return;
        }

        if (!finalBill) {
            alert("Bill is not available");
            return;
        }

        // =========================================
        // LAB CASH PAYMENT
        // =========================================
        if (source === "Lab") {

            if (!finalBill._id) {
                alert("Lab Bill ID is not available");
                return;
            }

            console.log(
                "LAB CASH PAYMENT BILL ID =",
                finalBill._id
            );

            const response = await fetch(
                `http://localhost:5000/lab/bill/payment/${finalBill._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paymentMode: "Cash",
                    }),
                }
            );

            const data = await response.json();

            console.log(
                "LAB CASH PAYMENT RESPONSE =",
                data
            );

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Lab Cash Payment Failed"
                );
            }

            alert(
                "Lab Cash Payment Successfully Completed!"
            );

            window.location.reload();

            return;
        }

        // =========================================
        // MAIN HOSPITAL FINAL CASH PAYMENT
        // =========================================
        const response = await fetch(
            "http://localhost:5000/api/billing/final/cash",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientId,

                    dischargeDate:
                        finalBill.dischargeDate,

                    dischargeTime:
                        finalBill.dischargeTime,

                    stayDays:
                        finalBill.stayDays,

                    roomCharge:
                        finalBill.roomTotal || 0,

                    bedCharge:
                        finalBill.bedTotal || 0,

                    doctorConsultancyFee:
                        finalBill.doctorTotal || 0,

                    otherCharges:
                        finalBill.otherCharges || 0,

                    totalAmount:
                        finalBill.finalAmount || 0,

                    paymentMode: "Cash",

                    razorpayOrderId: "",
                    razorpayPaymentId: "",
                }),
            }
        );

        const data = await response.json();

        console.log(
            "FINAL CASH BILL RESPONSE =",
            data
        );

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Cash payment failed"
            );
        }

        alert(
            "Cash Payment Successfully Completed!"
        );

        window.location.reload();

    } catch (error) {
        console.error(
            "CASH PAYMENT ERROR =",
            error
        );

        alert(
            error.message ||
            "Cash payment could not be completed"
        );
    }
};

    // ==========================
    // Online / Razorpay Payment
    // ==========================
    const payOnline = async () => {
        try {
            const amount = Number(
                finalBill?.finalAmount || 0
            );

            if (amount <= 0) {
                alert(
                    "Lab bill amount is not available"
                );
                return;
            }

            if (!patientId) {
                alert("Patient ID is not available");
                return;
            }

            if (!finalBill) {
                alert("Final bill is not available");
                return;
            }

            console.log(
                "Online Payment Amount =",
                amount
            );

            // Create Razorpay Order
            const response = await fetch(
                "http://localhost:5000/api/payment/order",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        amount,
                        patientId,
                        patientName,
                        patientMob,
                        source,

                        dischargeDate: finalBill.dischargeDate,
                        dischargeTime: finalBill.dischargeTime,
                        stayDays: finalBill.stayDays,

                        roomCharge: finalBill.roomTotal,
                        bedCharge: finalBill.bedTotal || 0,
                        doctorConsultancyFee: finalBill.doctorTotal || 0,
                        otherCharges: finalBill.otherCharges || 0,
                        totalAmount: finalBill.finalAmount,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Server Error: ${response.status}`
                );
            }

            const data = await response.json();

            console.log(
                "RAZORPAY ORDER =",
                data
            );

            const options = {
                key: "rzp_test_TPwFQBogAo1Jhm",

                amount: data.amount,

                currency: "INR",

                name: "Shradha Hospital",

                description: "Lab Test Payment",

                image:
                    "https://doctorlistingingestionpr.blob.core.windows.net/doctorprofilepic/1670557851136_HospitalProfileImage_Profile%20Pic.png",

                order_id: data.orderId,

                // ==========================
                // Razorpay Success
                // ==========================
                handler: async (
                    paymentResponse
                ) => {
                    try {
                        console.log(
                            "RAZORPAY PAYMENT RESPONSE =",
                            paymentResponse
                        );

                        const saveResponse = await fetch(
                            "http://localhost:5000/api/payment/final-hospital-bill",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    patientId,

                                    dischargeDate: finalBill.dischargeDate,
                                    dischargeTime: finalBill.dischargeTime,

                                    stayDays: finalBill.stayDays,

                                    roomCharge: finalBill.roomTotal || 0,
                                    bedCharge: finalBill.bedTotal || 0,

                                    doctorConsultancyFee:
                                        finalBill.doctorTotal || 0,

                                    otherCharges:
                                        finalBill.otherCharges || 0,

                                    totalAmount:
                                        finalBill.finalAmount || 0,

                                    paymentMode: "Razorpay",

                                    razorpayOrderId:
                                        paymentResponse.razorpay_order_id,

                                    razorpayPaymentId:
                                        paymentResponse.razorpay_payment_id,
                                }),
                            }
                        );

                        const saveData =
                            await saveResponse.json();

                        console.log(
                            "FINAL HOSPITAL BILL PAYMENT UPDATE =",
                            saveData
                        );

                        if (
                            !saveResponse.ok ||
                            !saveData.success
                        ) {
                            throw new Error(
                                saveData.message ||
                                "Final hospital bill payment update failed"
                            );
                        }

                        alert(
                            "Online Payment Successfully Completed!"
                        );

                        // Refresh page
                        window.location.reload();

                    } catch (error) {
                        console.error(
                            "ONLINE PAYMENT SAVE ERROR =",
                            error
                        );

                        alert(
                            "Payment successful but final hospital bill status could not be updated."
                        );
                    }
                },

                prefill: {
                    name: patientName,
                    contact: patientMob,
                },

                theme: {
                    color: "#f47cd6",
                },

                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                },
            };

            const razorpay =
                new Razorpay(options);

            razorpay.on(
                "payment.failed",
                function (response) {
                    console.log(
                        "Payment Failed:",
                        response
                    );

                    alert(
                        response.error?.description ||
                        "Payment Failed"
                    );
                }
            );

            razorpay.open();

        } catch (error) {
            console.error(
                "FULL ONLINE PAYMENT ERROR:",
                error
            );

            alert(error.message);
        }
    };

    return (
        <div className="text-center">

            <div className="col text-primary rounded-5">

                <br />

                <h1>
                    Payment Section
                </h1>

                {/* Amount */}
                <div
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}
                >
               Amount: ₹{
    source === "Lab"
        ? finalBill?.totalAmount || 0
        : finalBill?.finalAmount || 0
}
                </div>

                {/* Payment Mode */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >

                    {/* Cash */}
                    <button
                        onClick={payByCash}
                        className="btn btn-success"
                    >
                        Pay by Cash
                    </button>

                    {/* Online */}
                    <button
                        onClick={payOnline}
                        className="btn btn-primary"
                    >
                        Pay Online
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Razorpay;