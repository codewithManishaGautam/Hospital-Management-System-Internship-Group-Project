import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import LoginDashboard from "./pages/Login";
import ReceptionistDashboard from "./pages/Receptionist";
import DoctorDashboard from "./pages/Doctor";
import LabDashboard from "./Components/Lab/LabDashboard";

import PharmacyDashboard from "./pages/Pharmacy";
import NurseDashboard from "./pages/Nurse";
import InsuranceDashboard from "./pages/Insurance";
import AdminDashboard from "./pages/Admin";

import VerifyAccount from "./Components/Login/VerifyAccount";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";
import Register from "./Components/Login/Register";
import BillingDept from "./Components/Billing_Module/BillingDept";
import PatientDetail from "./Components/Billing_Module/PatientDetail";
import PrescriptionPage from "./Components/Reception/PrescriptionPage";


function App() {
  return (
    

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
        <Route path="/insurance/*" element={<InsuranceDashboard />} />

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
