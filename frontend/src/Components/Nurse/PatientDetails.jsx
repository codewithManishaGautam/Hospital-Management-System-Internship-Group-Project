import React from "react";
import {jsPDF} from 'jspdf';

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

  // १. क्लिनिकल समरी पीडीएफ जनरेट करने का फंक्शन
  const generateClinicalPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("SHRADDHA HOSPITAL & ICU", 14, 15);
    doc.setFontSize(10);
    doc.text("CLINICAL SUMMARY / DISCHARGE CARD", 14, 22);
    doc.text("-------------------------------------------------------------------------", 14, 26);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${selectedPatient?.name || 'N/A'}`, 14, 35);
    doc.text(`UHID: ${selectedPatient?.uhid || '1001'}`, 14, 42);
    doc.text(`Admission: ${selectedPatient?.admissionDate || '10/05/2026'}`, 14, 49);
    doc.text(`Discharge: ${selectedPatient?.dischargeDate || '18/05/2026'}`, 14, 56);

    doc.setFont("helvetica", "bold");
    doc.text("LATEST VITALS:", 14, 68);
    doc.setFont("helvetica", "normal");
    doc.text(`Pulse: ${newReport?.pulse || 78} bpm | Temp: ${newReport?.temp || '98.6 F'} | SpO2: ${newReport?.spo2 || '97%'}`, 14, 75);
    doc.text(`Notes: ${newReport?.notes || 'Patient stable today.'}`, 14, 82);

    doc.save(`Clinical_Summary_${selectedPatient?.name || 'Patient'}.pdf`);
  }

  // २. फार्मेसी ऑर्डर पीडीएफ जनरेट करने का फंक्शन
  const generatePharmacyPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("SHRADDHA HOSPITAL & ICU - PHARMACY ORDER", 14, 15);
    doc.text("-------------------------------------------------------------------------", 14, 22);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${selectedPatient?.name || 'N/A'}`, 14, 32);
    doc.text(`Ward/Bed: ICU / Bed 1`, 14, 39);

    doc.setFont("helvetica", "bold");
    doc.text("MEDICATION LIST:", 14, 52);
    doc.setFont("helvetica", "normal");
    
    // अगर आपके पास मेडिसिन की लिस्ट एरे में है तो लूप चला सकते हैं, नहीं तो डमी टेक्स्ट:
    doc.text("1. Paracetamol - 1 Tablet - Night", 14, 60);
    doc.text("2. Ceftriaxone - 1 Injection - Morning", 14, 67);

    doc.save(`Pharmacy_Order_${selectedPatient?.name || 'Patient'}.pdf`);
  };

  // ३. बिलिंग पीडीएफ जनरेट करने का फंक्शन
  const generateBillingPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("SHRADDHA HOSPITAL & ICU - FINAL BILL", 14, 15);
    doc.text("-------------------------------------------------------------------------", 14, 22);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${selectedPatient?.name || 'N/A'}`, 14, 32);
    doc.text(`UHID: ${selectedPatient?.uhid || '1001'}`, 14, 39);

    doc.setFont("helvetica", "bold");
    doc.text("CHARGES SUMMARY:", 14, 52);
    doc.setFont("helvetica", "normal");
    doc.text("ICU Ward Bed Charges: Calculated Day-wise", 14, 60);
    doc.text("Visiting Doctor Fees: Calculated", 14, 67);
    doc.text("Surgery / Procedure Fees: Calculated", 14, 74);
    doc.text("-------------------------------------------------------------------------", 14, 82);

    doc.save(`Final_Bill_${selectedPatient?.name || 'Patient'}.pdf`);
  };
  

 {
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

        <p>
          <strong>Blood Group :</strong>
          {" "}
          {selectedPatient.bloodGroup}
        </p>

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
          <strong>Phone Number:</strong>
          {" "}
          {selectedPatient.phone}
        </p>

        <p>
          <strong>Address :</strong>
          {" "}
          {selectedPatient.address}
        </p>

      </div>

      {/* <DailyReports
        newReport={newReport}
        setNewReport={setNewReport}
        saveDailyReport={saveDailyReport}
      />

      <PreviousReports
        nursingReports={
          selectedPatient.nursingReports
        }
      /> */}

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


      <HandoverNotes />

      <Header
        selectedPatient={
          selectedPatient
        }
      />

      <ActivityChart
        days={days}
        addDay={addDay}
        // createPDF={createPDF}
        // sendPharmacy={sendPharmacy}
        // sendBilling={sendBilling}
      />

       {/* <ActivityChart /> खत्म होने के ठीक नीचे इसे पेस्ट करें */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '40px', justifyContent: 'center', marginBottom: '40px', width: '100%' }}>
        <button onClick={generateClinicalPDF} style={{ padding: '12px 24px', backgroundColor: '#002244', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          1. Create PDF
        </button>
        <button onClick={generatePharmacyPDF} style={{ padding: '12px 24px', backgroundColor: '#002244', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          2. Send to Pharmacy
        </button>
        <button onClick={generateBillingPDF} style={{ padding: '12px 24px', backgroundColor: '#002244', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          3. Send to Billing
        </button>
      </div>

      {/* <HandoverNotes /> */}

    </div>
  );
}
}