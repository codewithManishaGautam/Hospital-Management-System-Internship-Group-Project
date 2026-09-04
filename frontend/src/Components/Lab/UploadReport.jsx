import React, { useState } from "react";
import axios from "axios";

function UploadReport({ request, onBack, onUploaded }) {
  const [reportPdfs, setReportPdfs] = useState([]);

  const [uploading, setUploading] = useState(false);

  // ==========================================
  // UPLOAD REPORT
  // ==========================================

  const uploadReport = async () => {
    if (reportPdfs.length === 0) {
      alert("Please Select at least one PDF");
      return;
    }

    const formData = new FormData();

    reportPdfs.forEach((file) => {
      formData.append("reportPdfs", file);
    });

    try {
      setUploading(true);

      const res = await axios.post(
        `http://localhost:5000/lab/requests/${request._id}/report`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

  alert(res.data.message || "Reports Uploaded Successfully");

setReportPdfs([]);

if (onUploaded) {
  onUploaded(res.data.data);
} else {
  onBack();
}
    } catch (err) {
      console.log("Upload Reports Error:", err);

      alert(err.response?.data?.message || "Report Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="lab-upload-page">
      {/* ======================================
          BACK
      ====================================== */}

      <button className="btn btn-secondary" onClick={onBack}>
        ← Back
      </button>

      <br />
      <br />

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="card-header bg-primary text-white">Upload Lab Report</div>

      <div className="card-body">
        {/* ======================================
            PATIENT INFORMATION
        ====================================== */}

        <h5>Patient Information</h5>

        <p>
          <b>UHID :</b> {request.uhid}
        </p>

        <p>
          <b>Patient Name :</b> {request.patientName}
        </p>

        <p>
          <b>Doctor :</b> {request.doctorName}
        </p>

        <p>
          <b>Ward :</b> {request.ward}
        </p>

        <p>
          <b>Priority :</b> {request.priority}
        </p>

        <hr />

        {/* ======================================
            REQUESTED TESTS
        ====================================== */}

        <h5>Requested Tests</h5>

        {request.tests?.length > 0 ? (
          <ul>
            {request.tests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        ) : (
          <p>No tests specified</p>
        )}

        {/* ======================================
            CLINICAL NOTES
        ====================================== */}

        {request.clinicalNotes && (
          <>
            <h5>Clinical Notes</h5>

            <p>{request.clinicalNotes}</p>
          </>
        )}

        <hr />

        {/* ======================================
    PDF
====================================== */}

        <div className="mb-3">
          <label>Upload Report PDF</label>

          <input
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="form-control"
            onChange={(e) => setReportPdfs(Array.from(e.target.files))}
          />
        </div>

        {/* ======================================
    SELECTED REPORTS
====================================== */}

        {reportPdfs.length > 0 && (
          <div style={{ marginTop: "15px" }}>
            <h6>Selected Reports:</h6>

            <ul>
              {reportPdfs.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ======================================
    UPLOAD BUTTON
====================================== */}

        <button
          className="btn btn-success"
          onClick={uploadReport}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Report"}
        </button>
      </div>
    </div>
  );
}

export default UploadReport;
