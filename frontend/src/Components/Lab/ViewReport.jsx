// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ViewReport({ patientId, isLab = true, isDiagnostic = true }) {

//     const [reports, setReports] = useState([]);

//     const getReports = async () => {

//         try {

//             const res = await axios.get(

//                 `http://localhost:5000/lab/report/${patientId}`

//             );

//             setReports(res.data);

//         }

//         catch (err) {

//             console.log(err);

//         }

//     };

//     useEffect(() => {

//         if (patientId) {

//             getReports();

//         }

//     }, [patientId]);


//     const labReports = reports.filter(

//         (item) => item.department === "Lab"

//     );

//     const diagnosticReports = reports.filter(

//         (item) => item.department === "Diagnostic"

//     );

//     // Delete Report

//     const deleteReport = async (id) => {

//         const confirmDelete = window.confirm(

//             "Delete this report?"

//         );

//         if (!confirmDelete) return;

//         try {

//             await axios.delete(

//                 `http://localhost:5000/lab/report/${id}`

//             );

//             alert("Report Deleted");

//             getReports();

//         }

//         catch (err) {

//             console.log(err);

//         }

//     };

//     return (

//       <div>

//     {/* ================= LAB REPORTS ================= */}

//     {
//         isLab && (

//             <div>
//                 {

//                     labReports.length === 0 ? (

//                         <p style={{color:"red",fontFamily:"times and roman"}}>error</p>

//                     ) : (

//                         labReports.map((item) => (

//                                 <button
//                                     className="btn btn-outline-success"
//                                     style={{fontSize:"14px",fontWeight:"bold"}}
//                                     onClick={() => {

//                                         window.open(
//                                             `http://localhost:5000/${item.reportPdf}`,
//                                             "_blank"
//                                         );

//                                     }}
//                                 >

//                                     Download

//                                 </button>


//                         ))

//                     )

//                 }

//             </div>

//         )

//     }

//     {/* ================= DIAGNOSTIC REPORTS ================= */}

//     {
//         isDiagnostic && (

//             <div>
//                 {

//                     diagnosticReports.length === 0 ? (

//                         <p style={{color:"red",fontFamily:"times and roman",textAlign:"center"}}>error</p>

//                     ) : (

//                         diagnosticReports.map((item) => (


//                                 <button
//                                     className="btn btn-outline-success text-align-center" 
//                                     style={{fontSize:"14px" ,fontWeight:"bold"}}
//                                     onClick={() => {

//                                         window.open(
//                                             `http://localhost:5000${item.reportPdf}`,
//                                             "_blank"
//                                         );

//                                     }}
//                                 >

//                                     Download

//                                 </button>
//                         ))

//                     )

//                 }

//             </div>

//         )

//     }

// </div>



//     );

// }

// export default ViewReport;


import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";


