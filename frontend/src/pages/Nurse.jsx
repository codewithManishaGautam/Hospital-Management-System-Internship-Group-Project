import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../Components/Nurse/sidebar";
import Dashboard from "../Components/Nurse/Dashboard";
import Beds from "../Components/Nurse/Beds";
import PatientList from "../Components/Nurse/PatientList";
import PatientDetails from "../Components/Nurse/PatientDetails";

// import patientsData from "../Components/Nurse/PatientsData";

//import "../Components/styles/Nurse/Nurse.css";

export default function Nurse() {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    fetchNursePatients();
  }, []);

  const fetchNursePatients = async () => {
    try {
      setLoadingPatients(true);

      const response = await axios.get(
        "http://localhost:5000/api/patient/nurse/patients",
      );

      setPatients(response.data.data || []);
    } catch (error) {
      console.error("Error fetching Nurse patients:", error);
      alert("Failed to load patients");
    } finally {
      setLoadingPatients(false);
    }
  };

  const [searchUHID, setSearchUHID] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [days, setDays] = useState(["Day 1", "Day 2", "Day 3"]);

  const [newReport, setNewReport] = useState({
    bp: "",
    pulse: "",
    temp: "",
    spo2: "",
    sugar: "",
    intake: "",
    output: "",
    notes: "",
  });

  const handleSearch = () => {
    const searchValue = searchUHID.trim();

    if (!searchValue) {
      alert("Please enter UHID");
      return;
    }

    const found = patients.find((p) => String(p.uhid) === searchValue);

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
      const response = await axios.post(
        `http://localhost:5000/api/patient/${selectedPatient._id}/nursing-report`,
        {
          bp: newReport.bp,
          pulse: newReport.pulse,
          temperature: newReport.temp,
          spo2: newReport.spo2,
          sugar: newReport.sugar,
          intake: newReport.intake,
          output: newReport.output,
          notes: newReport.notes,
        },
      );

      const savedReport = response.data.data;

      const updatedPatient = {
        ...selectedPatient,
        nursingReports: [
          ...(selectedPatient.nursingReports || []),
          savedReport,
        ],
      };

      setSelectedPatient(updatedPatient);

      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === selectedPatient._id ? updatedPatient : patient,
        ),
      );

      setNewReport({
        bp: "",
        pulse: "",
        temp: "",
        spo2: "",
        sugar: "",
        intake: "",
        output: "",
        notes: "",
      });

      alert("Daily Report Saved Successfully");
    } catch (error) {
      console.error("Error saving nursing report:", error);

      alert(error.response?.data?.message || "Failed to save Daily Report");
    }
  };

  const createPDF = () => {
    alert("PDF Created Successfully");
  };

  const sendPharmacy = () => {
    alert("Sent To Pharmacy");
  };

  const sendBilling = () => {
    alert("Sent To Billing");
  };

  const logout = () => {
    alert("Logout Successful");

    window.location.reload();
  };

  return (
    <div className="nurse-container">
      <Sidebar setPage={setPage} logout={logout} />
      <div className="nurse-main">
        {page === "dashboard" && <Dashboard />}

        {page === "beds" && <Beds />}

        {page === "patients" && (
          <PatientList
            patients={patients}
            searchUHID={searchUHID}
            setSearchUHID={setSearchUHID}
            handleSearch={handleSearch}
            loading={loadingPatients}
            onSelectPatient={(patient) => {
              setSelectedPatient(patient);
              setPage("details");
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
            createPDF={createPDF}
            sendPharmacy={sendPharmacy}
            sendBilling={sendBilling}
          />
        )}
      </div>
    </div>
  );
}
