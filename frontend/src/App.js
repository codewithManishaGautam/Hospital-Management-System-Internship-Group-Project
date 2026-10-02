import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Login
const LoginDashboard = lazy(() => import("./pages/Login"));

// Main Dashboards
const ReceptionistDashboard = lazy(() => import("./pages/Receptionist"));
const DoctorDashboard = lazy(() => import("./pages/Doctor"));
const LabDashboard = lazy(() => import("./Components/Lab/LabDashboard"));
const PharmacyDashboard = lazy(() => import("./pages/Pharmacy"));
const NurseDashboard = lazy(() => import("./pages/Nurse"));
const InsuranceDashboard = lazy(
  () => import("./Components/InsurancePatient/InsuranceDashboard")
);
const AdminDashboard = lazy(() => import("./pages/Admin"));

// Login / Authentication pages
const VerifyAccount = lazy(
  () => import("./Components/Login/VerifyAccount")
);
const ForgotPassword = lazy(
  () => import("./Components/Login/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("./Components/Login/ResetPassword")
);
const Register = lazy(() => import("./Components/Login/Register"));

// Billing
const BillingDept = lazy(
  () => import("./Components/Billing_Module/BillingDept")
);

const PatientDetail = lazy(
  () => import("./Components/Billing_Module/PatientDetail")
);

// Reception
const PrescriptionPage = lazy(
  () => import("./Components/Reception/PrescriptionPage")
);

// Insurance Patient
const InsurancePatient = lazy(
  () => import("./Components/InsurancePatient/InsurancePatient")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LoginDashboard />} />

          {/* Receptionist */}
          <Route
            path="/receptionist"
            element={<ReceptionistDashboard />}
          />

          {/* Doctor */}
          <Route path="/doctor" element={<DoctorDashboard />} />

          {/* Lab Module */}
          <Route path="/lab" element={<LabDashboard />} />

          {/* Pharmacy */}
          <Route path="/pharmacy" element={<PharmacyDashboard />} />

          {/* Nurse */}
          <Route path="/nurse" element={<NurseDashboard />} />

          {/* Billing */}
          <Route path="/billing" element={<BillingDept />} />

          <Route
            path="/patient/:id"
            element={<PatientDetail />}
          />

          {/* Insurance */}
          <Route
            path="/insurance/*"
            element={<InsuranceDashboard />}
          />

          <Route
            path="/insurance/:id"
            element={<InsurancePatient />}
          />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Authentication */}
          <Route
            path="/verify-account"
            element={<VerifyAccount />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route path="/register" element={<Register />} />

          {/* Prescription */}
          <Route
            path="/prescription/:id"
            element={<PrescriptionPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;