import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

// styles
import "../styles/admin/dashboard.css";
import "../styles/admin/table.css";
import "../styles/admin/doctor.css";
import "../styles/admin/staff.css";
import "../styles/admin/patient.css";
import "../styles/admin/forms.css";
import "../styles/admin/modal.css";

// components
import StaffManagement from "../Components/Admin/StaffManagement";
import DoctorManagement from "../Components/Admin/DoctorManagement";
import PatientManagement from "../Components/Admin/PatientManagement";
import Dashboard from "../Components/Admin/Dashboard";

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
  const [editedPatient, setEditedPatient] = useState({});

  const [showPatientForm, setShowPatientForm] = useState(false);
  const [newPatient, setNewPatient] = useState({});

  const [showPrescription, setShowPrescription] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editedStaff, setEditedStaff] = useState({});

  const [showStaffForm, setShowStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({});

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
      setNewStaff({});
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
      setNewPatient({});
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    fetchDashboard();
    fetchDoctors();
    fetchStaff();
    fetchPatients();
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

  return (
    <Layout role="Admin" setStep={setStep}>
      {/* DASHBOARD */}
      {step === "admin-dashboard" && <Dashboard dashboard={dashboard} />}

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
                  <td>{tpa.name}</td>
                  <td>{tpa.helpdeskPhone || "N/A"}</td>
                  <td>{tpa.helpdeskEmail || "N/A"}</td>
                  <td>{tpa.claimTAT || "N/A"}</td>
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
                <th>Network Tie-up</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {companyList.length > 0 ? companyList.map(comp => (
                <tr key={comp._id}>
                  <td>{comp._id.substring(comp._id.length - 6).toUpperCase()}</td>
                  <td>{comp.name}</td>
                  <td>{comp.type}</td>
                  <td>{comp.contactPhone || "N/A"}</td>
                  <td>{comp.networkHospitalStatus ? "Yes" : "No"}</td>
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
    </Layout>
  );
}

export default Admin;
