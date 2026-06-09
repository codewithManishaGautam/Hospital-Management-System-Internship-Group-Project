import React from "react";

function Payments({ payments, setStep }) {
  return (
    <>
      <h1 className="dashboard-title">Payments</h1>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>UHID</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.uhid}</td>
                <td>{p.mobile}</td>
                <td>{p.date}</td>
                <td>{p.amount}</td>

                <td>
                  <span
                    className={`badge ${
                      p.status === "Paid"
                        ? "completed"
                        : "pending"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Summary Cards */}

      <div className="metrics-row">

        <div className="metric-card">
          <div className="metric-icon-box">💰</div>

          <div className="metric-info">
            <div className="metric-number">
              ₹ 1300
            </div>

            <div className="metric-label">
              Total Paid
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box">⏳</div>

          <div className="metric-info">
            <div className="metric-number">
              ₹ 1250
            </div>

            <div className="metric-label">
              Pending Payments
            </div>
          </div>
        </div>

      </div>

      {/* Buttons */}

      <div className="bottom-actions">
        <button
          className="btn-primary"
          onClick={() => setStep("dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </>
  );
}

export default Payments;