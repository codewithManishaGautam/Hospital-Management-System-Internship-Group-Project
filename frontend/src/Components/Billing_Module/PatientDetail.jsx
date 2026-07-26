

// import React,
// {
//    useEffect,
//    useState
// }
//    from "react";

// import axios
//    from "axios";

// import {
//    useParams,
//    Link
// }
//    from "react-router-dom";

// import ViewReport from "../Lab/ViewReport";

// import PdfCreate
//    from "./PdfCreate";

// import "./style/PatientDetail.css";

// import MergePdf
//    from "./MergePdf";




// function PatientDetail() {

//    const { id } =
//       useParams();

//    // Patient State
//    const [patient,
//       setPatient] =
//       useState({});

//    // Diagnostic State
//    const [diagnostics,
//       setDiagnostics] =

//       useState([]);


//    // Get Patient
//    const getPatient =
//       async () => {

//          try {

//             const res =
//                await axios.get(

//                   `http://localhost:5000/patient/${id}`

//                );

//             setPatient(
//                res.data
//             );

//          }

//          catch (error) {

//             console.log(error);

//          }

//       };


//    // Get Diagnostics
//    const getDiagnostics =
//       async () => {

//          try {

//             const res =
//                await axios.get(

//                   "http://localhost:5000/diagnostics"

//                );

//             setDiagnostics(
//                res.data
//             );

//          }

//          catch (error) {

//             console.log(error);

//          }

//       };


//    useEffect(() => {

//       getPatient();

//       getDiagnostics();

//    }, []);


//    // PDF Names
//    const Lab =
//       "Lab";

//    const Pharma =
//       "Pharma";

//    const Nurse =
//       "Nurse";

//    const Doctor =
//       "Doctor";

//    const Insurance =
//       "Insurance";



//    return (

//       <div className="patient-page">

//          <h1>Patient Information</h1>

//          <div className="patient-card" className="p-3 mb-2 bg-transparent text-primary">

//             <div className="patient-info">

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>UHID :</label> {patient.uhid}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Name :</label> {patient.name}
//                      </p>

//                   </div>

//                </div>
//                <br />


//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Age :</label> {patient.age}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Gender :</label> {patient.gender}
//                      </p>
//                   </div>

//                </div>
//                <br />

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Mobile :</label> {patient.mobile}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Address :</label> {patient.address}
//                      </p>
//                   </div>

//                </div>
//                <br />

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Status :</label> {patient.status}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Register Date & Time :</label> {patient.createdAt}
//                      </p>
//                   </div>

//                </div>
//                <br />


//             </div>

//             <div className="patient-action">

//                <Link
//                   to={`/add-diagnostic/${patient._id}`}
//                   className="btn btn-success"
//                >
//                   Add Diagnostic
//                </Link>

//             </div>

//          </div>

//          <div className="table-responsive">

//             <table
//                className="table table-bordered"
//             >

//                <thead>

//                   <tr>

//                      <th>Date</th>

//                      <th>Lab Test</th>

//                      <th>Diagnostic</th>

//                      <th>Pharma</th>

//                      <th>Nurse</th>

//                      <th>Doctor Fee</th>

//                      <th>Insurance</th>

//                   </tr>

//                </thead>

//                <tbody>

//                   <tr>

//                      <td>09/05/2026</td>

//                      <td>
//                         <ViewReport

//                            isLab={true}

//                            isDiagnostic={false}

//                            patientId={patient._id}

//                         />

//                      </td>

//                      <td>

//                         <ViewReport

//                            isLab={false}

//                            isDiagnostic={true}

//                            patientId={patient._id}

//                         />


//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Pharma"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Nurse"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Doctor"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Insurance"
//                         />

//                      </td>

//                   </tr>



//                </tbody>

//             </table>

//          </div>

//          <div className="mt-3">

//             <MergePdf />

//          </div>

//       </div>

//    );

// }

// export default PatientDetail;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";


// import ViewReport from "../Lab/ViewReport";
// import PdfCreate from "./PdfCreate";
// import "./style/PatientDetail.css";
// import MergePdf from "./MergePdf";
// import PatientForm from "./PatientForm";

