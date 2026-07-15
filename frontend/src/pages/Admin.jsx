import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

// styles
// import "../styles/admin/dashboard.css";
// import "../styles/admin/table.css";
// import "../styles/admin/doctor.css";
// import "../styles/admin/staff.css";
// import "../styles/admin/patient.css";
// import "../styles/admin/forms.css";
// import "../styles/admin/modal.css";

// components
import StaffManagement from "../Components/Admin/StaffManagement";
import DoctorManagement from "../Components/Admin/DoctorManagement";
import PatientManagement from "../Components/Admin/PatientManagement";
import Dashboard from "../Components/Admin/Dashboard";
import AddRoom from "../Components/Admin/AddRoom";
import RoomInventory from "../Components/Admin/RoomInventory";
import Inventory from "../Components/Admin/Inventory";
import Income from "../Components/Admin/Income";
import Expense from "../Components/Admin/Expense";
// import Analytics from "../Components/Admin/Analytics";
import Charges from "../Components/Admin/Charges";
import Insurance from "../Components/Admin/Insurance";
import BedManagement from "../Components/Admin/BedManagement";

function Admin() {
  const [step, setStep] = useState("admin-dashboard");

  const [tpaList, setTpaList] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    if (step === "insurance-master") {
      fetchMasterData();
    }
  }, [step]);

  const fetchMasterData = async () => {
    try {
      const resTpa = await axios.get("http://localhost:5000/api/insurance/master-data/tpas");
      if (resTpa.data.success) setTpaList(resTpa.data.data);
      
      const resComp = await axios.get("http://localhost:5000/api/insurance/master-data/companies");
      if (resComp.data.success) setCompanyList(resComp.data.data);
    } catch (err) {
      console.error("Error fetching master data:", err);
    }
  };

  const [dashboard, setDashboard] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [staff, setStaff] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editedPatient, setEditedPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    disease: "",
    doctor: "",
    admission: "",
    appointmentDate: "",
    status: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [showPatientForm, setShowPatientForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    disease: "",
    doctor: "",
    admission: "",
    appointmentDate: "",
    status: "",
  });

  const [finance, setFinance] = useState({});
  const [activities, setActivities] = useState([]);

  const [showPrescription, setShowPrescription] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editedStaff, setEditedStaff] = useState({
    name: "",
    aadhaar: "",
    mobile: "",
    role: "",
    salary: "",
    status: "",
    joining: "",
  });

  const [showStaffForm, setShowStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    aadhaar: "",
    mobile: "",
    role: "",
    salary: "",
    status: "",
    joining: "",
  });

  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);

  const saveStaffEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/staff/edit/${id}`,
        editedStaff,
      );
      setEditingStaffId(null);
      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/staff/delete/${id}`);
      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  const addStaff = async () => {
    try {
      await axios.post(`http://localhost:5000/api/admin/staff/add`, newStaff);
      setShowStaffForm(false);
      setNewStaff({
        name: "",
        aadhaar: "",
        mobile: "",
        role: "",
        salary: "",
        status: "",
        joining: "",
      });
      fetchStaff();
    } catch (err) {
      console.log(err);
    }
  };

  const savePatientEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/patient/edit/${id}`,
        editedPatient,
      );
      setEditingPatientId(null);
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/patient/delete/${id}`,
      );
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  const addPatient = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/admin/patient/add`,
        newPatient,
      );
      setShowPatientForm(false);
      setNewPatient({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        disease: "",
        doctor: "",
        admission: "",
        appointmentDate: "",
        status: "",
      });
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPatients();
      fetchRooms();
      fetchBeds();
      fetchDashboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/staff");
      setStaff(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/patients");
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFinance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/analytics");

      setFinance(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/activities");

      setActivities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBeds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beds");
      setBeds(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout role="Admin" setStep={setStep}>
      {/* DASHBOARD */}
      {step === "admin-dashboard" && (
        <Dashboard
          dashboard={dashboard}
          finance={finance}
          activities={activities}
          rooms={rooms}
          beds={beds}
        />
      )}

      {/* DOCTORS */}
      {step === "doctors" && (
        <DoctorManagement doctors={doctors} fetchDoctors={fetchDoctors} />
      )}

      {/* PATIENTS */}
      {step === "patients" && (
        <PatientManagement
          patients={patients}
          editingPatientId={editingPatientId}
          setEditingPatientId={setEditingPatientId}
          editedPatient={editedPatient}
          setEditedPatient={setEditedPatient}
          showPatientForm={showPatientForm}
          setShowPatientForm={setShowPatientForm}
          newPatient={newPatient}
          setNewPatient={setNewPatient}
          showPrescription={showPrescription}
          setShowPrescription={setShowPrescription}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          fetchPatients={fetchPatients}
          // ✅ ADD THESE (IMPORTANT)
          savePatientEdit={savePatientEdit}
          deletePatient={deletePatient}
          addPatient={addPatient}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}

      {/* INSURANCE MASTER DATA */}
      {step === "insurance-master" && (
        <div className="table-container">
          <div className="section-header">
            <h2>Third Party Administrators (TPAs)</h2>
            <button className="add-btn">+ Add TPA</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>TPA ID</th>
                <th>Name</th>
                <th>Contact Phone</th>
                <th>Contact Email</th>
                <th>Settlement TAT</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tpaList.length > 0 ? tpaList.map(tpa => (
                <tr key={tpa._id}>
                  <td>{tpa._id.substring(tpa._id.length - 6).toUpperCase()}</td>
                  <td>{tpa.tpaName}</td>
                  <td>{tpa.helpline || "N/A"}</td>
                  <td>{tpa.claimsEmail || "N/A"}</td>
                  <td>{tpa.claimTatDays || "N/A"}</td>
                  <td>{tpa.isActive ? "Active" : "Inactive"}</td>
                </tr>
              )) : (
                <tr><td colSpan="6">No TPAs found.</td></tr>
              )}
            </tbody>
          </table>

          <div className="section-header" style={{ marginTop: '40px' }}>
            <h2>Insurance Companies</h2>
            <button className="add-btn">+ Add Company</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Name</th>
                <th>Provider Type</th>
                <th>Contact Phone</th>
                <th>Cashless Network</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {companyList.length > 0 ? companyList.map(comp => (
                <tr key={comp._id}>
                  <td>{comp._id.substring(comp._id.length - 6).toUpperCase()}</td>
                  <td>{comp.companyName}</td>
                  <td>{comp.companyType}</td>
                  <td>{comp.claimDepartmentPhone || "N/A"}</td>
                  <td>{comp.isCashless ? "Yes" : "No"}</td>
                  <td>{comp.isActive ? "Active" : "Inactive"}</td>
                </tr>
              )) : (
                <tr><td colSpan="6">No Companies found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* STAFF */}
      {step === "users" && (
        <StaffManagement
          staff={staff}
          editingStaffId={editingStaffId}
          setEditingStaffId={setEditingStaffId}
          editedStaff={editedStaff}
          setEditedStaff={setEditedStaff}
          showStaffForm={showStaffForm}
          setShowStaffForm={setShowStaffForm}
          newStaff={newStaff}
          setNewStaff={setNewStaff}
          fetchStaff={fetchStaff}
          saveStaffEdit={saveStaffEdit}
          deleteStaff={deleteStaff}
          addStaff={addStaff}
        />
      )}

      {step === "add-room" && <AddRoom />}

      {step === "room-inventory" && <RoomInventory />}

      {step === "beds" && <BedManagement />}

      {step === "inventory" && <Inventory />}

      {step === "income" && <Income />}

      {step === "expense" && <Expense />}

      {/* {step === "analytics" && <Analytics />} */}

      {step === "charges" && <Charges />}

      {step === "insurance" && <Insurance />}
    </Layout>
  );
}

export default Admin;
