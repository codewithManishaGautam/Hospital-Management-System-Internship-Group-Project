import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewReport({ patientId, isLab = true, isDiagnostic = true }) {

    const [reports, setReports] = useState([]);

    const getReports = async () => {

        try {

            const res = await axios.get(

                `http://localhost:5000/lab/report/${patientId}`

            );

            setReports(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        if (patientId) {

            getReports();

        }

    }, [patientId]);


    const labReports = reports.filter(

        (item) => item.department === "Lab"

    );

    const diagnosticReports = reports.filter(

        (item) => item.department === "Diagnostic"

    );

    // Delete Report

    const deleteReport = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this report?"

        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `http://localhost:5000/lab/report/${id}`

            );

            alert("Report Deleted");

            getReports();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

      <div>

    {/* ================= LAB REPORTS ================= */}

    {
        isLab && (

            <div>
                {

                    labReports.length === 0 ? (

                        <p style={{color:"red",fontFamily:"times and roman"}}>error</p>

                    ) : (

                        labReports.map((item) => (

                                <button
                                    className="btn btn-outline-success"
                                    style={{fontSize:"14px",fontWeight:"bold"}}
                                    onClick={() => {

                                        window.open(
                                            `http://localhost:5000${item.reportPdf}`,
                                            "_blank"
                                        );

                                    }}
                                >

                                    Download

                                </button>


                        ))

                    )

                }

            </div>

        )

    }

    {/* ================= DIAGNOSTIC REPORTS ================= */}

    {
        isDiagnostic && (

            <div>
                {

                    diagnosticReports.length === 0 ? (

                        <p style={{color:"red",fontFamily:"times and roman",textAlign:"center"}}>error</p>

                    ) : (

                        diagnosticReports.map((item) => (

                            
                                <button
                                    className="btn btn-outline-success text-align-center" 
                                    style={{fontSize:"14px" ,fontWeight:"bold"}}
                                    onClick={() => {

                                        window.open(
                                            `http://localhost:5000${item.reportPdf}`,
                                            "_blank"
                                        );

                                    }}
                                >

                                    Download

                                </button>
                        ))

                    )

                }

            </div>

        )

    }

</div>


        // <div className="card mt-4">

        //     <div className="card-header bg-success text-white">

        //         Uploaded Reports

        //     </div>

        //     <div className="card-body">

        //         <h4 className="text-primary">

        //             Lab Reports

        //         </h4>

        //         {

        //             labReports.length === 0 ?

        //                 (

        //                     <p>No Lab Reports</p>

        //                 )

        //                 :

        //                 (

        //                     labReports.map((item) => (

        //                         <div

        //                             key={item._id}

        //                             className="border rounded p-2 mb-2"

        //                         >

        //                             <h6>

        //                                 {item.testName}

        //                             </h6>

        //                             <p>

        //                                 Category :

        //                                 {" "}

        //                                 {item.testCategory}

        //                             </p>

        //                             <button

        //                                 className="btn btn-warning btn-sm"

        //                                 onClick={() =>

        //                                     window.open(

        //                                         `http://localhost:5000${item.reportPdf}`,

        //                                         "_blank"

        //                                     )

        //                                 }

        //                             >

        //                                 Download

        //                             </button>

        //                         </div>

        //                     ))

        //                 )

        //         }

        //         <hr />

        //         <h4 className="text-danger">

        //             Diagnostic Reports

        //         </h4>

        //         {

        //             diagnosticReports.length === 0 ?

        //                 (

        //                     <p>No Diagnostic Reports</p>

        //                 )

        //                 :

        //                 (

        //                     diagnosticReports.map((item) => (

        //                         <div

        //                             key={item._id}

        //                             className="border rounded p-2 mb-2"

        //                         >

        //                             <h6>

        //                                 {item.testName}

        //                             </h6>

        //                             <p>

        //                                 Category :

        //                                 {" "}

        //                                 {item.testCategory}

        //                             </p>

        //                             <button

        //                                 className="btn btn-warning btn-sm"

        //                                 onClick={() =>

        //                                     window.open(

        //                                         `http://localhost:5000${item.reportPdf}`,

        //                                         "_blank"

        //                                     )

        //                                 }

        //                             >

        //                                 Download

        //                             </button>

        //                         </div>

        //                     ))

        //                 )

        //         }

        //     </div>

        // </div>



    );

}

export default ViewReport;