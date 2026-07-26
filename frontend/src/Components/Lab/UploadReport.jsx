// import React, { useState } from "react";
// import axios from "axios";

// function UploadReport({ patient }) {

//     const [testName, setTestName] = useState("");
//     const [testCategory, setTestCategory] = useState("Hematology");
//     const [priority, setPriority] = useState("Normal");

//     const [reportPdf, setReportPdf] = useState(null);

//     const uploadReport = async () => {



//         console.log("uploadReport Started");
// console.log("Patient =", patient);

// console.log("Test Name =", testName);

// console.log("Category =", testCategory);

// console.log("Priority =", priority);

// console.log("PDF =", reportPdf);

//         if (!reportPdf) {

//             alert("Please Select PDF");

//             return;

//         }

//         const formData = new FormData();

//         formData.append("patientId", patient._id);

//         formData.append("uhid", patient.uhid);

//         formData.append("patientName", patient.name);

//         formData.append("age", patient.age);

//         formData.append("gender", patient.gender);

//         formData.append("mobile", patient.mobile);

//         formData.append("testName", testName);

//         formData.append("reportPdf",reportPdf);

//         formData.append("testCategory", testCategory);

//         formData.append("priority", priority);

//         try {

//             const res = await axios.post(

//                 "http://localhost:5000/lab/upload-report",

//                 formData,

//                 {

//                     headers: {

//                         "Content-Type": "multipart/form-data"

//                     }

//                 }

//             );

//             alert(res.data.message);

//             setTestName(testName);

//             setReportPdf(null);

//         }


//         catch (err) {

//             console.log(err);

//             console.log(err.response);

//             console.log(err.response?.data);

//             alert(err.response?.data?.message);

//         }

//         // catch (err) {

//         //     console.log(err);

//         //     alert("Upload Failed");

//         // }

//         // console.log(req.body);
//         // console.log(req.file);
//     };


//     return (

//         <div className="card mt-4">

//             <div className="mb-3">

//                 <label>

//                     Test Category

//                 </label>

//                 <select

//                     className="form-control"

//                     value={testCategory}

//                     onChange={(e) => setTestCategory(e.target.value)}

//                 >

//                     <option>Hematology</option>

//                     <option>Biochemistry</option>

//                     <option>Serology</option>

//                     <option>Microbiology</option>

//                     <option>Clinical Pathology</option>

//                     <option>Hormone</option>

//                     <option>Urine</option>

//                     <option>Stool</option>

//                     <option>Covid</option>

//                     <option>Other</option>

//                 </select>

//             </div>


//             <div className="mb-3">

//                 <label>Priority</label>

//                 <select

//                     className="form-control"

//                     value={priority}

//                     onChange={(e) => setPriority(e.target.value)}

//                 >

//                     <option value="Normal">Normal</option>

//                     <option value="Urgent">Urgent</option>

//                     <option value="Emergency">Emergency</option>

//                 </select>

//             </div>

//             <div className="card-header bg-primary text-white">

//                 Upload Lab Report

//             </div>

//             <div className="card-body">

//                 <h5>

//                     Patient Information

//                 </h5>

//                 <p>

//                     <b>UHID :</b> {patient.uhid}

//                 </p>

//                 <p>

//                     <b>Name :</b> {patient.name}

//                 </p>

//                 <p>

//                     <b>Age :</b> {patient.age}

//                 </p>

//                 <p>

//                     <b>Gender :</b> {patient.gender}

//                 </p>

//                 <hr />

//                 <div className="mb-3">

//                     <label>

//                         Test Name

//                     </label>

//                     <input

//                         className="form-control"

//                         value={testName}

//                         onChange={(e) =>

//                             setTestName(e.target.value)

//                         }

//                         placeholder="CBC / LFT / KFT / Sugar"

//                     />

//                 </div>

//                 <div className="mb-3">

//                     <label>

//                         Upload PDF

//                     </label>

//                     <input

//                         type="file"

//                         accept=".pdf"

//                         className="form-control"

//                         onChange={(e) =>

//                             setReportPdf(e.target.files[0])

//                         }

//                     />

//                 </div>

//                 <button

//                     className="btn btn-success"

//                     onClick={uploadReport}

//                 >

//                     Upload Report

//                 </button>

//             </div>

//         </div>

//     );

// }

// export default UploadReport;



import React, { useState, useEffect } from "react";
import axios from "axios";