// // Consent Forms
// import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";

// function PatientDetail() {

//    const { id } = useParams();

//    // Patient State
//    const [patient, setPatient] = useState({});

//    // Diagnostic State
//    const [diagnostics, setDiagnostics] = useState([]);

//    // Consent State
//    const [selectedConsent, setSelectedConsent] = useState("");

//    const [consentData, setConsentData] = useState(null);

//    // Get Patient
//    const getPatient = async () => {

//       try {

//          const res = await axios.get(
//             `http://localhost:5000/patient/${id}`
//          );

//          setPatient(res.data);

//       }

//       catch (error) {

//          console.log(error);

//       }

//    };

//    // Get Diagnostics
//    const getDiagnostics = async () => {

//       try {

//          const res = await axios.get(
//             "http://localhost:5000/diagnostics"
//          );

//          setDiagnostics(res.data);

//       }

//       catch (error) {

//          console.log(error);

//       }

//    };

//    // Save Consent Data
//    const saveConsent = (data) => {

//       console.log("Consent Data");

//       console.log(data);

//       setConsentData(data);

//    };


//    const submitConsent = async () => {

//    if (!selectedConsent) {

//       alert("Please Select Consent Form");

//       return;

//    }

//    try {

//       const res = await axios.post(

//          "http://localhost:5000/consent/save",

//          {

//             patientId: patient._id,

//             patientName: patient.name,

//             uhid: patient.uhid,

//             consentType: selectedConsent,

//             consentData

//          }

//       );

//       alert(res.data.message);

//    }

//    catch (err) {

//       console.log(err);

//       alert("Consent Save Failed");

//    }

// };

//    useEffect(() => {

//       getPatient();

//       getDiagnostics();

//    }, []);


// const date = new Date(patient.createdAt);

// const formatted = date.toLocaleString("en-IN", {
//   timeZone: "Asia/Kolkata",
//   day: "2-digit",
//   month: "short",
//   year: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
//   hour12: true,
// });

// console.log(formatted);

//    // PDF Names
//    const Lab = "Lab";
//    const Pharma = "Pharma";
//    const Nurse = "Nurse";
//    const Doctor = "Doctor";
//    const Insurance = "Insurance";



//    {/* ================= Consent Forms ================= */}

// return(


//    <div className="patient-page">

//          <h1>Patient Information</h1>

//          <div className="patient-card" className="p-3 mb-2 bg-transparent text-primary">

//             <div className="patient-info">

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>UHID :</label> {patient.uhid}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Name :</label> {patient.name}
//                      </p>

//                   </div>

//                </div>
//                <br />


//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Age :</label> {patient.age}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Gender :</label> {patient.gender}
//                      </p>
//                   </div>

//                </div>
//                <br />

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Mobile :</label> {patient.mobile}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Address :</label> {patient.address}
//                      </p>
//                   </div>

//                </div>
//                <br />

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Status :</label> {patient.status}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Register Date & Time :</label> {formatted}
//                      </p>
//                   </div>

//                </div>
//                <br />


//             </div>



//             <div>
//                <PatientForm/>
//             </div>

//          </div>

//          <div className="table-responsive">

//             <table
//                className="table table-bordered"
//             >

//                <thead>

//                   <tr>

//                      <th>Date</th>

//                      <th>Lab Test</th>

//                      <th>Diagnostic</th>

//                      <th>Pharma</th>

//                      <th>Nurse</th>

//                      <th>Doctor Fee</th>

//                      <th>Insurance</th>

//                   </tr>

//                </thead>

//                <tbody>

//                   <tr>

//                      <td>09/05/2026</td>

//                      <td>
//                         <ViewReport

//                            isLab={true}

//                            isDiagnostic={false}

//                            patientId={patient._id}

//                         />

//                      </td>

//                      <td>

//                         <ViewReport

//                            isLab={false}

//                            isDiagnostic={true}

//                            patientId={patient._id}

//                         />


//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Pharma"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Nurse"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Doctor"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Insurance"
//                         />

//                      </td>

//                   </tr>



//                </tbody>

//             </table>

//          </div>

//          <div className="mt-3">

