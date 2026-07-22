import React, { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";

function ReportUpload({ patient, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reports, setReports] = useState([
    {
      id: "r1",
      name: "Blood Test - 10 May",
      uploadedAt: "2026-05-10",
      status: "Approved",
      size: "248KB",
    },
  ]);

  const statusVariant = (s) => (s === "Approved" ? "success" : s === "Pending" ? "warning" : "neutral");

  const title = patient ? `Medical Reports • ${patient.name}` : "Medical Reports";

  const filtered = useMemo(() => {
    // In a real integration, reports would be fetched by patient UHID.
    return reports;
  }, [reports]);

  function handleUpload(e) {
    e.preventDefault();
    if (!selectedFile) return;

    const newReport = {
      id: String(Date.now()),
      name: selectedFile.name,
      uploadedAt: new Date().toISOString().slice(0, 10),
      status: "Pending",
      size: `${Math.max(1, Math.round(selectedFile.size / 1024))}KB`,
    };

    setReports((prev) => [newReport, ...prev]);
    onUpload?.({ patientUHID: patient?.uHID, file: selectedFile, meta: newReport });
    setSelectedFile(null);
  }

  function handleDownload(report) {
    const blob = new Blob([`Report: ${report.name}\nUploaded: ${report.uploadedAt}\nStatus: ${report.status}\n`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = report.name.replace(/\.[a-z0-9]+$/i, "").concat(".txt");
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="doctor-panel">
      <div className="doctor-panel__header">
        <div>
          <h3 className="doctor-panel__title">Medical Reports</h3>
          <p className="doctor-panel__subtitle">Upload, view, and download reports</p>
        </div>
        <div className="doctor-panel__actions">
          <div className="doctor-panel__chip">{title}</div>
        </div>
      </div>

      <div className="doctor-reports-grid">
        <div className="doctor-panel doctor-panel--inner">
          <div className="doctor-form__section-title">Upload Report</div>

          {!patient ? <div className="doctor-empty">Select a patient to upload reports.</div> : null}

          <form className="doctor-form" onSubmit={handleUpload}>
            <input
              className="doctor-input"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              accept=".pdf,.png,.jpg,.jpeg"
              disabled={!patient}
            />
            <div className="doctor-form__submit">
              <button type="submit" className="doctor-btn doctor-btn--primary" disabled={!patient || !selectedFile}>
                Upload
              </button>
            </div>
          </form>

          <div className="doctor-hint">
            This UI is isolated to the Doctor module. Connect upload APIs later without changing shared modules.
          </div>
        </div>

        <div className="doctor-panel doctor-panel--inner">
          <div className="doctor-form__section-title">Report History</div>

          <div className="doctor-table-wrap doctor-table-wrap--small">
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Uploaded</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="doctor-table__empty">
                      No reports yet.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <div className="doctor-file-name">{r.name}</div>
                        <div className="doctor-file-meta">{r.size}</div>
                      </td>
                      <td>{r.uploadedAt}</td>
                      <td>
                        <StatusBadge variant={statusVariant(r.status)}>{r.status}</StatusBadge>
                      </td>
                      <td>
                        <div className="doctor-inline-actions">
                          <button
                            type="button"
                            className="doctor-btn"
                            onClick={() => {
                              const text = `Report: ${r.name}\nUploaded: ${r.uploadedAt}\nStatus: ${r.status}\nSize: ${r.size}`;
                              alert(text);
                            }}
                          >
                            View
                          </button>
                          <button type="button" className="doctor-btn" onClick={() => handleDownload(r)}>Download</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="doctor-hint">Pending/Approved states can be driven by backend later.</div>
        </div>
      </div>
    </div>
  );
}

export default ReportUpload;