function ViewReport({
    patientId,
    isLab = true,
    isDiagnostic = true
}) {

    const [reports, setReports] = useState([]);


    // ==========================================
    // Get Patient Reports
    // ==========================================

    const getReports = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/lab/reports/${patientId}`

            );

            setReports(res.data);

        }

        catch (err) {

            console.log(
                "GET REPORT ERROR:",
                err
            );

        }

    };


    useEffect(() => {

        if (patientId) {

            getReports();

        }

    }, [patientId]);


    // ==========================================
    // Separate Lab Reports
    // ==========================================

    const labReports = reports.filter(

        (item) =>

            item.department === "Lab"

    );


    // ==========================================
    // Separate Diagnostic Reports
    // ==========================================

    const diagnosticReports = reports.filter(

        (item) =>

            item.department === "Diagnostic"

    );


    // ==========================================
    // Open PDF
    // ==========================================

    const openReport = (reportPdf) => {

        if (!reportPdf) {

            alert(
                "Report PDF not available"
            );

            return;

        }


        const pdfUrl =

            `http://localhost:5000${reportPdf}`;


        console.log(
            "PDF URL:",
            pdfUrl
        );


        window.open(
            pdfUrl,
            "_blank"
        );

    };


    // ==========================================
    // Delete Report
    // ==========================================

    const deleteReport = async (id) => {

        const confirmDelete =

            window.confirm(
                "Delete this report?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            await axios.delete(

                `http://localhost:5000/lab/report/${id}`

            );


            alert(
                "Report Deleted"
            );


            getReports();

        }

        catch (err) {

            console.log(
                "DELETE REPORT ERROR:",
                err
            );

        }

    };


    return (

        <div>


            {/* =====================================
                LAB REPORTS
            ===================================== */}

            {

                isLab && (

                    <div
                        style={{
                            marginTop:
                                "20px"
                        }}
                    >
                        


                        {

                            labReports.length === 0 ? (

                                <p
                                    style={{
                                        color: "red",
                                        fontFamily:
                                            "Times New Roman"
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFile} />
                                </p>

                            ) : (

                                labReports.map(

                                    (item) => (

                                        <div
                                            key={
                                                item._id
                                            }
                                            style={{
                                                marginBottom:
                                                    "10px"
                                            }}
                                        >

                                            <button

                                                className=
                                                "btn btn-outline-success"

                                                style={{
                                                    fontSize:
                                                        "12px",

                                                    fontWeight:
                                                        "bold",

                                                    marginBottom:
                                                        "10px",
                                                    
                                                }}

                                                onClick={() =>
                                                    openReport(
                                                        item.reportPdf
                                                    )
                                                }

                                            >

                                                <FontAwesomeIcon icon={faCircleArrowDown} />
                                                {/* Download */}

                                            </button>
                                            <br />


                                            <button

                                                className=
                                                "btn btn-outline-danger"

                                                style={{
                                                    fontSize:
                                                        "12px",

                                                    fontWeight:
                                                        "bold"
                                                }}

                                                onClick={() =>
                                                    deleteReport(
                                                        item._id
                                                    )
                                                }

                                            >

                                                {/* Delete */}
                                                <FontAwesomeIcon icon={faTrash} />

                                            </button>

                                        </div>

                                    )

                                )

                            )

                        }

                    </div>

                )

            }



            {/* =====================================
                DIAGNOSTIC REPORTS
            ===================================== */}

            {

                isDiagnostic && (

                    <div
                        style={{
                            marginTop:
                                "20px"
                        }}
                    >



                        {

                            diagnosticReports.length === 0 ? (

                                <p
                                    style={{
                                        color: "red",
                                        fontFamily:
                                            "Times New Roman"
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFile} />
                                </p>

                            ) : (

                                diagnosticReports.map(

                                    (item) => (

                                        <div
                                            key={
                                                item._id
                                            }
                                            style={{
                                                marginBottom:
                                                    "10px"
                                            }}
                                        >

                                            <button

                                                className=
                                                "btn btn-outline-success"

                                                style={{
                                                    fontSize:
                                                        "12px",

                                                    fontWeight:
                                                        "bold",

                                                    marginBottom:
                                                        "10px",
                                                }}

                                                onClick={() =>
                                                    openReport(
                                                        item.reportPdf
                                                    )
                                                }

                                            >

                                                <FontAwesomeIcon icon={faCircleArrowDown} />


                                            </button>
                                            <br />


                                            <button

                                                className=
                                                "btn btn-outline-danger"

                                                style={{
                                                    fontSize:
                                                        "12px",

                                                    fontWeight:
                                                        "bold"
                                                }}

                                                onClick={() =>
                                                    deleteReport(
                                                        item._id
                                                    )
                                                }

                                            >

                                                <FontAwesomeIcon icon={faTrash} />

                                            </button>

                                        </div>

                                    )

                                )

                            )

                        }

                    </div>

                )

            }


        </div>

    );

}


export default ViewReport;