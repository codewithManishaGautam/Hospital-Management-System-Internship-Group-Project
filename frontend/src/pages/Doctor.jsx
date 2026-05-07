import React, { useState } from "react";
import Layout from "./Layout";
// import "./Doctor.css";

function Doctor() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Doctor" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Doctor Dashboard</h2>
        </div>
      )}

      {step === "search" && (
        <div className="card">
          <h2>Search Patient</h2>
        </div>
      )}

    </Layout>
  );
}

export default Doctor;