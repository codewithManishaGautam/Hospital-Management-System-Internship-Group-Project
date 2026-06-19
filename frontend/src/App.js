import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
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

      <Routes>
        <Route path="/" element={<LoginDashboard />} />
        <Route path="/receptionist" element={<PrivateRoute><ReceptionistDashboard /></PrivateRoute>} />
        <Route path="/doctor" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
        <Route path="/lab" element={<PrivateRoute><LabDashboard /></PrivateRoute>} />
        <Route path="/pharmacy" element={<PrivateRoute><PharmacyDashboard /></PrivateRoute>} />
        <Route path="/nurse" element={<PrivateRoute><NurseDashboard /></PrivateRoute>} />
        <Route path="/billing" element={<PrivateRoute><BillingDashboard /></PrivateRoute>} />
        <Route path="/insurance" element={<PrivateRoute><InsuranceDashboard /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
