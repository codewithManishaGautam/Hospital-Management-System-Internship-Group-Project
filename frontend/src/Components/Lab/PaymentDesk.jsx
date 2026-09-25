import React from "react";
import axios from "axios";
import "../../styles/Lab/PaymentDesk.css";

function PaymentDesk({ labData, setLabData, fetchLabPatients }) {

    const handlePayment = async (patient) => {
        try {

            // Get pending lab bill
            const billResponse = await axios.get(
                `http://localhost:5000/lab/bill/${patient._id}`
            );

            const bill = billResponse.data.bill;

            if (!bill) {
                alert("Lab Bill not found");
                return;
            }

            // Update payment
            const paymentResponse = await axios.put(
                `http://localhost:5000/lab/bill/payment/${bill._id}`,
                {
                    paymentMode: "Cash"
                }
            );

         if (paymentResponse.data.success) {

    alert("Lab Payment Successful");

    await fetchLabPatients();
}

        } catch (error) {

            console.error("Lab Payment Error:", error);

            alert(
                error.response?.data?.message ||
                "Lab Payment Failed"
            );
        }
    };

    return (
        <div>
            <h2>Billing & Payment</h2>

            {labData.length === 0 ? (
                <p>No lab patients found.</p>
            ) : (
                labData.map((patient) => (

                    <div
                        key={patient._id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "8px"
                        }}
                    >

                        <h4>
                            {patient.name || "Unknown Patient"}
                        </h4>

                        <p>
                            UHID: {patient.uhid || "-"}
                        </p>

                        <p>
                            Payment Status:{" "}
                            <strong>
                                {patient.paymentStatus || "Pending"}
                            </strong>
                        </p>

                        {patient.paymentStatus !== "Paid" && (
                            <button
                                className="btn btn-success"
                                onClick={() => handlePayment(patient)}
                            >
                                Pay Cash
                            </button>
                        )}

                        {patient.paymentStatus === "Paid" && (
                            <p style={{ color: "green", fontWeight: "bold" }}>
                                ✓ Payment Paid
                            </p>
                        )}

                    </div>

                ))
            )}
        </div>
    );
}

export default PaymentDesk;