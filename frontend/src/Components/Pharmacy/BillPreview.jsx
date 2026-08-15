import React, { useState } from "react";
import axios from "axios";
import { createOrder, verifyPayment } from "../Reception/services/paymentService";

import "../../styles/Pharmacy/pharmacyBilling.css";

function BillPreview({
  medicines,
  total,
  setStep,
  patient,
  prescriptionId,
  loadPrescriptions,
  loadPayments,
}) {
  const [paymentMode, setPaymentMode] = useState("Cash");
  // const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [saving, setSaving] = useState(false);

const saveBill = async () => {
  if (!paymentMode) {
    alert("Please Select Payment Mode");
    return;
  }

  if (!medicines || medicines.length === 0) {
    alert("No medicines selected");
    return;
  }

  try {
    setSaving(true);

    const res = await axios.post(
      "http://localhost:5000/api/pharmacy/bill",
      {
        patientId: patient.patientId,
        patientName: patient.patientName,
        patientUHID: patient.patientUHID,
        prescriptionId,
        doctorName: patient.doctor,

        medicines: medicines.map((m) => ({
          medicineName: m.medicineName,
          quantity: Number(m.quantity),
          price: Number(m.price || 0),
          amount:
            Number(m.amount) ||
            Number(m.quantity) * Number(m.price || 0),
        })),

        totalAmount: Number(total),
        paymentMode,
        paymentStatus: "Completed",
      }
    );

    alert(res.data.message);

    await loadPrescriptions();
    await loadPayments();

    setStep("dashboard");
  } catch (err) {
    console.log("Bill Save Error:", err);

    alert(
      err.response?.data?.message || "Bill Save Failed"
    );
  } finally {
    setSaving(false);
  }
};

const handleRazorpayPayment = async () => {
  if (!paymentMode) {
    alert("Please Select Payment Mode");
    return;
  }

  if (!medicines || medicines.length === 0) {
    alert("No medicines selected");
    return;
  }

  try {
    setSaving(true);

    // 1. Create Razorpay Order
    const order = await createOrder(Number(total));

    console.log("Pharmacy Razorpay Order:", order);

    let displayConfig = {};

    if (paymentMode === "UPI") {
      displayConfig = {
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay using UPI",
                instruments: [
                  {
                    method: "upi",
                  },
                ],
              },
            },
            sequence: ["upi"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
      };
    }

    if (paymentMode === "Card") {
      displayConfig = {
        config: {
          display: {
            blocks: {
              card: {
                name: "Pay using Card",
                instruments: [
                  {
                    method: "card",
                  },
                ],
              },
            },
            sequence: ["card"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
      };
    }

    if (paymentMode === "Net Banking") {
      displayConfig = {
        config: {
          display: {
            blocks: {
              nb: {
                name: "Net Banking",
                instruments: [
                  {
                    method: "netbanking",
                  },
                ],
              },
            },
            sequence: ["nb"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
      };
    }

    // 2. Razorpay Options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "Shraddha Hospital",

      description: "Pharmacy Medicine Bill",

      order_id: order.id,

      handler: async function (response) {
        console.log("Pharmacy Payment Response:", response);

        try {
          // 3. Verify Payment
          const verify = await verifyPayment(response);

          console.log("Pharmacy Verify Response:", verify);

          if (verify.success) {
            // 4. Only after successful payment save bill
            await saveBill();

            alert("Payment Successful & Bill Generated");
          } else {
            alert("Payment Verification Failed");
          }
        } catch (error) {
          console.log("Payment Verification Error:", error);

          alert("Payment Verification Failed");
        } finally {
          setSaving(false);
        }
      },

      prefill: {
        name: patient?.patientName || "",
      },

      theme: {
        color: "#3399cc",
      },

      ...displayConfig,

      method: {
        upi: paymentMode === "UPI",
        card: paymentMode === "Card",
        netbanking: paymentMode === "Net Banking",
      },

      modal: {
        ondismiss: function () {
          console.log("Pharmacy Checkout Closed");
          setSaving(false);
        },
      },
    };

    console.log("Pharmacy Payment Mode:", paymentMode);
    console.log("Pharmacy Razorpay Options:", options);

    // 5. Open Razorpay
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.log(
        "Pharmacy Payment Failed:",
        response
      );

      setSaving(false);

      alert("Payment Failed");
    });
  } catch (error) {
    console.log("Pharmacy Payment Error:", error);

    setSaving(false);

    alert(
      error.response?.data?.message ||
        "Unable to create payment"
    );
  }
};

const handlePayment = async () => {
  if (!paymentMode) {
    alert("Please Select Payment Mode");
    return;
  }

  if (!medicines || medicines.length === 0) {
    alert("No medicines selected");
    return;
  }

  if (paymentMode === "Cash") {
    const confirmCash = window.confirm(
      `Collect ₹${Number(total).toFixed(
        2
      )} cash from patient and confirm payment?`
    );

    if (!confirmCash) {
      return;
    }

    await saveBill();
    return;
  }

  await handleRazorpayPayment();
};
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pharmacy-billing-container">

      {/* ================= HEADER ================= */}

      <div className="pharmacy-billing-header">
        <h2>Pharmacy Billing</h2>
        <p>Generate Pharmacy Bill</p>
      </div>

      {/* ================= BILL CARD ================= */}

      <div className="pharmacy-billing-card">

        {/* ================= PATIENT INFORMATION ================= */}

        <h3 className="pharmacy-section-title">
          Patient Information
        </h3>

        <div className="pharmacy-billing-grid">

          <div className="pharmacy-form-group">
            <label>UHID Number</label>

            <input
              type="text"
              value={patient?.patientUHID || ""}
              readOnly
            />
          </div>

          <div className="pharmacy-form-group">
            <label>Patient Name</label>

            <input
              type="text"
              value={patient?.patientName || ""}
              readOnly
            />
          </div>

          <div className="pharmacy-form-group">
            <label>Doctor Name</label>

            <input
              type="text"
              value={patient?.doctor || ""}
              readOnly
            />
          </div>

        </div>

        {/* ================= MEDICINES ================= */}

        <h3 className="pharmacy-section-title">
          Medicine Details
        </h3>

        <div className="pharmacy-table-wrapper">

          <table className="pharmacy-billing-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Medicine</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>

            <tbody>
              {medicines && medicines.length > 0 ? (
                medicines.map((item, index) => {

                  const quantity = Number(item.quantity || 0);
                  const price = Number(item.price || 0);

                  const amount =
                    Number(item.amount) ||
                    quantity * price;

                  return (
                    <tr key={index}>

                      <td>{index + 1}</td>

                      <td>
                        {item.medicineName}
                      </td>

                      <td>
                        {quantity}
                      </td>

                      <td>
                        ₹ {price.toFixed(2)}
                      </td>

                      <td>
                        ₹ {amount.toFixed(2)}
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="no-medicine">
                    No medicines selected
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

        {/* ================= BILL SUMMARY ================= */}

        <div className="pharmacy-bill-summary">

          <h3>Bill Summary</h3>

          <div className="pharmacy-summary-row">
            <span>Gross Amount</span>

            <span>
              ₹ {Number(total || 0).toFixed(2)}
            </span>
          </div>

          <div className="pharmacy-summary-row pharmacy-total">
            <span>Net Total</span>

            <span>
              ₹ {Number(total || 0).toFixed(2)}
            </span>
          </div>

        </div>

        {/* ================= PAYMENT ================= */}

        <h3 className="pharmacy-section-title">
          Payment Details
        </h3>

        <div className="pharmacy-billing-grid">

          {/* Payment Mode */}

          <div className="pharmacy-form-group">

            <label>Payment Mode</label>

            <select
              value={paymentMode}
              onChange={(e) =>
                setPaymentMode(e.target.value)
              }
            >

              <option value="Cash">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>

              <option value="Net Banking">
                Net Banking
              </option>

            </select>

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="pharmacy-billing-buttons">

        <button
  className="pharmacy-generate-btn"
  onClick={handlePayment}
  disabled={saving}
>
  {saving ? "Processing..." : "Proceed to Payment"}
</button>

          <button
            className="pharmacy-print-btn"
            onClick={handlePrint}
          >
            Print Bill
          </button>

          <button
            className="pharmacy-back-btn"
            onClick={() => setStep("dashboard")}
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
}

export default BillPreview;