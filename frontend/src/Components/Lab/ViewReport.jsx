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
        item.department === "Lab" ||
        (!item.department && item.testName)
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
        alert("Report PDF not available");
        return;
    }

    const pdfUrl =
        `http://localhost:5000${reportPdf}`;

    console.log("PDF URL:", pdfUrl);

    window.open(
        pdfUrl,
        "_blank"
    );
};

const downloadAllLabReports = async () => {
    if (!labReports || labReports.length === 0) {
        alert("No Lab Reports Found");
        return;
    }

    try {
        for (const report of labReports) {
            if (!report.reportPdf) {
                continue;
            }

            const response = await axios.get(
                `http://localhost:5000${report.reportPdf}`,
                {
                    responseType: "blob"
                }
            );

            const blobUrl = window.URL.createObjectURL(
                new Blob([response.data], {
                    type: "application/pdf"
                })
            );

            const link = document.createElement("a");

            link.href = blobUrl;
            link.download =
                `${report.patientName || "Patient"}_${report.testName || "Lab_Report"}.pdf`;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);

            await new Promise((resolve) =>
                setTimeout(resolve, 300)
            );
        }

    } catch (error) {
        console.error(
            "DOWNLOAD ALL LAB REPORTS ERROR:",
            error
        );

        alert("Failed to download Lab Reports");
    }
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
                        marginTop: "20px"
                    }}
                >

                    {
                        labReports.length === 0 ? (
                            <p
                                style={{
                                    color: "red",
                                    fontFamily: "Times New Roman"
                                }}
                            >
                                <FontAwesomeIcon icon={faFile} />
                            </p>
                        ) : (
                            <>
                                <div style={{ marginBottom: "15px" }}>
                                    <button
                                        className="btn btn-outline-success"
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            marginRight: "10px"
                                        }}
                                        onClick={downloadAllLabReports}
                                    >
                                        Download All Lab Reports
                                    </button>
                                </div>

                                {labReports.map((item) => (
                                    <div
                                        key={item._id}
                                        style={{
                                            marginBottom: "10px"
                                        }}
                                    >
                                        <button
                                            className="btn btn-outline-success"
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                marginBottom: "10px"
                                            }}
                                            onClick={() =>
                                                openReport(item.reportPdf)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleArrowDown}
                                            />
                                        </button>

                                        <br />

                                        <button
                                            className="btn btn-outline-danger"
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "bold"
                                            }}
                                            onClick={() =>
                                                deleteReport(item._id)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </>
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
                        marginTop: "20px"
                    }}
                >

                    {
                        diagnosticReports.length === 0 ? (
                            <p
                                style={{
                                    color: "red",
                                    fontFamily: "Times New Roman"
                                }}
                            >
                                <FontAwesomeIcon icon={faFile} />
                            </p>
                        ) : (
                            diagnosticReports.map((item) => (
                                <div
                                    key={item._id}
                                    style={{
                                        marginBottom: "10px"
                                    }}
                                >
                                    <button
                                        className="btn btn-outline-success"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            marginBottom: "10px"
                                        }}
                                        onClick={() =>
                                            openReport(item.reportPdf)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faCircleArrowDown}
                                        />
                                    </button>

                                    <br />

                                    <button
                                        className="btn btn-outline-danger"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() =>
                                            deleteReport(item._id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                        />
                                    </button>
                                </div>
                            ))
                        )
                    }

                </div>
            )
        }

    </div>
);

}

export default ViewReport;