function UploadReport({ patient }) {

    const [department, setDepartment] = useState("Lab");

    const [testCategory, setTestCategory] = useState("Hematology");

    const [testName, setTestName] = useState("");

    const [priority, setPriority] = useState("Normal");

    const [reportPdf, setReportPdf] = useState(null);

    // ==========================
    // Lab Categories
    // ==========================

    const labCategories = [

        "Hematology",

        "Biochemistry",

        "Serology",

        "Microbiology",

        "Clinical Pathology",

        "Hormone",

        "Urine",

        "Stool",

        "Covid",

        "Other"

    ];

    // ==========================
    // Diagnostic Categories
    // ==========================

    const diagnosticCategories = [

        "Radiology",

        "Cardiology",

        "Neurology",

        "Pulmonology",

        "Orthopedic"

    ];

    // ==========================
    // Lab Tests
    // ==========================

    const labTests = {

        Hematology: [

            "CBC",

            "ESR",

            "Hemoglobin",

            "Platelet Count"

        ],

        Biochemistry: [

            "LFT",

            "KFT",

            "Sugar",

            "Lipid Profile"

        ],

        Serology: [

            "HIV",

            "HBsAg",

            "VDRL"

        ],

        Microbiology: [

            "Culture",

            "Sensitivity"

        ],

        "Clinical Pathology": [

            "Urine Routine",

            "Stool Routine"

        ],

        Hormone: [

            "TSH",

            "T3",

            "T4"

        ],

        Urine: [

            "Urine Routine",

            "Urine Culture"

        ],

        Stool: [

            "Stool Routine"

        ],

        Covid: [

            "Covid RTPCR",

            "Covid Antigen"

        ],

        Other: [

            "Other"

        ]

    };

    // ==========================
    // Diagnostic Tests
    // ==========================

    const diagnosticTests = {

        Radiology: [

            "X-Ray",

            "CT Scan",

            "MRI",

            "USG"

        ],

        Cardiology: [

            "ECG",

            "2D Echo",

            "TMT"

        ],

        Neurology: [

            "EEG",

            "NCV"

        ],

        Pulmonology: [

            "PFT"

        ],

        Orthopedic: [

            "Bone Density"

        ]

    };

    useEffect(() => {

        if (department === "Lab") {

            setTestCategory("Hematology");

        }

        else {

            setTestCategory("Radiology");

        }

        setTestName("");

    }, [department]);

    // ==========================
    // Upload
    // ==========================

    const uploadReport = async () => {

        if (!reportPdf) {

            alert("Please Select PDF");

            return;

        }

        const formData = new FormData();

        formData.append("patientId", patient._id);

        formData.append("uhid", patient.uhid);

        formData.append("patientName", patient.name);

        formData.append("age", patient.age);

        formData.append("gender", patient.gender);

        formData.append("mobile", patient.mobile);

        formData.append("department", department);

        formData.append("testCategory", testCategory);

        formData.append("testName", testName);

        formData.append("priority", priority);

        formData.append(

            "machineType",

            department === "Diagnostic"

                ? testName

                : ""

        );

        formData.append(

            "reportPdf",

            reportPdf

        );

        try {

            const res = await axios.post(

                "http://localhost:5000/lab/upload-report",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            alert(res.data.message);

            setTestName("");

            setReportPdf(null);

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Upload Failed"

            );

        };
    }
        return (

            <div className="card mt-4">

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

                    {/* Department */}

                    <div className="mb-3">

                        <label>Department</label>

                        <select

                            className="form-control"

                            value={department}

                            onChange={(e) =>

                                setDepartment(e.target.value)

                            }

                        >

                            <option value="Lab">

                                Lab

                            </option>

                            <option value="Diagnostic">

                                Diagnostic

                            </option>

                        </select>

                    </div>

                    {/* Category */}

                    <div className="mb-3">

                        <label>

                            {

                                department === "Lab"

                                    ? "Test Category"

                                    : "Diagnostic Category"

                            }

                        </label>

                        <select

                            className="form-control"

                            value={testCategory}

                            onChange={(e) => {

                                setTestCategory(e.target.value);

                                setTestName("");

                            }}

                        >

                            {

                                department === "Lab"

                                    ?

                                    labCategories.map((item) => (

                                        <option

                                            key={item}

                                            value={item}

                                        >

                                            {item}

                                        </option>

                                    ))

                                    :

                                    diagnosticCategories.map((item) => (

                                        <option

                                            key={item}

                                            value={item}

                                        >

                                            {item}

                                        </option>

                                    ))

                            }

                        </select>

                    </div>

                    {/* Test Name */}

                    <div className="mb-3">

                        <label>

                            {

                                department === "Lab"

                                    ?

                                    "Lab Test"

                                    :

                                    "Diagnostic Test"

                            }

                        </label>

                        <select

                            className="form-control"

                            value={testName}

                            onChange={(e) =>

                                setTestName(e.target.value)

                            }

                        >

                            <option value="">

                                Select Test

                            </option>

                            {

                                (

                                    department === "Lab"

                                        ?

                                        labTests[testCategory]

                                        :

                                        diagnosticTests[testCategory]

                                )?.map((item) => (

                                    <option

                                        key={item}

                                        value={item}

                                    >

                                        {item}

                                    </option>

                                ))

                            }

                        </select>

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

                    <div className="mb-3">

                        <label>Upload PDF</label>

                        <input

                            type="file"

                            accept=".pdf"

                            className="form-control"

                            onChange={(e) =>

                                setReportPdf(

                                    e.target.files[0]

                                )

                            }

                        />

                    </div>

                    <button

                        className="btn btn-success"

                        onClick={uploadReport}

                    >

                        Upload Report

                    </button>

                </div>

            </div>

        );

    }

export default UploadReport;