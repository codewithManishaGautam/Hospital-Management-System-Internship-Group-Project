import React, { useState } from "react";
import Layout from "./Layout";
// import "./Insurance.css";

function Insurance() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Insurance" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Insurance Dashboard</h2>
        </div>
      )}

    </Layout>
  );
}

export default Insurance;