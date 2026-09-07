import React, { useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../styles/Reception/PrescriptionPage.css";
// import "../../styles/Reception/PrescriptionPage";

function PrescriptionPage() {
  const { id } = useParams();

  console.log("Patient ID =", id);

  const navigate = useNavigate();

  const location = useLocation();
  const onPrescriptionSaved = location.state?.onPrescriptionSaved;

  const fromPharmacy = location.state?.from === "pharmacy";

  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [prescriptionHistoryId, setPrescriptionHistoryId] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const sigCanvas = useRef(null);
  const diagnosisPad = useRef();
  const prescriptionPad = useRef();
  const advicePad = useRef();
  const notesPad = useRef();

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [advice, setAdvice] = useState("");
  const [notes, setNotes] = useState("");
  const [medicineList, setMedicineList] = useState([
    {
      medicineName: "",
      quantity: 1,
    },
  ]);

  const [labReportHistory, setLabReportHistory] = useState([]);

  // ==========================================
  // LAB TESTS
  // ==========================================

  const labTestOptions = [
    "CBC",
    "Blood Sugar",
    "LFT",
    "KFT",
    "Lipid Profile",
    "Urine Routine",
    "Thyroid Profile",
    "HbA1c",
    "CRP",
    "ESR",
  ];

  const [selectedLabTests, setSelectedLabTests] = useState([]);
  const [labPriority, setLabPriority] = useState("Normal");
  const [labClinicalNotes, setLabClinicalNotes] = useState("");

  const [referralDoctorId, setReferralDoctorId] = useState("");
  const [referralDoctorName, setReferralDoctorName] = useState("");
  const [referralSpecialization, setReferralSpecialization] = useState("");

  const [doctorList, setDoctorList] = useState([]);
  const [availableMedicines, setAvailableMedicines] = useState([]);

  const [diagnosisMode, setDiagnosisMode] = useState("type");
  const [prescriptionMode, setPrescriptionMode] = useState("type");
  const [adviceMode, setAdviceMode] = useState("type");
  const [notesMode, setNotesMode] = useState("type");

  useEffect(() => {
    loadPatient();
    loadDoctors();
    loadMedicines();
  }, [id]);

  const savePrescription = async () => {
    console.log("===== SAVE CLICKED =====");

    console.log("diagnosis state =", diagnosis);
    console.log("prescription state =", prescription);
    console.log("advice state =", advice);
    console.log("notes state =", notes);

    console.log("Diagnosis Mode =", diagnosisMode);
    console.log("Prescription Mode =", prescriptionMode);
    console.log("Advice Mode =", adviceMode);
    console.log("Notes Mode =", notesMode);

    try {
      let diagnosisData = diagnosis;
      let prescriptionData = prescription;
      let adviceData = advice;
      let notesData = notes;
      let signatureData = "";

      if (
        diagnosisMode === "write" &&
        diagnosisPad.current &&
        !diagnosisPad.current.isEmpty()
      ) {
        console.log(diagnosisPad.current);

        console.log("getCanvas:", typeof diagnosisPad.current?.getCanvas);
        console.log(
          "getTrimmedCanvas:",
          typeof diagnosisPad.current?.getCanvas,
        );

        diagnosisData = diagnosisPad.current.getCanvas().toDataURL("image/png");
      }

      if (
        prescriptionMode === "write" &&
        prescriptionPad.current &&
        !prescriptionPad.current.isEmpty()
      ) {
        prescriptionData = prescriptionPad.current
          .getCanvas()
          .toDataURL("image/png");
      }

      if (
        adviceMode === "write" &&
        advicePad.current &&
        !advicePad.current.isEmpty()
      ) {
        adviceData = advicePad.current.getCanvas().toDataURL("image/png");
      }

      if (
        notesMode === "write" &&
        notesPad.current &&
        !notesPad.current.isEmpty()
      ) {
        notesData = notesPad.current.getCanvas().toDataURL("image/png");
      }

      if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
        signatureData = sigCanvas.current.getCanvas().toDataURL("image/png");
      }

      console.log("Diagnosis:", diagnosisData);
      console.log("Prescription:", prescriptionData);
      console.log("Advice:", adviceData);
      console.log("Notes:", notesData);
      console.log("Signature:", signatureData);

      console.log("Sending PUT request...");

      const medicines = medicineList
        .filter((m) => m.medicineName.trim() !== "")
        .map((m) => ({
          medicineName: m.medicineName,
          quantity: Number(m.quantity),
        }));

      const payload = {
        uhid: patient.uhid,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        mobile: patient.mobile,
        address: patient.address,

        doctor: referralDoctorId ? `Dr. ${referralDoctorName}` : patient.doctor,

        doctorId: referralDoctorId ? referralDoctorId : patient.doctorId,

        disease: patient.disease,
        role: patient.role,

        diagnosis: diagnosisData,
        prescription: prescriptionData,
        advice: adviceData,
        notes: notesData,
        signature: signatureData,

        // Medicine is optional
        medicines: medicines,

        // Doctor is optional
        referralDoctor: referralDoctorId
          ? {
              id: referralDoctorId,
              name: referralDoctorName,
              specialization: referralSpecialization,
            }
          : null,
      };
      console.log("PAYLOAD =", payload);

      const patientUpdateRes = await axios.put(
        `http://localhost:5000/api/patient/${id}`,
        payload,
      );

      console.log("Patient updated =", patientUpdateRes.data);

      const updatedPatient = patientUpdateRes.data.data;

      const prescriptionHistory = updatedPatient.prescriptionHistory || [];

      const latestPrescription =
        prescriptionHistory[prescriptionHistory.length - 1];

      const newPrescriptionHistoryId = latestPrescription?._id;

      console.log("New Prescription History ID =", newPrescriptionHistoryId);

      if (!newPrescriptionHistoryId) {
        throw new Error("Prescription history ID was not generated.");
      }

      setPrescriptionHistoryId(newPrescriptionHistoryId);

      // ==========================================
      // SEND PRESCRIPTION TO PHARMACY - OPTIONAL
      // ==========================================

      if (medicines.length > 0) {
        try {
          console.log("Medicines found. Sending prescription to pharmacy...");

          const sendRes = await axios.post(
            "http://localhost:5000/api/doctor/send-prescription",
            {
              target: "pharmacy",

              prescription: {
                patientId: patient._id,
                patientUHID: patient.uhid,
                patientName: patient.name,
                doctor: updatedPatient.doctor,

                diagnosis: diagnosisData,
                prescription: prescriptionData,
                advice: adviceData,
                notes: notesData,
                signature: signatureData,

                medicines: medicines,
              },

              prescriptionHistoryId: newPrescriptionHistoryId,
            },
          );

          console.log("Prescription sent to pharmacy =", sendRes.data);
        } catch (pharmacyError) {
          console.error(
            "Pharmacy send error =",
            pharmacyError.response?.data || pharmacyError.message,
          );

          alert(
            pharmacyError.response?.data?.message ||
              "Prescription saved, but could not be sent to pharmacy.",
          );
        }
      } else {
        console.log(
          "No medicines selected. Prescription saved without sending to pharmacy.",
        );
      }

      // ==========================================
      // SEND LAB REQUEST - OPTIONAL
      // ==========================================

      if (selectedLabTests.length > 0) {
        try {
          console.log("Lab tests selected. Creating lab request...");

          const labPayload = {
            patientId: updatedPatient._id,
            doctorId: updatedPatient.doctorId || patient.doctorId,

            uhid: updatedPatient.uhid,
            patientName: updatedPatient.name,

            doctorName: updatedPatient.doctor || patient.doctor,

            ward: updatedPatient.role || patient.role || "OPD",

            department: "Lab",

            testCategory: "Laboratory",

            testName: selectedLabTests.join(", "),

            tests: selectedLabTests,

            priority: labPriority,

            clinicalNotes: labClinicalNotes || notesData || "",
          };

          console.log("LAB REQUEST PAYLOAD =", labPayload);

          const labResponse = await axios.post(
            "http://localhost:5000/lab/requests",
            labPayload,
          );

          console.log("Lab request created =", labResponse.data);

          if (labResponse.data.success) {
            console.log("Lab request sent successfully");
          }
        } catch (labError) {
          console.error(
            "Lab request error =",
            labError.response?.data || labError.message,
          );

          alert(
            labError.response?.data?.message ||
              "Prescription saved, but Lab request could not be created.",
          );
        }
      } else {
        console.log(
          "No lab tests selected. Prescription saved without sending to Lab.",
        );
      }

      console.log("Prescription saved in Patient prescriptionHistory");

      alert("Prescription Saved Successfully");

      setPatient(updatedPatient);
      setHistory(updatedPatient.prescriptionHistory || []);

      if (onPrescriptionSaved) {
        onPrescriptionSaved(patient._id);
      }

      setEditMode(false);

      // =====================================
      // REFERRED DOCTOR SELECTED
      // =====================================
      if (referralDoctorId) {
        navigate("/doctor", {
          state: {
            doctorId: referralDoctorId,
          },
        });

        return;
      }

      diagnosisPad.current?.clear();
      prescriptionPad.current?.clear();
      advicePad.current?.clear();
      notesPad.current?.clear();
      sigCanvas.current?.clear();

      // setEditMode(false);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  // const sendToDepartment = async (target) => {
  //   try {
  //     if (!patient?._id) {
  //       alert("Patient ID missing");
  //       return;
  //     }

  //     if (!prescriptionHistoryId) {
  //       alert("Please save prescription first");
  //       return;
  //     }

  //     const response = await axios.post(
  //       "http://localhost:5000/api/doctor/send-prescription",
  //       {
  //         target,

  //         prescription: {
  //           patientId: patient._id,
  //         },

  //         prescriptionHistoryId,
  //       },
  //     );

  //     if (response.data.success) {
  //       alert(`Prescription sent to ${target}`);
  //     }
  //   } catch (error) {
  //     console.error("Send Prescription Error:", error.response?.data || error);

  //     alert(error.response?.data?.message || "Failed to send prescription");
  //   }
  // };

  const downloadPDF = () => {
    window.open(`http://localhost:5000/api/patient/${id}/pdf`);
  };

  const loadDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/doctors");

      console.log("DOCTORS API RESPONSE =", res.data);

      const doctors = Array.isArray(res.data) ? res.data : res.data.data || [];

      console.log("DOCTORS LIST =", doctors);

      setDoctorList(doctors);
    } catch (err) {
      console.error("LOAD DOCTORS ERROR =", err.response?.data || err.message);

      setDoctorList([]);
    }
  };

  const loadMedicines = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/pharmacy/medicines",
      );

      console.log("PHARMACY MEDICINES =", res.data);

      setAvailableMedicines(res.data.data || []);
    } catch (err) {
      console.error(
        "LOAD MEDICINES ERROR =",
        err.response?.data || err.message,
      );

      setAvailableMedicines([]);
    }
  };

  const addMedicine = () => {
    setMedicineList([
      ...medicineList,
      {
        medicineName: "",
        quantity: 1,
      },
    ]);
  };

  const handleLabTestChange = (testName) => {
    setSelectedLabTests((prev) => {
      if (prev.includes(testName)) {
        return prev.filter((test) => test !== testName);
      }

      return [...prev, testName];
    });
  };

  const updateMedicine = (index, field, value) => {
    const temp = [...medicineList];

    temp[index][field] = value;

    setMedicineList(temp);
  };

  const loadPatient = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/patient/${id}`);

      setPatient(res.data);

      setLabReportHistory(res.data.labReportHistory || []);

      console.log("API Response =", res.data);

      const history = res.data.prescriptionHistory || [];

      console.log("History =", history);
      console.log("Length =", history.length);

      setHistory(history);

      if (history.length > 0) {
        const latest = history[history.length - 1];

        setPrescriptionHistoryId(latest._id);

        console.log("Diagnosis =", latest.diagnosis);
        console.log("Prescription =", latest.prescription);
        console.log("Advice =", latest.advice);
        console.log("Notes =", latest.notes);

        // Referral Doctor
        if (latest.referralDoctor?.id) {
          setReferralDoctorId(latest.referralDoctor.id);
          setReferralDoctorName(latest.referralDoctor.name || "");
          setReferralSpecialization(latest.referralDoctor.specialization || "");
        } else {
          setReferralDoctorId("");
          setReferralDoctorName("");
          setReferralSpecialization("");
        }

        setDiagnosis(latest.diagnosis || "");
        setPrescription(latest.prescription || "");
        setAdvice(latest.advice || "");
        setNotes(latest.notes || "");

        if (latest.diagnosis?.startsWith("data:image")) {
          setDiagnosisMode("write");
        } else {
          setDiagnosisMode("type");
        }

        if (latest.prescription?.startsWith("data:image")) {
          setPrescriptionMode("write");
        } else {
          setPrescriptionMode("type");
        }

        if (latest.advice?.startsWith("data:image")) {
          setAdviceMode("write");
        } else {
          setAdviceMode("type");
        }

        if (latest.notes?.startsWith("data:image")) {
          setNotesMode("write");
        } else {
          setNotesMode("type");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!patient) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div className="prescription-container">
      <div className="prescription-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div>
          <button
            className="edit-btn"
            onClick={() => {
              if (editMode) {
                setEditMode(false);
              } else {
                setDiagnosis("");
                setPrescription("");
                setAdvice("");
                setNotes("");
                setSelectedLabTests([]);
                setLabPriority("Normal");
                setLabClinicalNotes("");

                setMedicineList([
                  {
                    medicineName: "",
                    quantity: 1,
                  },
                ]);

                setDiagnosisMode("type");
                setPrescriptionMode("type");
                setAdviceMode("type");
                setNotesMode("type");

                diagnosisPad.current?.clear();
                prescriptionPad.current?.clear();
                advicePad.current?.clear();
                notesPad.current?.clear();
                sigCanvas.current?.clear();

                setEditMode(true);
              }
            }}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>

          {editMode && (
            <button className="save-btn" onClick={savePrescription}>
              Save
            </button>
          )}

          <button
            className="print-btn"
            onClick={() =>
              window.open(
                `http://localhost:5000/api/patient/${id}/pdf`,
                "_blank",
              )
            }
          >
            Download PDF
          </button>

          <button className="print-btn" onClick={downloadPDF}>
            Print
          </button>
        </div>
      </div>
      <div className="prescription-card">
        <h1>Shraddha Hospital</h1>
        <hr />
        <div className="patient-grid">
          <div>
            <strong>Patient Name</strong>
            <p>{patient.name}</p>
          </div>

          <div>
            <strong>UHID</strong>
            <p>{patient.uhid}</p>
          </div>

          <div>
            <strong>Age</strong>
            <p>{patient.age}</p>
          </div>

          <div>
            <strong>Gender</strong>
            <p>{patient.gender}</p>
          </div>

          <div>
            <strong>Doctor</strong>
            <p>{patient.doctor}</p>
          </div>

          <div>
            <strong>Date</strong>
            <p>
              {patient.createdAt
                ? new Date(patient.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        {labReportHistory.length > 0 && (
          <div className="history-section">
            <h2>Lab Report History</h2>

            {labReportHistory
              .slice()
              .reverse()
              .map((report, index) => (
                <div className="history-card" key={report._id || index}>
                  <h4>{report.testName}</h4>

                  <p>
                    <strong>Report Date:</strong>{" "}
                    {report.reportDate
                      ? new Date(report.reportDate).toLocaleString()
                      : "-"}
                  </p>

                  <a
                    href={`http://localhost:5000/uploadLabReport/uploadLab/${report.reportPdf}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Lab Report
                  </a>
                </div>
              ))}
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h2>Prescription History</h2>

            {history
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  className={`history-card ${index === 0 ? "latest-history" : ""}`}
                  key={index}
                >
                  <h4>
                    Visit {history.length - index} |{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </h4>

                  <hr />

                  <p>
                    <strong>Diagnosis:</strong>
                  </p>

                  {item.diagnosis?.startsWith("data:image") ? (
                    <img
                      src={item.diagnosis}
                      alt=""
                      className="written-image"
                    />
                  ) : (
                    <p>{item.diagnosis}</p>
                  )}

                  <p>
                    <strong>Prescription:</strong>
                  </p>

                  {item.prescription?.startsWith("data:image") ? (
                    <img
                      src={item.prescription}
                      alt=""
                      className="written-image"
                    />
                  ) : (
                    <p>{item.prescription}</p>
                  )}

                  <p>
                    <strong>Advice:</strong>
                  </p>

                  {item.advice?.startsWith("data:image") ? (
                    <img src={item.advice} alt="" className="written-image" />
                  ) : (
                    <p>{item.advice}</p>
                  )}

                  <p>
                    <strong>Doctor Notes:</strong>
                  </p>

                  {item.notes?.startsWith("data:image") ? (
                    <img src={item.notes} alt="" className="written-image" />
                  ) : (
                    <p>{item.notes}</p>
                  )}

                  {item.referralDoctor?.name && (
                    <>
                      <p>
                        <strong>Referred To :</strong>
                      </p>

                      <p>
                        Dr. {item.referralDoctor.name}
                        {" - "}
                        {item.referralDoctor.specialization}
                      </p>
                    </>
                  )}

                  <p>
                    <strong>Doctor Signature:</strong>
                  </p>

                  {item.signature ? (
                    <img
                      src={item.signature}
                      alt="Doctor Signature"
                      className="signature-image"
                    />
                  ) : (
                    <p>Not Available</p>
                  )}
                </div>
              ))}
          </div>
        )}

        {editMode && (
          <div>
            <div className="section">
              {editMode && (
                <div className="new-entry-heading">
                  <h2>Add New Prescription</h2>
                  <p>
                    Previous prescriptions are shown above. Fill only the new
                    details below.
                  </p>
                </div>
              )}
              <h3>Diagnosis</h3>

              {editMode ? (
                <div>
                  <button
                    className={
                      diagnosisMode === "type"
                        ? "mode-btn active-mode"
                        : "mode-btn"
                    }
                    onClick={() => setDiagnosisMode("type")}
                  >
                    Typing
                  </button>

                  <button
                    className={
                      diagnosisMode === "write"
                        ? "mode-btn active-mode"
                        : "mode-btn"
                    }
                    onClick={() => setDiagnosisMode("write")}
                  >
                    Writing
                  </button>

                  {diagnosisMode === "type" ? (
                    <textarea
                      rows="5"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <>
                      <p className="canvas-note">
                        Write here using mouse or stylus
                      </p>

                      <SignatureCanvas
                        ref={diagnosisPad}
                        penColor="black"
                        canvasProps={{
                          width: 900,
                          height: 500,
                          className: "signature-box",
                        }}
                      />

                      <button onClick={() => diagnosisPad.current.clear()}>
                        Clear
                      </button>
                    </>
                  )}
                </div>
              ) : diagnosis ? (
                diagnosis.startsWith("data:image") ? (
                  <img
                    src={diagnosis}
                    alt="Diagnosis"
                    className="written-image"
                  />
                ) : (
                  <p>{diagnosis}</p>
                )
              ) : (
                <p>Not Added</p>
              )}
            </div>

            <div className="section">
              <h3>Prescription</h3>

              {editMode ? (
                <div>
                  <button onClick={() => setPrescriptionMode("type")}>
                    Typing
                  </button>

                  <button
                    onClick={() => {
                      setPrescriptionMode("write");
                    }}
                  >
                    Writing
                  </button>

                  {prescriptionMode === "type" ? (
                    <textarea
                      rows="5"
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <>
                      <p className="canvas-note">
                        Write here using mouse or stylus
                      </p>

                      <SignatureCanvas
                        ref={prescriptionPad}
                        penColor="black"
                        canvasProps={{
                          width: 900,
                          height: 500,
                          className: "signature-box",
                        }}
                      />

                      <button onClick={() => prescriptionPad.current.clear()}>
                        Clear
                      </button>
                    </>
                  )}
                </div>
              ) : prescription ? (
                prescription.startsWith("data:image") ? (
                  <img
                    src={prescription}
                    alt="Prescription"
                    className="written-image"
                  />
                ) : (
                  <p>{prescription}</p>
                )
              ) : (
                <p>Not Added</p>
              )}
            </div>

            <div className="section">
              <h3>Advice</h3>
              {editMode ? (
                <div>
                  <button onClick={() => setAdviceMode("type")}>Typing</button>

                  <button onClick={() => setAdviceMode("write")}>
                    Writing
                  </button>

                  {adviceMode === "type" ? (
                    <textarea
                      rows="5"
                      value={advice}
                      onChange={(e) => setAdvice(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <>
                      <p className="canvas-note">
                        Write here using mouse or stylus
                      </p>

                      <SignatureCanvas
                        ref={advicePad}
                        penColor="black"
                        canvasProps={{
                          width: 900,
                          height: 500,
                          className: "signature-box",
                        }}
                      />

                      <button onClick={() => advicePad.current.clear()}>
                        Clear
                      </button>
                    </>
                  )}
                </div>
              ) : advice ? (
                advice.startsWith("data:image") ? (
                  <img src={advice} alt="Advice" className="written-image" />
                ) : (
                  <p>{advice}</p>
                )
              ) : (
                <p>Not Added</p>
              )}
            </div>

            <div className="section">
              <h3>Doctor Notes</h3>

              {editMode ? (
                <div>
                  <button onClick={() => setNotesMode("type")}>Typing</button>

                  <button onClick={() => setNotesMode("write")}>Writing</button>

                  {notesMode === "type" ? (
                    <textarea
                      rows="5"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <>
                      <p className="canvas-note">
                        Write here using mouse or stylus
                      </p>

                      <SignatureCanvas
                        ref={notesPad}
                        penColor="black"
                        canvasProps={{
                          width: 900,
                          height: 500,
                          className: "signature-box",
                        }}
                      />

                      <button onClick={() => notesPad.current.clear()}>
                        Clear
                      </button>
                    </>
                  )}
                </div>
              ) : notes ? (
                notes.startsWith("data:image") ? (
                  <img src={notes} alt="Notes" />
                ) : (
                  <p>{notes}</p>
                )
              ) : (
                <p>Not Added</p>
              )}
            </div>

            <div className="section">
              <h3>Medicines</h3>

              {(Array.isArray(medicineList) ? medicineList : []).map(
                (med, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    <select
                      value={med.medicineName}
                      onChange={(e) =>
                        updateMedicine(index, "medicineName", e.target.value)
                      }
                    >
                      <option value="">Select Medicine</option>

                      {availableMedicines.map((medicine) => (
                        <option key={medicine._id} value={medicine.itemName}>
                          {medicine.itemName} - Stock: {medicine.quantity}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="1"
                      value={med.quantity}
                      onChange={(e) =>
                        updateMedicine(
                          index,
                          "quantity",
                          Number(e.target.value),
                        )
                      }
                      placeholder="Quantity"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const temp = medicineList.filter(
                          (_, medicineIndex) => medicineIndex !== index,
                        );

                        setMedicineList(temp);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ),
              )}

              <button type="button" onClick={addMedicine}>
                + Add Medicine
              </button>
            </div>

            {/* ==========================================
    LAB TESTS
========================================== */}

            <div className="prescription-section">
              <h3>Lab Tests</h3>

              <p>Select tests required for the patient:</p>

              <div className="lab-test-list">
                {labTestOptions.map((test) => (
                  <label
                    key={test}
                    style={{ display: "block", marginBottom: "8px" }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLabTests.includes(test)}
                      onChange={() => handleLabTestChange(test)}
                    />

                    <span style={{ marginLeft: "8px" }}>{test}</span>
                  </label>
                ))}
              </div>

              <div style={{ marginTop: "15px" }}>
                <label>
                  <strong>Priority:</strong>
                </label>

                <select
                  value={labPriority}
                  onChange={(e) => setLabPriority(e.target.value)}
                  style={{ marginLeft: "10px" }}
                >
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Emergency">Emergency</option>
                  <option value="STAT">STAT</option>
                </select>
              </div>

              <div style={{ marginTop: "15px" }}>
                <label>
                  <strong>Clinical Notes:</strong>
                </label>

                <textarea
                  value={labClinicalNotes}
                  onChange={(e) => setLabClinicalNotes(e.target.value)}
                  placeholder="Enter clinical notes for laboratory..."
                  rows="3"
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    padding: "8px",
                  }}
                />
              </div>

              {selectedLabTests.length > 0 && (
                <p style={{ marginTop: "10px" }}>
                  <strong>Selected Tests:</strong> {selectedLabTests.join(", ")}
                </p>
              )}
            </div>

            <div className="section">
              <h3>Refer To Doctor</h3>

              <select
                value={referralDoctorId}
                onChange={(e) => {
                  const selectedDoctorId = e.target.value;

                  if (!selectedDoctorId) {
                    setReferralDoctorId("");
                    setReferralDoctorName("");
                    setReferralSpecialization("");
                    return;
                  }

                  const doctor = doctorList.find(
                    (d) => String(d._id) === String(selectedDoctorId),
                  );

                  if (!doctor) {
                    console.log("Selected doctor not found:", selectedDoctorId);
                    return;
                  }

                  console.log("SELECTED DOCTOR =", doctor);

                  setReferralDoctorId(doctor._id);
                  setReferralDoctorName(doctor.name || "");
                  setReferralSpecialization(doctor.specialization || "");
                }}
              >
                <option value="">Select Doctor (Optional)</option>

                {Array.isArray(doctorList) &&
                  doctorList.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.name}
                      {doctor.specialization
                        ? ` - ${doctor.specialization}`
                        : ""}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {/* {prescriptionHistoryId && (
          <div className="department-section">
            <h3>Send Prescription</h3>

            <button type="button" onClick={() => sendToDepartment("lab")}>
              Send to Lab
            </button>
          </div>
        )} */}

        {editMode && (
          <div className="signature-section">
            <h3>Doctor Signature</h3>

            <p className="canvas-note">Write here using mouse or stylus</p>

            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                className: "signature-canvas",
                width: 350,
                height: 100,
              }}
            />

            <div className="signature-buttons">
              <button
                className="clear-btn"
                onClick={() => sigCanvas.current.clear()}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrescriptionPage;