//             <MergePdf />

//          </div>

//       </div>


//    );
// }


// export default PatientDetail;





// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// import ViewReport from "../Lab/ViewReport";
// import PdfCreate from "./PdfCreate";
// import "./style/PatientDetail.css";
// import MergePdf from "./MergePdf";
// import PatientForm from "./PatientForm";

// // Consent Forms
// import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";
// function PatientDetail() {

//   const { id } = useParams();

// // Patient State
// const [patient, setPatient] = useState({});

// // Diagnostic State
// const [diagnostics, setDiagnostics] = useState([]);

// // Consent
// const [selectedConsent, setSelectedConsent] = useState("");

// const [consentData, setConsentData] = useState(null);

// // PDF Ref
// const consentRef = useRef();




//    // Get Patient
//    const getPatient = async () => {

//       try {

//          const res = await axios.get(
//             `http://localhost:5000/patient/${id}`
//          );

//          setPatient(res.data);

//       }

//       catch (error) {

//          console.log(error);

//       }

//    };

//    // Get Diagnostics
//    const getDiagnostics = async () => {

//       try {

//          const res = await axios.get(
//             "http://localhost:5000/diagnostics"
//          );

//          setDiagnostics(res.data);

//       }

//       catch (error) {

//          console.log(error);

//       }

//    };

//    // Save Consent Data

//    const generateConsentPdf = async () => {

//     if (!consentRef.current) {

//         alert("Consent Form Not Found");

//         return null;

//     }

//     const canvas = await html2canvas(

//         consentRef.current,

//         {

//             scale: 2

//         }

//     );

//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF(

//         "p",

//         "mm",

//         "a4"

//     );

//     const pdfWidth = pdf.internal.pageSize.getWidth();

//     const pdfHeight =

//         (canvas.height * pdfWidth) /

//         canvas.width;

//     pdf.addImage(

//         imgData,

//         "PNG",

//         0,

//         0,

//         pdfWidth,

//         pdfHeight

//     );

//     return pdf.output("blob");

// };


//    const submitConsent = async () => {

//     if (!selectedConsent) {

//         alert("Please Select Consent Form");

//         return;

//     }

//     try {

//         // =============================
//         // Generate PDF
//         // =============================

//         const pdfBlob = await generateConsentPdf();

//         if (!pdfBlob) {

//             return;

//         }

//         // =============================
//         // Upload PDF
//         // =============================

//         const formData = new FormData();

//         formData.append(

//             "file",

//             pdfBlob,

//             `${selectedConsent}.pdf`

//         );

//         const uploadRes = await axios.post(

//             "http://localhost:5000/upload",

//             formData,

//             {

//                 headers: {

//                     "Content-Type": "multipart/form-data"

//                 }

//             }

//         );

//         const pdfPath = uploadRes.data.filePath;

//         // =============================
//         // Save MongoDB
//         // =============================

//         const res = await axios.post(

//             "http://localhost:5000/consent/save",

//             {

//                 patientId: patient._id,

//                 patientName: patient.name,

//                 uhid: patient.uhid,

//                 consentType: selectedConsent,

//                 consentData,

//                 pdfPath

//             }

//         );

//         alert(res.data.message);

//     }

//     catch (err) {

//         console.log(err);

//         alert("Consent Save Failed");

//     }

// };

//    useEffect(() => {

//       getPatient();

//       getDiagnostics();

//    }, []);


// const date = new Date(patient.createdAt);

// const formatted = date.toLocaleString("en-IN", {
//   timeZone: "Asia/Kolkata",
//   day: "2-digit",
//   month: "short",
//   year: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
//   hour12: true,
// });

// console.log(formatted);

//    // PDF Names
//    const Lab = "Lab";
//    const Pharma = "Pharma";
//    const Nurse = "Nurse";
//    const Doctor = "Doctor";
//    const Insurance = "Insurance";



//    {/* ================= Consent Forms ================= */}

// return(


//    <div className="patient-page">

//          <h1>Patient Information</h1>

//          <div className="patient-card" className="p-3 mb-2 bg-transparent text-primary">

//             <div className="patient-info">

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>UHID :</label> {patient.uhid}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Name :</label> {patient.name}
//                      </p>

