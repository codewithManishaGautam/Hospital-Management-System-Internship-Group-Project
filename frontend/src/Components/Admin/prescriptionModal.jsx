import React from "react";

function PrescriptionModal({
  showPrescription,
  selectedPatient,
  setShowPrescription,
  downloadPrescription,
}) {
  if (!showPrescription || !selectedPatient) {
    return null;
  }

  return (
    <div className="staff-form-popup">
      <div className="prescription-modal">
        <h2>Patient Prescription</h2>

        <p>
          <strong>Name:</strong> {selectedPatient.name}
        </p>

        <p>
          <strong>Doctor:</strong> {selectedPatient.doctor}
        </p>

        <p>
          <strong>Disease:</strong> {selectedPatient.disease}
        </p>

        <p>
          <strong>Prescription:</strong>
          {selectedPatient.prescription || "Not Available"}
        </p>

        <p>
          <strong>Tests:</strong>{" "}
          {selectedPatient.tests?.join(", ") || "No Tests"}
        </p>

        <p>
          <strong>Insurance:</strong>
          {selectedPatient.insurance || "Not Available"}
        </p>

        <p>
          <strong>Reports:</strong>
        </p>

        <ul>
          {selectedPatient.reports?.length ? (
            selectedPatient.reports.map((report, index) => (
              <li key={index}>{report}</li>
            ))
          ) : (
            <li>No Reports</li>
          )}
        </ul>

        {selectedPatient.status === "Discharged" && (
          <p>
            <strong>Bill:</strong> {selectedPatient.bill || "Not Available"}
          </p>
        )}

        <div className="form-buttons">
          {/* <button
            className="save-btn"
            onClick={() => downloadPrescription(selectedPatient)}
          >
            Download
          </button> */}

          <button className="save-btn" disabled>
            Download (Coming Soon)
          </button>

          <button
            className="cancel-btn"
            onClick={() => setShowPrescription(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionModal;
