import React, { useState } from "react";
import Layout from "./Layout";
// import "./Pharmacy.css";

function Pharmacy() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Pharmacy" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Pharmacy Dashboard</h2>
        </div>
      )}

    </Layout>
  );
}

export default Pharmacy;