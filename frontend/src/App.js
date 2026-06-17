import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LoginDashboard = lazy(() => import("./pages/Login"));
const ReceptionistDashboard = lazy(() => import("./pages/Receptionist"));
const DoctorDashboard = lazy(() => import("./pages/Doctor"));
const LabDashboard = lazy(() => import("./pages/Lab"));
const PharmacyDashboard = lazy(() => import("./pages/Pharmacy"));
const NurseDashboard = lazy(() => import("./pages/Nurse"));
const BillingDashboard = lazy(() => import("./pages/Billing"));
const InsuranceDashboard = lazy(() => import("./pages/Insurance"));
const AdminDashboard = lazy(() => import("./pages/Admin"));

// import BillingDept from "./components/Billing_Module/BillingDept";
// import PatientDetail from "./components/Billing_Module/PatientDetail";
// import ReceptionDept from "./components/ReceptionDept";
// import SignaturePad from "./components/SignaturePad";

// import AddDiagnostic
// from "./components/Diagnostic_Module/AddDiagnostic";
// import PICCEng from "./components/ConcernForm_Module/Routine_Consents/PICC/PICCEng";

function App() {
  return (
    // <AddDiagnostic />

    //   <Routes>

    //     <Route
    //       path="/"
    //       element={<BillingDept>

    //       </BillingDept>}
    //     />

    //     <Route
    //       path="/patient/:id"
    //       element={<PatientDetail />}
    //     />

    //   </Routes>

    <BrowserRouter>
      <Suspense fallback={<h2>Loading....</h2>}>
        <Routes>
          <Route path="/" element={<LoginDashboard />} />

          <Route path="/receptionist" element={<ReceptionistDashboard />} />

          <Route path="/doctor" element={<DoctorDashboard />} />

          <Route path="/lab" element={<LabDashboard />} />

          <Route path="/pharmacy" element={<PharmacyDashboard />} />

          <Route path="/nurse" element={<NurseDashboard />} />

          <Route path="/billing" element={<BillingDashboard />} />

          <Route path="/insurance" element={<InsuranceDashboard />} />

          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
