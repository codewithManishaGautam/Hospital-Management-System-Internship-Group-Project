import React, { useState } from "react";

import Layout from "../Components/Pharmacy/Layout";
import Dashboard from "../Components/Pharmacy/Dashboard";
import Prescription from "../Components/Pharmacy/Prescription";
import BillPreview from "../Components/Pharmacy/BillPreview";
import Payments from "../Components/Pharmacy/Payments";
import {
  prescriptions,
  medicines,
  payments,
} from "../Components/Pharmacy/PharmacyData";

import "../styles/Pharmacy/Pharmacy.css";
import "../styles/Pharmacy/dashboard.css";
import "../styles/Pharmacy/billpreview.css";
import "../styles/Pharmacy/payments.css";
import "../styles/Pharmacy/prescription.css";




function Pharmacy() {
  const [step, setStep] = useState("dashboard");

  const total = medicines.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <Layout role="Pharmacy" setStep={setStep}>

      {step === "dashboard" && (
        <Dashboard
          prescriptions={prescriptions}
          setStep={setStep}
        />
      )}

      {step === "prescription" && (
        <Prescription
          medicines={medicines}
          total={total}
          setStep={setStep}
        />
      )}

      {step === "billpreview" && (
        <BillPreview
          medicines={medicines}
          total={total}
          setStep={setStep}
        />
      )}

      {step === "payments" && (
        <Payments
          payments={payments}
          setStep={setStep}
        />
      )}

    </Layout>
  );
}

export default Pharmacy;