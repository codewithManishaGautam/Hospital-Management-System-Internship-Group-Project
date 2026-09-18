

import React, { useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

import Signature from "./CommonCode/SignaturePad";
import "./Style/SBIInsurance.css";

function SBIInsurance({ patientId }) {

    // =========================================================
    // INSURANCE FORM REF
    // =========================================================

    const insuranceRef = useRef(null);


    // =========================================================
    // FORM DATA
    // =========================================================

    const [formData, setFormData] = useState({

        // =========================
        // SECTION A
        // =========================

        hospitalName: "",
        hospitalAddress: "",
        rohiniId: "",
        hospitalEmail: "",

        // =========================
        // INSURED / PATIENT
        // =========================

        patientName: "",
        gender: "",
        ageYears: "",
        ageMonths: "",
        dob: "",
        contactNumber: "",
        attendingRelativeContact: "",
        insuredCardId: "",
        policyNumber: "",
        corporateName: "",
        employeeId: "",

        otherInsurance: "",
        otherInsuranceCompany: "",
        otherInsuranceDetails: "",

        familyPhysician: "",
        familyPhysicianName: "",
        familyPhysicianContact: "",

        // =========================
        // DOCTOR / HOSPITAL
        // =========================

        treatingDoctorName: "",
        doctorContact: "",

        natureOfIllness: "",
        criticalFindings: "",
        ailmentDuration: "",
        firstConsultation: "",
        pastHistory: "",
        provisionalDiagnosis: "",
        icd10Code: "",

        treatmentPlan: [],

        medicalTreatmentDetails: "",
        drugRoute: "",
        surgeryName: "",
        icd10PCSCode: "",
        otherTreatmentDetails: "",

        // =========================
        // ACCIDENT
        // =========================

        injuryCause: "",
        isRTA: "",
        injuryDate: "",
        policeReport: "",
        firNo: "",
        substanceAbuse: "",
        substanceTest: "",

        // =========================
        // MATERNITY
        // =========================

        maternityG: "",
        maternityP: "",
        maternityL: "",
        maternityA: "",
        expectedDeliveryDate: "",

        // =========================
        // PATIENT ADMITTED
        // =========================

        admissionDate: "",
        admissionTime: "",
        hospitalizationType: "",

        diabetes: "",
        heartDisease: "",
        hypertension: "",
        hyperlipidemias: "",
        osteoarthritis: "",
        asthmaCOPD: "",
        cancer: "",
        alcoholDrugAbuse: "",
        hivStd: "",
        otherAilment: "",

        expectedStayDays: "",
        icuDays: "",
        roomType: "",

        roomRent: "",
        investigationCost: "",
        icuCharges: "",
        otCharges: "",
        professionalFees: "",
        medicinesConsumables: "",
        otherHospitalExpenses: "",
        packageCharges: "",
        totalExpectedCost: "",

        // =========================
        // DECLARATION
        // =========================

        doctorQualification: "",
        doctorRegistration: "",

        patientDeclarationName: "",
        patientDeclarationContact: "",
        patientDeclarationEmail: "",
        declarationDate: "",

        patientSignature: "",
        doctorSignature: "",

        hospitalSeal: ""
    });


    // =========================================================
    // INPUT CHANGE
    // =========================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // =========================================================
    // TREATMENT CHECKBOX
    // =========================================================

    const handleTreatment = (e) => {

        const { value, checked } = e.target;

        setFormData((prev) => ({
            ...prev,

            treatmentPlan: checked
                ? [...prev.treatmentPlan, value]
                : prev.treatmentPlan.filter(
                    (item) => item !== value
                )
        }));
    };


    // =========================================================
    // HOSPITAL SEAL
    // =========================================================

    const handleHospitalSeal = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            hospitalSeal: file
        }));
    };


    // =========================================================
    // PRINT INSURANCE FORM
    // =========================================================

    const printInsurance = useReactToPrint({

        contentRef: insuranceRef,

        documentTitle:
            `${patientId || "Patient"}_SBI_Insurance`

    });


    // =========================================================
    // GENERATE INSURANCE PDF
    // =========================================================

    const generateInsurancePdf = async () => {

        if (!insuranceRef.current) {

            alert("Insurance form not found.");

            return null;
        }

        const original = insuranceRef.current;

        // =====================================================
        // 1. CLONE FORM
        // =====================================================

        const clone = original.cloneNode(true);

        clone.classList.add("insurance-pdf");

        clone.style.width = "1100px";
        clone.style.maxWidth = "1100px";
        clone.style.margin = "0";
        clone.style.padding = "30px";
        clone.style.background = "#ffffff";
        clone.style.boxSizing = "border-box";


        // =====================================================
        // 2. COPY INPUT VALUES
        // =====================================================

        const originalInputs =
            original.querySelectorAll("input");

        const cloneInputs =
            clone.querySelectorAll("input");


        originalInputs.forEach(
            (originalInput, index) => {

                const cloneInput =
                    cloneInputs[index];

                if (!cloneInput) return;


                // =================================================
                // RADIO / CHECKBOX
                // =================================================

                if (
                    originalInput.type === "radio" ||
                    originalInput.type === "checkbox"
                ) {

                    const mark =
                        document.createElement("span");

                    mark.className =
                        "pdf-check-mark";

                    mark.textContent =
                        originalInput.checked
                            ? "☑"
                            : "☐";

                    mark.style.display =
                        "inline-block";

                    mark.style.width =
                        "18px";

                    mark.style.height =
                        "18px";

                    mark.style.fontSize =
                        "15px";

                    mark.style.lineHeight =
                        "18px";

                    mark.style.verticalAlign =
                        "middle";

                    mark.style.marginRight =
                        "4px";

                    mark.style.fontFamily =
                        "Arial, sans-serif";


                    cloneInput.parentNode.replaceChild(
                        mark,
                        cloneInput
                    );

                    return;
                }


                // =================================================
                // FILE INPUT
                // =================================================

                if (
                    originalInput.type === "file"
                ) {

                    const fileBox =
                        document.createElement("div");

                    fileBox.className =
                        "pdf-file-box";

                    fileBox.textContent =
                        originalInput.files &&
                        originalInput.files.length > 0
                            ? originalInput.files[0].name
                            : "No file selected";

                    fileBox.style.width =
                        "100%";

                    fileBox.style.minHeight =
                        "40px";

                    fileBox.style.border =
                        "1px solid #999";

                    fileBox.style.padding =
                        "8px 10px";

                    fileBox.style.boxSizing =
                        "border-box";

                    fileBox.style.fontFamily =
                        "Arial, Helvetica, sans-serif";

                    fileBox.style.fontSize =
                        "14px";

                    fileBox.style.background =
                        "#ffffff";


                    cloneInput.parentNode.replaceChild(
                        fileBox,
                        cloneInput
                    );

                    return;
                }


                // =================================================
                // NORMAL INPUT
                // =================================================

                const valueBox =
                    document.createElement("div");

                valueBox.className =
                    "pdf-input-value";

                valueBox.textContent =
                    originalInput.value || "";

                valueBox.style.width =
                    "100%";

                valueBox.style.minHeight =
                    "40px";

                valueBox.style.height =
                    "40px";

                valueBox.style.border =
                    "1px solid #999";

                valueBox.style.borderRadius =
                    "4px";

                valueBox.style.padding =
                    "8px 10px";

                valueBox.style.boxSizing =
                    "border-box";

                valueBox.style.background =
                    "#ffffff";

                valueBox.style.color =
                    "#222";

                valueBox.style.fontFamily =
                    "Arial, Helvetica, sans-serif";

                valueBox.style.fontSize =
                    "14px";

                valueBox.style.lineHeight =
                    "22px";

                valueBox.style.whiteSpace =
                    "normal";

                valueBox.style.wordBreak =
                    "normal";

                valueBox.style.overflowWrap =
                    "break-word";


                cloneInput.parentNode.replaceChild(
                    valueBox,
                    cloneInput
                );
            }
        );


        // =====================================================
        // 3. COPY TEXTAREAS
        // =====================================================

        const originalTextareas =
            original.querySelectorAll("textarea");

        const cloneTextareas =
            clone.querySelectorAll("textarea");


        originalTextareas.forEach(
            (originalTextarea, index) => {

                const cloneTextarea =
                    cloneTextareas[index];

                if (!cloneTextarea) return;


                const valueBox =
                    document.createElement("div");

                valueBox.className =
                    "pdf-textarea-value";

                valueBox.textContent =
                    originalTextarea.value || "";

                valueBox.style.width =
                    "100%";

                valueBox.style.minHeight =
                    "60px";

                valueBox.style.border =
                    "1px solid #999";

                valueBox.style.borderRadius =
                    "4px";

                valueBox.style.padding =
                    "8px 10px";

                valueBox.style.boxSizing =
                    "border-box";

                valueBox.style.fontFamily =
                    "Arial, Helvetica, sans-serif";

                valueBox.style.fontSize =
                    "14px";

                valueBox.style.lineHeight =
                    "22px";

                valueBox.style.whiteSpace =
                    "normal";

                valueBox.style.wordBreak =
                    "normal";

                valueBox.style.overflowWrap =
                    "break-word";


                cloneTextarea.parentNode.replaceChild(
                    valueBox,
                    cloneTextarea
                );
            }
        );


        // =====================================================
        // 4. COPY SELECT VALUES
        // =====================================================

        const originalSelects =
            original.querySelectorAll("select");

        const cloneSelects =
            clone.querySelectorAll("select");


        originalSelects.forEach(
            (originalSelect, index) => {

                const cloneSelect =
                    cloneSelects[index];

                if (!cloneSelect) return;


                const valueBox =
                    document.createElement("div");

                valueBox.className =
                    "pdf-select-value";

                valueBox.textContent =
                    originalSelect.options[
                        originalSelect.selectedIndex
                    ]?.text || "";


                valueBox.style.width =
                    "100%";

                valueBox.style.minHeight =
                    "40px";

                valueBox.style.border =
                    "1px solid #999";

                valueBox.style.padding =
                    "8px 10px";

                valueBox.style.boxSizing =
                    "border-box";

                valueBox.style.fontFamily =
                    "Arial, Helvetica, sans-serif";

                valueBox.style.fontSize =
                    "14px";


                cloneSelect.parentNode.replaceChild(
                    valueBox,
                    cloneSelect
                );
            }
        );


        // =====================================================
        // 5. COPY SIGNATURE CANVAS
        // =====================================================

        const originalCanvases =
            original.querySelectorAll("canvas");

        const cloneCanvases =
            clone.querySelectorAll("canvas");


        originalCanvases.forEach(
            (originalCanvas, index) => {

                const cloneCanvas =
                    cloneCanvases[index];

                if (!cloneCanvas) return;


                try {

                    const img =
                        document.createElement("img");

                    img.src =
                        originalCanvas.toDataURL(
                            "image/png"
                        );

                    img.style.width =
                        `${originalCanvas.clientWidth}px`;

                    img.style.height =
                        `${originalCanvas.clientHeight}px`;

                    img.style.maxWidth =
                        "100%";

                    img.style.display =
                        "block";


                    cloneCanvas.parentNode.replaceChild(
                        img,
                        cloneCanvas
                    );

                } catch (error) {

                    console.error(
                        "Signature PDF error:",
                        error
                    );
                }
            }
        );


        // =====================================================
        // 6. CREATE PDF CONTAINER
        // =====================================================

        const container =
            document.createElement("div");

        container.style.position =
            "absolute";

        container.style.left =
            "-20000px";

        container.style.top =
            "0";

        container.style.width =
            "1100px";

        container.style.background =
            "#ffffff";

        container.style.padding =
            "0";

        container.style.margin =
            "0";

        container.style.boxSizing =
            "border-box";


        // =====================================================
        // 7. PDF CSS
        // =====================================================

        const pdfStyle =
            document.createElement("style");


        pdfStyle.innerHTML = `

            .insurance-pdf,
            .insurance-pdf * {
                box-sizing: border-box !important;
            }

            .insurance-pdf {
                width: 1100px !important;
                max-width: 1100px !important;
                margin: 0 !important;
                padding: 30px !important;
                background: #ffffff !important;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                color: #222 !important;

                transform: none !important;
                zoom: 1 !important;
            }


            /* ===============================
               TEXT
            =============================== */

            .insurance-pdf p,
            .insurance-pdf span,
            .insurance-pdf label,
            .insurance-pdf b,
            .insurance-pdf strong {

                white-space:
                    normal !important;

                word-break:
                    normal !important;

                overflow-wrap:
                    break-word !important;

                letter-spacing:
                    normal !important;
            }


            /* ===============================
               GRID
            =============================== */

            .insurance-pdf .sbi-grid {

                display: grid !important;

                grid-template-columns:
                    repeat(2, minmax(0, 1fr)) !important;

                gap:
                    15px 20px !important;

                width: 100% !important;
            }


            /* ===============================
               CHECKBOX
            =============================== */

            .insurance-pdf .checkbox-grid {

                display: grid !important;

                grid-template-columns:
                    repeat(2, minmax(0, 1fr)) !important;

                gap: 10px !important;
            }


            /* ===============================
               SIGNATURE
            =============================== */

            .insurance-pdf .signature-section {

                display: grid !important;

                grid-template-columns:
                    1fr 1fr !important;

                gap: 35px !important;
            }


            /* ===============================
               STATIC ROW
            =============================== */

            .insurance-pdf .static-row {

                display: grid !important;

                grid-template-columns:
                    300px minmax(0, 1fr) !important;

                gap: 15px !important;
            }


            /* ===============================
               CHRONIC
            =============================== */

            .insurance-pdf .chronic-header,
            .insurance-pdf .chronic-row {

                display: grid !important;

                grid-template-columns:
                    minmax(0, 1fr) 220px !important;

                gap: 10px !important;
            }


            /* ===============================
               COST
            =============================== */

            .insurance-pdf .cost-row {

                display: grid !important;

                grid-template-columns:
                    minmax(0, 1fr) 200px !important;

                gap: 15px !important;
            }


            /* ===============================
               FIELD
            =============================== */

            .insurance-pdf .field {

                min-width: 0 !important;
                width: 100% !important;
            }


            .insurance-pdf .field.full {

                grid-column:
                    1 / -1 !important;
            }


            /* ===============================
               INPUT VALUE
            =============================== */

            .insurance-pdf .pdf-input-value {

                display: block !important;

                width: 100% !important;

                min-height: 40px !important;

                height: 40px !important;

                padding: 8px 10px !important;

                border:
                    1px solid #999 !important;

                border-radius:
                    4px !important;

                background:
                    #ffffff !important;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif !important;

                font-size:
                    14px !important;

                line-height:
                    22px !important;

                color:
                    #222 !important;

                white-space:
                    normal !important;

                overflow-wrap:
                    break-word !important;

                word-break:
                    normal !important;
            }


            /* ===============================
               CHECK MARK
            =============================== */

            .insurance-pdf .pdf-check-mark {

                font-family:
                    Arial,
                    sans-serif !important;

                font-size:
                    15px !important;

                line-height:
                    18px !important;
            }


            /* ===============================
               FILE BOX
            =============================== */

            .insurance-pdf .pdf-file-box {

                width:
                    100% !important;

                min-height:
                    40px !important;

                padding:
                    8px 10px !important;

                border:
                    1px solid #999 !important;

                background:
                    #ffffff !important;
            }


            /* ===============================
               TEXTAREA
            =============================== */

            .insurance-pdf .pdf-textarea-value {

                width:
                    100% !important;

                min-height:
                    60px !important;

                padding:
                    8px 10px !important;

                border:
                    1px solid #999 !important;

                border-radius:
                    4px !important;

                white-space:
                    normal !important;

                overflow-wrap:
                    break-word !important;
            }


            /* ===============================
               PAGE BREAK
            =============================== */

            .insurance-pdf .section-title,
            .insurance-pdf .field,
            .insurance-pdf .static-row,
            .insurance-pdf .chronic-row,
            .insurance-pdf .cost-row,
            .insurance-pdf .signature-box {

                break-inside:
                    avoid !important;

                page-break-inside:
                    avoid !important;
            }


            /* ===============================
               BUTTONS
            =============================== */

            .insurance-pdf .insurance-action-buttons {

                display:
                    none !important;
            }

            .insurance-pdf .submit-btn {

                display:
                    none !important;
            }

        `;


        container.appendChild(pdfStyle);

        container.appendChild(clone);

        document.body.appendChild(container);


        // =====================================================
        // 8. WAIT FOR LAYOUT
        // =====================================================

        await new Promise((resolve) => {

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    resolve();

                });

            });

        });


        // =====================================================
        // 9. PDF OPTIONS
        // =====================================================

        const options = {

            margin: 5,

            filename:
                `${patientId || "Patient"}_SBI_Insurance.pdf`,

            image: {

                type: "jpeg",

                quality: 0.98
            },

            html2canvas: {

                scale: 2,

                useCORS: true,

                allowTaint: false,

                backgroundColor:
                    "#ffffff",

                scrollX: 0,

                scrollY: 0,

                width: 1100,

                windowWidth: 1100,

                logging: false
            },

            jsPDF: {

                unit: "mm",

                format: "a3",

                orientation: "portrait",

                compress: true
            },

            pagebreak: {

                mode: [
                    "css",
                    "legacy"
                ]
            }
        };


        // =====================================================
        // 10. GENERATE PDF
        // =====================================================

        try {

            const pdfBlob =
                await html2pdf()
                    .set(options)
                    .from(clone)
                    .outputPdf("blob");


            return pdfBlob;

        } catch (error) {

            console.error(
                "Insurance PDF generation error:",
                error
            );

            alert(
                "PDF generation failed."
            );

            return null;

        } finally {

            if (
                document.body.contains(
                    container
                )
            ) {

                document.body.removeChild(
                    container
                );
            }
        }
    };


    // =========================================================
    // SAVE PDF + DATABASE
    // =========================================================

    const saveInsurancePdf = async () => {

        try {

            if (!patientId) {

                alert(
                    "Patient ID not found."
                );

                return;
            }


            if (!insuranceRef.current) {

                alert(
                    "Insurance Form Not Found."
                );

                return;
            }


            // =================================================
            // GENERATE PDF
            // =================================================

            const pdfBlob =
                await generateInsurancePdf();


            if (!pdfBlob) {

                alert(
                    "PDF Generation Failed."
                );

                return;
            }


            // =================================================
            // UPLOAD PDF
            // =================================================

            const uploadData =
                new FormData();


            uploadData.append(
                "file",
                pdfBlob,
                `${patientId}_SBI_Insurance.pdf`
            );


            console.log(
                "Uploading SBI Insurance PDF..."
            );


            const uploadResponse =
                await axios.post(
                    "http://localhost:5000/upload",
                    uploadData
                );


            console.log(
                "Upload Response:",
                uploadResponse.data
            );


            const pdfPath =
                uploadResponse.data?.filePath;


            if (!pdfPath) {

                throw new Error(
                    "PDF path was not returned by server."
                );
            }


            console.log(
                "PDF Path:",
                pdfPath
            );


            // =================================================
            // SAVE FORM DATA
            // =================================================

            const saveResponse =
                await axios.post(
                    "http://localhost:5000/insurance/save",
                    {
                        patientId: patientId,

                        insuranceCompany:
                            "SBI General Insurance",

                        insuranceData:
                            formData,

                        pdfPath:
                            pdfPath
                    }
                );


            console.log(
                "Insurance DB Response:",
                saveResponse.data
            );


            // =================================================
            // SUCCESS
            // =================================================

            alert(
                "SBI Insurance Form Saved Successfully."
            );

        } catch (error) {

            console.error(
                "========== SBI INSURANCE SAVE ERROR =========="
            );

            console.error(
                "Error:",
                error
            );

            console.error(
                "Message:",
                error.message
            );

            console.error(
                "Response:",
                error.response?.data
            );

            console.error(
                "Status:",
                error.response?.status
            );


            alert(
                "SBI Insurance Form Save Failed."
            );
        }
    };


    // =========================================================
    // SUBMIT
    // =========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        await saveInsurancePdf();
    };


    // =========================================================
    // JSX
    // =========================================================

    return (

        <div className="sbi-page">

            {/* ==================================================
                COMPLETE FORM
            ================================================== */}

            <form
                ref={insuranceRef}
                className="sbi-form"
                onSubmit={handleSubmit}
            >

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="sbi-header">

                    <div className="sbi-logo-box">

                        <div className="sbi-logo">
                            SBI
                        </div>

                        <div>

                            <h3>
                                SBI General
                            </h3>

                            <span>
                                Insurance
                            </span>

                        </div>

                    </div>


                    <div className="sbi-title">

                        <h2>
                            REQUEST FOR CASHLESS
                            HOSPITALISATION
                        </h2>

                        <h3>
                            FOR HEALTH INSURANCE POLICY
                        </h3>

                        <p>
                            (TO BE FILLED IN BLOCK LETTERS)
                        </p>

                    </div>

                </div>


                {/* ==================================================
                    SECTION A
                ================================================== */}

                <SectionTitle
                    title="DETAILS OF THE THIRD PARTY ADMINISTRATOR / INSURER / HOSPITAL"
                />


                <div className="sbi-info">

                    <div className="static-row">

                        <b>
                            a. Name of TPA / Insurance company:
                        </b>

                        <span>
                            PARAMOUNT HEALTH SERVICES &
                            INSURANCE TPA PVT. LTD.
                        </span>

                    </div>


                    <div className="static-row">

                        <b>
                            IRDA Licence No:
                        </b>

                        <span>
                            006
                        </span>

                    </div>


                    <div className="static-row">

                        <b>
                            Cashless Request E-mail Id:
                        </b>

                        <span>
                            al.request@paramounttpa.com
                        </span>

                    </div>


                    <div className="static-row">

                        <b>
                            b. Toll free phone number:
                        </b>

                        <span>
                            1800-22-66 55
                        </span>

                    </div>


                    <div className="static-row">

                        <b>
                            c. Toll free fax:
                        </b>

                        <span>
                            022-66444754 /
                            66444755 /
                            66444709
                        </span>

                    </div>

                </div>


                <div className="sbi-grid">

                    <Input
                        label="d. Name of Hospital"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        full
                    />


                    <Input
                        label="i. Address"
                        name="hospitalAddress"
                        value={formData.hospitalAddress}
                        onChange={handleChange}
                        full
                    />


                    <Input
                        label="ii. Rohini ID"
                        name="rohiniId"
                        value={formData.rohiniId}
                        onChange={handleChange}
                    />


                    <Input
                        label="iii. E-mail ID"
                        name="hospitalEmail"
                        value={formData.hospitalEmail}
                        onChange={handleChange}
                    />

                </div>


                {/* ==================================================
                    INSURED / PATIENT
                ================================================== */}

                <SectionTitle
                    title="TO BE FILLED BY INSURED / PATIENT"
                />


                <div className="sbi-grid">

                    <Input
                        label="A. Name of the Patient"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        full
                    />


                    <Radio
                        label="B. Gender"
                        name="gender"
                        value={formData.gender}
                        options={[
                            "Male",
                            "Female",
                            "Third Gender"
                        ]}
                        onChange={handleChange}
                    />


                    <div className="field">

                        <label>
                            C. Age
                        </label>

                        <div className="age-row">

                            <input
                                name="ageYears"
                                value={formData.ageYears}
                                onChange={handleChange}
                                placeholder="Years"
                            />

                            <input
                                name="ageMonths"
                                value={formData.ageMonths}
                                onChange={handleChange}
                                placeholder="Months"
                            />

                        </div>

                    </div>


                    <Input
                        label="D. Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                    />


                    <Input
                        label="E. Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />


                    <Input
                        label="F. Contact Number of Attending Relative"
                        name="attendingRelativeContact"
                        value={formData.attendingRelativeContact}
                        onChange={handleChange}
                    />


                    <Input
                        label="G. Insured Card ID Number"
                        name="insuredCardId"
                        value={formData.insuredCardId}
                        onChange={handleChange}
                    />


                    <Input
                        label="H. Policy Number / Name of Corporate"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={handleChange}
                    />


                    <Input
                        label="Corporate Name"
                        name="corporateName"
                        value={formData.corporateName}
                        onChange={handleChange}
                    />


                    <Input
                        label="I. Employee ID"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                    />


                    <Radio
                        label="J. Currently do you have any other Mediclaim / Health Insurance?"
                        name="otherInsurance"
                        value={formData.otherInsurance}
                        options={[
                            "Yes",
                            "No"
                        ]}
                        onChange={handleChange}
                    />


                    <Input
                        label="i. Company Name"
                        name="otherInsuranceCompany"
                        value={formData.otherInsuranceCompany}
                        onChange={handleChange}
                    />


                    <Input
                        label="ii. Give Details"
                        name="otherInsuranceDetails"
                        value={formData.otherInsuranceDetails}
                        onChange={handleChange}
                    />


                    <Radio
                        label="K. Do you have a Family Physician?"
                        name="familyPhysician"
                        value={formData.familyPhysician}
                        options={[
                            "Yes",
                            "No"
                        ]}
                        onChange={handleChange}
                    />


                    <Input
                        label="L. Name of the Family Physician"
                        name="familyPhysicianName"
                        value={formData.familyPhysicianName}
                        onChange={handleChange}
                    />


                    <Input
                        label="M. Contact Number, if any"
                        name="familyPhysicianContact"
                        value={formData.familyPhysicianContact}
                        onChange={handleChange}
                    />

                </div>


                <p className="red-note">
                    (PLEASE COMPLETE DECLARATION OF THIS FORM)
                </p>


                {/* ==================================================
                    TREATING DOCTOR
                ================================================== */}

                <SectionTitle
                    title="TO BE FILLED BY TREATING DOCTOR / HOSPITAL"
                />


                <div className="sbi-grid">

                    <Input
                        label="A. Name of the treating Doctor"
                        name="treatingDoctorName"
                        value={formData.treatingDoctorName}
                        onChange={handleChange}
                    />


                    <Input
                        label="B. Contact Number"
                        name="doctorContact"
                        value={formData.doctorContact}
                        onChange={handleChange}
                    />


                    <Input
                        label="C. Nature of Illness / Disease with presenting complaint"
                        name="natureOfIllness"
                        value={formData.natureOfIllness}
                        onChange={handleChange}
                        full
                    />


                    <Input
                        label="D. Relevant Critical Findings"
                        name="criticalFindings"
                        value={formData.criticalFindings}
                        onChange={handleChange}
                        full
                    />


                    <Input
                        label="E. Duration of the present ailment"
                        name="ailmentDuration"
                        value={formData.ailmentDuration}
                        onChange={handleChange}
                    />


                    <Input
                        label="i. Date of First Consultation"
                        name="firstConsultation"
                        type="date"
                        value={formData.firstConsultation}
                        onChange={handleChange}
                    />


                    <Input
                        label="ii. Past history of present ailment, if any"
                        name="pastHistory"
                        value={formData.pastHistory}
                        onChange={handleChange}
                        full
                    />


                    <Input
                        label="F. Provisional Diagnosis"
                        name="provisionalDiagnosis"
                        value={formData.provisionalDiagnosis}
                        onChange={handleChange}
                    />


                    <Input
                        label="i. ICD 10 Code"
                        name="icd10Code"
                        value={formData.icd10Code}
                        onChange={handleChange}
                    />

                </div>


                {/* ==================================================
                    TREATMENT
                ================================================== */}

                <div className="sub-title">
                    G. Proposed line of treatment
                </div>


                <div className="checkbox-grid">

                    {[
                        "Medical Management",
                        "Surgical Management",
                        "Intensive care",
                        "Investigation",
                        "Non-allopathic treatment"
                    ].map((item) => (

                        <label key={item}>

                            <input
                                type="checkbox"
                                value={item}
                                checked={
                                    formData.treatmentPlan.includes(item)
                                }
                                onChange={handleTreatment}
                            />

                            {item}

                        </label>

                    ))}

                </div>


                <div className="sbi-grid">

                    <Input
                        label="H. If investigation and / or Medical Management, provide details"
                        name="medicalTreatmentDetails"
                        value={formData.medicalTreatmentDetails}
                        onChange={handleChange}
                        full
                    />


                    <Input
                        label="i. Route of Drug Administration"
                        name="drugRoute"
                        value={formData.drugRoute}
                        onChange={handleChange}
                    />


                    <Input
                        label="I. If surgical, name of surgery"
                        name="surgeryName"
                        value={formData.surgeryName}
                        onChange={handleChange}
                    />


                    <Input
                        label="i. ICD 10 PCS Code"
                        name="icd10PCSCode"
                        value={formData.icd10PCSCode}
                        onChange={handleChange}
                    />


                    <Input
                        label="J. If other treatment, provide details"
                        name="otherTreatmentDetails"
                        value={formData.otherTreatmentDetails}
                        onChange={handleChange}
                        full
                    />

                </div>


                {/* ==================================================
                    ACCIDENT
                ================================================== */}

                <div className="sub-title">
                    K. How did injury occur
                </div>


                <Input
                    label=""
                    name="injuryCause"
                    value={formData.injuryCause}
                    onChange={handleChange}
                    full
                />


                <div className="sbi-grid">

                    <Radio
                        label="L.i. Is it RTA"
                        name="isRTA"
                        value={formData.isRTA}
                        options={[
                            "Yes",
                            "No"
                        ]}
                        onChange={handleChange}
                    />


                    <Input
                        label="ii. Date of Injury"
                        name="injuryDate"
                        type="date"
                        value={formData.injuryDate}
                        onChange={handleChange}
                    />


                    <Radio
                        label="iii. Report to Police"
                        name="policeReport"
                        value={formData.policeReport}
                        options={[
                            "Yes",
                            "No"
                        ]}
                        onChange={handleChange}
                    />


                    <Input
                        label="iv. FIR NO."
                        name="firNo"
                        value={formData.firNo}
                        onChange={handleChange}
                    />


                    <Radio
                        label="v. Injury / Disease caused due to substance abuse / alcohol consumption"
                        name="substanceAbuse"
                        value={formData.substanceAbuse}
                        options={[
                            "Yes",
                            "No"
                        ]}
                        onChange={handleChange}
                    />


                    <Radio
                        label="vi. Test conducted to establish this"
                        name="substanceTest"
                        value={formData.substanceTest}
                        options={[
                            "Yes",
                            "No"
                        ]}
                        onChange={handleChange}
                    />

                </div>


                {/* ==================================================
                    MATERNITY
                ================================================== */}

                <div className="sub-title">
                    M. In case of Maternity
                </div>


                <div className="maternity-row">

                    <Input
                        label="G"
                        name="maternityG"
                        value={formData.maternityG}
                        onChange={handleChange}
                    />

                    <Input
                        label="P"
                        name="maternityP"
                        value={formData.maternityP}
                        onChange={handleChange}
                    />

                    <Input
                        label="L"
                        name="maternityL"
                        value={formData.maternityL}
                        onChange={handleChange}
                    />

                    <Input
                        label="A"
                        name="maternityA"
                        value={formData.maternityA}
                        onChange={handleChange}
                    />

                </div>


                <Input
                    label="Expected Date of Delivery"
                    name="expectedDeliveryDate"
                    type="date"
                    value={formData.expectedDeliveryDate}
                    onChange={handleChange}
                />


                {/* ==================================================
                    PATIENT ADMITTED
                ================================================== */}

                <SectionTitle
                    title="DETAILS OF PATIENT ADMITTED"
                />


                <div className="sbi-grid">

                    <Input
                        label="A. Date of Admission"
                        name="admissionDate"
                        type="date"
                        value={formData.admissionDate}
                        onChange={handleChange}
                    />


                    <Input
                        label="B. Time of Admission"
                        name="admissionTime"
                        type="time"
                        value={formData.admissionTime}
                        onChange={handleChange}
                    />


                    <Radio
                        label="C. Emergency / Planned Hospitalization"
                        name="hospitalizationType"
                        value={formData.hospitalizationType}
                        options={[
                            "Emergency",
                            "Planned"
                        ]}
                        onChange={handleChange}
                    />

                </div>


                {/* ==================================================
                    CHRONIC ILLNESS
                ================================================== */}

                <div className="chronic-table">

                    <div className="chronic-header">

                        <span>
                            D. Mandatory Past History of any chronic illness
                        </span>

                        <span>
                            Since month/year
                        </span>

                    </div>


                    <ChronicRow
                        label="i. Diabetes"
                        name="diabetes"
                        value={formData.diabetes}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="ii. Heart disease"
                        name="heartDisease"
                        value={formData.heartDisease}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="iii. Hypertension"
                        name="hypertension"
                        value={formData.hypertension}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="iv. Hyperlipidemias"
                        name="hyperlipidemias"
                        value={formData.hyperlipidemias}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="v. Osteoarthritis"
                        name="osteoarthritis"
                        value={formData.osteoarthritis}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="vi. Asthma / COPD / Bronchitis"
                        name="asthmaCOPD"
                        value={formData.asthmaCOPD}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="vii. Cancer"
                        name="cancer"
                        value={formData.cancer}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="viii. Alcohol / Drug abuse"
                        name="alcoholDrugAbuse"
                        value={formData.alcoholDrugAbuse}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="ix. Any HIV / STD Related ailment"
                        name="hivStd"
                        value={formData.hivStd}
                        onChange={handleChange}
                    />


                    <Input
                        label="x. Any other ailment, give details"
                        name="otherAilment"
                        value={formData.otherAilment}
                        onChange={handleChange}
                        full
                    />

                </div>


                {/* ==================================================
                    COST
                ================================================== */}

                <div className="sbi-grid">

                    <Input
                        label="E. Expected number of Days / stay in hospital"
                        name="expectedStayDays"
                        type="number"
                        value={formData.expectedStayDays}
                        onChange={handleChange}
                    />


                    <Input
                        label="F. Days in ICU"
                        name="icuDays"
                        type="number"
                        value={formData.icuDays}
                        onChange={handleChange}
                    />


                    <Input
                        label="G. Room Type"
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        full
                    />

                </div>


                <div className="cost-table">

                    <CostRow
                        label="H. Per day room rent + nursing and service charges + patients diet"
                        name="roomRent"
                        value={formData.roomRent}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="I. Expected cost of investigation + diagnostic"
                        name="investigationCost"
                        value={formData.investigationCost}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="J. ICU charges"
                        name="icuCharges"
                        value={formData.icuCharges}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="K. OT charges"
                        name="otCharges"
                        value={formData.otCharges}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="L. Professional fees Surgeon + Anesthetist Fees + Consultation Charges"
                        name="professionalFees"
                        value={formData.professionalFees}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="M. Medicines + Consumables + Cost of Implants"
                        name="medicinesConsumables"
                        value={formData.medicinesConsumables}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="N. Other hospital expenses if any"
                        name="otherHospitalExpenses"
                        value={formData.otherHospitalExpenses}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="O. All-inclusive package charges if any applicable"
                        name="packageCharges"
                        value={formData.packageCharges}
                        onChange={handleChange}
                    />


                    <CostRow
                        label="P. Sum Total expected cost of hospitalization"
                        name="totalExpectedCost"
                        value={formData.totalExpectedCost}
                        onChange={handleChange}
                    />

                </div>


                {/* ==================================================
                    DECLARATION
                ================================================== */}

                <SectionTitle
                    title="DECLARATION"
                />


                <p className="declaration-note">
                    (Please read very carefully)
                </p>


                <p className="declaration-text">

                    We confirm having read understood and agreed
                    to the Declarations of this form.

                </p>


                <div className="sbi-grid">

                    <Input
                        label="a. Name of the treating doctor"
                        name="treatingDoctorName"
                        value={formData.treatingDoctorName}
                        onChange={handleChange}
                    />


                    <Input
                        label="b. Qualification"
                        name="doctorQualification"
                        value={formData.doctorQualification}
                        onChange={handleChange}
                    />


                    <Input
                        label="c. Registration number with State code"
                        name="doctorRegistration"
                        value={formData.doctorRegistration}
                        onChange={handleChange}
                        full
                    />

                </div>


                {/* ==================================================
                    CONSENT
                ================================================== */}

                <div className="consent-box">

                    I provide my explicit consent to the undersign
                    hospital to collect, store, process, transfer,
                    archive my KYC documents for the Purpose of
                    availing cashless claim facility.

                </div>


                {/* ==================================================
                    SIGNATURES
                ================================================== */}

                <div className="signature-section">

                    {/* HOSPITAL SEAL */}

                    <div className="signature-box">

                        <label>
                            Hospital Seal
                        </label>


                        <div className="hospital-seal">

                            <div className="field">

                                <label>
                                    Hospital Seal
                                </label>


                                <input
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    onChange={handleHospitalSeal}
                                />

                            </div>

                        </div>


                        <mark>
                            Must include Hospital ID
                        </mark>

                    </div>


                    {/* PATIENT SIGNATURE */}

                    <div className="signature-box">

                        <label>
                            Patient / Insured Name and Sign
                        </label>


                        <Signature
                            height={70}
                            design="line"
                            onSave={(image) => {

                                setFormData(
                                    (prev) => ({
                                        ...prev,
                                        patientSignature:
                                            image
                                    })
                                );

                            }}
                        />

                    </div>

                </div>

            </form>


            {/* ==================================================
                ACTION BUTTONS
            ================================================== */}

            <div className="insurance-action-buttons">

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={printInsurance}
                >
                    🖨️ Print Insurance
                </button>


                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={saveInsurancePdf}
                >
                    📄 Save Insurance
                </button>

            </div>

        </div>
    );
}


