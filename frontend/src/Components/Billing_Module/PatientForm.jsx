



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";

// import PdfCreate from "./PdfCreate";
// // import "./style/PatientDetail.css";
// import MergePdf from "./MergePdf";

// // Consent Forms
// import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";

// function PatientForm() {

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

//    // PDF Names
//    const Lab = "Lab";
//    const Pharma = "Pharma";
//    const Nurse = "Nurse";
//    const Doctor = "Doctor";
//    const Insurance = "Insurance";

//    {/* ================= Consent Forms ================= */}

// return(

//    <div>
//       <div className="mt-4">

//     <h3>Billing Consent Forms</h3>

//     <select

//         className="form-control"

//         value={selectedConsent}

//         onChange={(e) =>

//             setSelectedConsent(e.target.value)

//         }

//     >

//         <option value="">Select Consent Form</option>

//         <option value="CashlessMediclaim">

//             Cashless Mediclaim

//         </option>

//         <option value="AdmissionConsent">

//             Admission Consent

//         </option>

//     </select>

// </div>


// {
//     selectedConsent === "CashlessMediclaim" && (

//         <div ref={consentRef}>

//             <CashlessMediclaimMarEng

//                 patient={patient}

//                 onSave={saveConsent}

//             />

//         </div>

//     )
// }
//    </div>

//    );
// }


// export default PatientForm;




// import React from "react";
// import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";

// function PatientForm({
//     patient,
//     selectedConsent,
//     setSelectedConsent,
//     onSave,
//     consentRef
// }) {

//     const saveConsent = (data) => {

//         console.log("PatientForm Data =", data);

//         if (onSave) {
//             onSave(data);
//         }
//     };

//     return (
//         <div>

//             <div className="mt-4">
//                 <h3>Billing Consent Forms</h3>

//                 <select
//                     className="form-control"
//                     value={selectedConsent}
//                     onChange={(e) =>
//                         setSelectedConsent(e.target.value)
//                     }
//                 >
//                     <option value="">
//                         Select Consent Form
//                     </option>

//                     <option value="CashlessMediclaim">
//                         Cashless Mediclaim
//                     </option>

//                     <option value="AdmissionConsent">
//                         Admission Consent
//                     </option>

//                 </select>
//             </div>

//             {
//                 selectedConsent === "CashlessMediclaim" && (

//                     <div ref={consentRef}>

//                         <CashlessMediclaimMarEng
//                             patient={patient}
//                             onSave={saveConsent}
//                         />

//                     </div>

//                 )
//             }

//         </div>
//     );
// }

// export default PatientForm;



// import React from "react";
// import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";

// function PatientForm({
//     patient,
//     selectedConsent,
//     setSelectedConsent,
//     onSave,
//     consentRef
// }) {

//     const saveConsent = (data) => {
//         if (onSave) onSave(data);
//     };

//     return (
//         <div>

//             <div className="mt-4">

//                 <h3>Billing Consent Forms</h3>

//                 <select
//                     className="form-control"
//                     value={selectedConsent}
//                     onChange={(e)=>setSelectedConsent(e.target.value)}
//                 >

//                     <option value="">
//                         Select Consent Form
//                     </option>

//                     <option value="CashlessMediclaim">
//                         Cashless Mediclaim
//                     </option>

//                     <option value="AdmissionConsent">
//                         Admission Consent
//                     </option>

//                 </select>

//             </div>

//             {

//                 selectedConsent==="CashlessMediclaim" &&



//                 <CashlessMediclaimMarEng
//                     ref={consentRef}
//                     patient={patient}
//                     onSave={saveConsent}
//                 />

//             }

//         </div>
//     );
// }

// export default PatientForm;



import React from "react";

import CashlessMediclaimMarEng from "./BillingConsent/CashlessMediclaim/CashlessMediclaimMarEng";
import EstimateMarEng from "./BillingConsent/KharchConsent/EstimateMarEng"; 
function PatientForm({

    patient,
    selectedConsent,
    setSelectedConsent,
    onSave,
    consentRef

}) {

    const saveConsent = (data) => {

        console.log("PatientForm Data =", data);

        if (onSave) {

            onSave(data);

        }

    };

    return (

        <div>

            {/* ===========================
                Consent Dropdown
            ============================ */}

            <div className="mt-4">

                <h3>Billing Consent Forms</h3>
                <select
                    className="form-control"
                    value={selectedConsent}
                    onChange={(e) =>
                        setSelectedConsent(e.target.value)
                    }
                >

                    <option value="">
                        Select Consent Form
                    </option>

                    <option value="CashlessMediclaim">
                        Cashless Mediclaim
                    </option>

                    <option value="KharchConsent">
                        Cost Consent Form
                    </option>

                </select>

            </div>
            <br /><br /><br />


            {/* ===========================
                Consent Form
            ============================ */}

            {

                selectedConsent === "CashlessMediclaim" && (

                    <CashlessMediclaimMarEng

                        ref={consentRef}

                        patient={patient}

                        onSave={saveConsent}

                    />

                )

            }

            {

                selectedConsent === "KharchConsent" && (

    <EstimateMarEng

        ref={consentRef}

        patient={patient}

        onSave={saveConsent}

    />

)

            }

        </div>

    );

}

export default PatientForm;