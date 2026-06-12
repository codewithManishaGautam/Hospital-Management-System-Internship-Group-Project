import React from "react";
import "../../styles/Pharmacy/Pharmacy.css";

function Dashboard({ prescriptions, setStep }) {
  return (
    <>
      <h1 className="dashboard-title">Pharmacy Dashboard</h1>

      <div className="search-section">
        <h3>Search Patient Prescription</h3>

        <input
          type="text"
          placeholder="Enter UHID Number"
          className="search-input"
        />

        <button className="btn-primary">
          Search
        </button>
      </div>

      <div className="metrics-row">
        <div className="metric-card">
          <h2>12</h2>
          <p>Pending Prescriptions</p>
        </div>

        <div className="metric-card">
          <h2>18</h2>
          <p>Bills Today</p>
        </div>
      </div>

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
            {prescriptions.map((item) => (
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
            ))}
          </tbody>
        </table>
      </div>

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