//                   </div>

//                </div>
//                <br />


//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Age :</label> {patient.age}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Gender :</label> {patient.gender}
//                      </p>
//                   </div>

//                </div>
//                <br />

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Mobile :</label> {patient.mobile}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Address :</label> {patient.address}
//                      </p>
//                   </div>

//                </div>
//                <br />

//                <div className="row">
//                   <div className="col-6">
//                      <p>
//                         <label>Status :</label> {patient.status}
//                      </p>
//                   </div>
//                   <div className="col-6">
//                      <p>
//                         <label>Register Date & Time :</label> {formatted}
//                      </p>
//                   </div>

//                </div>
//                <br />


//             </div>



//             <div>
//                <PatientForm/>
//             </div>

//          </div>

//          <div className="table-responsive">

//             <table
//                className="table table-bordered"
//             >

//                <thead>

//                   <tr>

//                      <th>Date</th>

//                      <th>Lab Test</th>

//                      <th>Diagnostic</th>

//                      <th>Pharma</th>

//                      <th>Nurse</th>

//                      <th>Doctor Fee</th>

//                      <th>Insurance</th>

//                   </tr>

//                </thead>

//                <tbody>

//                   <tr>

//                      <td>09/05/2026</td>

//                      <td>
//                         <ViewReport

//                            isLab={true}

//                            isDiagnostic={false}

//                            patientId={patient._id}

//                         />

//                      </td>

//                      <td>

//                         <ViewReport

//                            isLab={false}

//                            isDiagnostic={true}

//                            patientId={patient._id}

//                         />


//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Pharma"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Nurse"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Doctor"
//                         />

//                      </td>

//                      <td>

//                         <PdfCreate
//                            patient={patient}
//                            pdfname="Insurance"
//                         />

//                      </td>

//                   </tr>



//                </tbody>

//             </table>

//          </div>

//          <div className="mt-3">

//             <MergePdf />

//          </div>

//       </div>


//    );
// }


// export default PatientDetail;




// import React, {
//     useEffect,
//     useState,
//     useRef
// } from "react";

// import axios from "axios";
// import { useReactToPrint } from "react-to-print";

// import {
//     useParams
// } from "react-router-dom";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// import ViewReport from "../Lab/ViewReport";
// import PdfCreate from "./PdfCreate";
// import MergePdf from "./MergePdf";
// import PatientForm from "./PatientForm";

// import "./style/PatientDetail.css";

// // Consent Forms

// import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";


// function PatientDetail() {

//     const { id } = useParams();

//     // Patient State

//     const [patient, setPatient] = useState({});

//     const [diagnostics, setDiagnostics] = useState([]);

//     // Consent

//     const [selectedConsent, setSelectedConsent] = useState("");

//     const [consentData, setConsentData] = useState(null);

//     const [consents, setConsents] = useState([]);

//     const consentRef = useRef(null);





//     // Get Patient

//     const getConsents = async () => {

//         try {

//             const res = await axios.get(

//                 `http://localhost:5000/consent/${id}`

//             );

//             setConsents(res.data);

//         }

//         catch (err) {

//             console.log(err);

//         }

//     };

//     const getPatient = async () => {

//         try {

//             const res = await axios.get(

//                 `http://localhost:5000/patient/${id}`

//             );

//             setPatient(res.data);

//         }

//         catch (err) {

//             console.log(err);

//         }

//     };

//     // Get Diagnostics

//     const getDiagnostics = async () => {

//         try {

//             const res = await axios.get(

//                 "http://localhost:5000/diagnostics"

//             );

//             setDiagnostics(res.data);

//         }

//         catch (err) {

//             console.log(err);

//         }

//     };

//     useEffect(() => {

//         getPatient();

//         getDiagnostics();

//         getConsents();

//     }, []);

//     // Date Format

//     const date = new Date(patient.createdAt);

//     const formatted = date.toLocaleString(

//         "en-IN",

//         {

//             timeZone: "Asia/Kolkata",

//             day: "2-digit",

//             month: "short",

//             year: "numeric",

//             hour: "2-digit",

