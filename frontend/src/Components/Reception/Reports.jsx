import React, { useState, useEffect } from "react";
import { getAllPatients } from "./services/patientService";

import "../../styles/Reception/reports.css";

function Reports() {
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const registrations = patients.length;

  const ipdAdmissions = patients.filter(
    (patient) => patient.role === "IPD",
  ).length;

  const revenue = 0;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Report Download Started");
  };

  return (
    <div className="reports-container">
      {/* Header */}

      <div className="reports-header">
        <h2>Reception Reports</h2>
      </div>

      {/* Filter Section */}

      <div className="report-filter-card">
        <div className="filter-group">
          <label>Select Date</label>

          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
        </div>

        <div className="report-buttons">
          <button className="download-btn" onClick={handleDownload}>
            Download PDF
          </button>

          <button className="print-btn" onClick={handlePrint}>
            Print Report
          </button>
        </div>
      </div>

      {/* Statistics Cards */}

      <div className="report-cards">
        <div className="report-card">
          <h4>Registrations</h4>

          <h2>{registrations}</h2>
        </div>

        <div className="report-card">
          <h4>Appointments</h4>

          <h2>{0}</h2>
        </div>

        <div className="report-card">
          <h4>OPD Bills</h4>

          <h2>{0}</h2>
        </div>

        <div className="report-card">
          <h4>IPD Admissions</h4>

          <h2>{ipdAdmissions}</h2>
        </div>
      </div>

      {/* Revenue Card */}

      <div className="revenue-card">
        <h3>Total Revenue</h3>

        <h1>₹{revenue}</h1>
      </div>

      {/* Report Table */}

      <div className="report-table-card">
        <h3>Daily Report Summary</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Report Type</th>

              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Patient Registration</td>

              <td>{registrations}</td>
            </tr>

            <tr>
              <td>Doctor Appointments</td>

              <td>{0}</td>
            </tr>

            <tr>
              <td>OPD Bills</td>

              <td>{0}</td>
            </tr>

            <tr>
              <td>IPD Admissions</td>

              <td>{ipdAdmissions}</td>
            </tr>

            <tr>
              <td>Total Revenue</td>

              <td>₹{revenue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
