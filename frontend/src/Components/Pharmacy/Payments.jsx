import React, { useState } from "react";

function Payments({ payments, setStep }) {
  const [search, setSearch] = useState("");

  // 👉 Search filter (name / UHID / mobile)
  const filteredPayments = payments.filter((p) => {
    const text = search.toLowerCase();

    return (
      (p.patientName || "").toLowerCase().includes(text) ||
      (p.patientUHID || "").toLowerCase().includes(text) ||
      (p.patientId?.mobile || "").includes(search)
    );
  });

  // 👉 Summary calculation
  const totalPaid = payments
    .filter((p) => p.paymentStatus === "Completed")
    .reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);

  const totalPending = payments
    .filter((p) => p.paymentStatus === "Pending")
    .reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);

  return (
    <>
      <h1 className="dashboard-title">Payments</h1>

      {/* 🔍 SEARCH SECTION */}
      <div className="search-section">
        <h3>Search Patient Payment</h3>

        <input
          type="text"
          placeholder="Search by Name / UHID / Mobile"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-primary">Search</button>
      </div>

      {/* TABLE */}
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
            {filteredPayments.length > 0 ? (
              filteredPayments.map((p) => (
                <tr key={p._id}>
                  <td>{p._id}</td>

                  <td>{p.patientName || p.patientId?.name || "N/A"}</td>

                  <td>{p.patientUHID || p.patientId?.uhid || "N/A"}</td>

                  <td>{p.patientId?.mobile || "N/A"}</td>

                  <td>
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("en-IN")
                      : "N/A"}
                  </td>

                  <td>₹ {Number(p.totalAmount || 0).toFixed(2)}</td>

                  <td>
                    <span
                      className={`badge ${
                        p.paymentStatus === "Completed"
                          ? "completed"
                          : "pending"
                      }`}
                    >
                      {p.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No Payment Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAYMENT SUMMARY CARDS */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-icon-box">💰</div>

          <div className="metric-info">
            <div className="metric-number">₹ {totalPaid}</div>

            <div className="metric-label">Total Paid</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box">⏳</div>

          <div className="metric-info">
            <div className="metric-number">₹ {totalPending}</div>

            <div className="metric-label">Pending Payments</div>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="bottom-actions">
        <button className="btn-primary" onClick={() => setStep("dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </>
  );
}

export default Payments;
