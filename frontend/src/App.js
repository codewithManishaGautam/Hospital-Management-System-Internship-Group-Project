import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import VenousEngMar from "./Components/ConcernForm_Module/Routine_Consents/CentralVenousCatheterisation/VenousEngMar";

import LoginDashboard from "./pages/Login";
import ReceptionistDashboard from "./pages/Receptionist";
import DoctorDashboard from "./pages/Doctor";
import LabDashboard from "./pages/Lab";
import PharmacyDashboard from "./pages/Pharmacy";
import NurseDashboard from "./pages/Nurse";
import BillingDashboard from "./pages/Billing";
import InsuranceDashboard from "./pages/Insurance";
import AdminDashboard from "./pages/Admin";

import VerifyAccount from "./Components/Login/VerifyAccount";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";
import Register from "./Components/Login/Register";

// import VenousEngMar from "./Components/ConcernForm_Module/Routine_Consents/CentralVenousCatheterisation/VenousEngMar";

// import {
//   Routes,
//   Route,
//   BrowserRouter,
// } from "react-router-dom";

// import LoginDashboard from "./pages/Login";
// import ReceptionistDashboard from "./pages/Receptionist";
// import DoctorDashboard from "./pages/Doctor";
// import LabDashboard from "./pages/Lab";
// import PharmacyDashboard from "./pages/Pharmacy";
// import NurseDashboard from "./pages/Nurse";
// import BillingDashboard from "./pages/Billing";
// import InsuranceDashboard from "./pages/Insurance";
// import AdminDashboard from "./pages/Admin";

// >>>>>>> 21a693d2d1562609078baee245cf2c5eadb5b2ff

// import BillingDept from "./Components/Billing_Module/BillingDept";
// import PatientDetail from "./Components/Billing_Module/PatientDetail";

import BillingDept from "./Components/Billing_Module/BillingDept";
import PatientDetail from "./Components/Billing_Module/PatientDetail";
import PrescriptionPage from "./Components/Admin/PrescriptionPage";

// import BillingDept from "./Components/Billing_Module/BillingDept";
// import PatientDetail from "./Components/Billing_Module/PatientDetail";

// import ReceptionDept from "./components/ReceptionDept";
// import SignaturePad from "./components/SignaturePad";

// import AddDiagnostic
// from "./components/Diagnostic_Module/AddDiagnostic";
// import PICCEng from "./components/ConcernForm_Module/Routine_Consents/PICC/PICCEng";

function App() {
  return (
    // <AddDiagnostic />


    // <VenousEngMar/>

    // <BrowserRouter>

    // <Routes>

    //   <Route
    //     path="/"
    //     element={<BillingDept>

   //   <Route
    //     path="/patient/:id"
    //     element={<PatientDetail />}
    //   />

    // </Routes>

    // </BrowserRouter>

    <BrowserRouter>
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
        <Route path="/billing" element={<BillingDept />} />

        <Route path="/patient/:id" element={<PatientDetail />} />

        {/* Insurance */}
        <Route path="/insurance" element={<InsuranceDashboard />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/verify-account" element={<VerifyAccount />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/register" element={<Register />} />
        <Route path="/prescription/:id" element={<PrescriptionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
