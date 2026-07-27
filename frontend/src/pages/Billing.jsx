import React, { useState } from "react";
import Layout from "./Layout";
import InsuranceSplitCard from "../components/insurance/InsuranceSplitCard";
// import "./Billing.css";

function Billing() {
  const [step, setStep] = useState("dashboard");
  const [patientIdSearch, setPatientIdSearch] = useState("");
  const [activePatientId, setActivePatientId] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setActivePatientId(patientIdSearch);
  };

  return (
    <Layout role="Billing" setStep={setStep}>
      {step === "dashboard" && (
        <div className="card" style={{ padding: '20px' }}>
          <h2>Billing Dashboard</h2>
          
          <div style={{ margin: '20px 0', padding: '20px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3>Search Patient Bill</h3>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Enter Patient ID" 
                value={patientIdSearch} 
                onChange={(e) => setPatientIdSearch(e.target.value)}
                style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button type="submit" style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Load Final Bill
              </button>
            </form>
          </div>

          {activePatientId && (
            <div className="billing-content" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flex: 2, background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
                <h3>Hospital Bill Line Items (Draft)</h3>
                <ul style={{ lineHeight: '1.8' }}>
                  <li>Room Rent (General Ward - 2 days): ₹10,000</li>
                  <li>Surgeon Fee: ₹80,000</li>
                  <li>OT Charges: ₹30,000</li>
                  <li>Pharmacy & Consumables: ₹10,000</li>
                </ul>
                <h3 style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>Gross Total: ₹130,000</h3>
              </div>
              <div style={{ flex: 1 }}>
                <InsuranceSplitCard patientId={activePatientId} />
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default Billing;