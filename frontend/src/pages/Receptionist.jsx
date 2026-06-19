import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";
// import "./Receptionist.css";

function Receptionist() {
  const [step, setStep] = useState("dashboard");
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    hasInsurance: false,
    policyNumber: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Registering patient...');
    
    // Simulate saving patient to Reception/Hospital DB
    const newPatientId = `PAT-${Math.floor(Math.random() * 10000)}`;
    
    // Trigger Insurance Integration if they have insurance
    if (formData.hasInsurance && formData.policyNumber) {
      try {
        await axios.post('http://localhost:5000/api/insurance/pre-auth', {
          patientId: newPatientId,
          policyId: formData.policyNumber, // treating policyNumber as ID for mock
          hospitalId: 'HOSP-001',
          estimatedCost: 0,
          status: 'Draft'
        });
        setMessage(`Patient ${newPatientId} registered successfully! A Draft Pre-Auth was automatically created for the Insurance Desk.`);
      } catch (err) {
        setMessage(`Patient ${newPatientId} registered, but failed to create Draft Pre-Auth. Ensure Insurance backend is running.`);
      }
    } else {
      setMessage(`Patient ${newPatientId} registered successfully as a Cash-paying patient.`);
    }
    
    setFormData({ name: '', age: '', gender: 'Male', contact: '', hasInsurance: false, policyNumber: '' });
  };

  return (
    <Layout role="Receptionist" setStep={setStep}>
      {step === "dashboard" && (
        <div className="card" style={{ padding: '20px' }}>
          <h2>Receptionist Dashboard</h2>
          <p>Welcome to the front desk.</p>
        </div>
      )}

      {step === "register" && (
        <div className="card" style={{ padding: '20px' }}>
          <h2>Register Patient (Integration Demo)</h2>
          {message && <div style={{ padding: '10px', background: '#d4edda', color: '#155724', marginBottom: '15px', borderRadius: '4px' }}>{message}</div>}
          
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' }}>
            <div>
              <label>Full Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} style={{ width: '100%', padding: '8px' }}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label>Contact Details:</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} required style={{ width: '100%', padding: '8px' }} />
            </div>
            
            <div style={{ background: '#f8f9fa', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <h4>Insurance Status (Cross-Module Trigger)</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <input type="checkbox" name="hasInsurance" checked={formData.hasInsurance} onChange={handleInputChange} />
                Patient has an Active Insurance Policy
              </label>
              
              {formData.hasInsurance && (
                <div>
                  <label>Policy ID / Number:</label>
                  <input type="text" name="policyNumber" value={formData.policyNumber} onChange={handleInputChange} required placeholder="Enter active Policy ID" style={{ width: '100%', padding: '8px' }} />
                  <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>Submitting this will auto-generate a Draft Pre-Auth in the Insurance module.</small>
                </div>
              )}
            </div>

            <button type="submit" style={{ padding: '10px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Register Patient
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}

export default Receptionist;