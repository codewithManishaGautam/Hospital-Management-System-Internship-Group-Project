
import React, {
    useState,
    useEffect,
    useRef
} from "react";

import axios from "axios";
// import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
    useReactToPrint
} from "react-to-print";

import {
    useParams
} from "react-router-dom";

import html2pdf from "html2pdf.js";

import ViewReport from "../Lab/ViewReport";
import PdfCreate from "./PdfCreate";
import MergePdf from "./MergePdf";
import PatientForm from "./PatientForm";

import "./style/PatientDetail.css";

function PatientDetail() {

    const { id } = useParams();

    // ==========================
    // States
    // ==========================

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

                `http://localhost:5000/patient/${id}`

            );

            setPatient(res.data);

        }

        catch (err) {

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

        }

        catch (err) {

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

            setConsents(res.data);

        }

        catch (err) {

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

            hour12: true

        }

    );
    // ==========================
    // Print Consent
    // ==========================

    const printConsent = useReactToPrint({

        contentRef: consentRef,

        documentTitle: `${patient?.uhid}_${selectedConsent}`

    });



const latestConsent = consents
        .filter(item => item.consentType === selectedConsent)
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

            quality: 1

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

            orientation: "portrait"

        },

        pagebreak: {

            mode: ["css", "legacy"]

        }

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

                `${patient.uhid}_${selectedConsent}.pdf`

            );

            const uploadRes = await axios.post(

                "http://localhost:5000/upload",

                formData,

                {

                    headers: {

                        "Content-Type":

                            "multipart/form-data"

                    }

                }

            );

            const pdfPath =

                uploadRes.data.filePath;

            // Save MongoDB

            await axios.post(

                "http://localhost:5000/consent/save",

                {

                    patientId: patient._id,

                    patientName: patient.name,

                    uhid: patient.uhid,

                    consentType: selectedConsent,

                    consentData,

                    pdfPath

                }

            );

            alert("Consent Saved Successfully");

            getConsents();

        }

        catch (err) {

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

                <div className="mt-3">

                    <button

                        className="btn btn-success"

                        onClick={printConsent}

                    >

                        Print Consent

                    </button>

                    <button

                        className="btn btn-success"

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

                <table className="table table-bordered">

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

                    <tbody>

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

                                <PdfCreate

                                    patient={patient}

                                    pdfname="Pharma"

                                />

                            </td>

                            <td>

                                <PdfCreate

                                    patient={patient}

                                    pdfname="Nurse"

                                />

                            </td>

                            <td>

                                <PdfCreate

                                    patient={patient}

                                    pdfname="Doctor"

                                />

                            </td>

                            <td>

                                <PdfCreate

                                    patient={patient}

                                    pdfname="Insurance"

                                />

                            </td>

                            <td>

                                

                                {
                                    latestConsent && (

                                        <button
                                            className="btn btn-outline-success"
                                            style={{fontSize:"14px",fontWeight:"bold"}}
                                            onClick={() =>
                                                window.open(
                                                    `http://localhost:5000${latestConsent.pdfPath}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            Download
                                        </button>

                                    )
                                }


                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PatientDetail;