import React, { useState } from "react";

function Payments({ payments, setStep }) {
  const [search, setSearch] = useState("");

  // 👉 Search filter (name / UHID / mobile)
  const filteredPayments = payments.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.uhid.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.includes(search)
  );

  // 👉 Summary calculation
  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + Number(p.amount.replace(/[₹, ]/g, "")), 0);

  const totalPending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + Number(p.amount.replace(/[₹, ]/g, "")), 0);

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

        <button className="btn-primary">
          Search
        </button>
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
            <div className="metric-number">
              ₹ {totalPaid}
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
              ₹ {totalPending}
            </div>

            <div className="metric-label">
              Pending Payments
            </div>
          </div>
        </div>

      </div>

      {/* BUTTON */}
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