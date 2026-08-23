import React, { useState, useEffect } from "react";

import Layout from "../Components/Pharmacy/Layout";
import Dashboard from "../Components/Pharmacy/Dashboard";
import PharmacyPrescription from "../Components/Pharmacy/PharmacyPrescription";
import BillPreview from "../Components/Pharmacy/BillPreview";
import Payments from "../Components/Pharmacy/Payments";
import axios from "axios";

// import { medicines, payments } from "../Components/Pharmacy/PharmacyData";

import "../styles/Pharmacy/Pharmacy.css";
import "../styles/Pharmacy/dashboard.css";
import "../styles/Pharmacy/billpreview.css";
import "../styles/Pharmacy/payments.css";
// import "../styles/Pharmacy/Prescription.css";

function Pharmacy() {
  const [step, setStep] = useState("dashboard");

  const [prescriptions, setPrescriptions] = useState([]);

  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [payments, setPayments] = useState([]);

  const loadPrescriptions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/pharmacy/prescriptions",
      );

      setPrescriptions(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openLatestPrescription = () => {
    if (!prescriptions || prescriptions.length === 0) {
      alert("No prescription available");
      return;
    }

    const pendingPrescriptions = prescriptions.filter(
      (item) => item.status === "Pending",
    );

    if (pendingPrescriptions.length === 0) {
      alert("No pending prescription available");
      return;
    }

    // Latest prescription
    const latestPrescription = pendingPrescriptions[0];

    console.log("OPENING PHARMACY PRESCRIPTION =", latestPrescription);

    setSelectedPrescription(latestPrescription);
    setStep("prescription");
  };

  const loadPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pharmacy/bills");

      setPayments(res.data.data || []);
    } catch (err) {
      console.log("Payments Load Error:", err);
    }
  };

  useEffect(() => {
    loadPrescriptions();
    loadPayments();
  }, []);

const medicines = selectedPrescription?.pharmacyMedicines || [];

  const total = medicines.reduce(
    (sum, item) =>
      sum +
      Number(
        item.amount ?? Number(item.price || 0) * Number(item.quantity || 0),
      ),
    0,
  );

  return (
    <Layout
      role="Pharmacy"
      setStep={setStep}
      selectedPrescription={selectedPrescription}
    >
      {step === "dashboard" && (
        <Dashboard
          prescriptions={prescriptions}
          setStep={setStep}
          setSelectedPrescription={setSelectedPrescription}
        />
      )}

      {step === "prescription" && selectedPrescription && (
        <PharmacyPrescription
          prescription={selectedPrescription}
          setStep={setStep}
          setSelectedPrescription={setSelectedPrescription}
        />
      )}

      {step === "prescription" && !selectedPrescription && (
        <div className="table-container">
          <h2>No Prescription Selected</h2>
          <p>
            Please go to Pharmacy Dashboard and click Open on a prescription.
          </p>

          <button className="btn-primary" onClick={() => setStep("dashboard")}>
            Go to Dashboard
          </button>
        </div>
      )}

      {step === "billpreview" && (
        <BillPreview
          medicines={medicines}
          total={total}
          setStep={setStep}
          patient={selectedPrescription?.prescription}
          prescriptionId={selectedPrescription?._id}
          prescriptionHistoryId={selectedPrescription?.prescriptionHistoryId}
          loadPrescriptions={loadPrescriptions}
          loadPayments={loadPayments}
        />
      )}

      {step === "payments" && (
        <Payments payments={payments} setStep={setStep} />
      )}
    </Layout>
  );
}

export default Pharmacy;