/* ============================================================
   REUSABLE INPUT
============================================================ */

function Input({
    label,
    name,
    value,
    onChange,
    type = "text",
    full = false
}) {

    return (

        <div
            className={`field ${full ? "full" : ""}`}
        >

            {label && (
                <label>
                    {label}
                </label>
            )}


            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
            />

        </div>
    );
}


/* ============================================================
   RADIO
============================================================ */

function Radio({
    label,
    name,
    value,
    options,
    onChange
}) {

    return (

        <div className="radio-field">

            <span>
                {label}
            </span>


            <div className="radio-options">

                {options.map((option) => (

                    <label key={option}>

                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={onChange}
                        />

                        {option}

                    </label>

                ))}

            </div>

        </div>
    );
}


/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({ title }) {

    return (

        <div className="section-title">

            {title}

        </div>
    );
}


/* ============================================================
   CHRONIC ROW
============================================================ */

function ChronicRow({
    label,
    name,
    value,
    onChange
}) {

    return (

        <div className="chronic-row">

            <span>
                {label}
            </span>


            <input
                type="text"
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder="Month / Year"
            />

        </div>
    );
}


/* ============================================================
   COST ROW
============================================================ */

function CostRow({
    label,
    name,
    value,
    onChange
}) {

    return (

        <div className="cost-row">

            <span>
                {label}
            </span>


            <input
                type="number"
                name={name}
                value={value || ""}
                onChange={onChange}
            />

        </div>
    );
}


export default SBIInsurance;