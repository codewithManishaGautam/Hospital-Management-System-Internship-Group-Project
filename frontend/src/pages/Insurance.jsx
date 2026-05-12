import React, { useState } from "react";
import Layout from "./Layout";
import "./Insurance.css";

function Insurance() {
  const [step, setStep] = useState("dashboard");

  // Mock Data for the UI
  const claims = [
    { id: "CLM-1001", patientName: "Rahul Sharma", provider: "Ayushman Bharat", amount: "₹45,000", status: "Pending" },
    { id: "CLM-1002", patientName: "Priya Mehta", provider: "Star Health", amount: "₹1,20,000", status: "Approved" },
    { id: "CLM-1003", patientName: "Amit Kumar", provider: "HDFC Ergo", amount: "₹30,000", status: "Rejected" },
    { id: "CLM-1004", patientName: "Sneha Patil", provider: "CGHS", amount: "₹85,000", status: "Approved" }
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <Layout role="Insurance" setStep={setStep}>
      
      {/* 1. DASHBOARD OVERVIEW */}
      {step === "dashboard" && (
        <div className="dashboard-container">
          <h2 className="dashboard-title">Insurance Desk Overview</h2>
          <div className="stats-grid">
            <div className="stats-card">
              <h3>Active Claims</h3>
              <p>14</p>
            </div>
            <div className="stats-card warning">
              <h3>Pending Pre-Auths</h3>
              <p>5</p>
            </div>
            <div className="stats-card success">
              <h3>Settled This Month</h3>
              <p>₹4.2L</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. VERIFY PATIENT ELIGIBILITY */}
      {step === "verify-patient" && (
        <div className="dashboard-container">
          <div className="section-header">
            <h2>Verify Patient Insurance</h2>
          </div>
          <div className="form-container">
            <div className="form-group">
              <label>Insurance Provider / TPA</label>
              <select>
                <option value="">Select Provider...</option>
                <option value="ayushman">Ayushman Bharat (PM-JAY)</option>
                <option value="cghs">CGHS</option>
                <option value="star">Star Health</option>
                <option value="hdfc">HDFC Ergo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Policy Number / ABHA ID</label>
              <input type="text" placeholder="Enter ID number..." />
            </div>
            <div className="form-group">
              <label>Patient Name (As per policy)</label>
              <input type="text" placeholder="Enter patient name..." />
            </div>
            <button className="primary-btn" style={{ width: '100%' }}>Verify Eligibility</button>
          </div>
        </div>
      )}

      {/* 3. PRE-AUTH REQUEST */}
      {step === "pre-auth" && (
        <div className="dashboard-container">
          <div className="section-header">
            <h2>Submit Pre-Authorization</h2>
          </div>
          <div className="form-container">
            <div className="form-group">
              <label>Patient ID / Claim Reference</label>
              <input type="text" placeholder="Enter Patient ID..." />
            </div>
            <div className="form-group">
              <label>Estimated Amount (₹)</label>
              <input type="number" placeholder="Enter estimated cost..." />
            </div>
            <div className="form-group">
              <label>Diagnosis / Procedure</label>
              <textarea rows="3" placeholder="Enter clinical diagnosis details..."></textarea>
            </div>
            <div className="form-group">
              <label>Upload Documents (PDF/Images)</label>
              <input type="file" multiple />
            </div>
            <button className="primary-btn" style={{ width: '100%' }}>Submit Request</button>
          </div>
        </div>
      )}

      {/* 4. ALL CLAIMS TABLE */}
      {step === "claims" && (
        <div className="table-container">
          <div className="section-header">
            <h2>All Insurance Claims</h2>
            <button className="add-btn">+ New Claim</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Patient Name</th>
                <th>Provider</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c, index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.patientName}</td>
                  <td>{c.provider}</td>
                  <td>{c.amount}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button className="edit-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </Layout>
  );
}

export default Insurance;