import React, { useState, useEffect } from "react";
import { updatePatient } from "./services/patientService";
import { createOrder, verifyPayment } from "./services/paymentService";

import "../../styles/Reception/billing.css";

function OPDBilling({ patient }) {
  const [billingData, setBillingData] = useState({
    uhid: patient?.uhid || "",
    patientName: patient?.name || "",
    doctorName: patient?.doctor || "",
    consultationFee: "",
    paymentMode: "Cash",
  });

  useEffect(() => {
    if (patient) {
      setBillingData({
        uhid: patient.uhid || "",
        patientName: patient.name || "",
        doctorName: patient.doctor || "",
        consultationFee: patient.fee || 500,
        paymentMode: patient.paymentMode || "Cash",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRazorpayPayment = async () => {
    try {
      // Create Order
      const order = await createOrder(Number(billingData.consultationFee));

      console.log("Order Response:", order);

      console.log("Frontend Key:", process.env.REACT_APP_RAZORPAY_KEY_ID);

      let displayConfig = {};

      if (billingData.paymentMode === "UPI") {
        displayConfig = {
          config: {
            display: {
              blocks: {
                upi: {
                  name: "Pay using UPI",
                  instruments: [{ method: "upi" }],
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

      if (billingData.paymentMode === "Card") {
        displayConfig = {
          config: {
            display: {
              blocks: {
                card: {
                  name: "Pay using Card",
                  instruments: [{ method: "card" }],
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

      if (billingData.paymentMode === "Net Banking") {
        displayConfig = {
          config: {
            display: {
              blocks: {
                nb: {
                  name: "Net Banking",
                  instruments: [{ method: "netbanking" }],
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

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "Hospital Management System",

        description: "OPD Consultation Fee",

        order_id: order.id,

        handler: async function (response) {
          console.log("Payment Response:", response);

          try {
            const verify = await verifyPayment(response);

            console.log("Verify Response:", verify);

            if (verify.success) {
              await handleGenerateBill();
              alert("Payment Successful");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.log(error);
          }
        },
        prefill: {
          name: billingData.patientName,
        },

        theme: {
          color: "#3399cc",
        },

        ...displayConfig,

        method: {
          upi: billingData.paymentMode === "UPI",
          card: billingData.paymentMode === "Card",
          netbanking: billingData.paymentMode === "Net Banking",
        },

        modal: {
          ondismiss: function () {
            console.log("Checkout Closed");
          },
        },
      };

      console.log("Selected Payment Mode :", billingData.paymentMode);
      console.log("Final Options :", options);

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        console.log("Payment Failed Response:", response);

        alert("Payment Failed");
      });
    } catch (error) {
      console.log(error);
      alert("Unable to create payment");
    }
  };

  const handleGenerateBill = async () => {
    if (!patient) {
      alert("No patient selected");
      return;
    }

    try {
      const res = await updatePatient(patient._id, {
        ...patient,
        fee: Number(billingData.consultationFee),
        paymentMode: billingData.paymentMode,
        paymentStatus: "Paid",
        appointmentHistory: patient.appointmentHistory?.map((a, index) =>
          index === patient.appointmentHistory.length - 1
            ? {
                ...a,
                paymentStatus: "Paid",
                paymentMode: billingData.paymentMode,
                fee: Number(billingData.consultationFee),
              }
            : a,
        ),
        status: "Completed",
      });

      console.log("Response:", res);

      alert("Bill Generated Successfully");

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="billing-container">
      <div className="billing-header">
        <h2>OPD Billing</h2>
      </div>

      <div className="billing-card">
        <div className="billing-grid">
          <div className="form-group">
            <label>UHID Number</label>
            <input
              type="text"
              name="uhid"
              value={billingData.uhid}
              onChange={handleChange}
              placeholder="Enter UHID"
            />
          </div>

          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={billingData.patientName}
              onChange={handleChange}
              placeholder="Enter Patient Name"
            />
          </div>

          <div className="form-group">
            <label>Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={billingData.doctorName}
              onChange={handleChange}
              placeholder="Enter Doctor Name"
            />
          </div>

          <div className="form-group">
            <label>Consultation Fee</label>
            <input
              type="number"
              name="consultationFee"
              value={billingData.consultationFee}
              onChange={handleChange}
              placeholder="Enter Fee"
            />
          </div>

          <div className="form-group">
            <label>Payment Mode</label>
            <select
              name="paymentMode"
              value={billingData.paymentMode}
              onChange={handleChange}
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Net Banking</option>
            </select>
          </div>
        </div>

        <div className="bill-summary">
          <h3>Bill Summary</h3>

          <div className="summary-row">
            <span>Consultation Fee</span>
            <span>₹{billingData.consultationFee || 0}</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{billingData.consultationFee || 0}</span>
          </div>
        </div>

        <div className="billing-buttons">
          <button
            className="generate-btn"
            onClick={() => {
              if (billingData.paymentMode === "Cash") {
                handleGenerateBill();
              } else {
                handleRazorpayPayment();
              }
            }}
          >
            Generate Bill
          </button>

          <button className="print-btn">Print Bill</button>
        </div>
      </div>
    </div>
  );
}

export default OPDBilling;
