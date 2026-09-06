import React, { useState } from "react";
import axios from "axios";
import {
  createOrder,
  verifyPayment,
} from "../Reception/services/paymentService";
import "./style/LabBilling.css";

const LAB_TEST_PRICES = {
  CBC: 250,
  "Blood Sugar": 100,
  LFT: 300,
  KFT: 350,
  "Lipid Profile": 400,
  "Urine Routine": 150,
  "Thyroid Profile": 450,
  HbA1c: 300,
  CRP: 350,
  ESR: 150,
};

function LabBilling({ request, onBack }) {
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [saving, setSaving] = useState(false);

  const tests = request?.tests || [];

  const billItems = tests.map((test) => ({
    testName: test,
    price: LAB_TEST_PRICES[test] || 0,
  }));

  const totalAmount = billItems.reduce((total, item) => total + item.price, 0);

  // ==========================================
  // COMPLETE LAB PAYMENT
  // ==========================================

  const completePayment = async ({ paymentId = "", orderId = "" } = {}) => {
    try {
      setSaving(true);

      const res = await axios.put(
        `http://localhost:5000/lab/requests/${request._id}/payment`,
        {
          totalAmount,
          paymentMode,
          paymentId,
          orderId,
        },
      );

      if (res.data.success) {
        alert("Payment Successful & Lab Bill Generated");

        if (onBack) {
          onBack();
        }
      }
    } catch (error) {
      console.log("Lab Payment Error:", error);

      alert(error.response?.data?.message || "Lab Payment Failed");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // RAZORPAY PAYMENT
  // ==========================================

  const handleRazorpayPayment = async () => {
    try {
      setSaving(true);

      const order = await createOrder(Number(totalAmount));

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Shraddha Hospital",

        description: "Lab Test Bill",

        order_id: order.id,

        handler: async function (response) {
          try {
            const verify = await verifyPayment(response);

            if (verify.success) {
              await completePayment({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              });
            } else {
              alert("Payment Verification Failed");
              setSaving(false);
            }
          } catch (error) {
            console.log("Lab Payment Verification Error:", error);

            alert("Payment Verification Failed");
            setSaving(false);
          }
        },

        prefill: {
          name: request?.patientName || "",
        },

        theme: {
          color: "#1976d2",
        },

        modal: {
          ondismiss: function () {
            setSaving(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

      paymentObject.on("payment.failed", function () {
        alert("Payment Failed");
        setSaving(false);
      });
    } catch (error) {
      console.log("Create Lab Payment Error:", error);

      alert(error.response?.data?.message || "Unable to create payment");

      setSaving(false);
    }
  };

  // ==========================================
  // PAYMENT BUTTON
  // ==========================================

  const handlePayment = async () => {
    if (!paymentMode) {
      alert("Please Select Payment Mode");
      return;
    }

    if (totalAmount <= 0) {
      alert("Lab test price is not available");
      return;
    }

    // Cash payment
    if (paymentMode === "Cash") {
      const confirmCash = window.confirm(
        `Collect ₹${totalAmount} cash from patient and confirm payment?`,
      );

      if (!confirmCash) {
        return;
      }

      await completePayment();
      return;
    }

    // Razorpay payment
    await handleRazorpayPayment();
  };

  return (
    <div className="lab-billing-page">
      <div className="lab-billing-card">
        <h2>Lab Bill</h2>

        <div className="patient-details">
          <p>
            <strong>Patient Name:</strong> {request?.patientName}
          </p>

          <p>
            <strong>UHID:</strong> {request?.uhid}
          </p>

          <p>
            <strong>Doctor:</strong> {request?.doctorName}
          </p>

          <p>
            <strong>Ward:</strong> {request?.ward}
          </p>
        </div>

        <hr />

        <h3>Lab Tests</h3>

        <table className="lab-bill-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Test Name</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {billItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{item.testName}</td>

                <td>₹{item.price}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan="2">Total Amount</th>

              <th>₹{totalAmount}</th>
            </tr>
          </tfoot>
        </table>

        <div className="payment-section">
          <h3>Payment</h3>

          <label>Payment Mode</label>

          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
          >
            <option value="Cash">Cash</option>

            <option value="UPI">UPI</option>

            <option value="Card">Card</option>

            <option value="Net Banking">Net Banking</option>
          </select>

          <button className="pay-btn" onClick={handlePayment} disabled={saving}>
            {saving ? "Processing Payment..." : `Pay ₹${totalAmount}`}
          </button>

          <button className="back-btn" onClick={onBack} disabled={saving}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default LabBilling;
