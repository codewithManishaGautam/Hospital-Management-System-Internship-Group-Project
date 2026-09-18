


import React, { useEffect, useState } from "react";
import axios from "axios";

import ViewReport from "../Lab/ViewReport";
import PdfCreate from "./PdfCreate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFile,
    faCircleArrowDown
} from "@fortawesome/free-solid-svg-icons";

import "../Billing_Module/style/PatientInfoTable.css";


export default function PatientInfoTable({
    patient,
    latestConsent,
    dateCurr
}) {

    // =====================================================
    // INSURANCE STATE
    // =====================================================

    const [latestInsurance, setLatestInsurance] = useState(null);


    // =====================================================
    // FETCH INSURANCE DATA
    // =====================================================

    useEffect(() => {

        const fetchInsurance = async () => {

            try {

                if (!patient?._id) {
                    return;
                }


                console.log(
                    "Fetching Insurance for Patient:",
                    patient._id
                );


                const response = await axios.get(
                    `http://localhost:5000/insurance/patient/${patient._id}`
                );


                console.log(
                    "Insurance Data:",
                    response.data
                );


                setLatestInsurance(response.data);

            } catch (error) {

                if (error.response?.status === 404) {

                    console.log(
                        "No Insurance record found for this patient"
                    );

                    setLatestInsurance(null);

                } else {

                    console.error(
                        "Insurance Fetch Error:",
                        error
                    );

                }

            }

        };


        fetchInsurance();

    }, [patient?._id]);


    // =====================================================
    // OPEN INSURANCE PDF
    // =====================================================

    const openInsurancePdf = () => {

        if (!latestInsurance?.pdfPath) {

            console.log(
                "Insurance PDF path not found"
            );

            return;
        }


        window.open(
            `http://localhost:5000${latestInsurance.pdfPath}`,
            "_blank"
        );

    };


    // =====================================================
    // OPEN CONSENT PDF
    // =====================================================

    const openConsentPdf = () => {

        if (!latestConsent?.pdfPath) {

            console.log(
                "Consent PDF path not found"
            );

            return;
        }


        window.open(
            `http://localhost:5000${latestConsent.pdfPath}`,
            "_blank"
        );

    };


    // =====================================================
    // UI
    // =====================================================

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

                        <th>Insurance</th>

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

                        <td>

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

                        </td>


                        {/* =================================================
                            CONSENT
                        ================================================= */}

                        <td className="content-col">

                            {latestConsent ? (

                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    }}
                                    onClick={openConsentPdf}
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

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

