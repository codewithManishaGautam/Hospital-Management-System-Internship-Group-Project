import React, { useState } from "react";

import Layout from "../Components/Reception/Layout";
// import Layout from "./Layout";
import Dashboard from "../Components/Reception/Dashboard";
import RegistrationForm from "../Components/Reception/RegistrationForm";
import OPDBilling from "../Components/Reception/OPDBilling";
// import IPDAdmission from "../Components/Reception/IPDadmission";
// import IPDPatientList from "../Components/Reception/IPDPatientList";
import PatientList from "../Components/Reception/patientList";
// import Reports from "../Components/Reception/Reports";
// import PrescriptionPage from "../Components/Admin/PrescriptionPage";

function Receptionist() {
  const [step, setStep] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [mode, setMode] = useState("register");

  return (
<Layout
    role="Receptionist"
    currentStep={step}
    setStep={setStep}
>
        {step === "dashboard" && (
        <Dashboard
          setStep={setStep}
          setSelectedPatient={setSelectedPatient}
          setMode={setMode}
        />
      )}

      {step === "register" && (
        <RegistrationForm
          patient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          setStep={setStep}
          mode={
            selectedPatient
              ? selectedPatient.isAppointment
                ? "appointment"
                : "edit"
              : "new"
          }
        />
      )}

      {step === "billing" && <OPDBilling patient={selectedPatient} />}

      {/* {step === "ipdAdmission" && <IPDAdmission patient={selectedPatient} />} */}

      {/* {step === "ipdPatients" && <IPDPatientList />} */}

      {/* {step === "searchPatient" && (
        <SearchPatient
          setStep={setStep}
          setSelectedPatient={setSelectedPatient}
        />
      )} */}

      {/* {step === "reports" && <Reports />} */}

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
