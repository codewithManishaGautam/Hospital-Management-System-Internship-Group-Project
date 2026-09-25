import React, { useState, useEffect } from "react";
import axios from "axios";
import Razorpay from "../Razorpay";

function UploadReport({ patient, onBack }) {

    const [doctorRequestedTests, setDoctorRequestedTests] = useState([]);

    const [priority, setPriority] = useState("Normal");

    const [reportPdfs, setReportPdfs] = useState([]);

    const [finalBill, setFinalBill] = useState(null);

    // // ==========================
    // // Lab Categories
    // // ==========================

    // const labCategories = [

    //     "Hematology",

    //     "Biochemistry",

    //     "Serology",

    //     "Microbiology",

    //     "Clinical Pathology",

    //     "Hormone",

    //     "Urine",

    //     "Stool",

    //     "Covid",

    //     "Other"

    // ];

    // ==========================
    // Diagnostic Categories
    // ==========================

    // const diagnosticCategories = [

    //     "Radiology",

    //     "Cardiology",

    //     "Neurology",

    //     "Pulmonology",

    //     "Orthopedic"

    // ];

    // ==========================
    // Lab Tests
    // ==========================

    // const labTests = {

    //     Hematology: [

    //         "CBC",

    //         "ESR",

    //         "Hemoglobin",

    //         "Platelet Count"

    //     ],

    //     Biochemistry: [

    //         "LFT",

    //         "KFT",

    //         "Sugar",

    //         "Lipid Profile"

    //     ],

    //     Serology: [

    //         "HIV",

    //         "HBsAg",

    //         "VDRL"

    //     ],

    //     Microbiology: [

    //         "Culture",

    //         "Sensitivity"

    //     ],

    //     "Clinical Pathology": [

    //         "Urine Routine",

    //         "Stool Routine"

    //     ],

    //     Hormone: [

    //         "TSH",

    //         "T3",

    //         "T4"

    //     ],

    //     Urine: [

    //         "Urine Routine",

    //         "Urine Culture"

    //     ],

    //     Stool: [

    //         "Stool Routine"

    //     ],

    //     Covid: [

    //         "Covid RTPCR",

    //         "Covid Antigen"

    //     ],

    //     Other: [

    //         "Other"

    //     ]

    // };

    // // ==========================
    // // Diagnostic Tests
    // // ==========================

    // const diagnosticTests = {

    //     Radiology: [

    //         "X-Ray",

    //         "CT Scan",

    //         "MRI",

    //         "USG"

    //     ],

    //     Cardiology: [

    //         "ECG",

    //         "2D Echo",

    //         "TMT"

    //     ],

    //     Neurology: [

    //         "EEG",

    //         "NCV"

    //     ],

    //     Pulmonology: [

    //         "PFT"

    //     ],

    //     Orthopedic: [

    //         "Bone Density"

    //     ]

    // };

    useEffect(() => {
        setDoctorRequestedTests(patient?.labTests || []);
    }, [patient]);

    // useEffect(() => {
    //     const fetchLabTests = async () => {
    //         try {
    //             const response = await axios.get(
    //                 "http://localhost:5000/lab/tests"
    //             );

    //             setLabTests(
    //                 Array.isArray(response.data)
    //                     ? response.data
    //                     : []
    //             );
    //         } catch (error) {
    //             console.error(
    //                 "LOAD LAB TESTS ERROR:",
    //                 error.response?.data || error.message
    //             );

    //             setLabTests([]);
    //         }
    //     };

    //     fetchLabTests();
    // }, []);

    // ==========================
    // Upload
    // ==========================
    const uploadReport = async () => {

        if (doctorRequestedTests.length === 0) {
            alert("No tests requested by doctor.");
            return;
        }

        if (reportPdfs.length === 0) {
            alert("Please select report PDFs.");
            return;
        }

        if (reportPdfs.length !== doctorRequestedTests.length) {
            alert(
                `Doctor requested ${doctorRequestedTests.length} test(s), but you selected ${reportPdfs.length} PDF(s). Please select one PDF for each test.`
            );
            return;
        }

        try {

            for (let i = 0; i < doctorRequestedTests.length; i++) {

                const formData = new FormData();

                formData.append(
                    "patientId",
                    patient._id
                );

                formData.append(
                    "prescriptionId",
                    patient.prescriptionId || ""
                );

                formData.append(
                    "uhid",
                    patient.uhid || ""
                );

                formData.append(
                    "patientName",
                    patient.name || ""
                );

                formData.append(
                    "age",
                    patient.age || ""
                );

                formData.append(
                    "gender",
                    patient.gender || ""
                );

                formData.append(
                    "mobile",
                    patient.mobile || ""
                );

                formData.append(
                    "testName",
                    doctorRequestedTests[i]
                );

                formData.append(
                    "priority",
                    priority
                );

                formData.append(
                    "reportPdf",
                    reportPdfs[i]
                );

                await axios.post(
                    "http://localhost:5000/lab/upload-report",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
            }

          // Generate Lab Bill after all reports are uploaded
const billResponse = await axios.post(
    "http://localhost:5000/lab/bill",
    {
        patientId: patient._id,
        prescriptionId: patient.prescriptionId,
        tests: doctorRequestedTests,
    }
);

console.log("LAB BILL RESPONSE =", billResponse.data);

if (
    !billResponse.data.success ||
    !billResponse.data.bill
) {
    throw new Error("Lab bill could not be generated");
}

setFinalBill(billResponse.data.bill);

alert(
    `All Reports Uploaded Successfully.\nLab Bill Amount: ₹${billResponse.data.bill.totalAmount}`
);

setReportPdfs([]);

        } catch (err) {

            console.error(
                "LAB UPLOAD ERROR:",
                err.response?.data || err.message
            );

            alert(
                err.response?.data?.message ||
                "Report Upload Failed"
            );
        }
    };
    return (
        <div >
            <button
                className="btn btn-secondary"
                onClick={onBack}
            >
                ← Back
            </button>


            <div className="card-header bg-primary text-white">

                Upload Report

            </div>

            <div className="card-body">

                <h5>Patient Information</h5>

                <p><b>UHID :</b> {patient.uhid}</p>

                <p><b>Name :</b> {patient.name}</p>

                <p><b>Age :</b> {patient.age}</p>

                <p><b>Gender :</b> {patient.gender}</p>

                <hr />

                {/* Doctor Requested Lab Tests */}

                <div className="mb-3">
                    <label>
                        <strong>Doctor Requested Tests</strong>
                    </label>

                    {doctorRequestedTests.length > 0 ? (
                        <div
                            style={{
                                border: "1px solid #ddd",
                                padding: "12px",
                                borderRadius: "6px",
                                backgroundColor: "#f8f9fa",
                            }}
                        >
                            {doctorRequestedTests.map((test, index) => (
                                <div
                                    key={index}
                                    style={{
                                        marginBottom: "6px",
                                        fontWeight: "500",
                                    }}
                                >
                                    🧪 {test}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: "red" }}>
                            No lab tests requested by doctor.
                        </p>
                    )}
                </div>

                {/* Priority */}

                <div className="mb-3">

                    <label>Priority</label>

                    <select

                        className="form-control"

                        value={priority}

                        onChange={(e) =>

                            setPriority(e.target.value)

                        }

                    >

                        <option value="Normal">

                            Normal

                        </option>

                        <option value="Urgent">

                            Urgent

                        </option>

                        <option value="Emergency">

                            Emergency

                        </option>

                    </select>

                </div>

                {/* PDF */}

                {/* PDF Upload */}

                <div className="mb-3">

                    <label>
                        <strong>Upload Reports</strong>
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        multiple
                        className="form-control"
                        onChange={(e) =>
                            setReportPdfs(
                                Array.from(e.target.files)
                            )
                        }
                    />

                    {reportPdfs.length > 0 && (
                        <div
                            style={{
                                marginTop: "10px",
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "6px",
                                backgroundColor: "#f8f9fa"
                            }}
                        >
                            <strong>Selected Reports:</strong>

                            {reportPdfs.map((file, index) => (
                                <div key={index}>
                                    {index + 1}. {file.name}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <button
                    className="btn btn-success"
                    onClick={uploadReport}
                >
                    Upload Reports
                </button>

            </div>
         {finalBill && (
    <Razorpay
        patientName={patient.name}
        patientMob={patient.mobile}
        patientId={patient._id}
        source="Lab"
        finalBill={finalBill}
    />
)}

        </div>

    );

}

export default UploadReport;



