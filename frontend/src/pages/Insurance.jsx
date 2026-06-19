import React, { useState, useEffect } from "react";
import { insuranceService } from "../services/insuranceService";
import Layout from "./Layout";
import "./Insurance.css";
import ProviderFormRenderer from "../components/insurance/ProviderFormRenderer";
import PatientLookup from "../components/PatientLookup";
import { validatePolicy, validateScheme, validatePreAuth, validateClaim, formatValidationErrors } from "../utils/formValidation";

function Insurance() {
  const [step, setStep] = useState("dashboard");
  const [stats, setStats] = useState({ totalClaims: 0, approvedClaims: 0, pendingClaims: 0, totalSettledAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [selectedPreAuthForView, setSelectedPreAuthForView] = useState(null);
  const [selectedClaimForView, setSelectedClaimForView] = useState(null);

  const [policyData, setPolicyData] = useState({
    patientId: "", insuranceType: "Private", providerName: "", policyNumber: "",
    planType: "Individual", sumInsured: "", policyStartDate: "", policyEndDate: ""
  });

  const [schemeData, setSchemeData] = useState({
    patientId: "", schemeName: "PM-JAY", abhaNumber: "", ayushmanCardNumber: ""
  });

  const [preAuthData, setPreAuthData] = useState({
    patientId: "", policyId: "", estimatedCost: "", diagnosis: "", proposedTreatment: "", admittingDoctor: ""
  });
  const [preAuthsList, setPreAuthsList] = useState([]);

  const [claimData, setClaimData] = useState({
    patientId: "", policyId: "", preAuthId: "", totalBilledAmount: "", claimType: "Cashless", hospitalizationDate: "", dischargeDate: ""
  });
  const [claimsList, setClaimsList] = useState([]);

  const [docData, setDocData] = useState({
    linkType: "claim",
    linkId: "",
    category: "ID Proof"
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (step === "dashboard") {
      fetchDashboardStats();
    } else if (step === "pre-auth") {
      fetchPreAuths();
    } else if (step === "claims") {
      fetchClaimsList();
    }
  }, [step]);

  const fetchDashboardStats = async () => {
    try {
      const res = await insuranceService.getDashboardStats();
      if (res.data.success) setStats(res.data.data);
    } catch (err) { console.error("Error fetching stats", err); }
  };

  const fetchPreAuths = async () => {
    try {
      const res = await insuranceService.getPreAuths();
      if (res.data.success) setPreAuthsList(res.data.data);
    } catch (err) { console.error("Error fetching pre-auths", err); }
  };

  const fetchClaimsList = async () => {
    try {
      const res = await insuranceService.getClaims();
      if (res.data.success) setClaimsList(res.data.data);
    } catch (err) { console.error("Error fetching claims", err); }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const handleRegisterPolicy = async (e) => {
    e.preventDefault();
    const validation = validatePolicy(policyData);
    if (!validation.isValid) { showMessage(formatValidationErrors(validation.errors), "error"); return; }
    setLoading(true);
    try {
      const res = await insuranceService.registerPolicy(policyData);
      showMessage(res.data.message || "Policy registered successfully!");
      setPolicyData({ patientId: "", insuranceType: "Private", providerName: "", policyNumber: "", planType: "Individual", sumInsured: "", policyStartDate: "", policyEndDate: "" });
    } catch (err) {
      showMessage("Registration failed: " + (err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message), "error");
    }
    setLoading(false);
  };

  const handleEnrollScheme = async (e) => {
    e.preventDefault();
    const validation = validateScheme(schemeData);
    if (!validation.isValid) { showMessage(formatValidationErrors(validation.errors), "error"); return; }
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
      const res = await insuranceService.enrollScheme(payload);
      showMessage(res.data.message || "Scheme enrolled successfully!");
      setSchemeData({ patientId: "", schemeName: "PM-JAY", abhaNumber: "", ayushmanCardNumber: "" });
    } catch (err) {
      showMessage("Enrollment failed: " + (err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message), "error");
    }
    setLoading(false);
  };

  const handlePreAuthSubmit = async (e) => {
    e.preventDefault();
    const validation = validatePreAuth(preAuthData);
    if (!validation.isValid) { showMessage(formatValidationErrors(validation.errors), "error"); return; }
    setLoading(true);
    try {
      const mappedData = {
        patientId: preAuthData.patientId,
        policyId: preAuthData.policyId,
        estimatedCost: Number(preAuthData.estimatedCost),
        diagnosis: preAuthData.diagnosis,
        proposedTreatment: preAuthData.proposedTreatment,
        admittingDoctor: preAuthData.admittingDoctor,
        status: "Submitted"
      };
      const res = await insuranceService.createPreAuth(mappedData);
      showMessage(res.data.message || "Pre-Auth submitted successfully!");
      setPreAuthData({ patientId: "", policyId: "", estimatedCost: "", diagnosis: "", proposedTreatment: "", admittingDoctor: "" });
      fetchPreAuths();
    } catch (err) {
      showMessage("Submission failed: " + (err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message), "error");
    }
    setLoading(false);
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    const validation = validateClaim(claimData);
    if (!validation.isValid) { showMessage(formatValidationErrors(validation.errors), "error"); return; }
    setLoading(true);
    try {
      const res = await insuranceService.createClaim(claimData);
      showMessage(res.data.message || "Claim submitted successfully!");
      setClaimData({ patientId: "", policyId: "", preAuthId: "", totalBilledAmount: "", claimType: "Cashless", hospitalizationDate: "", dischargeDate: "" });
      fetchClaimsList();
    } catch (err) {
      showMessage("Submission failed: " + (err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message), "error");
    }
    setLoading(false);
  };

  const handleApproveClaim = async (claim) => {
    const billedAmount = claim.totalBillAmount || claim.totalBilledAmount || 0;
    const approvedAmount = prompt(`Enter approved amount for claim ${claim.claimNumber}:`, billedAmount);
    if (!approvedAmount) return;

    setLoading(true);
    try {
      await insuranceService.updateClaimStatus(claim._id, {
        status: "Approved",
        notes: "Approved via Insurance UI",
        changedBy: "InsuranceDesk"
      });

      await insuranceService.createBillingMapping({
        patientId: claim.patientId?._id || claim.patientId,
        policyId: claim.policyId?._id || claim.policyId || null,
        claimId: claim._id,
        totalBillAmount: Number(billedAmount),
        approvedAmount: Number(approvedAmount),
        coPayAmount: Number(billedAmount) - Number(approvedAmount),
        deductibleAmount: 0,
        insuranceDeduction: Number(approvedAmount),
        patientPayable: Number(billedAmount) - Number(approvedAmount),
        isManualOverride: false
      });

      showMessage(`Claim ${claim.claimNumber} approved. Billing desk notified!`);
      fetchClaimsList();
      fetchDashboardStats();
    } catch (err) {
      showMessage("Failed to approve claim: " + err.message, "error");
    }
    setLoading(false);
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showMessage("Please select a file to upload.", "error");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("document", selectedFile);
      formData.append("category", docData.category);
      if (docData.linkType === "claim") formData.append("claimId", docData.linkId);
      else formData.append("preAuthId", docData.linkId);

      const res = await insuranceService.uploadDocument(formData);
      showMessage(res.data.message || "Document uploaded successfully!");
      setDocData({ linkType: "claim", linkId: "", category: "ID Proof" });
      setSelectedFile(null);
      document.getElementById('file-upload').value = "";
    } catch (err) {
      showMessage("Upload failed: " + (err.response?.data?.error || err.message), "error");
    }
    setLoading(false);
  };

  const getPatientDisplay = (patientField) => {
    if (!patientField) return "N/A";
    if (typeof patientField === "object") return patientField?.name || patientField?._id || "N/A";
    return patientField;
  };

  return (
    <Layout role="Insurance" setStep={setStep}>

      {/* DASHBOARD */}
      {step === "dashboard" && (
        <div className="dashboard-container">
          <h2 className="dashboard-title">Insurance Desk Overview</h2>
          <div className="stats-grid">
            <div className="stats-card"><h3>Total Claims</h3><p>{stats.totalClaims}</p></div>
            <div className="stats-card success"><h3>Approved Claims</h3><p>{stats.approvedClaims}</p></div>
            <div className="stats-card warning"><h3>Pending Claims</h3><p>{stats.pendingClaims}</p></div>
            <div className="stats-card success"><h3>Settled Amount</h3><p>₹{stats.totalSettledAmount.toLocaleString()}</p></div>
          </div>
        </div>
      )}

      {/* REGISTER POLICY */}
      {step === "register-policy" && (
        <div className="dashboard-container">
          <div className="section-header"><h2>Register Private Insurance Policy</h2></div>
          <form className="form-container" onSubmit={handleRegisterPolicy}>
            {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}

            <div className="form-group">
              <PatientLookup label="Patient" value={policyData.patientId} onChange={(id) => setPolicyData({ ...policyData, patientId: id })} />
            </div>

            <div className="form-group">
              <label>Provider Name</label>
              <input type="text" placeholder="e.g. Star Health, HDFC ERGO" value={policyData.providerName} onChange={e => setPolicyData({ ...policyData, providerName: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Policy Number</label>
              <input type="text" placeholder="Policy Number" value={policyData.policyNumber} onChange={e => setPolicyData({ ...policyData, policyNumber: e.target.value })} required />
            </div>

            <div className="form-group">
              <label>Plan Type</label>
              <select value={policyData.planType} onChange={e => setPolicyData({ ...policyData, planType: e.target.value })} required>
                <option value="Individual">Individual</option>
                <option value="Family Floater">Family Floater</option>
                <option value="Group">Group</option>
              </select>
            </div>

            <div className="form-group">
              <label>Sum Insured (₹)</label>
              <input type="number" placeholder="Total Cover Amount" value={policyData.sumInsured} onChange={e => setPolicyData({ ...policyData, sumInsured: e.target.value })} required />
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Start Date</label>
                <input type="date" value={policyData.policyStartDate} onChange={e => setPolicyData({ ...policyData, policyStartDate: e.target.value })} required />
              </div>
              <div style={{ flex: 1 }}>
                <label>End Date</label>
                <input type="date" value={policyData.policyEndDate} onChange={e => setPolicyData({ ...policyData, policyEndDate: e.target.value })} required />
              </div>
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
              {loading ? "Registering..." : "Register Policy"}
            </button>
          </form>
        </div>
      )}

      {/* ENROLL SCHEME */}
      {step === "enroll-scheme" && (
        <div className="dashboard-container">
          <div className="section-header"><h2>Enroll Government Scheme</h2></div>
          <form className="form-container" onSubmit={handleEnrollScheme}>
            {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}

            <div className="form-group">
              <PatientLookup label="Patient" value={schemeData.patientId} onChange={(id) => setSchemeData({ ...schemeData, patientId: id })} />
            </div>

            <div className="form-group">
              <label>Scheme Name</label>
              <select value={schemeData.schemeName} onChange={e => setSchemeData({ ...schemeData, schemeName: e.target.value })} required>
                <option value="PM-JAY">Ayushman Bharat (PM-JAY)</option>
                <option value="CGHS">CGHS</option>
                <option value="ESIC">ESIC</option>
                <option value="MJPJAY">MJPJAY</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>ABHA Number (14-digit)</label>
              <input type="text" placeholder="e.g. 12-3456-7890-1234" value={schemeData.abhaNumber} onChange={e => setSchemeData({ ...schemeData, abhaNumber: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Ayushman / Scheme Card Number</label>
              <input type="text" placeholder="Card Number" value={schemeData.ayushmanCardNumber} onChange={e => setSchemeData({ ...schemeData, ayushmanCardNumber: e.target.value })} />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
              {loading ? "Enrolling..." : "Enroll Scheme"}
            </button>
          </form>
        </div>
      )}

      {/* PRE-AUTH REQUESTS */}
      {step === "pre-auth" && (
        <div className="dashboard-container">
          <div className="section-header"><h2>Submit Pre-Authorization</h2></div>
          <form className="form-container" onSubmit={handlePreAuthSubmit}>
            {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <PatientLookup label="Patient" value={preAuthData.patientId} onChange={(id) => setPreAuthData({ ...preAuthData, patientId: id })} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Policy ID (Object ID)</label>
                <input type="text" placeholder="Enter Policy/Scheme ID" value={preAuthData.policyId} onChange={e => setPreAuthData({ ...preAuthData, policyId: e.target.value })} required />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Estimated Cost (₹)</label>
                <input type="number" placeholder="Estimated Treatment Cost" value={preAuthData.estimatedCost} onChange={e => setPreAuthData({ ...preAuthData, estimatedCost: e.target.value })} required />
              </div>
              <div style={{ flex: 1 }}>
                <label>Admitting Doctor</label>
                <input type="text" placeholder="Doctor Name" value={preAuthData.admittingDoctor} onChange={e => setPreAuthData({ ...preAuthData, admittingDoctor: e.target.value })} required />
              </div>
            </div>

            <div className="form-group">
              <label>Diagnosis</label>
              <textarea rows="3" placeholder="Enter diagnosis details..." value={preAuthData.diagnosis} onChange={e => setPreAuthData({ ...preAuthData, diagnosis: e.target.value })} required></textarea>
            </div>

            <div className="form-group">
              <label>Proposed Treatment</label>
              <textarea rows="3" placeholder="Enter proposed procedure / treatment..." value={preAuthData.proposedTreatment} onChange={e => setPreAuthData({ ...preAuthData, proposedTreatment: e.target.value })} required></textarea>
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
              {loading ? "Submitting..." : "Submit Pre-Auth"}
            </button>
          </form>

          <div className="table-container" style={{ marginTop: '30px' }}>
            <h3>Recent Pre-Auth Requests</h3>
            <table>
              <thead>
                <tr>
                  <th>Req ID</th><th>Patient</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {preAuthsList.length > 0 ? preAuthsList.map((req) => (
                  <tr key={req._id}>
                    <td>{req._id.substring(req._id.length - 6).toUpperCase()}</td>
                    <td>{getPatientDisplay(req.patientId)}</td>
                    <td>₹{req.estimatedCost || 0}</td>
                    <td><span className={`status-badge status-${req.status.toLowerCase().replace(' ', '-')}`}>{req.status}</span></td>
                    <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => setSelectedPreAuthForView(req)} style={{ padding: '4px 8px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>View Form</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="6">No pre-auth requests found.</td></tr>
                )}
              </tbody>
            </table>

            {selectedPreAuthForView && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>Form Details: {selectedPreAuthForView.providerTemplateUsed || 'Generic Form'}</h3>
                    <button onClick={() => setSelectedPreAuthForView(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
                  </div>
                  {selectedPreAuthForView.providerSpecificData ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      {Object.entries(selectedPreAuthForView.providerSpecificData).map(([key, value]) => (
                        <div key={key} style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                          <strong style={{ display: 'block', color: '#7f8c8d', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</strong>
                          <span>{value.toString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (<p>No provider-specific detailed form data found for this request.</p>)}
                  <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button onClick={() => window.print()} style={{ padding: '8px 15px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>Print Form</button>
                    <button onClick={() => setSelectedPreAuthForView(null)} style={{ padding: '8px 15px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CLAIMS TABLE AND FILING */}
      {step === "claims" && (
        <div className="dashboard-container">
          <div className="section-header"><h2>File a New Claim</h2></div>
          <form className="form-container" onSubmit={handleClaimSubmit}>
            {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <PatientLookup label="Patient" value={claimData.patientId} onChange={(id) => setClaimData({ ...claimData, patientId: id })} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Policy/Scheme ID (Object ID)</label>
                <input type="text" placeholder="Enter Policy/Scheme ID" value={claimData.policyId} onChange={e => setClaimData({ ...claimData, policyId: e.target.value })} required />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Pre-Auth ID (Optional)</label>
                <input type="text" placeholder="Leave blank if direct claim" value={claimData.preAuthId} onChange={e => setClaimData({ ...claimData, preAuthId: e.target.value })} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Claim Type</label>
                <select value={claimData.claimType} onChange={e => setClaimData({ ...claimData, claimType: e.target.value })} required>
                  <option value="Cashless">Cashless</option>
                  <option value="Reimbursement">Reimbursement</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Admission Date</label>
                <input type="date" value={claimData.hospitalizationDate} onChange={e => setClaimData({ ...claimData, hospitalizationDate: e.target.value })} required />
              </div>
              <div style={{ flex: 1 }}>
                <label>Discharge Date</label>
                <input type="date" value={claimData.dischargeDate} onChange={e => setClaimData({ ...claimData, dischargeDate: e.target.value })} required />
              </div>
            </div>

            <div className="form-group">
              <label>Total Billed Amount (₹)</label>
              <input type="number" placeholder="Final Hospital Bill Amount" value={claimData.totalBilledAmount} onChange={e => setClaimData({ ...claimData, totalBilledAmount: e.target.value })} required />
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
              {loading ? "Filing Claim..." : "File Claim"}
            </button>
          </form>

          <div className="table-container" style={{ marginTop: '30px' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>All Insurance Claims</h3>
              <button onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8,"
                  + "Claim No,Patient,Type,Billed,Approved,Status\n"
                  + claimsList.map(c => `${c.claimNumber},"${getPatientDisplay(c.patientId)}",${c.claimType},${c.totalBilledAmount || c.totalBillAmount || 0},${c.approvedAmount || 0},${c.status}`).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "claims_export.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }} style={{ padding: '8px 15px', background: '#34495e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Export CSV
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Claim No.</th><th>Patient</th><th>Type</th><th>Billed (₹)</th><th>Approved (₹)</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {claimsList.length > 0 ? claimsList.map((c) => (
                  <tr key={c._id}>
                    <td>{c.claimNumber}</td>
                    <td>{getPatientDisplay(c.patientId)}</td>
                    <td>{c.claimType}</td>
                    <td>₹{(c.totalBilledAmount || c.totalBillAmount || 0).toLocaleString()}</td>
                    <td>₹{(c.approvedAmount || 0).toLocaleString()}</td>
                    <td><span className={`status-badge status-${c.status.toLowerCase().replace(' ', '-')}`}>{c.status}</span></td>
                    <td>
                      {c.status !== "Approved" && c.status !== "Settled" && (
                        <button onClick={() => handleApproveClaim(c)} style={{ padding: '4px 8px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', marginRight: '5px' }}>Approve</button>
                      )}
                      <button onClick={() => setSelectedClaimForView(c)} style={{ padding: '4px 8px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>View Form</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="7">No claims found.</td></tr>
                )}
              </tbody>
            </table>

            {selectedClaimForView && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>Claim Form Details: {selectedClaimForView.providerTemplateUsed || 'Generic Form'}</h3>
                    <button onClick={() => setSelectedClaimForView(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>&times;</button>
                  </div>
                  {selectedClaimForView.providerSpecificData ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      {Object.entries(selectedClaimForView.providerSpecificData).map(([key, value]) => (
                        <div key={key} style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                          <strong style={{ display: 'block', color: '#7f8c8d', fontSize: '0.85rem', marginBottom: '4px', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</strong>
                          <span style={{ wordBreak: 'break-all' }}>{value.toString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (<p>No provider-specific detailed form data found for this claim.</p>)}
                  <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button onClick={() => window.print()} style={{ padding: '8px 15px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>Print Form</button>
                    <button onClick={() => setSelectedClaimForView(null)} style={{ padding: '8px 15px', background: '#95a5a6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DOCUMENTS UPLOAD */}
      {step === "documents" && (
        <div className="dashboard-container">
          <div className="section-header"><h2>Upload Medical Documents</h2></div>
          <form className="form-container" onSubmit={handleDocumentUpload}>
            {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}

            <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Link to</label>
                <select value={docData.linkType} onChange={e => setDocData({ ...docData, linkType: e.target.value })} required>
                  <option value="claim">Insurance Claim</option>
                  <option value="preAuth">Pre-Authorization</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label>{docData.linkType === "claim" ? "Claim ID" : "Pre-Auth ID"}</label>
                <input type="text" placeholder={`Enter ${docData.linkType === "claim" ? "Claim" : "Pre-Auth"} ID`} value={docData.linkId} onChange={e => setDocData({ ...docData, linkId: e.target.value })} required />
              </div>
            </div>

            <div className="form-group">
              <label>Document Category</label>
              <select value={docData.category} onChange={e => setDocData({ ...docData, category: e.target.value })} required>
                <option value="ID Proof">ID Proof</option>
                <option value="Insurance Card Copy">Insurance Card Copy</option>
                <option value="Prescription">Prescription</option>
                <option value="Investigation Reports">Investigation Reports</option>
                <option value="Discharge Summary">Discharge Summary</option>
                <option value="Bill/Invoice">Bill/Invoice</option>
                <option value="Admission Form">Admission Form</option>
                <option value="Doctor Notes">Doctor Notes</option>
                <option value="Pre-Auth Form">Pre-Auth Form</option>
                <option value="Consent Form">Consent Form</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group" style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', borderRadius: '8px' }}>
              <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <i className="upload-icon" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}>📄</i>
                <strong>Click to browse</strong> or drag and drop a file here.
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Supported formats: JPG, PNG, PDF (Max 5MB)</p>
              </label>
              <input id="file-upload" type="file" style={{ display: 'none' }} onChange={e => setSelectedFile(e.target.files[0])} required />
              {selectedFile && <p style={{ marginTop: '10px', color: '#2ecc71', fontWeight: 'bold' }}>Selected: {selectedFile.name}</p>}
            </div>

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '15px' }} disabled={loading}>
              {loading ? "Uploading..." : "Upload Document"}
            </button>
          </form>
        </div>
      )}

      {/* OFFICIAL FORMS DIRECTORY */}
      {step === "official-forms" && (
        <div className="dashboard-container">
          <div className="section-header">
            <h2>Official Provider Forms</h2>
            <p style={{ marginTop: '5px', color: '#7f8c8d' }}>Select a provider to generate the specific official pre-authorization or claim form. The form will auto-fill with known patient data.</p>
          </div>
          <ProviderFormRenderer patientData={{
            name: "Rajesh Kumar",
            age: 45,
            gender: "Male",
            contact: "9876543210",
            policyNumber: "POL-STAR-2023-890",
            providerName: "Star Health Insurance",
            ayushmanCardNumber: "PMJ-4598-1234-90",
            abhaNumber: "14-9988-7766-5544"
          }} />
        </div>
      )}
    </Layout>
  );
}

export default Insurance;
