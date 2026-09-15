import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../../styles/Pharmacy/dashboard.css";

function Dashboard({ prescriptions, setStep, setSelectedPrescription }) {
  // const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Search by UHID or Patient Name
  // Only today's pending prescriptions
  const today = new Date();

  const todayPrescriptions = prescriptions.filter((item) => {
    if (item.status !== "Pending") {
      return false;
    }

    if (!item.createdAt) {
      return false;
    }

    const prescriptionDate = new Date(item.createdAt);

    return (
      prescriptionDate.getDate() === today.getDate() &&
      prescriptionDate.getMonth() === today.getMonth() &&
      prescriptionDate.getFullYear() === today.getFullYear()
    );
  });

  // Search by UHID or Patient Name
  const filteredPrescriptions = todayPrescriptions.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.prescription?.patientUHID?.toLowerCase().includes(text) ||
      item.prescription?.patientName?.toLowerCase().includes(text)
    );
  });

  // Today's pending prescription count
  const pendingCount = todayPrescriptions.length;

  // Today's Bill Count
  const todayBills = 0;

  return (
    <div className="pharmacy-dashboard-root">
      <h1 className="pharmacy-dashboard-title">Pharmacy Dashboard</h1>

      {/* Search Section */}
      <div className="pharmacy-search-section">
        <h3 className="pharmacy-search-title">Search Patient</h3>

        <input
          type="text"
          placeholder="Search by UHID or Patient Name"
          className="pharmacy-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="pharmacy-btn-primary">Search</button>
      </div>

      {/* Dashboard Cards */}
      <div className="pharmacy-metrics-row">
        <div className="pharmacy-metric-card">
          <h2>{pendingCount}</h2>
          <p>Pending Prescriptions</p>
        </div>

        <div className="pharmacy-metric-card">
          <h2>{todayBills}</h2>
          <p>Today's Bills</p>
        </div>
      </div>

      {/* Prescription Table */}
      <div className="pharmacy-table-container">
        <table className="pharmacy-data-table">
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
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>{item.prescription.patientUHID}</td>

                  <td>{item.prescription.patientName}</td>

                  <td>{item.prescription.doctor}</td>

                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                  <td>Pending</td>

                  <td>
                    <button
                      className="pharmacy-btn-primary"
                      onClick={() => {
                        setSelectedPrescription(item);
                        setStep("prescription");
                      }}
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
      <div className="pharmacy-bottom-actions">
        <button onClick={() => setStep("payments")}>Open Payments</button>

        {/* <button onClick={() => setStep("billpreview")}>
          Open Bill Preview
        </button> */}
      </div>
    </div>
  );
}

export default Dashboard;
