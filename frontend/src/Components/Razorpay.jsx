import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";

function Razorpay({ patientName, patientMob }) {
  const { Razorpay } = useRazorpay();

  const [amount, setAmount] = useState("");

  const payNow = async (paymentMode) => {
    try {
      if (!amount || Number(amount) <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      // CASH
      if (paymentMode === "Cash") {
        alert(`Cash Payment Selected\nAmount: ₹${amount}`);
        return;
      }

      // UPI / CARD
      const response = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Order Data:", data);

      const options = {
        key: "rzp_test_TPwFQBogAo1Jhm",

        amount: data.amount,

        currency: "INR",

        name: "Shradha Hospital",

        description: `${paymentMode} Payment`,

        order_id: data.orderId,

        prefill: {
          name: patientName,
          contact: patientMob,
        },

        method: {
          upi: paymentMode === "UPI",
          card: paymentMode === "Card",
          netbanking: false,
          wallet: false,
        },

        handler: (response) => {
          console.log("Payment Response:", response);

          alert(
            `${paymentMode} Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`,
          );
        },

        theme: {
          color: "#f47cd6",
        },
      };

      const razorpay = new Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log("Payment Failed:", response);

        alert(response.error?.description || "Payment Failed");
      });

      razorpay.open();
    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div className="text-center">
      <div className="col text-primary rounded-5">
        <br />

        <h1>Payment Section</h1>

        {/* Amount */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
            style={{
              width: "180px",
            }}
          />
        </div>

        {/* Payment Options */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <button className="btn btn-success" onClick={() => payNow("Cash")}>
            Cash
          </button>

          <button className="btn btn-primary" onClick={() => payNow("UPI")}>
            UPI
          </button>

          <button className="btn btn-warning" onClick={() => payNow("Card")}>
            Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default Razorpay;
