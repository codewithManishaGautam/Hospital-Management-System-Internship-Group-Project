import React, { useState } from "react";
import "../../styles/Pharmacy/Pharmacy.css";

function Dashboard({ prescriptions, setStep }) {
  const [search, setSearch] = useState("");

  // Search by UHID or Patient Name
  const filteredPrescriptions = prescriptions.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.uhid?.toLowerCase().includes(text) ||
      item.name?.toLowerCase().includes(text)
    );
  });

  // Pending Prescription Count
  const pendingCount = prescriptions.filter(
    (item) => item.status === "Pending"
  ).length;

  // Today's Bill Count
  const todayBills = prescriptions.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <>
      <h1 className="dashboard-title">Pharmacy Dashboard</h1>

      {/* Search Section */}
      <div className="search-section">
        <h3>Search Patient</h3>

        <input
          type="text"
          placeholder="Search by UHID or Patient Name"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-primary">
          Search
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="metrics-row">

        <div className="metric-card">
          <h2>{pendingCount}</h2>
          <p>Pending Prescriptions</p>
        </div>

        <div className="metric-card">
          <h2>{todayBills}</h2>
          <p>Today's Bills</p>
        </div>

      </div>

      {/* Prescription Table */}
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

            {filteredPrescriptions.length > 0 ? (

              filteredPrescriptions.map((item, index) => (

                <tr key={item.id}>

                  <td>{index + 1}</td>

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
                  No Prescription Found
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