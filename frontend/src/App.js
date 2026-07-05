import React from "react";
import VenousEngMar from "./Components/ConcernForm_Module/Routine_Consents/CentralVenousCatheterisation/VenousEngMar";

import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import LoginDashboard from "./pages/Login";
import ReceptionistDashboard from "./pages/Receptionist";
import DoctorDashboard from "./pages/Doctor";
import LabDashboard from "./pages/Lab";
import PharmacyDashboard from "./pages/Pharmacy";
import NurseDashboard from "./pages/Nurse";
import BillingDashboard from "./pages/Billing";
import InsuranceDashboard from "./pages/Insurance";
import AdminDashboard from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";




import BillingDept from "./Components/Billing_Module/BillingDept";
import PatientDetail from "./Components/Billing_Module/PatientDetail";


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

    //     </BillingDept>}
    //   />



    //   <Route
    //     path="/patient/:id"
    //     element={<PatientDetail />}
    //   />

    // </Routes>

    // </BrowserRouter>




    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LoginDashboard />} />
        <Route path="/receptionist" element={<PrivateRoute><ReceptionistDashboard /></PrivateRoute>} />
        <Route path="/doctor" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
        <Route path="/lab" element={<PrivateRoute><LabDashboard /></PrivateRoute>} />
        <Route path="/pharmacy" element={<PrivateRoute><PharmacyDashboard /></PrivateRoute>} />
        <Route path="/nurse" element={<PrivateRoute><NurseDashboard /></PrivateRoute>} />
        
        {/* Billing */}
        <Route path="/billing" element={<PrivateRoute><BillingDept /></PrivateRoute>} />
        <Route path="/patient/:id" element={<PrivateRoute><PatientDetail /></PrivateRoute>} />

        {/* Insurance */}
        <Route path="/insurance" element={<PrivateRoute><InsuranceDashboard /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>



  );
}

export default App;
