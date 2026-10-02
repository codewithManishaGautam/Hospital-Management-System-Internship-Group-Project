import React, { useState } from "react";
import Layout from "./Layout";
import InsuranceSplitCard from "../Components/Insurance/InsuranceSplitCard";
import "../Components/Billing_Module/style/Billing.css";

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
     <div className="billing-dashboard-card">
  <h2>Billing Dashboard</h2>

  <div className="billing-patient-search">
    <h3>Search Patient Bill</h3>

    <form
      onSubmit={handleSearch}
      className="billing-search-form"
    >
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientIdSearch}
        onChange={(e) => setPatientIdSearch(e.target.value)}
        className="billing-patient-input"
      />

      <button
        type="submit"
        className="billing-load-btn"
      >
        Load Final Bill
      </button>
    </form>
  </div>
</div>
      )}
    </Layout>
  );
}

export default Billing;