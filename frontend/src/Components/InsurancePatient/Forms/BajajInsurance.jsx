
import React, { useState, useRef } from "react";

import axios from "axios";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";

import Signature from "../Forms/CommonCode/SignaturePad";

import BajajInsuranceHeader from "./BajajInsuranceHeader";

import "./Style/BajajInsurance.css";


function BajajInsurance({ patientId }) {

    /* ============================================================
       PDF / PRINT REF
    ============================================================ */

    const insuranceRef = useRef(null);


    /* ============================================================
       FORM DATA
    ============================================================ */

    const [formData, setFormData] = useState({

        /* PROVIDER */

        hospitalName: "",
        cityName: "",
        pinCode: "",
        stateName: "",
        hospitalId: "",
        landmark: "",
        rohiniId: "",
        hospitalContactNo: "",
        faxNo: "",
        tpaDeskNo: "",
        hospitalEmail: "",


        /* PATIENT */

        patientName: "",
        currentAddress: "",
        gender: "",
        ageYears: "",
        ageMonths: "",
        dateOfBirth: "",

        attendantName: "",
        attendantContact: "",
        contactNumber: "",
        insuredCardId: "",
        occupation: "",

        policyNumber: "",
        corporateName: "",
        employeeId: "",
        proposerName: "",
        ckycProposer: "",
        panNo: "",

        otherHealthInsurance: "",
        otherInsuranceCompany: "",
        otherInsuranceDetails: "",

        familyPhysician: "",
        familyPhysicianName: "",
        familyPhysicianContact: "",
        insuredEmail: "",


        /* DOCTOR / HOSPITAL */

        treatingDoctor: "",
        doctorContact: "",
        illness: "",
        clinicalFindings: "",
        ailmentDurationDays: "",
        firstConsultationDate: "",
        pastHistory: "",
        provisionalDiagnosis: "",
        icd10Code: "",

        treatmentLine: [],
        investigationDetails: "",
        drugRoute: "",
        surgeryName: "",
        icd10PcsCode: "",
        otherTreatmentDetails: "",

        injuryCause: "",
        isRta: "",
        injuryDate: "",
        policeReported: "",
        firNo: "",

        substanceAbuse: "",
        substanceAbuseTest: "",

        maternityGPLA: "",
        expectedDeliveryDate: "",
        lmp: "",


        /* ADMISSION */

        admissionDate: "",
        admissionTime: "",
        hospitalizationType: "",
        expectedStayDays: "",
        roomType: "",

        expectedIcuDays: "",
        roomRentNursingDiet: "",
        investigationCost: "",
        icuCharges: "",
        otCharges: "",
        professionalFees: "",
        medicinesConsumablesImplants: "",
        otherHospitalExpenses: "",
        packageCharges: "",
        totalExpectedCost: "",

        chronicIllness: "",
        chronicIllnessSince: "",


        /* DECLARATION */

        patientDeclarationName: "",
        patientDeclarationContact: "",
        patientDeclarationEmail: "",

        patientSignature: "",
        hospitalDoctorSignature: ""

    });


    /* ============================================================
       HANDLE INPUT
    ============================================================ */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    /* ============================================================
       TREATMENT CHECKBOX
    ============================================================ */

    const handleTreatmentChange = (e) => {

        const {
            value,
            checked
        } = e.target;

        setFormData((prev) => ({

            ...prev,

            treatmentLine: checked

                ? [
                    ...prev.treatmentLine,
                    value
                ]

                : prev.treatmentLine.filter(
                    (item) => item !== value
                )

        }));

    };


    /* ============================================================
       SIGNATURE
    ============================================================ */

    const setSignature = (name, image) => {

        setFormData((prev) => ({
            ...prev,
            [name]: image
        }));

    };


    /* ============================================================
       PRINT
    ============================================================ */

    const printInsurance = useReactToPrint({

        contentRef: insuranceRef,

        documentTitle:
            `${patientId || "Patient"}_Bajaj_Insurance`

    });


    /* ============================================================
       GENERATE PDF
    ============================================================ */

    const generateInsurancePdf = async () => {

        if (!insuranceRef.current) {

            alert("Insurance form not found.");

            return null;

        }


        try {

            const element = insuranceRef.current;


            /* Hide buttons */

            document.body.classList.add(
                "bajaj-pdf-capture"
            );


            /* Wait for UI */

            await new Promise((resolve) => {

                requestAnimationFrame(() => {

                    requestAnimationFrame(resolve);

                });

            });


            const options = {

                margin: 5,

                filename:
                    `${patientId || "Patient"}_Bajaj_Insurance.pdf`,

                image: {
                    type: "jpeg",
                    quality: 1
                },

                html2canvas: {

                    scale: 2,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor: "#ffffff",

                    scrollX: 0,

                    scrollY: 0,

                    width: element.scrollWidth,

                    height: element.scrollHeight

                },

                jsPDF: {

                    unit: "mm",

                    format: "a3",

                    orientation: "portrait"

                },

                pagebreak: {

                    mode: [
                        "css",
                        "legacy"
                    ]

                }

            };


            const pdfBlob = await html2pdf()

                .set(options)

                .from(element)

                .outputPdf("blob");


            return pdfBlob;


        } catch (error) {

            console.error(
                "Bajaj Insurance PDF Error:",
                error
            );

            alert(
                "PDF generation failed."
            );

            return null;


        } finally {

            document.body.classList.remove(
                "bajaj-pdf-capture"
            );

        }

    };


    /* ============================================================
       SAVE PDF + INSURANCE DATA
    ============================================================ */

    const saveInsurancePdf = async () => {

        try {

            if (!patientId) {

                alert(
                    "Patient ID not found."
                );

                return;

            }


            /* Generate PDF */

            const pdfBlob =
                await generateInsurancePdf();


            if (!pdfBlob) {
                return;
            }


            /* Create FormData */

            const uploadData =
                new FormData();


            uploadData.append(

                "file",

                pdfBlob,

                `${patientId}_Bajaj_Insurance.pdf`

            );


            /* Upload PDF */

            const uploadResponse =
                await axios.post(

                    "http://localhost:5000/upload",

                    uploadData,

                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data"
                        }
                    }

                );


            const pdfPath =
                uploadResponse.data.filePath;


            if (!pdfPath) {

                throw new Error(
                    "PDF path not received from server"
                );

            }


            console.log(
                "PDF Uploaded:",
                pdfPath
            );


            /* Save insurance data */

            await axios.post(

                "http://localhost:5000/insurance/save",

                {

                    patientId: patientId,

                    insuranceCompany:
                        "Bajaj General Insurance",

                    insuranceData:
                        formData,

                    pdfPath:
                        pdfPath

                }

            );


            alert(
                "Bajaj Insurance Form saved successfully."
            );


        } catch (error) {

            console.error(
                "Bajaj Insurance Save Error:",
                error
            );

            console.error(
                "Backend Response:",
                error.response?.data
            );

            alert(
                "Bajaj Insurance Form save failed."
            );

        }

    };


    /* ============================================================
       SUBMIT
    ============================================================ */

    const handleSubmit = async (e) => {

        e.preventDefault();

        await saveInsurancePdf();

    };


    /* ============================================================
       REUSABLE FIELD
    ============================================================ */

    const Field = ({
        label,
        name,
        type = "text",
        placeholder = ""
    }) => (

        <div className="form-group">

            <label>
                {label}
            </label>

            <input

                type={type}

                name={name}

                value={formData[name]}

                onChange={handleChange}

                placeholder={placeholder}

            />

        </div>

    );


    /* ============================================================
       TEXT AREA
    ============================================================ */

    const TextArea = ({
        label,
        name,
        rows = 3
    }) => (

        <div className="form-group full-width">

            <label>
                {label}
            </label>

            <textarea

                name={name}

                value={formData[name]}

                onChange={handleChange}

                rows={rows}

            />

        </div>

    );


    /* ============================================================
       YES / NO
    ============================================================ */

    const YesNo = ({
        label,
        name
    }) => (

        <div className="form-group">

            <label>
                {label}
            </label>

            <div className="inline-options">

                {
                    [
                        "Yes",
                        "No"
                    ].map((option) => (

                        <label key={option}>

                            <input

                                type="radio"

                                name={name}

                                value={option}

                                checked={
                                    formData[name] === option
                                }

                                onChange={handleChange}

                            />

                            {option}

                        </label>

                    ))
                }

            </div>

        </div>

    );


    /* ============================================================
       RETURN
    ============================================================ */

    return (

        <div className="insurance-form-container">

            <form
                ref={insuranceRef}
                onSubmit={handleSubmit}
            >

                {/* ==================================================
                    BAJAJ HEADER
                ================================================== */}

                <BajajInsuranceHeader />


                {/* ==================================================
                    FORM TITLE
                ================================================== */}

                <div className="insurance-header">

                    <h2>
                        REQUEST FOR CASHLESS HOSPITALISATION
                    </h2>

                    <h3>
                        FOR MEDICAL INSURANCE POLICY
                    </h3>

                </div>


                {/* ==================================================
                    FORM NOTE
                ================================================== */}

                <div className="form-note">

                    <strong>
                        SECTION A &nbsp;
                        SECTION B &nbsp;
                        SECTION C
                    </strong>

                    <span>
                        PLEASE FAX/SCAN PAGE 1 AND 2 ONLY
                    </span>

                </div>


                {/* ==================================================
                    PROVIDER DETAILS
                ================================================== */}

                <h3 className="section-title">
                    DETAILS OF THE PROVIDER
                </h3>


                <div className="form-grid">

                    <div className="form-group full-width">

                        <label>
                            Hospital Name / Nursing Home Name
                        </label>

                        <input
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleChange}
                        />

                    </div>


                    <Field
                        label="City Name"
                        name="cityName"
                    />

                    <Field
                        label="Pin Code"
                        name="pinCode"
                    />

                    <Field
                        label="State Name"
                        name="stateName"
                    />

                    <Field
                        label="Hospital ID"
                        name="hospitalId"
                    />

                    <Field
                        label="Landmark"
                        name="landmark"
                    />

                    <Field
                        label="Rohini ID"
                        name="rohiniId"
                    />

                    <Field
                        label="Hospital Contact No."
                        name="hospitalContactNo"
                        type="tel"
                    />

                    <Field
                        label="Fax No."
                        name="faxNo"
                    />

                    <Field
                        label="TPA Desk No."
                        name="tpaDeskNo"
                        type="tel"
                    />

                    <Field
                        label="Email ID"
                        name="hospitalEmail"
                        type="email"
                    />

                </div>


                {/* ==================================================
                    PATIENT
                ================================================== */}

                <h3 className="section-title">
                    TO BE FILLED BY THE INSURED / PATIENT
                </h3>


                <div className="form-grid">

                    <div className="form-group full-width">

                        <label>
                            Name of the Patient
                        </label>

                        <input
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                        />

                    </div>


                    <TextArea
                        label="Current Address of Insured Patient"
                        name="currentAddress"
                    />


                    <div className="form-group">

                        <label>
                            Gender
                        </label>

                        <div className="inline-options">

                            {
                                [
                                    "Male",
                                    "Female"
                                ].map((option) => (

                                    <label key={option}>

                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option}
                                            checked={
                                                formData.gender === option
                                            }
                                            onChange={handleChange}
                                        />

                                        {option}

                                    </label>

                                ))
                            }

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Age
                        </label>

                        <div className="two-inputs">

                            <input
                                type="number"
                                name="ageYears"
                                value={formData.ageYears}
                                onChange={handleChange}
                                placeholder="Years"
                            />

                            <input
                                type="number"
                                name="ageMonths"
                                value={formData.ageMonths}
                                onChange={handleChange}
                                placeholder="Months"
                            />

                        </div>

                    </div>


                    <Field
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                    />

                    <Field
                        label="Name of the Attendant"
                        name="attendantName"
                    />

                    <Field
                        label="Attendant Contact Number"
                        name="attendantContact"
                        type="tel"
                    />

                    <Field
                        label="Contact Number"
                        name="contactNumber"
                        type="tel"
                    />

                    <Field
                        label="Insured Card ID Number"
                        name="insuredCardId"
                    />

                    <Field
                        label="Occupation of Insured Patient"
                        name="occupation"
                    />

                    <Field
                        label="Policy Number"
                        name="policyNumber"
                    />

                    <Field
                        label="Name of Corporate"
                        name="corporateName"
                    />

                    <Field
                        label="Employee ID"
                        name="employeeId"
                    />

                    <Field
                        label="Name of the Proposer"
                        name="proposerName"
                    />

                    <Field
                        label="CKYC of the Proposer"
                        name="ckycProposer"
                    />

                    <Field
                        label="PAN No."
                        name="panNo"
                    />

                    <YesNo
                        label="Currently do you have any other Mediclaim / Health Insurance?"
                        name="otherHealthInsurance"
                    />

                    <Field
                        label="Company Name"
                        name="otherInsuranceCompany"
                    />

                    <TextArea
                        label="Give Details"
                        name="otherInsuranceDetails"
                        rows={2}
                    />

                    <YesNo
                        label="Do you have a Family Physician?"
                        name="familyPhysician"
                    />

                    <Field
                        label="Name of the Family Physician"
                        name="familyPhysicianName"
                    />

                    <Field
                        label="Family Physician Contact Number"
                        name="familyPhysicianContact"
                        type="tel"
                    />

                    <Field
                        label="Insured Email ID"
                        name="insuredEmail"
                        type="email"
                    />

                </div>


                {/* ==================================================
                    TREATING DOCTOR
                ================================================== */}

                <h3 className="section-title">
                    TO BE FILLED BY THE TREATING DOCTOR / HOSPITAL
                </h3>


                <div className="form-grid">

                    <Field
                        label="Name of the Treating Doctor"
                        name="treatingDoctor"
                    />

                    <Field
                        label="Contact Number"
                        name="doctorContact"
                        type="tel"
                    />

                    <TextArea
                        label="Nature of Illness / Disease with Presenting Complaints"
                        name="illness"
                    />

                    <TextArea
                        label="Relevant Clinical Findings"
                        name="clinicalFindings"
                    />

                    <Field
                        label="Duration of the Present Ailment (Days)"
                        name="ailmentDurationDays"
                        type="number"
                    />

                    <Field
                        label="Date of First Consultation"
                        name="firstConsultationDate"
                        type="date"
                    />

                    <TextArea
                        label="Past History of Present Ailment, if any"
                        name="pastHistory"
                        rows={2}
                    />

                    <Field
                        label="Provisional Diagnosis"
                        name="provisionalDiagnosis"
                    />

                    <Field
                        label="ICD 10 Code"
                        name="icd10Code"
                    />


                    <div className="form-group full-width">

                        <label>
                            Proposed Line of Treatment
                        </label>

                        <div className="check-options">

                            {
                                [
                                    "Medical Management",
                                    "Surgical Management",
                                    "Intensive Care",
                                    "Investigation",
                                    "Non-allopathic Treatment"
                                ].map((item) => (

                                    <label key={item}>

                                        <input
                                            type="checkbox"
                                            value={item}
                                            checked={
                                                formData.treatmentLine.includes(item)
                                            }
                                            onChange={handleTreatmentChange}
                                        />

                                        {item}

                                    </label>

                                ))
                            }

                        </div>

                    </div>


                    <TextArea
                        label="If Investigation / Medical Management, provide details"
                        name="investigationDetails"
                        rows={2}
                    />

                    <Field
                        label="Route of Drug Administration"
                        name="drugRoute"
                    />

                    <Field
                        label="If Surgical, Name of Surgery"
                        name="surgeryName"
                    />

                    <Field
                        label="ICD 10 PCS Code"
                        name="icd10PcsCode"
                    />

                    <TextArea
                        label="If Other Treatments, provide details"
                        name="otherTreatmentDetails"
                        rows={2}
                    />

                    <TextArea
                        label="How did injury occur?"
                        name="injuryCause"
                        rows={2}
                    />

                    <YesNo
                        label="In case of Accident - Is it RTA?"
                        name="isRta"
                    />

                    <Field
                        label="Date of Injury"
                        name="injuryDate"
                        type="date"
                    />

                    <YesNo
                        label="Reported to Police?"
                        name="policeReported"
                    />

                    <Field
                        label="FIR No."
                        name="firNo"
                    />

                    <YesNo
                        label="Injury / Disease caused due to substance abuse / alcohol consumption?"
                        name="substanceAbuse"
                    />

                    <YesNo
                        label="Test conducted to establish this?"
                        name="substanceAbuseTest"
                    />

                    <Field
                        label="In case of Maternity - G P L A"
                        name="maternityGPLA"
                    />

                    <Field
                        label="Expected Date of Delivery"
                        name="expectedDeliveryDate"
                        type="date"
                    />

                    <Field
                        label="LMP"
                        name="lmp"
                        type="date"
                    />

                </div>


                {/* ==================================================
                    ADMISSION DETAILS
                ================================================== */}

                <h3 className="section-title">
                    DETAILS OF THE PATIENT ADMITTED
                </h3>


                <div className="form-grid">

                    <Field
                        label="Date of Admission"
                        name="admissionDate"
                        type="date"
                    />

                    <Field
                        label="Time"
                        name="admissionTime"
                        type="time"
                    />


                    <div className="form-group full-width">

                        <label>
                            Is this an emergency / planned hospitalization event?
                        </label>

                        <div className="inline-options">

                            {
                                [
                                    "Emergency",
                                    "Planned"
                                ].map((option) => (

                                    <label key={option}>

                                        <input
                                            type="radio"
                                            name="hospitalizationType"
                                            value={option}
                                            checked={
                                                formData.hospitalizationType === option
                                            }
                                            onChange={handleChange}
                                        />

                                        {option}

                                    </label>

                                ))
                            }

                        </div>

                    </div>


                    <Field
                        label="Expected No. of Days Stay in Hospital"
                        name="expectedStayDays"
                        type="number"
                    />

                    <Field
                        label="Room Type"
                        name="roomType"
                    />

                    <Field
                        label="Expected No. of Days in ICU"
                        name="expectedIcuDays"
                        type="number"
                    />

                    <Field
                        label="Per Day Room Rent + Nursing & Patient's Diet (Rs.)"
                        name="roomRentNursingDiet"
                        type="number"
                    />

                    <Field
                        label="Expected Cost for Investigation + Diagnostics (Rs.)"
                        name="investigationCost"
                        type="number"
                    />

                    <Field
                        label="ICU Charges (Rs.)"
                        name="icuCharges"
                        type="number"
                    />

                    <Field
                        label="OT Charges (Rs.)"
                        name="otCharges"
                        type="number"
                    />

                    <Field
                        label="Professional Fees - Surgeon + Anesthetist + Consultation (Rs.)"
                        name="professionalFees"
                        type="number"
                    />

                    <Field
                        label="Medicines + Consumables + Cost of Implants (Rs.)"
                        name="medicinesConsumablesImplants"
                        type="number"
                    />

                    <Field
                        label="Other Hospital Expenses (Rs.)"
                        name="otherHospitalExpenses"
                        type="number"
                    />

                    <Field
                        label="All Inclusive Package Charges (Rs.)"
                        name="packageCharges"
                        type="number"
                    />

                    <Field
                        label="Sum Total Expected Cost of Hospitalisation (Rs.)"
                        name="totalExpectedCost"
                        type="number"
                    />

                    <YesNo
                        label="Past History of any Chronic Illness?"
                        name="chronicIllness"
                    />

                    <Field
                        label="If Yes, Since (Month / Year)"
                        name="chronicIllnessSince"
                        placeholder="MM / YYYY"
                    />

                </div>


                {/* ==================================================
                    PATIENT DECLARATION
                ================================================== */}

                <h3 className="section-title">
                    DECLARATION BY THE PATIENT / REPRESENTATIVE
                </h3>


                <div className="declaration-box">

                    <p>
                        <strong>A.</strong>{" "}
                        I agree to allow the hospital to submit all original
                        documents pertaining to hospitalization to the Bajaj
                        General Insurance Limited after discharge. I agree to
                        sign on the Final Bill & the Discharge Summary before
                        my discharge.
                    </p>

                    <p>
                        <strong>B.</strong>{" "}
                        Payment to hospital is governed by the terms and
                        conditions of the policy. If the insurer is not liable
                        to settle the hospital bill, I undertake to settle the
                        bill as per the policy terms.
                    </p>

                    <p>
                        <strong>C.</strong>{" "}
                        All non-medical expenses, expenses not relevant to
                        current hospitalization and amounts over the authorized
                        limit will be paid by me.
                    </p>

                    <p>
                        <strong>D.</strong>{" "}
                        I hereby declare to abide by the terms and conditions
                        of the policy and understand that false or incorrect
                        facts may result in forfeiture of my claim.
                    </p>

                    <p>
                        <strong>E.</strong>{" "}
                        I understand that the insurer does not warrant the
                        service of the hospital or guarantee that its services
                        will be of a particular quality or standard.
                    </p>

                    <p>
                        <strong>F.</strong>{" "}
                        I warrant the truth of the foregoing particulars and
                        understand that false or untrue statements, suppression
                        or concealment may result in forfeiture of reimbursement.
                    </p>

                    <p>
                        <strong>G.</strong>{" "}
                        I agree to indemnify the hospital against expenses
                        incurred on my behalf which are not reimbursed by the
                        insurer.
                    </p>

                    <p>
                        <strong>I.</strong>{" "}
                        I / We authorize the Insurance Company / TPA to contact
                        me / us through SMS / Email / WhatsApp for any update
                        on this claim.
                    </p>

                </div>


                <div className="form-grid">

                    <Field
                        label="Patient's / Insured's Name"
                        name="patientDeclarationName"
                    />

                    <Field
                        label="Contact Number"
                        name="patientDeclarationContact"
                        type="tel"
                    />

                    <Field
                        label="Email ID (Optional)"
                        name="patientDeclarationEmail"
                        type="email"
                    />

                </div>


                {/* PATIENT SIGNATURE */}

                <div className="single-signature">

                    <label>
                        Patient's / Insured's Signature
                    </label>

                    <Signature
                        height={80}
                        design="line"
                        onSave={(image) =>
                            setSignature(
                                "patientSignature",
                                image
                            )
                        }
                    />

                </div>


                {/* ==================================================
                    HOSPITAL DECLARATION
                ================================================== */}

                <h3 className="section-title">
                    HOSPITAL DECLARATION
                </h3>


                <div className="declaration-box">

                    <p>
                        1. We have no objection to any authorized insurance
                        official verifying documents pertaining to hospitalization.
                    </p>

                    <p>
                        2. All valid original documents duly countersigned by
                        the insured / patient as per the checklist will be sent
                        to the insurer after patient discharge.
                    </p>

                    <p>
                        3. We agree that the insurer will not be liable to make
                        payment in the event of any discrepancy between the
                        facts in this form and discharge summary or other documents.
                    </p>

                    <p>
                        4. The patient declaration has been signed by the patient
                        or representative in our presence.
                    </p>

                    <p>
                        5. We agree to provide clarifications for queries raised
                        regarding this hospitalization.
                    </p>

                    <p>
                        6. We will abide by the applicable terms and conditions
                        agreed with the insurer / TPA.
                    </p>

                    <p>
                        7. We confirm that no additional amount would be collected
                        from the insured in excess of agreed package rates except
                        applicable non-admissible amounts.
                    </p>

                    <p>
                        8. We confirm that no recoveries would be made from the
                        deposit amount except applicable non-admissible amounts.
                    </p>

                </div>


                {/* ==================================================
                    HOSPITAL SIGNATURE
                ================================================== */}

                <div className="hospital-signature-area">

                    {/* HOSPITAL SEAL */}

                    <div className="seal-box">

                        <label>
                            Hospital Seal (Must include Hospital ID)
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                        />

                    </div>


                    {/* DOCTOR SIGNATURE */}

                    <div className="doctor-signature-box">

                        <label>
                            Doctor's Signature
                        </label>

                        <Signature
                            height={80}
                            design="line"
                            onSave={(image) =>
                                setSignature(
                                    "hospitalDoctorSignature",
                                    image
                                )
                            }
                        />

                    </div>

                </div>


                {/* ==================================================
                    DOCUMENTS
                ================================================== */}

                <h3 className="section-title">

                    DOCUMENTS TO BE PROVIDED BY THE HOSPITAL
                    IN SUPPORT OF THE CLAIM

                </h3>


                <div className="documents-list">

                    <label>

                        <input type="checkbox" />

                        Detailed Discharge Summary and all Bills
                        from the hospital

                    </label>


                    <label>

                        <input type="checkbox" />

                        Cash Memos from the Hospitals / Chemists
                        supported by proper prescription

                    </label>


                    <label>

                        <input type="checkbox" />

                        Receipts and Pathological Test Reports from
                        Pathologists, supported by recommendation
                        from the attending Medical Practitioner / Surgeon

                    </label>


                    <label>

                        <input type="checkbox" />

                        Surgeon's Certificate stating nature of
                        operation performed and Surgeon's Bill and Receipt

                    </label>


                    <label>

                        <input type="checkbox" />

                        Certificates from attending Medical Practitioner /
                        Surgeon that the patient is fully cured

                    </label>

                </div>


                {/* ==================================================
                    FOOTER
                ================================================== */}

                <div className="form-footer">

                    <p>

                        <strong>
                            Bajaj General Insurance Limited
                        </strong>

                        {" "}
                        (Formerly known as Bajaj Allianz General
                        Insurance Co. Ltd.)

                    </p>

                    <p>

                        CIN: U66010PN2000PLC015329 |
                        UIN: BAJHLIP19087V011819

                    </p>

                    <p>

                        HMS Insurance Module -
                        Cashless Hospitalisation Form

                    </p>

                </div>


                {/* ==================================================
                    PRINT + PDF
                ================================================== */}

                <div className="insurance-action-buttons">

                    <button
                        type="button"
                        className="print-insurance-btn"
                        onClick={printInsurance}
                    >
                        🖨️ Print Insurance Form
                    </button>


                    <button
                        type="button"
                        className="save-insurance-btn"
                        onClick={saveInsurancePdf}
                    >
                        📄 Save Insurance PDF
                    </button>

                </div>



            </form>

        </div>

    );

}

export default BajajInsurance;