import React, { useState } from "react";
import "../../styles/Reception/OPDbilling.css";

function OPDBilling() {
  const [billingData, setBillingData] = useState({
    uhid: "",
    patientName: "",
    doctorName: "",
    consultationFee: "",
    paymentMode: "Cash",
  });

  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateBill = () => {
    alert("Bill Generated Successfully");
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
            <span>
              ₹{billingData.consultationFee || 0}
            </span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>
              ₹{billingData.consultationFee || 0}
            </span>
          </div>

        </div>

        <div className="billing-buttons">

          <button
            className="generate-btn"
            onClick={handleGenerateBill}
          >
            Generate Bill
          </button>

          <button className="print-btn">
            Print Bill
          </button>

        </div>

      </div>

    </div>
  );
}

export default OPDBilling;