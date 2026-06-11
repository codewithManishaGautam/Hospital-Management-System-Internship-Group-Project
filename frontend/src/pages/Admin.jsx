import React, { useState, useEffect, lazy, Suspense } from "react";
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

// Components
// import React, { useState, useEffect, lazy, Suspense } from "react";

const Dashboard = lazy(() => import("../Components/Admin/Dashboard"));

const StaffManagement = lazy(
  () => import("../Components/Admin/StaffManagement"),
);

const DoctorManagement = lazy(
  () => import("../Components/Admin/DoctorManagement"),
);

const PatientManagement = lazy(
  () => import("../Components/Admin/PatientManagement"),
);

// const PasswordManagement = lazy(
//   () => import("../Components/Admin/PasswordManagement"),
// );

function Admin() {
  const [step, setStep] = useState("admin-dashboard");

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
  const [newStaff, setNewStaff] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    email: "",
    role: "",
    salary: "",
    status: "",
    joining: "",
  });

  const [users, setUsers] = useState([]);

  // const [step, setStep] = useState("passwords");

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
        phone: "",
        email: "",
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
    fetchUsers();
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

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePassword = async (id, password) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/user/password/${id}`, {
        password,
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout role="Admin" setStep={setStep}>
      <Suspense fallback={<h2>Loading Admin Module....</h2>}>
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

        {/* {step === "passwords" && (
        <PasswordManagement users={users} updatePassword={updatePassword} />
      )} */}

        {/* {step === "passwords" && (
          <PasswordManagement users={users} updatePassword={updatePassword} />
        )} */}

        {/* {step === "passwords" && <PasswordManagement users={users} />} */}
      </Suspense>
    </Layout>
  );
}

export default Admin;
