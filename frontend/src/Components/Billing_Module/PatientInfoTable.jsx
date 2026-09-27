import React from "react";
import ViewReport from "../Lab/ViewReport";
import PdfCreate from "./PdfCreate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFile,
    faCircleArrowDown
} from "@fortawesome/free-solid-svg-icons";

import "./style/PatientInfoTable.css";

export default function PatientInfoTable({
    patient,
    latestConsent,
    dateCurr
}) {

    const openConsentPdf = () => {

        if (!latestConsent?.pdfPath) {
            console.log("Consent PDF path not found");
            return;
        }

        window.open(
            `http://localhost:5000${latestConsent.pdfPath}`,
            "_blank"
        );
    };

    return (

        <div className="table-responsive mt-4 table-container">

            <table className="table table-bordered table-render-style">

                <thead>

                    <tr>

                        <th>Date</th>

                        <th>Lab Test</th>

                        <th>Diagnostic</th>

                        <th>Pharmacy</th>

                        <th>Nurse</th>

                        <th>Doctor</th>

                        <th className="consent-head">
                            Consent
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <tr>

                        {/* =================================================
                            DATE
                        ================================================= */}

                        <td>
                            {dateCurr}
                        </td>


                        {/* =================================================
                            LAB
                        ================================================= */}

                        <td>

                            <ViewReport
                                isLab={true}
                                isDiagnostic={false}
                                patientId={patient._id}
                            />

                        </td>


                        {/* =================================================
                            DIAGNOSTIC
                        ================================================= */}

                        <td>

                            <ViewReport
                                isLab={false}
                                isDiagnostic={true}
                                patientId={patient._id}
                            />

                        </td>


                        {/* =================================================
                            PHARMACY
                        ================================================= */}

                        <td>

                            <PdfCreate
                                patient={patient}
                                pdfname="Pharma"
                                type="pharmacy"
                            />

                        </td>


                        {/* =================================================
                            NURSE
                        ================================================= */}

                        <td>

                            <PdfCreate
                                patient={patient}
                                pdfname="Nurse"
                                type="nurse"
                            />

                        </td>


                        {/* =================================================
                            DOCTOR
                        ================================================= */}

                        <td>

                            <PdfCreate
                                patient={patient}
                                pdfname="Doctor"
                                type="doctor"
                            />

                        </td>


                        {/* =================================================
                            INSURANCE
                        ================================================= */}

                        {/* <td>

                            {latestInsurance ? (

                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    }}
                                    onClick={openInsurancePdf}
                                >

                                    <FontAwesomeIcon
                                        icon={faCircleArrowDown}
                                    />

                                </button>

                            ) : (

                                <FontAwesomeIcon
                                    icon={faFile}
                                    style={{
                                        color: "red"
                                    }}
                                />

                            )}

                        </td> */}


                        {/* =================================================
                            CONSENT
                        ================================================= */}

                        <td className="content-col">

                            {latestConsent ? (

                                <button
                                    type="button"
                                    className="btn btn-outline-success consent-download-btn"
                                    onClick={openConsentPdf}
                                >

                                    <FontAwesomeIcon
                                        icon={faCircleArrowDown}
                                    />

                                </button>

                            ) : (

                                <FontAwesomeIcon
                                    icon={faFile}
                                    className="consent-file-icon"
                                />

                            )}

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

