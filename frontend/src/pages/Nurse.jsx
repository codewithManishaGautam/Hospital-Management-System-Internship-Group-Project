import React, { useState } from "react";
import Layout from "./Layout";
// import "./Nurse.css";

function Nurse() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Nurse" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Nurse Dashboard</h2>
        </div>
      )}

    </Layout>
  );
}

export default Nurse;