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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading....</h2>}>
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginDashboard />} />

          {/* Receptionist */}
          <Route path="/receptionist" element={<ReceptionistDashboard />} />

          {/* Doctor */}
          <Route path="/doctor" element={<DoctorDashboard />} />

          {/* Lab Module */}
          <Route path="/lab" element={<LabDashboard />} />

          {/* Pharmacy */}
          <Route path="/pharmacy" element={<PharmacyDashboard />} />

          {/* Nurse */}
          <Route path="/nurse" element={<NurseDashboard />} />

          {/* Billing */}
          <Route path="/billing" element={<BillingDashboard />} />

          {/* Insurance */}
          <Route path="/insurance" element={<InsuranceDashboard />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
