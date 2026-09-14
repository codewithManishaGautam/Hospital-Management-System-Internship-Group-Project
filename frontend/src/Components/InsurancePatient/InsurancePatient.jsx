import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";



import "../Billing_Module/style/PatientDetail.css";
import "bootstrap/dist/css/bootstrap.min.css";


import PatientInfoTable from "../Billing_Module/PatientInfoTable";
import InsuranceFormDropDown from "./Forms/InsuranceFormDropDown";

// import Billing from "../../pages/Billing";
// import BajajAllianzClaimForm from "../Insurance/forms/BajajAllianzClaimForm";


function InsurancePatient() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [patient, setPatient] = useState({});
  const [diagnostics, setDiagnostics] = useState([]);

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
    } catch (err) {
      console.log(err);
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
  }, [id]);

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



     <PatientInfoTable patient={patient} latestConsent={latestConsent} dateCurr={dateCurr}/>

     <br /> <br />
     <InsuranceFormDropDown patientId={id}/>

      

    </div>
  );
}

export default InsurancePatient;