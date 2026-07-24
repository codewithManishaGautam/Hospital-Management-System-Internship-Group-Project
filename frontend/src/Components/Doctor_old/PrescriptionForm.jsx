import React, { useMemo, useState } from "react";

function PrescriptionForm({ patient, doctor, doctors = [], onSubmit }) {
  const MEDICINES = ["Paracetamol 500mg", "Amoxicillin", "Azithromycin", "Pantoprazole 40mg", "Cetirizine", "Ibuprofen 400mg"];
  const LAB_TESTS = ["CBC", "LFT", "RBS", "HbA1c", "Lipid Profile"];
  const SCANS = ["X-Ray", "MRI", "CT Scan", "Ultrasound"];

  const [activeTab, setActiveTab] = useState("prescription");
  const [medicine, setMedicine] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [labOrders, setLabOrders] = useState(["CBC", "LFT"]);
  const [scanOrders, setScanOrders] = useState(["X-Ray", "MRI"]);
  const [sendTarget, setSendTarget] = useState("lab");
  const [referralDoctorId, setReferralDoctorId] = useState("");
  const [doctorSignature, setDoctorSignature] = useState("");

  const patientUHID = patient?.uHID || patient?.UHID || patient?.uhid || "-";
  const patientAge = patient?.age || "-";
  const patientGender = patient?.gender || "-";
  const patientBloodGroup = patient?.bloodGroup || patient?.blood_group || "-";
  const patientAllergy =
    patient?.allergy ||
    patient?.allergyAlert ||
    (Array.isArray(patient?.allergies) ? patient.allergies.filter(Boolean).join(", ") : "");

  const previewRows = useMemo(() => {
    const maxRows = Math.max(labOrders.length, scanOrders.length, medicines.length, 4);
    return Array.from({ length: maxRows }, (_, index) => ({
      lab: labOrders[index] || "",
      scan: scanOrders[index] || "",
      medicine: medicines[index]?.medicine || (index === 0 ? medicine : ""),
      mediaType: medicines[index]?.notes || "--",
      medicineDosage: medicines[index]?.dosage || "",
    }));
  }, [labOrders, scanOrders, medicines, medicine]);

  const referralDoctors = useMemo(() => {
    const seen = new Set();
    return (doctors || [])
      .filter((item) => item?.id || item?.name)
      .filter((item) => {
        const key = String(item?.id || item?.name);
        if (seen.has(key)) return false;
        seen.add(key);
        return String(item?.id || "") !== String(doctor?.id || "");
      });
  }, [doctors, doctor]);

  const selectedReferralDoctor = useMemo(() => {
    return referralDoctors.find((item) => String(item?.id || item?.name) === String(referralDoctorId)) || referralDoctors[0] || null;
  }, [referralDoctors, referralDoctorId]);

  function handleAddMedicine() {
    const cleanMedicine = medicine.trim();
    if (!cleanMedicine) return;
    setMedicines((prev) => [...prev, { medicine: cleanMedicine, dosage: "", notes: "--" }]);
  }

  function handleOrderChange(type, index, value) {
    const setter = type === "lab" ? setLabOrders : setScanOrders;
    setter((prev) => prev.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function addTemplate() {
    setMedicines([
      { medicine: "Paracetamol 500mg", dosage: "1-0-1", notes: "--" },
      { medicine: "Pantoprazole 40mg", dosage: "1-0-0", notes: "--" },
    ]);
    setLabOrders(["CBC", "LFT"]);
    setScanOrders(["X-Ray", "MRI"]);
    setDiagnosis("Diagnosis (ICD-10)");
    setAdvice("Take medicines after meals. Review with reports.");
    setDoctorSignature(doctor?.name ? `Dr. ${doctor.name}` : "");
  }

  function buildPayload() {
    const safeMedicines = medicines.length
      ? medicines
      : medicine
        ? [{ medicine: medicine.trim(), dosage: "", notes: "--" }]
        : [];

    const safeLabTests = labOrders.filter(Boolean);
    const safeScanTests = scanOrders.filter(Boolean);

    // Ensure backend always receives a `prescription` field (string) that it can store.
    const prescriptionText = JSON.stringify(
      {
        diagnosis,
        medicines: safeMedicines,
        labTests: safeLabTests,
        scanTests: safeScanTests,
        advice,
      },
      null,
      2
    );

    return {
      patientUHID,
      diagnosis,
      advice,
      // keep medicines for structured storage
      medicines: safeMedicines,
      // backend also tries to read `payload.prescription`/`payload.prescriptionText`
      prescription: prescriptionText,
      lab: {
        required: safeLabTests.length > 0,
        tests: safeLabTests,
        testType: safeLabTests.join(", "),
      },
      scan: {
        required: safeScanTests.length > 0,
        scans: safeScanTests,
        scanType: safeScanTests.join(", "),
      },
      doctorId: doctor?.id,
      doctorName: doctor?.name,
      referralDoctor: selectedReferralDoctor
        ? {
            id: selectedReferralDoctor.id,
            name: selectedReferralDoctor.name,
            specialization: selectedReferralDoctor.specialization,
            clinic: selectedReferralDoctor.clinic,
          }
        : null,
      notes: "",
      signature: doctorSignature || "",
      createdAt: new Date().toISOString(),
      sendTarget,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(buildPayload());
      return;
    }
    try {
      const res = await fetch("/api/doctor/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      alert(data?.message || "Prescription saved");
      // Verifiable UI confirmation
      console.log("Prescription saved payload:", data?.data);
      setDiagnosis(data?.data?.diagnosis || diagnosis);
      setAdvice(data?.data?.advice || advice);
    } catch (err) {
      console.error(err);
      alert("Failed to save prescription.");
    }
  }

  async function handleSend() {
    if (!patient) return;
    try {
      const res = await fetch("/api/doctor/send-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: sendTarget, prescription: buildPayload() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Send failed");
      alert(data?.message || `Prescription sent to ${sendTarget}`);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to send prescription.");
    }
  }

  async function handleReferralSend() {
    if (!patient) return;
    if (!selectedReferralDoctor) {
      alert("Please select referral doctor.");
      return;
    }

    try {
      const payload = buildPayload();
      const res = await fetch("/api/doctor/send-prescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target: "referralDoctor",
          referralDoctorId: selectedReferralDoctor.id,
          referralDoctorName: selectedReferralDoctor.name,
          prescription: payload,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Referral send failed");
      alert(data?.message || `Prescription sent to ${selectedReferralDoctor.name}`);
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to send prescription to referral doctor.");
    }
  }

  return (
    <div className="doctor-prescription-screen">
      <div className="doctor-prescription-card">
        {patient ? (
          <>
            <div className="doctor-patient-header">Active Patient Details</div>
            <div className="doctor-patient-line">
              <strong>UHID: {patient?.name || "Patient"}</strong>
              <span>UHID: {patientUHID}</span>
              <span>Age: {patientAge}</span>
              <span>Gender: {patientGender}</span>
              <span>Blood group: {patientBloodGroup}</span>
            </div>
            <div className="doctor-alert">
              Allergy Alert: {patientAllergy || "Penicillin (as requested)"}
            </div>
          </>
        ) : (
          <div className="doctor-empty doctor-empty-block">Select a patient to start prescription.</div>
        )}

        <h3 className="doctor-prescription-title">Prescription System</h3>

        <div className="doctor-tab-group">
          {["prescription", "typing", "writing"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`doctor-tab-button ${activeTab === tab ? "doctor-tab-button--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form className="doctor-form" onSubmit={handleSubmit}>
          <div className="doctor-form__grid">
            <div className="doctor-form__col doctor-form__col--left">
              <div className="doctor-form__section">
                <div className="doctor-form__section-title">Medicines</div>
                <div className="doctor-medicine-row">
                  <select className="doctor-input doctor-medicine-select" value={medicine} onChange={(e) => setMedicine(e.target.value)} disabled={!patient}>
                    <option value="">Medicine</option>
                    {MEDICINES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div className="doctor-medicine-search">
                    <input
                      className="doctor-input"
                      value={medicine}
                      onChange={(e) => setMedicine(e.target.value)}
                      list="doctor-medicine-list"
                      disabled={!patient}
                    />
                    <datalist id="doctor-medicine-list">
                      {MEDICINES.map((item) => (
                        <option key={item} value={item} />
                      ))}
                    </datalist>
                    <span className="doctor-search-icon">Search</span>
                  </div>
                  <button type="button" className="doctor-btn doctor-btn--primary" onClick={handleAddMedicine} disabled={!patient}>
                    + Add
                  </button>
                </div>
                <div className="doctor-auto-text">Medicine auto-select: {medicine || "-"}</div>
              </div>

              <div className="doctor-form__section">
                <div className="doctor-form__section-title">Doctor Signature</div>
                <input
                  className="doctor-input"
                  value={doctorSignature}
                  onChange={(e) => setDoctorSignature(e.target.value)}
                  placeholder="Type signature (e.g. Dr. Vikram Iyer)"
                  disabled={!patient}
                />
              </div>

              <div className="doctor-form__section">
                <div className="doctor-form__section-title">Clinical Notes</div>
                <textarea
                  className="doctor-input doctor-large-textarea"
                  placeholder="Diagnosis (ICD-10)"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  disabled={!patient}
                />
              </div>

              <div className="doctor-form__section">
                <div className="doctor-form__section-title">Advice/Instructions</div>
                <textarea
                  className="doctor-input doctor-large-textarea"
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  disabled={!patient}
                />
              </div>

              <div className="doctor-form__section">
                <div className="doctor-form__section-title">Orders (Lab Test / Scan)</div>
                <div className="doctor-orders-grid">
                  <div>
                    <label className="doctor-label">Lab Test</label>
                    {labOrders.map((order, index) => (
                      <select
                        key={`lab-${index}`}
                        className="doctor-input"
                        value={order}
                        onChange={(e) => handleOrderChange("lab", index, e.target.value)}
                        disabled={!patient}
                      >
                        {LAB_TESTS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                  <div>
                    <label className="doctor-label">Scan</label>
                    {scanOrders.map((order, index) => (
                      <select
                        key={`scan-${index}`}
                        className="doctor-input"
                        value={order}
                        onChange={(e) => handleOrderChange("scan", index, e.target.value)}
                        disabled={!patient}
                      >
                        {SCANS.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    ))}
                  </div>
                </div>
              </div>

              <div className="doctor-template-row">
                <button type="button" className="doctor-btn doctor-btn--primary" onClick={addTemplate} disabled={!patient}>
                  + Template
                </button>
                <span>Load previous prescriptions or common treatment plans.</span>
              </div>

              <div className="doctor-form__submit doctor-form__submit--with-send">
                <div className="doctor-send-group">
                  <label className="doctor-label" htmlFor="send-target">Send To</label>
                  <select
                    id="send-target"
                    className="doctor-input"
                    value={sendTarget}
                    onChange={(e) => setSendTarget(e.target.value)}
                    disabled={!patient}
                  >
                    <option value="lab">Lab</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="nurse">Nurse</option>
                  </select>
                  <button type="button" className="doctor-btn" onClick={handleSend} disabled={!patient}>
                    Send
                  </button>
                </div>

                <div className="doctor-action-buttons">
                  <label className="doctor-label" htmlFor="referral-doctor">Referral Doctor</label>
                  <select
                    id="referral-doctor"
                    className="doctor-input doctor-referral-select"
                    value={referralDoctorId || (selectedReferralDoctor?.id || selectedReferralDoctor?.name || "")}
                    onChange={(e) => setReferralDoctorId(e.target.value)}
                    disabled={!patient || referralDoctors.length === 0}
                  >
                    {referralDoctors.length === 0 ? (
                      <option value="">No referral doctors</option>
                    ) : (
                      referralDoctors.map((item) => (
                        <option key={item.id || item.name} value={item.id || item.name}>
                          {item.name} - {item.specialization || "Doctor"}
                        </option>
                      ))
                    )}
                  </select>
                  <button type="button" className="doctor-btn doctor-btn--primary" onClick={handleReferralSend} disabled={!patient || !selectedReferralDoctor}>
                    Send
                  </button>
                  <button type="submit" className="doctor-btn doctor-btn--primary" disabled={!patient}>
                    Save Prescription
                  </button>
                </div>
              </div>
            </div>

            <div className="doctor-form__col doctor-form__col--right">
              <div className="doctor-preview__title">Preview</div>
              <div className="doctor-preview__subtitle">Print-ready layout</div>
              <div className="doctor-print-paper">
      <div className="doctor-print-header">
                  <div>
                    <h4>{patient?.name || "Patient"}</h4>
                    <p>UHID: {patientUHID}</p>
                    <p>Phone: {patient?.phone || "--"}</p>
                    <p>Age/Gender: {patientAge} {patientGender}</p>
                    <p>Blood Group: {patientBloodGroup}</p>
                  </div>
                  <div>
                    <p><strong>Dr: {doctor?.name || "Vikram Iyer"}</strong></p>
                    <p>Specialization: {doctor?.specialization || "General Medicine"}</p>
                    <p><strong>Signature:</strong> {doctorSignature || "--"}</p>
                    <p>Clinic: {doctor?.clinic || "Green Valley Hospital"}</p>
                    <p>Patient: {patient?.name || "-"}</p>
                    <p>Generated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <table className="doctor-preview__table">
                  <thead>
                    <tr>
                      <th>Lab Test</th>
                      <th>Medicine</th>
                      <th>Scan</th>
                      <th>Notes/Media</th>
                      <th>Signature</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, index) => (
                      <tr key={index}>
                        <td>{row.lab || "--"}</td>
                        <td>{row.medicine || "--"}</td>
                        <td>{row.scan || "--"}</td>
                        <td>{row.mediaType || "--"}</td>
                        <td>
                          {index === 0 ? (
                            <div style={{ fontWeight: 950 }}>
                              {doctorSignature || "--"}
                            </div>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="doctor-print-time">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrescriptionForm;
