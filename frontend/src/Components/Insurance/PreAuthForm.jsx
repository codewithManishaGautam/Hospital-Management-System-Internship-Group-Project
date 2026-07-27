import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';
import PatientLookup from '../PatientLookup';

const PreAuthForm = ({ onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [policies, setPolicies] = useState([]);
  
  const [formData, setFormData] = useState({
    patientId: '',
    policyId: '',
    admittingDoctor: '',
    admissionType: 'Planned',
    diagnosis: '',
    icd10Code: '',
    proposedTreatment: '',
    wardTypeRequested: 'General',
    expectedLengthOfStay: 1,
    estimatedCost: {
      roomCharges: 0,
      icuCharges: 0,
      surgeonFee: 0,
      investigationsLab: 0,
      medicine: 0,
      total: 0
    }
  });

  const handlePatientChange = async (patientId) => {
    setFormData({ ...formData, patientId, policyId: '' });
    setPolicies([]);
    if (patientId) {
      try {
        const policyRes = await insuranceService.getPoliciesByPatientId(patientId);
        if (policyRes.data.success) {
          setPolicies(policyRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching policies", err);
      }
    }
  };

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    const newCosts = { ...formData.estimatedCost, [name]: Number(value) };
    
    // Auto-calculate total
    newCosts.total = Object.keys(newCosts)
      .filter(key => key !== 'total')
      .reduce((sum, key) => sum + (newCosts[key] || 0), 0);
      
    setFormData({ ...formData, estimatedCost: newCosts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.icd10Code) {
      setMessage({ text: "ICD-10 Code is required per PRD.", type: "error" });
      return;
    }
    
    setLoading(true);
    try {
      const res = await insuranceService.createPreAuth(formData);
      setMessage({ text: "Pre-Auth Request Draft created!", type: "success" });
      setTimeout(() => {
        onSuccess(res.data.data);
      }, 1500);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || error.message, type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="preauth-form">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>New Pre-Authorization Request</h2>
        <button onClick={onCancel} className="secondary-btn" style={{ background: '#bdc3c7', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}

        <h3 style={{ margin: '15px 0 10px', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Section A: Patient & Policy</h3>
        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <PatientLookup label="Patient" value={formData.patientId} onChange={handlePatientChange} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Select Active Policy</label>
            <select value={formData.policyId} onChange={e => setFormData({ ...formData, policyId: e.target.value })} required>
              <option value="">-- Select Policy --</option>
              {policies.map(p => (
                <option key={p._id} value={p._id}>{p.insuranceCompanyId?.companyName} - {p.policyNumber}</option>
              ))}
            </select>
          </div>
        </div>

        <h3 style={{ margin: '20px 0 10px', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Section C: Clinical Information</h3>
        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>Admission Type</label>
            <select value={formData.admissionType} onChange={e => setFormData({ ...formData, admissionType: e.target.value })}>
              <option value="Planned">Planned</option>
              <option value="Emergency">Emergency</option>
              <option value="Day Care">Day Care</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Expected Length of Stay (Days)</label>
            <input type="number" min="1" value={formData.expectedLengthOfStay} onChange={e => setFormData({ ...formData, expectedLengthOfStay: Number(e.target.value) })} required />
          </div>
          <div style={{ flex: 1 }}>
            <label>Ward Type Requested</label>
            <select value={formData.wardTypeRequested} onChange={e => setFormData({ ...formData, wardTypeRequested: e.target.value })}>
              <option value="General">General</option>
              <option value="Semi-Private">Semi-Private</option>
              <option value="Private">Private</option>
              <option value="ICU">ICU</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 2 }}>
            <label>Diagnosis Description</label>
            <input type="text" value={formData.diagnosis} onChange={e => setFormData({ ...formData, diagnosis: e.target.value })} required />
          </div>
          <div style={{ flex: 1 }}>
            <label>ICD-10 Code</label>
            <input type="text" placeholder="e.g. J01.90" value={formData.icd10Code} onChange={e => setFormData({ ...formData, icd10Code: e.target.value })} required />
          </div>
        </div>
        
        <div className="form-group">
          <label>Proposed Treatment</label>
          <input type="text" value={formData.proposedTreatment} onChange={e => setFormData({ ...formData, proposedTreatment: e.target.value })} required />
        </div>

        <h3 style={{ margin: '20px 0 10px', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Section D: Estimated Cost Breakdown (₹)</h3>
        <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label>Room Charges</label>
            <input type="number" name="roomCharges" value={formData.estimatedCost.roomCharges} onChange={handleCostChange} min="0" />
          </div>
          <div>
            <label>ICU Charges</label>
            <input type="number" name="icuCharges" value={formData.estimatedCost.icuCharges} onChange={handleCostChange} min="0" />
          </div>
          <div>
            <label>Surgeon Fee</label>
            <input type="number" name="surgeonFee" value={formData.estimatedCost.surgeonFee} onChange={handleCostChange} min="0" />
          </div>
          <div>
            <label>Lab Investigations</label>
            <input type="number" name="investigationsLab" value={formData.estimatedCost.investigationsLab} onChange={handleCostChange} min="0" />
          </div>
          <div>
            <label>Medicine / Pharmacy</label>
            <input type="number" name="medicine" value={formData.estimatedCost.medicine} onChange={handleCostChange} min="0" />
          </div>
          <div style={{ background: '#f1c40f', padding: '10px', borderRadius: '4px', fontWeight: 'bold' }}>
            <label>TOTAL ESTIMATED COST</label>
            <div style={{ fontSize: '1.2rem', marginTop: '5px' }}>₹{formData.estimatedCost.total.toLocaleString()}</div>
          </div>
        </div>

        <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
          {loading ? "Saving Draft..." : "Create Pre-Auth Draft"}
        </button>
      </form>
    </div>
  );
};

export default PreAuthForm;
