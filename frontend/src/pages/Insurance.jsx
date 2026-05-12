import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./Insurance.css";

function Insurance() {
  const [step, setStep] = useState("dashboard");
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form States
  const [verifyData, setVerifyData] = useState({ provider: "", policyNumber: "", patientName: "" });
  const [preAuthData, setPreAuthData] = useState({ patientId: "", diagnosis: "", estimatedCost: "" });
  const [files, setFiles] = useState(null);

  // Fetch claims on load
  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/insurance/claims");
      if (res.data.success) {
        setClaims(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching claims", err);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/insurance/verify-patient", verifyData);
      setMessage(res.data.message || "Verification Successful!");
    } catch (err) {
      setMessage("Verification failed: " + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  const handlePreAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // 1. Submit Pre-Auth
      const res = await axios.post("http://localhost:5000/api/insurance/pre-auth", preAuthData);
      const claimId = res.data.data._id;

      // 2. Upload Documents if any
      if (files && files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("documents", files[i]);
        }
        await axios.post(`http://localhost:5000/api/insurance/claims/${claimId}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setMessage("Pre-Authorization submitted successfully!");
      setPreAuthData({ patientId: "", diagnosis: "", estimatedCost: "" });
      setFiles(null);
      fetchClaims(); // Refresh list
    } catch (err) {
      setMessage("Submission failed: " + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

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
          <form className="form-container" onSubmit={handleVerify}>
            {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
            <div className="form-group">
              <label>Insurance Provider / TPA</label>
              <select 
                value={verifyData.provider} 
                onChange={e => setVerifyData({...verifyData, provider: e.target.value})}
                required
              >
                <option value="">Select Provider...</option>
                <option value="Ayushman Bharat">Ayushman Bharat (PM-JAY)</option>
                <option value="CGHS">CGHS</option>
                <option value="Star Health">Star Health</option>
                <option value="HDFC Ergo">HDFC Ergo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Policy Number / ABHA ID</label>
              <input 
                type="text" 
                placeholder="Enter ID number..." 
                value={verifyData.policyNumber}
                onChange={e => setVerifyData({...verifyData, policyNumber: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Patient Name (As per policy)</label>
              <input 
                type="text" 
                placeholder="Enter patient name..." 
                value={verifyData.patientName}
                onChange={e => setVerifyData({...verifyData, patientName: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="primary-btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? "Verifying..." : "Verify Eligibility"}
            </button>
          </form>
        </div>
      )}

      {/* 3. PRE-AUTH REQUEST */}
      {step === "pre-auth" && (
        <div className="dashboard-container">
          <div className="section-header">
            <h2>Submit Pre-Authorization</h2>
          </div>
          <form className="form-container" onSubmit={handlePreAuth}>
            {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
            <div className="form-group">
              <label>Patient ID / Claim Reference</label>
              <input 
                type="text" 
                placeholder="Enter Patient ID..." 
                value={preAuthData.patientId}
                onChange={e => setPreAuthData({...preAuthData, patientId: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Estimated Amount (₹)</label>
              <input 
                type="number" 
                placeholder="Enter estimated cost..." 
                value={preAuthData.estimatedCost}
                onChange={e => setPreAuthData({...preAuthData, estimatedCost: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Diagnosis / Procedure</label>
              <textarea 
                rows="3" 
                placeholder="Enter clinical diagnosis details..."
                value={preAuthData.diagnosis}
                onChange={e => setPreAuthData({...preAuthData, diagnosis: e.target.value})}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Upload Documents (PDF/Images)</label>
              <input 
                type="file" 
                multiple 
                onChange={e => setFiles(e.target.files)}
              />
            </div>
            <button type="submit" className="primary-btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
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
                <th>Patient ID</th>
                <th>Provider</th>
                <th>Diagnosis</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {claims.length > 0 ? claims.map((c) => (
                <tr key={c._id}>
                  <td>{c._id.substring(c._id.length - 6).toUpperCase()}</td>
                  <td>{c.patientId}</td>
                  <td>{c.provider}</td>
                  <td>{c.diagnosis}</td>
                  <td>₹{c.estimatedCost}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr><td colSpan="7">No claims found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    </Layout>
  );
}

export default Insurance;