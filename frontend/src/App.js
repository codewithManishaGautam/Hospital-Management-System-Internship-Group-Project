import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginDashboard from "./pages/Login";
import ReceptionistDashboard from "./pages/Receptionist";
import DoctorDashboard from "./pages/Doctor";
import LabDashboard from "./pages/Lab";
import PharmacyDashboard from "./pages/Pharmacy";
import NurseDashboard from "./pages/Nurse";
import BillingDashboard from "./pages/Billing";
import InsuranceDashboard from "./pages/Insurance";
import AdminDashboard from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
