import React, { useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Reception/PrescriptionPage.css";

function PrescriptionPage() {
  // console.log(SignatureCanvas);

  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);

  const [editMode, setEditMode] = useState(false);

  // const [formData, setFormData] = useState({
  //   diagnosis: "",
  //   prescription: "",
  //   advice: "",
  //   notes: "",
  // });

  const sigCanvas = useRef(null);
  const diagnosisPad = useRef();
  const prescriptionPad = useRef();
  const advicePad = useRef();
  const notesPad = useRef();

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [advice, setAdvice] = useState("");
  const [notes, setNotes] = useState("");

  const [diagnosisMode, setDiagnosisMode] = useState("type");
  const [prescriptionMode, setPrescriptionMode] = useState("type");
  const [adviceMode, setAdviceMode] = useState("type");
  const [notesMode, setNotesMode] = useState("type");

  useEffect(() => {
    loadPatient();
  }, []);

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

      // console.log("Diagnosis Pad:", diagnosisPad.current);
      // console.log("Prescription Pad:", prescriptionPad.current);
      // console.log("Advice Pad:", advicePad.current);
      // console.log("Notes Pad:", notesPad.current);

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

      const payload = {
        diagnosis: diagnosisData,
        prescription: prescriptionData,
        advice: adviceData,
        notes: notesData,
        signature: signatureData,
      };

      console.log("PAYLOAD =", payload);

      await axios.put(`http://localhost:5000/api/patient/${id}`, payload);

      const res = await axios.get(`http://localhost:5000/api/patient/${id}`);

      console.log("UPDATED PATIENT");
      console.log(res.data);
      console.log(res.data.prescriptionHistory);

      const latest =
        res.data.prescriptionHistory[res.data.prescriptionHistory.length - 1];

      console.log("LATEST =", latest);

      alert("Prescription Saved Successfully");

      <button
        className="edit-btn"
        onClick={() => {
          setDiagnosis("");
          setPrescription("");
          setAdvice("");
          setNotes("");

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
        }}
      ></button>;
      await loadPatient();

      setEditMode(false);

      diagnosisPad.current?.clear();
      prescriptionPad.current?.clear();
      advicePad.current?.clear();
      notesPad.current?.clear();
      sigCanvas.current?.clear();

      setEditMode(false);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const loadPatient = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/patient/${id}`);

      setPatient(res.data);

      console.log("API Response =", res.data);

      console.log("History =", res.data.prescriptionHistory);

      console.log("Length =", res.data.prescriptionHistory.length);

      const history = res.data.prescriptionHistory || [];
      setHistory(history);

      if (history.length > 0) {
        const latest = history[history.length - 1];

        console.log("Diagnosis =", latest.diagnosis);
        console.log("Prescription =", latest.prescription);
        console.log("Advice =", latest.advice);
        console.log("Notes =", latest.notes);

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
              setDiagnosis("");
              setPrescription("");
              setAdvice("");
              setNotes("");

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
            }}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>

          {editMode && (
            <button className="save-btn" onClick={savePrescription}>
              Save
            </button>
          )}

          <button className="print-btn" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>
      <div className="prescription-card">
        <h1>ABC Hospital</h1>
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
              <button onClick={() => setDiagnosisMode("type")}>Typing</button>

              <button onClick={() => setDiagnosisMode("write")}>Writing</button>

              {diagnosisMode === "type" ? (
                <textarea
                  rows="5"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                <>
                  <SignatureCanvas
                    ref={diagnosisPad}
                    penColor="black"
                    canvasProps={{
                      width: 700,
                      height: 200,
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
              <img src={diagnosis} alt="Diagnosis" className="written-image" />
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
                  <SignatureCanvas
                    ref={prescriptionPad}
                    penColor="black"
                    canvasProps={{
                      width: 700,
                      height: 200,
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

              <button onClick={() => setAdviceMode("write")}>Writing</button>

              {adviceMode === "type" ? (
                <textarea
                  rows="5"
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  style={{ width: "100%" }}
                />
              ) : (
                <>
                  <SignatureCanvas
                    ref={advicePad}
                    penColor="black"
                    canvasProps={{
                      width: 700,
                      height: 200,
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
                  <SignatureCanvas
                    ref={notesPad}
                    penColor="black"
                    canvasProps={{
                      width: 700,
                      height: 200,
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
              <img src={notes} />
            ) : (
              <p>{notes}</p>
            )
          ) : (
            <p>Not Added</p>
          )}
        </div>
      </div>

      <div className="signature-section">
        <h3>Doctor Signature</h3>

        {editMode ? (
          <>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                className: "signature-canvas",
                width: 500,
                height: 180,
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
          </>
        ) : history.length > 0 && history[history.length - 1].signature ? (
          <img
            src={history[history.length - 1].signature}
            alt="Doctor Signature"
            className="signature-image"
          />
        ) : (
          <p>No Signature</p>
        )}
      </div>
    </div>
  );
}

export default PrescriptionPage;
