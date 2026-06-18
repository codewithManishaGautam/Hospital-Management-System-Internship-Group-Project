import React, { useState } from "react";
import Layout from "./Layout";
// import "./Lab.css";

function Lab() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Lab" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Lab Dashboard</h2>
        </div>
      )}

      {step === "register" && (
        <div className="card">
          <h2>Lab</h2>
        </div>
      )}

    </Layout>
  );
}

export default Lab;