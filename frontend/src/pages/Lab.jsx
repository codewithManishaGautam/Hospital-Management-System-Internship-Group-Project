import React, { useState } from "react";
import Layout from "./Layout";

import LabOverview from "../Components/Lab/LabOverview";
import PatientRecords from "../Components/Lab/PatientRecords";
import TestCatalog from "../Components/Lab/TestCatalog";
import TestBooking from "../Components/Lab/TestBooking";
import SampleTracker from "../Components/Lab/SampleTracker";
import AnalysisPanel from "../Components/Lab/AnalysisPanel";
import FindingsEntry from "../Components/Lab/FindingsEntry";
import ReportHub from "../Components/Lab/ReportHub";
import PaymentDesk from "../Components/Lab/PaymentDesk";
import ReportHistory from "../Components/Lab/ReportHistory";

function Lab() {
  const [step, setStep] = useState("overview");
  const [labData, setLabData] = useState([]);

  const renderContent = () => {
    switch (step) {
      case "overview":
        return <LabOverview />;

      case "patients":
  return (
    <PatientRecords
      labData={labData}
      setLabData={setLabData}
    />
  );

      case "tests":
        return <TestCatalog labData={labData} />;

      case "booking":
  return <TestBooking labData={labData} />;

      case "samples":
  return <SampleTracker labData={labData} />;

      case "analysis":
  return <AnalysisPanel labData={labData} />;

      case "findings":
  return <FindingsEntry labData={labData} />;

     case "reports":
  return <ReportHub labData={labData} />;

     case "payments":
  return <PaymentDesk labData={labData} />;

      case "history":
        return <ReportHistory />;

      default:
        return <LabOverview />;
    }
  };

  return (
    <Layout role="Lab" setStep={setStep}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setStep("overview")}>Overview</button>
        <button onClick={() => setStep("patients")}>Patients</button>
        <button onClick={() => setStep("tests")}>Tests</button>
        <button onClick={() => setStep("booking")}>Booking</button>
        <button onClick={() => setStep("samples")}>Samples</button>
        <button onClick={() => setStep("analysis")}>Analysis</button>
        <button onClick={() => setStep("findings")}>Results</button>
        <button onClick={() => setStep("reports")}>Reports</button>
        <button onClick={() => setStep("payments")}>Billing</button>
        <button onClick={() => setStep("history")}>History</button>
      </div>

      {renderContent()}
    </Layout>
  );
}

export default Lab;