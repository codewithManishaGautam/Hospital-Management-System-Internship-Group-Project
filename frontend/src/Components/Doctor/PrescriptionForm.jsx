import React, { useMemo, useRef, useState } from "react";

function PrescriptionForm({ patient, doctor, onSubmit }) {
  const [meds, setMeds] = useState([
    { medicine: "", dosage: "", notes: "" },
  ]);
  const [instructions, setInstructions] = useState("");

  const previewRef = useRef(null);

  const previewText = useMemo(() => {
    const medsText = meds
      .filter((m) => m.medicine.trim())
      .map((m, i) => `${i + 1}. ${m.medicine} — ${m.dosage}${m.notes ? ` (${m.notes})` : ""}`)
      .join("\n");

    return [
      `Doctor: ${doctor?.name || "Dr."}`,
      `Specialization: ${doctor?.specialization || "—"}`,
      `Clinic: ${doctor?.clinic || "Hospital"}`,
      patient ? `Patient: ${patient.name} (UHID: ${patient.uHID})` : "Patient: —",
      "",
      "Prescription:",
      medsText || "(No medicines yet)",
      "",
      instructions ? `Instructions: ${instructions}` : "",
      "",
      `Generated: ${new Date().toLocaleString()}`,
    ]
      .filter(Boolean)
      .join("\n");
  }, [doctor, patient, meds, instructions]);

  function handleAddRow() {
    setMeds((prev) => [...prev, { medicine: "", dosage: "", notes: "" }]);
  }

  function handleMedChange(idx, field, value) {
    setMeds((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "<")
      .replace(/>/g, ">");
  }

  function handlePrint() {
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;

    const html = `
      <html>
        <head>
          <title>Prescription</title>
          <style>
            @page { margin: 20mm; }
            body{font-family: Arial, Helvetica, sans-serif; padding:0;}
            .wrap{padding:24px;}
            pre{white-space: pre-wrap; word-break: break-word; font-size:13.5px; line-height:1.4;}
            .hdr{margin-bottom:16px;}
            .stamp{display:flex; align-items:flex-end; justify-content:space-between; gap:16px; margin-bottom:10px;}
            .sig{margin-top:24px; display:flex; flex-direction:column; align-items:flex-end; gap:4px;}
            .muted{color:#475569; font-size:12px; font-weight:700;}
            .bold{font-weight:900;}
          </style>
        </head>
        <body>
          <div class="wrap">
            <div class="stamp">
              <div>
                <h2 style="margin:0 0 6px 0;">Prescription</h2>
                <div class="muted">${escapeHtml(new Date().toLocaleDateString())}</div>
                <div class="muted">Doctor: ${escapeHtml(doctor?.name || "Dr.")}</div>
                <div class="muted">Clinic: ${escapeHtml(doctor?.clinic || "Hospital")}</div>
              </div>
              <div class="sig">
                <div class="muted">Signature</div>
                <div style="border-top:2px solid #0f172a; width:220px;"></div>
              </div>
            </div>
            <pre>${escapeHtml(previewText)}</pre>
          </div>
        </body>
      </html>
    `;

    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  }


  function handleDownload() {
    const blob = new Blob([previewText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Prescription-${patient?.uHID || "patient"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      patientUHID: patient?.uHID,
      medicines: meds,
      instructions,
      doctorId: doctor?.id,
      createdAt: new Date().toISOString(),
    };

    onSubmit?.(payload);
  }

  return (
    <div className="doctor-panel">
      <div className="doctor-panel__header">
        <div>
          <h3 className="doctor-panel__title">Prescription System</h3>
          <p className="doctor-panel__subtitle">Create a prescription and preview before printing</p>
        </div>
      </div>

      {!patient ? <div className="doctor-empty">Select a patient to start prescription.</div> : null}

      <form className="doctor-form" onSubmit={handleSubmit}>
        <div className="doctor-form__grid">
          <div className="doctor-form__col doctor-form__col--left">
            <div className="doctor-form__section">
              <div className="doctor-form__section-title">Medicines</div>

              {meds.map((row, idx) => (
                <div key={idx} className="doctor-med-row">
                  <input
                    className="doctor-input"
                    placeholder="Medicine"
                    value={row.medicine}
                    onChange={(e) => handleMedChange(idx, "medicine", e.target.value)}
                  />
                  <input
                    className="doctor-input"
                    placeholder="Dosage (e.g., 500mg, 1-0-1)"
                    value={row.dosage}
                    onChange={(e) => handleMedChange(idx, "dosage", e.target.value)}
                  />
                  <input
                    className="doctor-input"
                    placeholder="Notes (optional)"
                    value={row.notes}
                    onChange={(e) => handleMedChange(idx, "notes", e.target.value)}
                  />
                </div>
              ))}

              <div className="doctor-form__row-actions">
                <button type="button" className="doctor-btn" onClick={handleAddRow}>
                  + Add Medicine
                </button>
              </div>
            </div>

            <div className="doctor-form__section">
              <div className="doctor-form__section-title">Instructions</div>
              <textarea
                className="doctor-textarea"
                placeholder="e.g., Take after meals. Follow-up after 7 days."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="doctor-form__submit">
              <button type="submit" className="doctor-btn doctor-btn--primary" disabled={!patient}>
                Save Prescription
              </button>
            </div>
          </div>

          <div className="doctor-form__col doctor-form__col--right">
            <div className="doctor-preview">
              <div className="doctor-preview__header">
                <div>
                  <div className="doctor-preview__title">Preview</div>
                  <div className="doctor-preview__subtitle">Print-ready layout</div>
                </div>

                <div className="doctor-preview__actions">
                  <button type="button" className="doctor-btn" onClick={handlePrint} disabled={!patient}>
                    Print
                  </button>
                  <button type="button" className="doctor-btn" onClick={handleDownload} disabled={!patient}>
                    Download
                  </button>
                  <button type="button" className="doctor-btn" onClick={() => alert("Voice note for prescription (UI placeholder).")} disabled={!patient}>
                    Voice Note
                  </button>
                </div>
              </div>

              <div className="doctor-preview__body" ref={previewRef}>
                <pre className="doctor-preview__pre">{previewText}</pre>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PrescriptionForm;

