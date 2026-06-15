// import React, { useState } from "react";
// import Layout from "./Layout";
// // import "./Nurse.css";

// function Nurse() {
//   const [step, setStep] = useState("dashboard");

//   return (
//     <Layout role="Nurse" setStep={setStep}>

//       {step === "dashboard" && (
//         <div className="card">
//           <h2>Nurse Dashboard</h2>
//         </div>
//       )}

//     </Layout>
//   );
// }

// export default Nurse;

import React, { useState } from "react";

import Sidebar from "../Components/Nurse/sidebar";
import Dashboard from "../Components/Nurse/Dashboard";
import Beds from "../Components/Nurse/Beds";
import PatientList from "../Components/Nurse/PatientList";
import PatientDetails from "../Components/Nurse/PatientDetails";

import patientsData from "../Components/Nurse/PatientsData";

//import "../Components/styles/Nurse/Nurse.css";

export default function Nurse() {

  const [patients, setPatients] =
    useState(patientsData);

  const [page, setPage] =
    useState("dashboard");

  const [searchUHID, setSearchUHID] =
    useState("");

  const [selectedPatient,
    setSelectedPatient] =
    useState(null);

  const [days, setDays] = useState([
    "Day 1",
    "Day 2",
    "Day 3"
  ]);

  const [newReport,
    setNewReport] = useState({
      bp: "",
      pulse: "",
      temp: "",
      spo2: "",
      sugar: "",
      intake: "",
      output: "",
      notes: ""
    });

  const handleSearch = () => {

    const found = patients.find(
      (p) => p.id === searchUHID
    );

    if (found) {

      setSelectedPatient(found);

      setPage("details");

    } else {

      alert("Patient Not Found");

    }
  };

  const addDay = () => {

    const next =
      `Day ${days.length + 1}`;

    setDays([...days, next]);
  };

  const saveDailyReport = () => {

    const updatedPatients =
      patients.map((p) => {

        if (
          p.id === selectedPatient.id
        ) {

          const updated = {

            ...p,

            nursingReports: [

              ...p.nursingReports,

              {
                day:
                  `Day ${p.nursingReports.length + 1}`,

                ...newReport
              }

            ]

          };

          setSelectedPatient(updated);

          return updated;
        }

        return p;
      });

    setPatients(updatedPatients);

    setNewReport({
      bp: "",
      pulse: "",
      temp: "",
      spo2: "",
      sugar: "",
      intake: "",
      output: "",
      notes: ""
    });

    alert("Daily Report Saved");
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

    <div className="container">

      <Sidebar
        setPage={setPage}
        logout={logout}
      />

      <div className="main">

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
          />

        )}

        {page === "details" &&
          selectedPatient && (

          <PatientDetails

            selectedPatient={
              selectedPatient
            }

            setSelectedPatient={
              setSelectedPatient
            }

            newReport={newReport}

            setNewReport={
              setNewReport
            }

            saveDailyReport={
              saveDailyReport
            }

            days={days}

            addDay={addDay}

            createPDF={createPDF}

            sendPharmacy={
              sendPharmacy
            }

            sendBilling={
              sendBilling
            }

          />

        )}

      </div>

    </div>

  );
}