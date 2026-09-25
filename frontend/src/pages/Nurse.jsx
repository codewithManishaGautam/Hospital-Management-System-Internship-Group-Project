import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../Components/Nurse/Layout";
import Dashboard from "../Components/Nurse/Dashboard";
import Beds from "../Components/Nurse/Beds";
import PatientList from "../Components/Nurse/PatientList";
import PatientDetails from "../Components/Nurse/PatientDetails";

// import patientsData from "../Components/Nurse/PatientsData";

export default function Nurse() {

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNursePatients();
  }, []);

const fetchNursePatients = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      "http://localhost:5000/api/patient/nurse/patients"
    );

    console.log("NURSE PATIENTS API RESPONSE =", res.data);

    const nursePatients = res.data?.data || [];

    const nonOPDPatients = nursePatients.filter(
      (patient) => patient.role !== "OPD"
    );

    setPatients(nonOPDPatients);
  } catch (error) {
    console.error(
      "NURSE PATIENT FETCH ERROR =",
      error.response?.data || error.message
    );

    setPatients([]);
  } finally {
    setLoading(false);
  }
};

  const [page, setPage] = useState("dashboard");

  const [searchUHID, setSearchUHID] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [days, setDays] = useState([
    "Day 1",
    "Day 2",
    "Day 3"
  ]);

const [newReport, setNewReport] = useState({
  bp: "",
  pulse: "",
  temperature: "",
  spo2: "",
  sugar: "",
  intake: "",
  output: "",
  notes: ""
});

  const handleSearch = () => {

    const found = patients.find(
      (p) =>
        String(p.uhid).toLowerCase() ===
        String(searchUHID).toLowerCase()
    );

    if (found) {

      setSelectedPatient(found);
      setPage("details");

    } else {

      alert("Patient Not Found");

    }
  };

  const addDay = () => {

    const next = `Day ${days.length + 1}`;

    setDays([...days, next]);
  };

const saveDailyReport = async () => {
  if (!selectedPatient?._id) {
    alert("Patient not selected");
    return;
  }

  try {
    const payload = {
      bp: newReport.bp,
      pulse: newReport.pulse,
      temperature: newReport.temperature,
      spo2: newReport.spo2,
      sugar: newReport.sugar,
      intake: newReport.intake,
      output: newReport.output,
      notes: newReport.notes,
    };

    const res = await axios.post(
      `http://localhost:5000/api/patient/${selectedPatient._id}/nursing-report`,
      payload
    );

    console.log("NURSING REPORT SAVED =", res.data);

    const savedReport = res.data?.data;

    if (!savedReport) {
      alert("Report saved but response data not received.");
      return;
    }

    const updatedPatient = {
      ...selectedPatient,
      nursingReports: [
        ...(selectedPatient.nursingReports || []),
        savedReport,
      ],
    };

    // Update selected patient
    setSelectedPatient(updatedPatient);

    // Update patient list
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient._id === selectedPatient._id
          ? updatedPatient
          : patient
      )
    );

    // Clear form
    setNewReport({
      bp: "",
      pulse: "",
      temperature: "",
      spo2: "",
      sugar: "",
      intake: "",
      output: "",
      notes: "",
    });

    alert("Daily Nursing Report Saved Successfully");
  } catch (error) {
    console.error(
      "SAVE DAILY REPORT ERROR =",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
        "Failed to save daily nursing report"
    );
  }
};

  const logout = () => {

    alert("Logout Successful");

    window.location.reload();
  };

  return (

    <Layout setPage={setPage}>

      {page === "dashboard" && (
        <Dashboard />
      )}

      {page === "beds" && (
        <Beds />
      )}

      {page === "patients" && (

      <PatientList
  patients={patients}
  searchUHID={searchUHID}
  setSearchUHID={setSearchUHID}
  handleSearch={handleSearch}
  loading={loading}
 onSelectPatient={async (patient) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/patient/${patient._id}`
    );

    setSelectedPatient(res.data);
    setPage("details");
  } catch (error) {
    console.error(
      "GET PATIENT DETAILS ERROR =",
      error.response?.data || error.message
    );

    alert("Unable to load patient details");
  }
}}
/>

      )}

      {page === "details" && selectedPatient && (

   <PatientDetails
  selectedPatient={selectedPatient}
  setSelectedPatient={setSelectedPatient}
  newReport={newReport}
  setNewReport={setNewReport}
  saveDailyReport={saveDailyReport}
  days={days}
  addDay={addDay}
/>

      )}

    </Layout>

  );
}