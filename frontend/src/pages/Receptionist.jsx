import React, { useState } from "react";

import Layout from "../Components/Reception/Layout";
import Dashboard from "../Components/Reception/Dashboard";
import RegistrationForm from "../Components/Reception/RegistrationForm";
import OPDBilling from "../Components/Reception/OPDBilling";
import IPDAdmission from "../Components/Reception/IPDadmission";
import IPDPatientList from "../Components/Reception/IPDPatientList";
import SearchPatient from "../Components/Reception/SearchPatient";
import Reports from "../Components/Reception/Reports";

function Receptionist() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Receptionist" setStep={setStep}>
      
      {step === "dashboard" && (
        <Dashboard />
      )}

      {step === "register" && (
        <RegistrationForm />
      )}

      {step === "billing" && (
        <OPDBilling />
      )}

      {step === "ipdAdmission" && (
        <IPDAdmission />
      )}

      {step === "ipdPatients" && (
        <IPDPatientList />
      )}

      {step === "searchPatient" && (
        <SearchPatient />
      )}

      {step === "reports" && (
        <Reports />
      )}

    </Layout>
  );
}

export default Receptionist;