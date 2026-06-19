import React from "react";
import "../../styles/Nurse/ActivityChart.css";

export default function ActivityChart({
  days,
  addDay,
  createPDF,
  sendPharmacy,
  sendBilling
}) {

  const renderRows = (items) => {

    return items.map((item, i) => (

      <tr key={i}>

        <td>{item}</td>

        {days.map((d, j) => (
          <td key={j}>
            <input type="checkbox" />
          </td>
        ))}

      </tr>

    ));
  };

  return (
    <>
      <button
        className="addDayBtn"
        onClick={addDay}
      >
        + Add Day
      </button>

      <div className="chartContainer">

        <table className="activityTable">

          <thead>

            <tr>

              <th>
                DATE / CHARGES ITEMS
              </th>

              {days.map((d, i) => (
                <th key={i}>{d}</th>
              ))}

            </tr>

          </thead>

          <tbody>

            <tr className="section">
              <td colSpan={days.length + 1}>
                GENERAL
              </td>
            </tr>

            {renderRows([
              "Ward / Room No.",
              "Visiting Dr. 1",
              "Visiting Dr. 2",
              "Visiting Dr. 3",
              "Visiting Dr. 4"
            ])}

            <tr className="section">
              <td colSpan={days.length + 1}>
                SURGERY / PROCEDURE FEES
              </td>
            </tr>

            {renderRows([
              "1 Dr.",
              "2 Dr.",
              "3 Dr.",
              "Anaesthetist Dr.",
              "OT Charges"
            ])}

            <tr className="section">
              <td colSpan={days.length + 1}>
                VENTILATOR / RESPIRATORY
              </td>
            </tr>

            {renderRows([
              "Ventilator Noninvasive",
              "Invasive",
              "Monitor",
              "Pulse Oximeter",
              "Oxygen",
              "Nebulisation"
            ])}

            <tr className="section">
              <td colSpan={days.length + 1}>
                EQUIPMENT / MONITORING
              </td>
            </tr>

            {renderRows([
              "Syringe Pump / Infusion Pump",
              "Alpha Bed Charges",
              "Glucometer"
            ])}

            <tr className="section">
              <td colSpan={days.length + 1}>
                LAB & DIAGNOSTICS
              </td>
            </tr>

            {renderRows([
              "Microbiology",
              "Pathology",
              "X-Ray",
              "USG",
              "ECHO / Doppler",
              "ECG"
            ])}

            <tr className="section">
              <td colSpan={days.length + 1}>
                PROCEDURES
              </td>
            </tr>

            {renderRows([
              "a) Endoscopy",
              "b) Bronchoscopy",
              "c) EMG / EEG",
              "d) Dressing",
              "e) Chemotherapy",
              "f) CVP Line",
              "g) Intubation",
              "h) Dialysis",
              "i) Others"
            ])}

            <tr className="section">
              <td colSpan={days.length + 1}>
                SUPPORTIVE CARE
              </td>
            </tr>

            {renderRows([
              "Blood Transfusion",
              "Physiotherapy",
              "Dietician / Food",
              "Ambulance",
              "RMO Charges"
            ])}

          </tbody>

        </table>

      </div>

      <div className="btns">

        <button
          className="pdfBtn"
          onClick={createPDF}
        >
          Create PDF
        </button>

        <button
          className="pharmacyBtn"
          onClick={sendPharmacy}
        >
          Send To Pharmacy
        </button>

        <button
          className="billingBtn"
          onClick={sendBilling}
        >
          Send To Billing
        </button>

      </div>
    </>
  );
}