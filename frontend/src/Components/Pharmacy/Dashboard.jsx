import React, { useState } from "react";
import "../../styles/Pharmacy/Pharmacy.css";

function Dashboard({ prescriptions, setStep }) {
  const [search, setSearch] = useState("");

  // Today's date in dd/mm/yyyy format
  const today = new Date().toLocaleDateString("en-GB");

  // Show only today's prescriptions
  const todayPrescriptions = prescriptions.filter(
    (item) => item.date === today
  );

  // Search by patient name
  const filteredPatients = todayPrescriptions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Dashboard Counts
  const pendingCount = todayPrescriptions.filter(
    (item) => item.status === "Pending"
  ).length;

  const billsToday = todayPrescriptions.length;

  return (
    <>
      <h1 className="dashboard-title">Pharmacy Dashboard</h1>

      {/* Search */}
      <div className="search-section">
        <h3>Search Patient</h3>

        <input
          type="text"
          placeholder="Enter Patient Name"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-primary">
          Search
        </button>
      </div>

      {/* Cards */}
      <div className="metrics-row">
        <div className="metric-card">
          <h2>{pendingCount}</h2>
          <p>Pending Prescriptions</p>
        </div>

        <div className="metric-card">
          <h2>{billsToday}</h2>
          <p>Bills Today</p>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>UHID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.uhid}</td>
                  <td>{item.name}</td>
                  <td>{item.doctor}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>

                  <td>
                    <button
                      className="btn-primary"
                      onClick={() => setStep("prescription")}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No Prescriptions Available Today
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-actions">
        <button onClick={() => setStep("payments")}>
          Open Payments
        </button>

        <button onClick={() => setStep("billpreview")}>
          Open Bill Preview
        </button>
      </div>
    </>
  );
}

export default Dashboard;