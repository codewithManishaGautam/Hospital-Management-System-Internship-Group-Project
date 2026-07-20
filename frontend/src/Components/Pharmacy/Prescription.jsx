import React from "react";

function Prescription({ medicines, total, setStep }) {
  return (
    <>
      <h1 className="dashboard-title">Prescription</h1>

      {/* Patient Information */}
      <div
        className="table-container"
        style={{
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <h3
          className="section-label"
          style={{
            marginBottom: "15px",
            color: "var(--sidebar-bg)",
          }}
        >
          Patient Information
        </h3>

        <div className="patient-info">
          <p>
            <b>Patient Name :</b>--
          </p>

          <p>
            <b>UHID :</b> --
          </p>

          <p>
            <b>Doctor :</b> --
          </p>

          <p>
            <b>Date :</b> --
          </p>

          <p>
            <b>Time :</b> --
          </p>
        </div>
      </div>

      
      {/* Billing Section */}
      <div
        className="table-container"
        style={{ padding: "20px" }}
      >
        <h3
          className="section-label"
          style={{
            color: "var(--sidebar-bg)",
            marginBottom: "15px",
          }}
        >
          Pharmacy Billing
        </h3>

        <table className="data-table bordered-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Company</th>
              <th>Batch</th>
              <th>Exp</th>
              <th>Qty</th>
              <th>M.R.P</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
  <tr>
    <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
      No Billing Data Available
    </td>
  </tr>
</tbody>
        </table>

        <div className="total-section">
         <h2
  style={{
    fontSize: "1rem",
    fontWeight: "700",
  }}
>
  NET AMOUNT : ₹ 0.00
</h2>
        </div>

        {/* Buttons */}
        <div className="bill-btns">

          <button className="download-btn">
            Download PDF
          </button>

          <button className="send-btn">
            Send Billing Department
          </button>

          <button className="insurance-btn">
            Send Insurance Company
          </button>

        </div>

        {/* Payment Section */}
        <div className="payment-section">

          <div className="payment-box">
            <label>Payment Mode</label>

            <select>
              <option>
                Select Payment Mode
              </option>

              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>

          <div className="payment-box">
            <label>Payment Status</label>

            <select>
              <option>
                Payment Pending
              </option>

              <option>
                Payment Done
              </option>
            </select>
          </div>

        </div>

        <div
          className="bottom-actions"
          style={{
            marginTop: "24px",
          }}
        >
          <button
            className="btn-primary"
            onClick={() =>
              setStep("dashboard")
            }
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}

export default Prescription;