//             minute: "2-digit",

//             second: "2-digit",

//             hour12: true

//         }

//     );



//     // const saveConsentPdf = async () => {

//     //     alert("saveConsentPdf called");

//     //     console.log("saveConsentPdf called");
//     //     if (!patient?._id) {

//     //         alert("Patient Data Not Loaded");

//     //         return;

//     //     }

//     //     if (!selectedConsent) {

//     //         alert("Please Select Consent Form");

//     //         return;

//     //     }

//     //     console.log("Consent Data =", consentData);

//     //     if (!consentData) {

//     //         alert("Please Fill Consent Form");

//     //         return;

//     //     }

//     //     try {

//     //         // Generate PDF

//     //         console.log("Step 1");

//     //         const pdfBlob = await generateConsentPdf();

//     //         console.log("Step 2", pdfBlob);


//     //         if (!pdfBlob) {




//     //             alert("PDF Generation Failed");

//     //             return;

//     //         }

//     //         // Upload PDF

//     //         const formData = new FormData();

//     //         formData.append(

//     //             "file",

//     //             pdfBlob,

//     //             `${patient.uhid}_${selectedConsent}.pdf`

//     //         );

//     //         console.log("Step 3");


//     //         const uploadRes = await axios.post(

//     //             "http://localhost:5000/upload",

//     //             formData,

//     //             {

//     //                 headers: {

//     //                     "Content-Type": "multipart/form-data"

//     //                 }

//     //             }

//     //         );

//     //         console.log("Step 4", uploadRes.data);


//     //         console.log("UPLOAD RESPONSE =", uploadRes.data);

//     //         // IMPORTANT
//     //         const pdfPath = uploadRes.data.filePath;

//     //         console.log("Step 5", pdfPath);


//     //         console.log("PDF PATH =", pdfPath);

//     //         // Save Consent MongoDB

//     //         const res = await axios.post(

//     //             "http://localhost:5000/consent/save",

//     //             {

//     //                 patientId: patient._id,

//     //                 patientName: patient.name,

//     //                 uhid: patient.uhid,

//     //                 consentType: selectedConsent,

//     //                 consentData,

//     //                 pdfPath: pdfPath

//     //             }

//     //         );

//     //         console.log("Step 6", res.data);

//     //         console.log(res.data);

//     //         alert("Consent Saved Successfully");

//     //     }

//     //     catch (err) {

//     //         console.log("FULL ERROR =", err);

//     //         console.log("Response =", err.response);

//     //         console.log("Response Data =", err.response?.data);

//     //         console.log("Message =", err.message);


//     //         alert("Consent Save Failed");

//     //     }

//     // };


//     const printConsent = useReactToPrint({
//         contentRef: consentRef,
//         documentTitle: `${patient?.uhid}_${selectedConsent}`,
//     });
//     // Generate PDF

//     const generateConsentPdf = async () => {

//         if (!consentRef.current) {

//             alert("Consent Form Not Found");

//             return null;

//         }

//         const canvas = await html2canvas(

//             consentRef.current,

//             {

//                 scale: 2

//             }

//         );

//         const imgData = canvas.toDataURL("image/png");

//         const pdf = new jsPDF("p", "mm", "a4");

//         const imgWidth = 210;
//         const pageHeight = 297;

//         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//         let heightLeft = imgHeight;
//         let position = 0;

//         pdf.addImage(
//             imgData,
//             "PNG",
//             0,
//             position,
//             imgWidth,
//             imgHeight
//         );

//         heightLeft -= pageHeight;

//         while (heightLeft > 0) {

//             position = heightLeft - imgHeight;

//             pdf.addPage();

//             pdf.addImage(
//                 imgData,
//                 "PNG",
//                 0,
//                 position,
//                 imgWidth,
//                 imgHeight
//             );

//             heightLeft -= pageHeight;
//         }

//         return pdf.output("blob");

//     };

//     return (

//         <div className="patient-page">

//             <h1>

//                 Patient Information

//             </h1>

//             <div

//                 className="patient-card p-3 mb-2 bg-transparent text-primary"

//             >

//                 <div className="patient-info">

//                     <div className="row">

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     UHID :

