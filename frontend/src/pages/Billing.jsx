import React, { useState } from "react";
import Layout from "./Layout";
// import "./Billing.css";

function Billing() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Billing" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Billing Dashboard</h2>
        </div>
      )}

    </Layout>
  );
}

export default Billing;