import React, { useState } from "react";
import axios from "axios";
import "./style/UploadReport.css";

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
      <div className="lab-upload-card">
        {/* HEADER */}
        <div className="lab-upload-header">
          <button className="lab-upload-back-btn" onClick={onBack}>
            ← Back
          </button>

          <div>
            <h1>Upload Lab Report</h1>
            <p>Upload completed laboratory test reports</p>
          </div>
        </div>

        {/* PATIENT INFORMATION */}
        <section className="upload-section">
          <div className="upload-section-title">
            <span className="section-icon">👤</span>

            <div>
              <h2>Patient Information</h2>
              <p>Patient and doctor details</p>
            </div>
          </div>

          <div className="patient-info-grid">
            <div className="patient-info-item">
              <span>UHID</span>
              <strong>{request.uhid}</strong>
            </div>

            <div className="patient-info-item">
              <span>Patient Name</span>
              <strong>{request.patientName}</strong>
            </div>

            <div className="patient-info-item">
              <span>Doctor</span>
              <strong>{request.doctorName}</strong>
            </div>

            <div className="patient-info-item">
              <span>Ward</span>
              <strong>{request.ward}</strong>
            </div>

            <div className="patient-info-item">
              <span>Priority</span>
              <strong className="priority-value">{request.priority}</strong>
            </div>
          </div>
        </section>

        {/* REQUESTED TESTS */}
        <section className="upload-section">
          <div className="upload-section-title">
            <span className="section-icon">🧪</span>

            <div>
              <h2>Requested Tests</h2>
              <p>Tests requested by the doctor</p>
            </div>
          </div>

          {request.tests?.length > 0 ? (
            <div className="requested-tests">
              {request.tests.map((test, index) => (
                <div className="test-badge" key={index}>
                  <span>✓</span>
                  {test}
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">No tests specified</p>
          )}
        </section>

        {/* CLINICAL NOTES */}
        {request.clinicalNotes && (
          <section className="upload-section">
            <div className="upload-section-title">
              <span className="section-icon">📝</span>

              <div>
                <h2>Clinical Notes</h2>
                <p>Additional information from doctor</p>
              </div>
            </div>

            <div className="clinical-notes">{request.clinicalNotes}</div>
          </section>
        )}

        {/* UPLOAD REPORT */}
        <section className="upload-section">
          <div className="upload-section-title">
            <span className="section-icon">📄</span>

            <div>
              <h2>Upload Reports</h2>
              <p>Select one or more PDF reports</p>
            </div>
          </div>

          <label className="upload-drop-area">
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={(e) => setReportPdfs(Array.from(e.target.files))}
            />

            <div className="upload-icon">📤</div>

            <h3>Select PDF Reports</h3>

            <p>Click here to choose PDF files</p>

            <span>Only PDF files are allowed</span>
          </label>

          {/* SELECTED REPORTS */}
          {reportPdfs.length > 0 && (
            <div className="selected-reports">
              <div className="selected-reports-header">
                <h3>Selected Reports</h3>

                <span>
                  {reportPdfs.length} file
                  {reportPdfs.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="report-file-list">
                {reportPdfs.map((file, index) => (
                  <div className="report-file" key={index}>
                    <div className="report-file-icon">PDF</div>

                    <div className="report-file-name">{file.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UPLOAD BUTTON */}
          <button
            className="upload-report-btn"
            onClick={uploadReport}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <span className="upload-spinner"></span>
                Uploading...
              </>
            ) : (
              <>📤 Upload Reports</>
            )}
          </button>
        </section>
      </div>
    </div>
  );
}

export default UploadReport;
