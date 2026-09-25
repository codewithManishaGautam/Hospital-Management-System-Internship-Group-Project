import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

import MergePdf from "./MergePdf";
import PatientForm from "./PatientForm";
import PdfCreate from "./PdfCreate";

import "./style/PatientDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Razorpay from "../Razorpay";
import InsuranceBtnAndCheck from "./InsuranceBtnAndCheck";

import PatientInfoTable from "./PatientInfoTable";
import ViewReport from "../Lab/ViewReport";



function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [patient, setPatient] = useState({});
  const [diagnostics, setDiagnostics] = useState([]);

  const [finalBill, setFinalBill] = useState(null);
  const [billLoading, setBillLoading] = useState(false);

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeTime, setDischargeTime] = useState("");

  const [availableCharges, setAvailableCharges] = useState([]);
  const [selectedChargeIds, setSelectedChargeIds] = useState([]);

  const [selectedConsent, setSelectedConsent] = useState("");
  const [consentData, setConsentData] = useState(null);
  const [consents, setConsents] = useState([]);

  // Consent Form Ref
  const consentRef = useRef(null);

  // ==========================
  // Load Patient
  // ==========================

  const getPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/patient/${id}`
      );

      console.log("PATIENT API RESPONSE =", res.data);
      setPatient(res.data);

      setSelectedChargeIds(
        (res.data.hospitalCharges || []).map(
          (charge) => charge.chargeId
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  const handleChargeChange = (chargeId) => {
    setSelectedChargeIds((prev) =>
      prev.includes(chargeId)
        ? prev.filter((id) => id !== chargeId)
        : [...prev, chargeId]
    );
  };

  const saveHospitalCharges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/patient/${id}/hospital-charges`,
        {
          chargeIds: selectedChargeIds,
        }
      );

      alert("Hospital Charges Saved Successfully");

      await getPatient();
      await getFinalBill();
    } catch (error) {
      console.error("Save Hospital Charges Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to save hospital charges"
      );
    }
  };

  const getFinalBill = async () => {
    try {
      setBillLoading(true);

      if (!dischargeDate) {
        setFinalBill(null);
        return;
      }

      const url =
        `http://localhost:5000/api/patient/${id}/final-bill` +
        `?dischargeDate=${encodeURIComponent(dischargeDate)}` +
        `&dischargeTime=${encodeURIComponent(
          dischargeTime || "23:59"
        )}`;

      const res = await axios.get(url);

      console.log(
        "FINAL BILL RESPONSE =",
        res.data
      );

      setFinalBill(res.data);

    } catch (err) {
      console.log(
        "Final Bill Error:",
        err.response?.data || err
      );

      setFinalBill(null);

    } finally {
      setBillLoading(false);
    }
  };

  // ==========================
  // Load Diagnostics
  // ==========================

  const getDiagnostics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/diagnostics"
      );

      setDiagnostics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAvailableCharges = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/charges"
      );

      setAvailableCharges(res.data || []);
    } catch (err) {
      console.log("Charges Error:", err);
    }
  };

  // ==========================
  // Load Consents
  // ==========================

  const getConsents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/consent/patient/${id}`
      );

      console.log("CONSENTS =", res.data);

      setConsents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Initial Load
  // ==========================

useEffect(() => {
  getPatient();
  getDiagnostics();
  getConsents();
  getAvailableCharges();
}, [id]);

  useEffect(() => {
    if (dischargeDate) {
      getFinalBill();
    }
  }, [dischargeDate, dischargeTime]);
  // ==========================
  // Date Format
  // ==========================

  const date = patient.createdAt
    ? new Date(patient.createdAt)
    : new Date();

  const formatted = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateCurr = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // ==========================
  // Print Consent
  // ==========================

  const printConsent = useReactToPrint({
    contentRef: consentRef,
    documentTitle: `${patient?.uhid}_${selectedConsent}`,
  });

  // ==========================
  // Latest Consent
  // ==========================

  const latestConsent = consents
    .filter((item) => item.consentType === selectedConsent)
    .at(1);

  // ==========================
  // Generate Consent PDF
  // ==========================

  const generateConsentPdf = async () => {
    if (!consentRef.current) {
      alert("Consent Form Not Found");
      return null;
    }

    const options = {
      margin: 2,

      filename: `${patient.uhid}_${selectedConsent}.pdf`,

      image: {
        type: "jpeg",
        quality: 1,
      },

      html2canvas: {
        scale: 4,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: "#fff",

        windowWidth: consentRef.current.scrollWidth,
        windowHeight: consentRef.current.scrollHeight,
      },

      jsPDF: {
        unit: "mm",
        format: "a3",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["css", "legacy"],
      },
    };

    const worker = html2pdf()
      .set(options)
      .from(consentRef.current);

    return await worker.outputPdf("blob");
  };

  // ==========================
  // Save Consent PDF
  // ==========================

  const saveConsentPdf = async () => {
    if (!selectedConsent) {
      alert("Please Select Consent Form");
      return;
    }

    if (!consentData) {
      alert("Please Fill Consent Form");
      return;
    }

    try {
      // Generate PDF
      const pdfBlob = await generateConsentPdf();

      if (!pdfBlob) {
        alert("PDF Generation Failed");
        return;
      }

      // Upload PDF
      const formData = new FormData();

      formData.append(
        "file",
        pdfBlob,
        `${patient.uhid}_${selectedConsent}.pdf`
      );

      const uploadRes = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const pdfPath = uploadRes.data.filePath;

      // Save MongoDB
      await axios.post(
        "http://localhost:5000/consent/save",
        {
          patientId: patient._id,
          patientName: patient.name,
          uhid: patient.uhid,
          consentType: selectedConsent,
          consentData,
          pdfPath,
        }
      );

      alert("Consent Saved Successfully");

      getConsents();
    } catch (err) {
      console.log(err);
      alert("Consent Save Failed");
    }
  };


  console.log(patient);
  // ==========================
  // JSX
  // ==========================

  return (
    <div className="patient-page">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-light mb-2"
      >
        🔙
      </button>

      <h1>Patient Information</h1>

      {/* ==========================
          Patient Information
      =========================== */}

      <div className="patient-card p-3 mb-2 bg-transparent text-primary">

        <div className="patient-info">

          <div className="row">
            <div className="col-6">
              <p>
                <label>UHID :</label>
                {patient.uhid}
              </p>
            </div>

            <div className="col-6">
              <p>
                <label>Name :</label>
                {patient.name}
              </p>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-6">
              <p>
                <label>Age :</label>
                {patient.age}
              </p>
            </div>

            <div className="col-6">
              <p>
                <label>Gender :</label>
                {patient.gender}
              </p>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-6">
              <p>
                <label>Mobile :</label>
                {patient.mobile}
              </p>
            </div>

            <div className="col-6">
              <p>
                <label>Address :</label>
                {patient.address}
              </p>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-6">
              <p>
                <label>Status :</label>
                {patient.status}
              </p>
            </div>

            <div className="col-6">
              <p>
                <label>Register Date :</label>
                {formatted}
              </p>
            </div>
          </div>

        </div>
      </div>

      <br />

      <InsuranceBtnAndCheck patientId={id} />

      {/* <Billing/> */}

      {/* <BajajAllianzClaimForm/> */}
      {/* ==========================
          Consent Forms
      =========================== */}

      <div className="mt-4">

        <PatientForm
          patient={patient}
          selectedConsent={selectedConsent}
          setSelectedConsent={setSelectedConsent}
          onSave={setConsentData}
          consentRef={consentRef}
        />

        <div
          className="mt-3"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >

          <button
            className="btn btn-success"
            onClick={printConsent}
          >
            Print Consent
          </button>

          <button
            className="btn btn-secondary"
            onClick={saveConsentPdf}
          >
            Save Consent
          </button>

        </div>
      </div>

      {/* ===========================
                Reports Table
            ============================ */}

      <div className="table-responsive mt-4">
        <table className="table table-bordered table-render-style">
          <thead>
            <tr>
              <th>Date</th>

              <th>Lab Test</th>

              <th>Diagnostic</th>

              <th>Pharmacy</th>

              <th>Nurse</th>

              <th>Doctor</th>

              <th>Insurance</th>

              <th>Consent</th>
            </tr>
          </thead>

          <tr>
            <td>{formatted}</td>

            <td>
              <ViewReport
                isLab={true}
                isDiagnostic={false}
                patientId={patient._id}
              />
            </td>

            <td>
              <ViewReport
                isLab={false}
                isDiagnostic={true}
                patientId={patient._id}
              />
            </td>

            <td>
              <PdfCreate patient={patient} pdfname="Pharma" type="pharmacy" />
            </td>

            <td>
              <PdfCreate patient={patient} pdfname="Nurse" type="nurse" />
            </td>

            <td>
              <PdfCreate patient={patient} pdfname="Doctor" type="doctor" />
            </td>

            <td>
              <PdfCreate
                patient={patient}
                pdfname="Insurance"
                type="insurance"
              />
            </td>

            <td>
              {latestConsent && (
                <button
                  className="btn btn-outline-success"
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    window.open(
                      `http://localhost:5000${latestConsent.pdfPath}`,
                      "_blank",
                    )
                  }
                >
                  Download
                </button>
              )}
            </td>
          </tr>
        </table>

        {/* <div className="text-center mt-3">
          <button
            className="btn btn-success"
            disabled={!finalBill || billLoading}
            onClick={async () => {
              try {
                if (!finalBill?.finalAmount) {
                  alert("Final bill amount is not available");
                  return;
                }

                const res = await axios.post(
                  "http://localhost:5000/api/billing/final/cash",
                  {
                    patientId: patient._id,

                    dischargeDate:
                      finalBill.dischargeDate,

                    dischargeTime:
                      finalBill.dischargeTime,

                    stayDays:
                      finalBill.stayDays,

                    roomCharge:
                      finalBill.roomTotal || 0,

                    bedCharge:
                      finalBill.bedTotal || 0,

                    doctorConsultancyFee:
                      finalBill.doctorTotal || 0,

                    otherCharges:
                      finalBill.otherCharges || 0,

                    totalAmount:
                      finalBill.finalAmount || 0,

                    paymentMode:
                      "Cash",
                  }
                );

                if (res.data.success) {
                  alert("Cash Payment Saved Successfully");

                  await getPatient();

                  setDischargeDate("");
                  setDischargeTime("");

                  setFinalBill(null);
                }
              } catch (error) {
                console.error("Cash Payment Error:", error);
                alert(
                  error.response?.data?.message ||
                  "Cash payment failed"
                );
              }
            }}
          >
            Pay Cash ₹{finalBill?.finalAmount || 0}
          </button>
        </div> */}

      </div>

      {/* ===========================
          Final Hospital Bill
      ============================ */}

      <div
        className="card mt-4 p-4"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        {/* <h2 className="text-primary">Final Hospital Bill</h2>

        <div className="mb-4">
          <h4>Hospital Charges</h4>

          {availableCharges.length === 0 ? (
            <p>No hospital charges available.</p>
          ) : (
            <div>
              {availableCharges.map((charge) => (
                <div key={charge._id} className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`charge-${charge._id}`}
                    checked={selectedChargeIds.includes(charge._id)}
                    onChange={() => handleChargeChange(charge._id)}
                  />

                  <label
                    className="form-check-label"
                    htmlFor={`charge-${charge._id}`}
                  >
                    {charge.chargeName}
                    {charge.category
                      ? ` (${charge.category})`
                      : ""}{" "}
                    - ₹{Number(charge.amount || 0)}
                  </label>
                </div>
              ))}
            </div>
          )}

          <button
            className="btn btn-primary mt-2"
            onClick={saveHospitalCharges}
          >
            Save Hospital Charges
          </button>
        </div> */}

        <div className="mb-3">
          <label className="form-label">
            <strong>Discharge Date</strong>
          </label>

          <input
            type="date"
            className="form-control"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            <strong>Discharge Time</strong>
          </label>

          <input
            type="time"
            className="form-control"
            value={dischargeTime}
            onChange={(e) => setDischargeTime(e.target.value)}
          />
        </div>

        {billLoading ? (
          <p>Calculating final bill...</p>
        ) : finalBill ? (
          <>
            <div className="row mt-3">
              <div className="col-md-6">
                <p>
                  <strong>UHID:</strong> {finalBill.patient?.uhid || "N/A"}
                </p>

                <p>
                  <strong>Patient Name:</strong>{" "}
                  {finalBill.patient?.name || "N/A"}
                </p>

                <p>
                  <strong>Patient Type:</strong>{" "}
                  {finalBill.patient?.role || "N/A"}
                </p>
              </div>

              <div className="col-md-6">
                <p>
                  <strong>Room No:</strong>{" "}
                  {finalBill.patient?.roomNo || "N/A"}
                </p>

                <p>
                  <strong>Bed No:</strong>{" "}
                  {finalBill.patient?.bedNo || "N/A"}
                </p>

                <p>
                  <strong>Room Type:</strong>{" "}
                  {finalBill.patient?.roomType || "N/A"}
                </p>
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Admission Date:</strong>{" "}
                  {finalBill.admissionDate || "N/A"}
                </p>
              </div>

              <div className="col-md-6">
                <p>
                  <strong>Discharge Date:</strong>{" "}
                  {finalBill.dischargeDate || "N/A"}
                </p>
              </div>
            </div>

            <hr />

            <h4>Room Charges</h4>

            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Stay Days</td>
                  <td>{finalBill.stayDays}</td>
                </tr>

                <tr>
                  <td>Room Charges / Day</td>
                  <td>₹{finalBill.room?.chargesPerDay || 0}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Room Total</strong>
                  </td>
                  <td>
                    <strong>₹{finalBill.roomTotal || 0}</strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    Doctor Fee
                    {finalBill.doctor?.name
                      ? ` (${finalBill.doctor.name})`
                      : ""}
                  </td>

                  <td>₹{finalBill.doctorFee || 0}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Doctor Total</strong>
                  </td>

                  <td>
                    <strong>₹{finalBill.doctorTotal || 0}</strong>
                  </td>
                </tr>


                {finalBill.charges?.length > 0 && (
                  <>
                    <tr>
                      <td colSpan="2">
                        <strong>Hospital Charges</strong>
                      </td>
                    </tr>

                    {finalBill.charges.map((charge) => (
                      <tr key={charge._id}>
                        <td>
                          {charge.chargeName}
                          {charge.category ? ` (${charge.category})` : ""}
                        </td>

                        <td>₹{Number(charge.amount || 0)}</td>
                      </tr>
                    ))}
                  </>
                )}

                <tr>
                  <td>Other Hospital Charges</td>
                  <td>₹{finalBill.otherCharges || 0}</td>
                </tr>

                <tr>
                  <td>
                    <strong>FINAL AMOUNT</strong>
                  </td>

                  <td>
                    <strong style={{ fontSize: "20px" }}>
                      ₹{finalBill.finalAmount || 0}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <p>No final billing information available.</p>
        )}
      </div>

      <Razorpay
        patientName={patient.name}
        patientMob={patient.mobile}
        patientId={patient._id}
        source="Billing"
        finalBill={finalBill}
      />

            <PatientInfoTable
        patient={patient}
        latestConsent={latestConsent}
        dateCurr={dateCurr}
      />

      <MergePdf />

    </div>
  );
}

export default PatientDetail;