import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./Insurance.css";

const API_BASE_URL = "http://localhost:5000/api/insurance";

function Insurance() {
  const [step, setStep] = useState("dashboard");
  const [stats, setStats] = useState({ totalClaims: 0, approvedClaims: 0, pendingClaims: 0, totalSettledAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Form States
  const [policyData, setPolicyData] = useState({
    patientId: "", insuranceType: "Private", providerName: "", policyNumber: "", 
    planType: "Individual", sumInsured: "", policyStartDate: "", policyEndDate: ""
  });
  
  const [schemeData, setSchemeData] = useState({
    patientId: "", schemeName: "PM-JAY", abhaNumber: "", ayushmanCardNumber: ""
  });

  // Fetch Dashboard Stats on load
  useEffect(() => {
    if (step === "dashboard") {
      fetchDashboardStats();
    }
  }, [step]);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/claims/dashboard-stats`);
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const handleRegisterPolicy = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/policies`, policyData);
      showMessage(res.data.message || "Policy registered successfully!");
      setPolicyData({ patientId: "", insuranceType: "Private", providerName: "", policyNumber: "", planType: "Individual", sumInsured: "", policyStartDate: "", policyEndDate: "" });
    } catch (err) {
      showMessage("Registration failed: " + (err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message), "error");
    }
    setLoading(false);
  };

  const handleEnrollScheme = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        patientId: schemeData.patientId,
        schemeName: schemeData.schemeName,
        schemeSpecificData: {
          abhaNumber: schemeData.abhaNumber,
          ayushmanCardNumber: schemeData.ayushmanCardNumber
        }
      };
      const res = await axios.post(`${API_BASE_URL}/schemes`, payload);
      showMessage(res.data.message || "Scheme enrolled successfully!");
      setSchemeData({ patientId: "", schemeName: "PM-JAY", abhaNumber: "", ayushmanCardNumber: "" });
    } catch (err) {
      showMessage("Enrollment failed: " + (err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message), "error");
    }
    setLoading(false);
  };

  return (
    <Layout role="Insurance" setStep={setStep}>
      
      {/* 1. DASHBOARD OVERVIEW */}
      {step === "dashboard" && (
        <div className="dashboard-container">
          <h2 className="dashboard-title">Insurance Desk Overview</h2>
          <div className="stats-grid">
            <div className="stats-card">
              <h3>Total Claims</h3>
              <p>{stats.totalClaims}</p>
            </div>
            <div className="stats-card success">
              <h3>Approved Claims</h3>
              <p>{stats.approvedClaims}</p>
            </div>
            <div className="stats-card warning">
              <h3>Pending Claims</h3>
              <p>{stats.pendingClaims}</p>
            </div>
            <div className="stats-card success">
              <h3>Settled Amount</h3>
              <p>₹{stats.totalSettledAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. REGISTER POLICY */}
      {step === "register-policy" && (
        <div className="dashboard-container">
          <div className="section-header">
            <h2>Register Private Insurance Policy</h2>
          </div>
          <form className="form-container" onSubmit={handleRegisterPolicy}>
            {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}
            
            <div className="form-group">
              <label>Patient ID</label>
              <input type="text" placeholder="Enter Patient ID" value={policyData.patientId} onChange={e => setPolicyData({...policyData, patientId: e.target.value})} required />
            </div>
            
            <div className="form-group">
              <label>Provider Name</label>
              <input type="text" placeholder="e.g. Star Health, HDFC ERGO" value={policyData.providerName} onChange={e => setPolicyData({...policyData, providerName: e.target.value})} required />
            </div>
            
            <div className="form-group">
              <label>Policy Number</label>
              <input type="text" placeholder="Policy Number" value={policyData.policyNumber} onChange={e => setPolicyData({...policyData, policyNumber: e.target.value})} required />
            </div>
            
            <div className="form-group">
              <label>Plan Type</label>
              <select value={policyData.planType} onChange={e => setPolicyData({...policyData, planType: e.target.value})} required>
                <option value="Individual">Individual</option>
                <option value="Family Floater">Family Floater</option>
                <option value="Group">Group</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Sum Insured (₹)</label>
              <input type="number" placeholder="Total Cover Amount" value={policyData.sumInsured} onChange={e => setPolicyData({...policyData, sumInsured: e.target.value})} required />
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Start Date</label>
                <input type="date" value={policyData.policyStartDate} onChange={e => setPolicyData({...policyData, policyStartDate: e.target.value})} required />
              </div>
              <div style={{ flex: 1 }}>
                <label>End Date</label>
                <input type="date" value={policyData.policyEndDate} onChange={e => setPolicyData({...policyData, policyEndDate: e.target.value})} required />
              </div>
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
              {loading ? "Registering..." : "Register Policy"}
            </button>
          </form>
        </div>
      )}

      {/* 3. ENROLL SCHEME */}
      {step === "enroll-scheme" && (
        <div className="dashboard-container">
          <div className="section-header">
            <h2>Enroll Government Scheme</h2>
          </div>
          <form className="form-container" onSubmit={handleEnrollScheme}>
            {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}
            
            <div className="form-group">
              <label>Patient ID</label>
              <input type="text" placeholder="Enter Patient ID" value={schemeData.patientId} onChange={e => setSchemeData({...schemeData, patientId: e.target.value})} required />
            </div>
            
            <div className="form-group">
              <label>Scheme Name</label>
              <select value={schemeData.schemeName} onChange={e => setSchemeData({...schemeData, schemeName: e.target.value})} required>
                <option value="PM-JAY">Ayushman Bharat (PM-JAY)</option>
                <option value="CGHS">CGHS</option>
                <option value="ESIC">ESIC</option>
                <option value="MJPJAY">MJPJAY</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>ABHA Number (14-digit)</label>
              <input type="text" placeholder="e.g. 12-3456-7890-1234" value={schemeData.abhaNumber} onChange={e => setSchemeData({...schemeData, abhaNumber: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Ayushman / Scheme Card Number</label>
              <input type="text" placeholder="Card Number" value={schemeData.ayushmanCardNumber} onChange={e => setSchemeData({...schemeData, ayushmanCardNumber: e.target.value})} />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
              {loading ? "Enrolling..." : "Enroll Scheme"}
            </button>
          </form>
        </div>
      )}

      {/* Placeholders for remaining steps to avoid breaking UI */}
      {step === "pre-auth" && (
        <div className="dashboard-container">
          <h2>Pre-Auth Requests</h2>
          <p>This module will be implemented in Month 2 Week 1.</p>
        </div>
      )}

      {step === "claims" && (
        <div className="dashboard-container">
          <h2>All Claims</h2>
          <p>This module will be implemented in Month 2 Week 2.</p>
        </div>
      )}

    </Layout>
  );
}

export default Insurance;