//                                 </label>

//                                 {patient.uhid}

//                             </p>

//                         </div>

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     Name :

//                                 </label>

//                                 {patient.name}

//                             </p>

//                         </div>

//                     </div>

//                     <br />

//                     <div className="row">

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     Age :

//                                 </label>

//                                 {patient.age}

//                             </p>

//                         </div>

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     Gender :

//                                 </label>

//                                 {patient.gender}

//                             </p>

//                         </div>

//                     </div>

//                     <br />

//                     <div className="row">

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     Mobile :

//                                 </label>

//                                 {patient.mobile}

//                             </p>

//                         </div>

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     Address :

//                                 </label>

//                                 {patient.address}

//                             </p>

//                         </div>

//                     </div>

//                     <br />

//                     <div className="row">

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     Status :

//                                 </label>

//                                 {patient.status}

//                             </p>

//                         </div>

//                         <div className="col-6">

//                             <p>

//                                 <label>

//                                     Register Date :

//                                 </label>

//                                 {formatted}

//                             </p>

//                         </div>

//                     </div>

//                 </div>


//                 <PatientForm
//                     patient={patient}
//                     selectedConsent={selectedConsent}
//                     setSelectedConsent={setSelectedConsent}
//                     onSave={setConsentData}
//                     consentRef={consentRef}
//                 />

//                 {/* <button
//                     className="btn btn-success"
//                     onClick={saveConsentPdf}
//                 >
//                     Save Consent
//                 </button> */}

//                 <button
//                     className="btn btn-success"

//                     onClick={() => {
//                         console.log("Button Clicked");
//                                 console.log(consentRef.current);
//                         printConsent();
//                     }}
//                 >
//                     Print / Save PDF
//                 </button>

//             </div>
//             {/* ===========================
//                 Reports Table
//             ============================ */}

//             <div className="table-responsive mt-4">

//                 <table className="table table-bordered">

//                     <thead>

//                         <tr>

//                             <th>Date</th>

//                             <th>Lab Test</th>

//                             <th>Diagnostic</th>

//                             <th>Pharma</th>

//                             <th>Nurse</th>

//                             <th>Doctor Fee</th>

//                             <th>Insurance</th>

//                             <th>Consent</th>

//                         </tr>

//                     </thead>

//                     <tbody>

//                         <tr>

//                             <td>

//                                 {formatted}

//                             </td>

//                             <td>

//                                 <ViewReport

//                                     isLab={true}

//                                     isDiagnostic={false}

//                                     patientId={patient._id}

//                                 />

//                             </td>

//                             <td>

//                                 <ViewReport

//                                     isLab={false}

//                                     isDiagnostic={true}

//                                     patientId={patient._id}

//                                 />

//                             </td>

//                             <td>

//                                 <PdfCreate

//                                     patient={patient}

//                                     pdfname="Pharma"

//                                 />

//                             </td>

//                             <td>

//                                 <PdfCreate

//                                     patient={patient}

//                                     pdfname="Nurse"

//                                 />

//                             </td>

//                             <td>

//                                 <PdfCreate

//                                     patient={patient}

//                                     pdfname="Doctor"

//                                 />

//                             </td>

//                             <td>

//                                 <PdfCreate

//                                     patient={patient}

//                                     pdfname="Insurance"

//                                 />

//                             </td>

//                             <td>

//                                 {

//                                     consents.map((item) => (

//                                         <div key={item._id} className="mb-2">

//                                             <a

//                                                 href={`http://localhost:5000${item.pdfPath}`}

//                                                 target="_blank"

//                                                 rel="noreferrer"

//                                                 className="btn btn-primary btn-sm me-2"

//                                             >

//                                                 View

//                                             </a>

//                                             <a

//                                                 href={`http://localhost:5000${item.pdfPath}`}

//                                                 download

//                                                 className="btn btn-success btn-sm"

//                                             >

//                                                 Download

//                                             </a>

//                                         </div>

//                                     ))

//                                 }

//                             </td>


//                         </tr>


//                     </tbody>

//                 </table>



//             </div>
//         </div>

//     );

// }

// export default PatientDetail;




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