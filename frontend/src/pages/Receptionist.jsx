import React, { useState } from "react";
import Layout from "./Layout";
// import "./Receptionist.css";

function Receptionist() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Receptionist" setStep={setStep}>

      {step === "dashboard" && (
        <div className="card">
          <h2>Receptionist Dashboard</h2>
        </div>
      )}

      {step === "register" && (
        <div className="card">
          <h2>Register Patient</h2>
        </div>
      )}

    </Layout>
  );
}

export default Receptionist;