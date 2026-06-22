import React, { useState } from "react";
import "../../styles/Reception/billing.css";

function OPDBilling() {
  // Yahan humne initial state me hi default details auto-fill kar di hain
  const [billingData, setBillingData] = useState({
    uhid: "UH250520001",       // Auto-filled
    patientName: "Rahul Sharma", // Auto-filled
    doctorName: "Dr. Mehta",     // Auto-filled
    consultationFee: "500",      // Default Fee Auto-filled
    paymentMode: "Cash",
    status: "Paid",
  });

  const [billList, setBillList] = useState([]);

  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateBill = () => {
    if (
      !billingData.uhid ||
      !billingData.patientName ||
      !billingData.consultationFee
    ) {
      alert("Fill all required fields");
      return;
    }

    setBillList([...billList, billingData]);

    alert("Bill Generated Successfully");

    
    setBillingData({
      uhid: "UH250520001",
      patientName: "Rahul Sharma",
      doctorName: "Dr. Mehta",
      consultationFee: "500",
      paymentMode: "Cash",
      status: "Paid",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="billing-container">
      {/* Header */}
      <div className="billing-header">
        <h2>OPD Billing Management</h2>
      </div>

      {/* Billing Form */}
      <div className="billing-form-card">
        <div className="billing-form-grid">
          
          {/* UHID Number - Disabled so user doesn't alter auto-fill */}
          <div className="billing-group">
            <label>UHID Number</label>
            <input
              type="text"
              name="uhid"
              value={billingData.uhid}
              onChange={handleChange}
              placeholder="Enter UHID"
              disabled
              style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed", color: "#64748b" }}
            />
          </div>

          {/* Patient Name - Disabled so user doesn't alter auto-fill */}
          <div className="billing-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={billingData.patientName}
              onChange={handleChange}
              placeholder="Patient Name"
              disabled
              style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed", color: "#64748b" }}
            />
          </div>

          {/* Doctor Name - Disabled so user doesn't alter auto-fill */}
          <div className="billing-group">
            <label>Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={billingData.doctorName}
              onChange={handleChange}
              placeholder="Doctor Name"
              disabled
              style={{ backgroundColor: "#f1f5f9", cursor: "not-allowed", color: "#64748b" }}
            />
          </div>

          {/* Consultation Fee - Open for entry */}
          <div className="billing-group">
            <label>Consultation Fee</label>
            <input
              type="number"
              name="consultationFee"
              value={billingData.consultationFee}
              onChange={handleChange}
              placeholder="Fee Amount"
            />
          </div>

          {/* Payment Mode */}
          <div className="billing-group">
            <label>Payment Mode</label>
            <select
              name="paymentMode"
              value={billingData.paymentMode}
              onChange={handleChange}
            >
              <option value="">Select Mode</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Payment Status */}
          <div className="billing-group">
            <label>Payment Status</label>
            <select
              name="status"
              value={billingData.status}
              onChange={handleChange}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="billing-buttons">
          <button className="generate-bill-btn" onClick={handleGenerateBill}>
            Generate Bill
          </button>
          <button className="print-btn" onClick={handlePrint}>
            Print Receipt
          </button>
        </div>
      </div>

      {/* Billing Table */}
      <div className="billing-table-card">
        <h3>Today's Billing Records</h3>
        <table className="billing-table">
          <thead>
            <tr>
              <th>UHID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Fee</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {billList.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Billing Records
                </td>
              </tr>
            ) : (
              billList.map((bill, index) => (
                <tr key={index}>
                  <td>{bill.uhid}</td>
                  <td>{bill.patientName}</td>
                  <td>{bill.doctorName}</td>
                  <td>₹ {bill.consultationFee}</td>
                  <td>{bill.paymentMode}</td>
                  <td>
                    <span className={bill.status === "Paid" ? "paid-badge" : "pending-badge"}>
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OPDBilling;