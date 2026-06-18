import React, { useState } from "react";
import Layout from "./Layout";
import LabDashboard from "../Components/Lab/LabDashboard";

function Lab() {
  const [step, setStep] = useState("dashboard");

  return (
    <Layout role="Lab" setStep={setStep}>
      {/* sidebar me "Search Patient" button hota hai; lab dashboard default yahi hai */}
      {step === "dashboard" && <LabDashboard />}

      {step === "search" && <LabDashboard />}

      {step === "register" && (
        <div className="card">
          <h2>Lab</h2>
        </div>
      )}
    </Layout>
  );
}

export default Lab;



