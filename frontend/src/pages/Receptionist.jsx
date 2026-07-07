import React, { useState } from "react";

import Layout from "../Components/Reception/Layout";
import Dashboard from "../Components/Reception/Dashboard";
import RegistrationForm from "../Components/Reception/RegistrationForm";
import OPDBilling from "../Components/Reception/OPDBilling";
import IPDAdmission from "../Components/Reception/IPDadmission";
import IPDPatientList from "../Components/Reception/IPDPatientList";
import PatientList from "../Components/Reception/patientList";
import Reports from "../Components/Reception/Reports";

function Receptionist() {
  const [step, setStep] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <Layout role="Receptionist" setStep={setStep} currentStep={step}>
      {step === "dashboard" && (
        <Dashboard setStep={setStep} setSelectedPatient={setSelectedPatient} />
      )}

      {step === "register" && <RegistrationForm patient={selectedPatient} />}

      {step === "billing" && <OPDBilling patient={selectedPatient} />}

      {step === "ipdAdmission" && <IPDAdmission patient={selectedPatient} />}

      {step === "ipdPatients" && <IPDPatientList />}

      {/* {step === "searchPatient" && (
        <SearchPatient
          setStep={setStep}
          setSelectedPatient={setSelectedPatient}
        />
      )} */}

      {step === "reports" && <Reports />}

      {step === "patientList" && (
        <PatientList
          setStep={setStep}
          setSelectedPatient={setSelectedPatient}
        />
      )}
    </Layout>
  );
}

export default Receptionist;
