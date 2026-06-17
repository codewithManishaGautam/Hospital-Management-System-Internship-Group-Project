import React from "react";

import DailyReports from "./DailyReports";
import PreviousReports from "./PreviousReports";
import MedicationTable from "./MedicationTable";
import Header from "./Header";
import ActivityChart from "./ActivityChart";
import HandoverNotes from "./HandoverNotes";

import "../../styles/Nurse/PatientDetails.css";

export default function PatientDetails({
  selectedPatient,
  setSelectedPatient,

  newReport,
  setNewReport,
  saveDailyReport,

  days,
  addDay,

  createPDF,
  sendPharmacy,
  sendBilling
}) {
  return (
    <div className="patientCard">

      <h1 className="detailsTitle">
        Patient Details
      </h1>

      <div className="detailsGrid">

        <p>
          <strong>Patient Name :</strong>
          {" "}
          {selectedPatient.name}
        </p>

        <p>
          <strong>Age :</strong>
          {" "}
          {selectedPatient.age}
        </p>

        <p>
          <strong>Gender :</strong>
          {" "}
          {selectedPatient.gender}
        </p>

        <p>
          <strong>Bed :</strong>
          {" "}
          {selectedPatient.bed}
        </p>

        <p>
          <strong>Ward :</strong>
          {" "}
          {selectedPatient.ward}
        </p>

        <p>
          <strong>UHID :</strong>
          {" "}
          {selectedPatient.id}
        </p>

        <p>
          <strong>Admission Date :</strong>

          <input
            type="date"
            value={selectedPatient.admissionDate}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                admissionDate: e.target.value
              })
            }
          />
        </p>

        <p>
          <strong>Discharge Date :</strong>

          <input
            type="date"
            value={selectedPatient.dischargeDate}
            onChange={(e) =>
              setSelectedPatient({
                ...selectedPatient,
                dischargeDate: e.target.value
              })
            }
          />
        </p>

        <p>
          <strong>Doctor :</strong>
          {" "}
          {selectedPatient.doctor}
        </p>

        <p>
          <strong>Blood Group :</strong>
          {" "}
          {selectedPatient.bloodGroup}
        </p>

        <p>
          <strong>Allergies :</strong>
          {" "}
          {selectedPatient.allergies}
        </p>

        <p>
          <strong>Disease :</strong>
          {" "}
          {selectedPatient.disease}
        </p>

      </div>

      <DailyReports
        newReport={newReport}
        setNewReport={setNewReport}
        saveDailyReport={saveDailyReport}
      />

      <PreviousReports
        nursingReports={
          selectedPatient.nursingReports
        }
      />

      <div className="testsBox">

        <h2>Doctor Suggested Tests</h2>

        <ul>
          {selectedPatient.tests.map(
            (t, i) => (
              <li key={i}>{t}</li>
            )
          )}
        </ul>

      </div>

      <div className="testsBox">

        <h2>Doctor Precautions</h2>

        <ul>
          {selectedPatient.precautions.map(
            (p, i) => (
              <li key={i}>{p}</li>
            )
          )}
        </ul>

      </div>

      <MedicationTable
        medicines={
          selectedPatient.medicines
        }
      />

      <Header
        selectedPatient={
          selectedPatient
        }
      />

      <ActivityChart
        days={days}
        addDay={addDay}
        createPDF={createPDF}
        sendPharmacy={sendPharmacy}
        sendBilling={sendBilling}
      />

      <HandoverNotes />

    </div>
  );
}