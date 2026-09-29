import React from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

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
}) {
  const latestPrescription =
    selectedPatient?.prescriptionHistory?.length > 0
      ? selectedPatient.prescriptionHistory[
          selectedPatient.prescriptionHistory.length - 1
        ]
      : null;

  const medicines = latestPrescription?.medicines || [];

  const nursingReports = selectedPatient?.nursingReports || [];

  const latestNursingReport =
    nursingReports.length > 0
      ? nursingReports[nursingReports.length - 1]
      : null;

  const generateClinicalPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("SHRADDHA HOSPITAL & ICU", 14, 15);
    doc.setFontSize(10);
    doc.text("CLINICAL SUMMARY / DISCHARGE CARD", 14, 22);
    doc.text(
      "-------------------------------------------------------------------------",
      14,
      26,
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${selectedPatient?.name || "N/A"}`, 14, 35);
    doc.text(`UHID: ${selectedPatient?.uhid || "-"}`, 14, 42);

    doc.text(`Admission: ${selectedPatient?.admissionDate || "-"}`, 14, 49);

    doc.text(`Discharge: ${selectedPatient?.dischargeDate || "-"}`, 14, 56);

    doc.setFont("helvetica", "bold");
    doc.text("LATEST VITALS:", 14, 68);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Pulse: ${latestNursingReport?.pulse || "-"} | Temp: ${
        latestNursingReport?.temperature || "-"
      } | SpO2: ${latestNursingReport?.spo2 || "-"}`,
      14,
      75,
    );

    doc.text(`Notes: ${latestNursingReport?.notes || "-"}`, 14, 82);

    doc.save(`Clinical_Summary_${selectedPatient?.name || "Patient"}.pdf`);
  };

  // const generatePharmacyPDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFont("helvetica", "bold");
  //   doc.text("SHRADDHA HOSPITAL & ICU - PHARMACY ORDER", 14, 15);

  //   doc.text(
  //     "-------------------------------------------------------------------------",
  //     14,
  //     22,
  //   );

  //   doc.setFontSize(11);
  //   doc.setFont("helvetica", "normal");

  //   doc.text(`Patient Name: ${selectedPatient?.name || "N/A"}`, 14, 32);

  //   doc.text(`UHID: ${selectedPatient?.uhid || "-"}`, 14, 39);

  //   doc.text(
  //     `Ward: ${selectedPatient?.roomType || selectedPatient?.role || "-"}`,
  //     14,
  //     46,
  //   );

  //   doc.text(`Room: ${selectedPatient?.roomNo || "-"}`, 14, 53);

  //   doc.text(`Bed: ${selectedPatient?.bedNo || "-"}`, 14, 60);

  //   doc.setFont("helvetica", "bold");
  //   doc.text("MEDICATION LIST:", 14, 72);

  //   doc.setFont("helvetica", "normal");

  //   if (medicines.length === 0) {
  //     doc.text("No medicines prescribed.", 14, 82);
  //   } else {
  //     medicines.forEach((medicine, index) => {
  //       const y = 82 + index * 10;

  //       doc.text(
  //         `${index + 1}. ${medicine.medicineName || "-"} | Qty: ${
  //           medicine.quantity || 0
  //         } | Timing: ${medicine.timing || "-"} | Dose: ${
  //           medicine.dose || "-"
  //         }`,
  //         14,
  //         y,
  //       );
  //     });
  //   }

  //   doc.save(`Pharmacy_Order_${selectedPatient?.uhid || "Patient"}.pdf`);
  // };

  const generateBillingPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text("SHRADDHA HOSPITAL & ICU - BILLING SUMMARY", 14, 15);

    doc.text(
      "-------------------------------------------------------------------------",
      14,
      22,
    );

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text(`Patient Name: ${selectedPatient?.name || "N/A"}`, 14, 32);

    doc.text(`UHID: ${selectedPatient?.uhid || "-"}`, 14, 39);

    doc.text(`Patient Type: ${selectedPatient?.role || "-"}`, 14, 46);

    doc.text(`Room: ${selectedPatient?.roomNo || "-"}`, 14, 53);

    doc.text(`Bed: ${selectedPatient?.bedNo || "-"}`, 14, 60);

    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT DETAILS:", 14, 72);

    doc.setFont("helvetica", "normal");

    doc.text(`Fee: Rs. ${selectedPatient?.fee || 0}`, 14, 82);

    doc.text(
      `Payment Status: ${selectedPatient?.paymentStatus || "Pending"}`,
      14,
      89,
    );

    doc.text(`Payment Mode: ${selectedPatient?.paymentMode || "-"}`, 14, 96);

    doc.save(`Billing_Summary_${selectedPatient?.uhid || "Patient"}.pdf`);
  };

  const sendBilling = async () => {
  try {
    if (!selectedPatient?._id) {
      alert("Patient ID is missing.");
      return;
    }

    const reportText = `
Patient Name: ${selectedPatient?.name || "-"}
UHID: ${selectedPatient?.uhid || "-"}
Age: ${selectedPatient?.age || "-"}
Gender: ${selectedPatient?.gender || "-"}
Ward: ${
      selectedPatient?.roomType ||
      selectedPatient?.role ||
      "-"
    }
Room: ${selectedPatient?.roomNo || "-"}
Bed: ${selectedPatient?.bedNo || "-"}

Latest Nursing Report:
Pulse: ${latestNursingReport?.pulse || "-"}
Temperature: ${
      latestNursingReport?.temperature || "-"
    }
SpO2: ${latestNursingReport?.spo2 || "-"}
Notes: ${latestNursingReport?.notes || "-"}
`;

    const response = await axios.post(
      "https://hospital-management-system-internship-rtob.onrender.com/api/billing/nursing-report",
      {
        patientId: selectedPatient._id,

        patientName:
          selectedPatient.name || "",

        uhid:
          selectedPatient.uhid || "",

        nursingReport: reportText,

        nursingCharges: [],
      }
    );

    if (response.data.success) {
      alert(
        "Nursing report sent to Billing successfully."
      );
    }

  } catch (error) {
    console.error(
      "SEND NURSING REPORT ERROR:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Failed to send nursing report to Billing."
    );
  }
};

  return (
    <div className="patientCard">
      <h1 className="detailsTitle">Patient Details</h1>

      <div className="detailsGrid">
        <p>
          <strong>Patient Name :</strong> {selectedPatient.name}
        </p>

        <p>
          <strong>Age :</strong> {selectedPatient.age}
        </p>

        <p>
          <strong>Gender :</strong> {selectedPatient.gender}
        </p>

        <p>
          <strong>Bed :</strong> {selectedPatient.bedNo || "-"}
        </p>

        <p>
          <strong>Ward :</strong>{" "}
          {selectedPatient.roomType || selectedPatient.role || "-"}
        </p>

        <p>
          <strong>UHID :</strong> {selectedPatient.uhid || "-"}
        </p>

        <p>
          <strong>Admission Date :</strong>{" "}
          {selectedPatient.admissionDate || "-"}
        </p>

        {/* <p>
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
        </p> */}

        {/* <p>
          <strong>Blood Group :</strong> {selectedPatient.bloodGroup || "-"}
        </p> */}

        {/* <p>
          <strong>Allergies :</strong>
          {" "}
          {selectedPatient.allergies}
        </p>

        <p>
          <strong>Disease :</strong>
          {" "}
          {selectedPatient.disease}
        </p> */}

        <p>
          <strong>Phone Number:</strong> {selectedPatient.mobile || "-"}
        </p>

        <p>
          <strong>Address :</strong> {selectedPatient.address}
        </p>
      </div>

      {/* * <DailyReports
        newReport={newReport}
        setNewReport={setNewReport}
        saveDailyReport={saveDailyReport}
      /> */}

      {/* <div className="testsBox">
        <h2>Doctor Suggested Tests</h2>

        <ul>
          {selectedPatient.tests && selectedPatient.tests.length > 0 ? (
            selectedPatient.tests.map((t, i) => <li key={i}>{t}</li>)
          ) : (
            <li>No tests available</li>
          )}
        </ul>
      </div> */}

      {/* <div className="testsBox">
        <h2>Doctor Precautions</h2>

        <ul>
          {selectedPatient.precautions &&
          selectedPatient.precautions.length > 0 ? (
            selectedPatient.precautions.map((p, i) => <li key={i}>{p}</li>)
          ) : (
            <li>No precautions available</li>
          )}
        </ul>
      </div> */}

      <MedicationTable medicines={medicines} patientId={selectedPatient._id} />

      <DailyReports
        newReport={newReport}
        setNewReport={setNewReport}
        saveDailyReport={saveDailyReport}
      />

      <PreviousReports nursingReports={nursingReports} />

      <HandoverNotes
        patientId={selectedPatient._id}
        handoverNotes={selectedPatient.handoverNotes || []}
      />

      <Header selectedPatient={selectedPatient} />

      <ActivityChart
        days={days}
        addDay={addDay}
        // createPDF={createPDF}
        // sendPharmacy={sendPharmacy}
        // sendBilling={sendBilling}
      />

<div className="patient-action-buttons">
  <button
    onClick={generateClinicalPDF}
    className="patient-action-btn"
  >
    1. Create PDF
  </button>

  <button
    type="button"
    onClick={sendBilling}
    className="patient-action-btn"
  >
    2. Send to Billing
  </button>
</div>
      {/* <HandoverNotes /> */}
    </div>
  );
}
