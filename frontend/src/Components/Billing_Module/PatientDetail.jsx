import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
// import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useReactToPrint } from "react-to-print";

import { useParams } from "react-router-dom";

import html2pdf from "html2pdf.js";

import ViewReport from "../Lab/ViewReport";
import PdfCreate from "./PdfCreate";
import MergePdf from "./MergePdf";
import PatientForm from "./PatientForm";

import "./style/PatientDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Razorpay from "../Razorpay";

function PatientDetail() {
  const { id } = useParams();

  // ==========================
  // States
  // ==========================

  const [patient, setPatient] = useState({});
  const [diagnostics, setDiagnostics] = useState([]);

  const [finalBill, setFinalBill] = useState(null);
const [billLoading, setBillLoading] = useState(false);

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
      const res = await axios.get(`http://localhost:5000/api/patient/${id}`);

      console.log("PATIENT API RESPONSE =", res.data);
      setPatient(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFinalBill = async () => {
  try {
    setBillLoading(true);

    const res = await axios.get(
      `http://localhost:5000/api/patient/${id}/final-bill`,
    );

    console.log("FINAL BILL RESPONSE =", res.data);

    setFinalBill(res.data);
  } catch (err) {
    console.log("Final Bill Error:", err);

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
      const res = await axios.get("http://localhost:5000/diagnostics");

      setDiagnostics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Load Consents
  // ==========================

  const getConsents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/consent/patient/${id}`,
      );

      console.log("CONSENTS =", res.data);

      setConsents(res.data);

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

  getFinalBill();
}, []);

  // ==========================
  // Date Format
  // ==========================

  const date = new Date(patient.createdAt);

  const formatted = date.toLocaleString(
    "en-IN",

    {
      timeZone: "Asia/Kolkata",

      day: "2-digit",

      month: "short",

      year: "numeric",

      hour: "2-digit",

      minute: "2-digit",

      second: "2-digit",

      hour12: true,
    },
  );
  // ==========================
  // Print Consent
  // ==========================

  const printConsent = useReactToPrint({
    contentRef: consentRef,

    documentTitle: `${patient?.uhid}_${selectedConsent}`,
  });

  const latestConsent = consents
    .filter((item) => item.consentType === selectedConsent)
    .at(1);

  const generateConsentPdf = async () => {
    if (!consentRef.current) {
      alert("Consent Form Not Found");

      return null;
    }

    document.body.classList.add("print-mode");

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

    document.body.classList.remove("print-mode");

    const worker = html2pdf()
      .set(options)

      .from(consentRef.current);

    return await worker.outputPdf("blob");
  };

  // ==========================
  // Save Consent
  // ==========================

  const saveConsentPdf = async () => {
    if (!patient?._id) {
      alert("Patient Data Not Loaded");

      return;
    }

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

        `${patient.uhid}_${selectedConsent}.pdf`,
      );

      const uploadRes = await axios.post(
        "http://localhost:5000/upload",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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
        },
      );

      alert("Consent Saved Successfully");

      getConsents();
    } catch (err) {
      console.log(err);

      alert("Consent Save Failed");
    }
  };

  return (
    <div className="patient-page">
      <h1>Patient Information</h1>

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

      {/* ===========================
                Consent Forms
            ============================ */}

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
          <button className="btn btn-success" onClick={printConsent}>
            Print Consent
          </button>

          <button className="btn btn-secondary" onClick={saveConsentPdf}>
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
  <h2 className="text-primary">Final Hospital Bill</h2>

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
/>

      <MergePdf />
    </div>
  );
}

export default PatientDetail;
