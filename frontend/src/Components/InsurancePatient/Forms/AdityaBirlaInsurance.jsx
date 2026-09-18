import React, { useState, useRef } from "react";
import axios from "axios";
import Signature from "./CommonCode/SignaturePad";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import "./Style/AdityaBirlaInsurance.css";

function AdityaBirlaInsurance({ patientId }) {

    // =====================================================
    // PDF / PRINT REF
    // =====================================================

    const insuranceRef = useRef(null);


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        // ================================
        // TPA DETAILS
        // ================================

        tpaInsuranceCompany: "",
        tpaPhone: "",
        tpaFax: "",

        // ================================
        // PATIENT DETAILS
        // ================================

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

        // ================================
        // TREATING DOCTOR / HOSPITAL
        // ================================

        treatingDoctor: "",
        doctorContact: "",

        natureOfIllness: "",
        clinicalFindings: "",
        ailmentDuration: "",
        firstConsultationDate: "",
        pastHistory: "",

        provisionalDiagnosis: "",
        icd10Code: "",

        treatmentPlan: [],

        medicalManagementDetails: "",
        drugRoute: "",
        surgeryName: "",
        icd10PCSCode: "",
        otherTreatmentDetails: "",

        injuryCause: "",

        // ================================
        // ACCIDENT
        // ================================

        isRTA: "",
        injuryDate: "",
        reportedToPolice: "",
        firNo: "",

        substanceAbuse: "",
        substanceTest: "",

        // ================================
        // MATERNITY
        // ================================

        maternityGP: "",
        maternityL: "",
        maternityA: "",
        deliveryDate: "",

        // ================================
        // ADMISSION DETAILS
        // ================================

        admissionDate: "",
        admissionTime: "",
        hospitalizationType: "",
        expectedStayDays: "",
        roomType: "",

        // ================================
        // COST DETAILS
        // ================================

        roomRent: "",
        investigationCost: "",
        icuCharges: "",
        otCharges: "",
        professionalFees: "",
        medicinesConsumables: "",
        otherHospitalExpenses: "",
        packageCharges: "",
        totalExpectedCost: "",

        // ================================
        // CHRONIC ILLNESS
        // ================================

        diabetes: "",
        heartDisease: "",
        hypertension: "",
        hyperlipidemias: "",
        osteoarthritis: "",
        asthmaCOPDBronchitis: "",
        cancer: "",
        alcoholDrugAbuse: "",
        hivStd: "",
        otherAilment: "",

        // ================================
        // DOCTOR DECLARATION
        // ================================

        doctorQualification: "",
        doctorRegistration: "",

        // ================================
        // PATIENT DECLARATION
        // ================================

        patientDeclarationName: "",
        patientDeclarationContact: "",

        // ================================
        // FILE / SIGNATURE
        // ================================

        hospitalSeal: "",
        patientSignature: "",
        doctorSignature: ""

    });


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // =====================================================
    // RADIO
    // =====================================================

    const handleRadioChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // =====================================================
    // TREATMENT CHECKBOX
    // =====================================================

    const handleTreatmentChange = (e) => {

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


    // =====================================================
    // HOSPITAL SEAL
    // =====================================================

    const handleHospitalSeal = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {

            setFormData((prev) => ({
                ...prev,
                hospitalSeal: reader.result
            }));

        };

        reader.readAsDataURL(file);

    };


    // =====================================================
    // PRINT
    // =====================================================

    const printInsurance = useReactToPrint({

        contentRef: insuranceRef,

        documentTitle:
            `${patientId || "Patient"}_Aditya_Birla_Insurance`

    });


    // =====================================================
    // GENERATE PDF
    // =====================================================

    const generateInsurancePdf = async () => {

        if (!insuranceRef.current) {

            alert("Insurance Form Not Found");

            return null;

        }

        try {

            const element = insuranceRef.current;


            // Hide buttons while creating PDF
            document.body.classList.add(
                "aditya-pdf-capture"
            );


            // Wait for DOM rendering
            await new Promise((resolve) =>
                requestAnimationFrame(() =>
                    requestAnimationFrame(resolve)
                )
            );


            const options = {

                margin: 5,

                filename:
                    `${patientId || "Patient"}_Aditya_Birla_Insurance.pdf`,

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


            const pdfBlob =
                await html2pdf()
                    .set(options)
                    .from(element)
                    .outputPdf("blob");


            return pdfBlob;

        }
        catch (error) {

            console.error(
                "Aditya Birla PDF Error:",
                error
            );

            alert(
                "PDF generate करताना error आला."
            );

            return null;

        }
        finally {

            document.body.classList.remove(
                "aditya-pdf-capture"
            );

        }

    };


    // =====================================================
    // SAVE PDF
    // =====================================================

    const saveInsurancePdf = async () => {

        try {

            if (!patientId) {

                alert("Patient ID Not Found");

                return;

            }


            // Generate PDF
            const pdfBlob =
                await generateInsurancePdf();


            if (!pdfBlob) return;


            // =================================================
            // UPLOAD PDF
            // =================================================

            const uploadData =
                new FormData();


            uploadData.append(
                "file",
                pdfBlob,
                `${patientId}_Aditya_Birla_Insurance.pdf`
            );


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


            // =================================================
            // SAVE INSURANCE DATA
            // =================================================

            await axios.post(
                "http://localhost:5000/insurance/save",
                {

                    patientId: patientId,

                    insuranceCompany:
                        "Aditya Birla Health Insurance",

                    insuranceData:
                        formData,

                    pdfPath:
                        pdfPath

                }
            );


            alert(
                "Aditya Birla Insurance PDF saved successfully."
            );

        }
        catch (error) {

            console.error(
                "Save Insurance PDF Error:",
                error
            );

            console.error(
                "Backend Response:",
                error.response?.data
            );

            alert(
                "Aditya Birla Insurance PDF save failed."
            );

        }

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(
            "Patient ID:",
            patientId
        );

        console.log(
            "Aditya Birla Insurance Form:",
            formData
        );


        await saveInsurancePdf();

    };


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="aditya-page">

            <form
                ref={insuranceRef}
                className="aditya-form"
                onSubmit={handleSubmit}
            >


                {/* ==================================================
                    PAGE 1
                ================================================== */}

                <div className="aditya-page-section">


                    {/* ================= HEADER ================= */}

                    <div className="aditya-header">

                        <div className="aditya-logo-area">

                            <div className="aditya-logo">
                                Aditya
                            </div>

                            <div>

                                <h2>
                                    Aditya Birla
                                </h2>

                                <p>
                                    Health Insurance
                                </p>

                            </div>

                        </div>


                        <div className="aditya-title">

                            <h2>
                                PREAUTHORIZATION FORM
                            </h2>

                            <p>
                                Request For Cashless Hospitalisation
                            </p>

                            <small>
                                For Medical Insurance Policy
                            </small>

                        </div>

                    </div>


                    {/* ================= TPA ================= */}

                    <SectionTitle>
                        DETAILS OF THE THIRD PARTY ADMINISTRATOR
                    </SectionTitle>


                    <p className="aditya-note">
                        (To be filled in block letters)
                    </p>


                    <div className="aditya-grid">

                        <Input
                            label="a. Name of TPA / Insurance Company"
                            name="tpaInsuranceCompany"
                            value={formData.tpaInsuranceCompany}
                            onChange={handleChange}
                            full
                        />

                        <Input
                            label="b. Toll free phone number"
                            name="tpaPhone"
                            value={formData.tpaPhone}
                            onChange={handleChange}
                        />

                        <Input
                            label="c. Toll free FAX"
                            name="tpaFax"
                            value={formData.tpaFax}
                            onChange={handleChange}
                        />

                    </div>


                    {/* ================= PATIENT ================= */}

                    <SectionTitle>
                        TO BE FILLED BY THE INSURED / PATIENT
                    </SectionTitle>


                    <div className="aditya-grid">

                        <Input
                            label="a. Name of the Patient"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            full
                        />


                        <Radio
                            label="b. Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleRadioChange}
                            options={[
                                "Male",
                                "Female"
                            ]}
                        />


                        <div className="aditya-field">

                            <label>
                                c. Age
                            </label>

                            <div className="age-group">

                                <input
                                    type="number"
                                    name="ageYears"
                                    placeholder="Years"
                                    value={formData.ageYears}
                                    onChange={handleChange}
                                />

                                <input
                                    type="number"
                                    name="ageMonths"
                                    placeholder="Months"
                                    value={formData.ageMonths}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        <Input
                            label="d. Date of Birth"
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />


                        <Input
                            label="e. Contact Number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />


                        <Input
                            label="f. Contact Number of Attending Relative"
                            name="attendingRelativeContact"
                            value={formData.attendingRelativeContact}
                            onChange={handleChange}
                        />


                        <Input
                            label="g. Insured Card ID Number"
                            name="insuredCardId"
                            value={formData.insuredCardId}
                            onChange={handleChange}
                        />


                        <Input
                            label="h. Policy Number"
                            name="policyNumber"
                            value={formData.policyNumber}
                            onChange={handleChange}
                        />


                        <Input
                            label="Name of Corporate"
                            name="corporateName"
                            value={formData.corporateName}
                            onChange={handleChange}
                        />


                        <Input
                            label="Employee ID"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                        />


                        <Radio
                            label="j. Currently do you have any other Mediclaim / Health Insurance?"
                            name="otherInsurance"
                            value={formData.otherInsurance}
                            onChange={handleRadioChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                            full
                        />


                        <Input
                            label="k. Company Name"
                            name="otherInsuranceCompany"
                            value={formData.otherInsuranceCompany}
                            onChange={handleChange}
                        />


                        <Input
                            label="Give Details"
                            name="otherInsuranceDetails"
                            value={formData.otherInsuranceDetails}
                            onChange={handleChange}
                        />


                        <Radio
                            label="l. Do you have any family physician?"
                            name="familyPhysician"
                            value={formData.familyPhysician}
                            onChange={handleRadioChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                        />


                        <Input
                            label="m. Name of the family physician"
                            name="familyPhysicianName"
                            value={formData.familyPhysicianName}
                            onChange={handleChange}
                        />


                        <Input
                            label="n. Contact number if any"
                            name="familyPhysicianContact"
                            value={formData.familyPhysicianContact}
                            onChange={handleChange}
                        />

                    </div>


                    <p className="reverse-note">
                        (PLEASE COMPLETE DECLARATION ON THE
                        REVERSE SIDE OF THIS FORM)
                    </p>


                    {/* ================= DOCTOR ================= */}

                    <SectionTitle>
                        TO BE FILLED BY THE TREATING DOCTOR / HOSPITAL
                    </SectionTitle>


                    <div className="aditya-grid">

                        <Input
                            label="a. Name of the treating doctor"
                            name="treatingDoctor"
                            value={formData.treatingDoctor}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="b. Contact number"
                            name="doctorContact"
                            value={formData.doctorContact}
                            onChange={handleChange}
                        />


                        <Input
                            label="c. Nature of illness / Disease with presenting complaints"
                            name="natureOfIllness"
                            value={formData.natureOfIllness}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="d. Relevant clinical findings"
                            name="clinicalFindings"
                            value={formData.clinicalFindings}
                            onChange={handleChange}
                            full
                        />


                        <div className="aditya-field">

                            <label>
                                e. Duration of present ailment
                            </label>

                            <div className="inline-input">

                                <input
                                    type="number"
                                    name="ailmentDuration"
                                    value={formData.ailmentDuration}
                                    onChange={handleChange}
                                />

                                <span>
                                    Days
                                </span>

                            </div>

                        </div>


                        <Input
                            label="Date of first consultation"
                            type="date"
                            name="firstConsultationDate"
                            value={formData.firstConsultationDate}
                            onChange={handleChange}
                        />


                        <Input
                            label="Past history of present ailment if any"
                            name="pastHistory"
                            value={formData.pastHistory}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="f. Provisional diagnosis"
                            name="provisionalDiagnosis"
                            value={formData.provisionalDiagnosis}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="g. ICD 10 Code"
                            name="icd10Code"
                            value={formData.icd10Code}
                            onChange={handleChange}
                        />

                    </div>


                    {/* ================= TREATMENT ================= */}

                    <div className="aditya-subtitle">
                        h. Proposed line of treatment
                    </div>


                    <div className="treatment-grid">

                        <CheckBox
                            label="Medical Management"
                            value="Medical Management"
                            checked={formData.treatmentPlan.includes(
                                "Medical Management"
                            )}
                            onChange={handleTreatmentChange}
                        />


                        <CheckBox
                            label="Surgical Management"
                            value="Surgical Management"
                            checked={formData.treatmentPlan.includes(
                                "Surgical Management"
                            )}
                            onChange={handleTreatmentChange}
                        />


                        <CheckBox
                            label="Intensive Care"
                            value="Intensive Care"
                            checked={formData.treatmentPlan.includes(
                                "Intensive Care"
                            )}
                            onChange={handleTreatmentChange}
                        />


                        <CheckBox
                            label="Investigation"
                            value="Investigation"
                            checked={formData.treatmentPlan.includes(
                                "Investigation"
                            )}
                            onChange={handleTreatmentChange}
                        />


                        <CheckBox
                            label="Non allopathic treatment"
                            value="Non allopathic treatment"
                            checked={formData.treatmentPlan.includes(
                                "Non allopathic treatment"
                            )}
                            onChange={handleTreatmentChange}
                        />

                    </div>


                    <div className="aditya-grid">

                        <Input
                            label="i. Investigation / Medical Management details"
                            name="medicalManagementDetails"
                            value={formData.medicalManagementDetails}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="j. Route of drug administration"
                            name="drugRoute"
                            value={formData.drugRoute}
                            onChange={handleChange}
                        />


                        <Input
                            label="k. If Surgical, name of surgery"
                            name="surgeryName"
                            value={formData.surgeryName}
                            onChange={handleChange}
                        />


                        <Input
                            label="l. ICD 10 PCS Code"
                            name="icd10PCSCode"
                            value={formData.icd10PCSCode}
                            onChange={handleChange}
                        />


                        <Input
                            label="m. If other treatments provide details"
                            name="otherTreatmentDetails"
                            value={formData.otherTreatmentDetails}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="n. How did injury occur"
                            name="injuryCause"
                            value={formData.injuryCause}
                            onChange={handleChange}
                            full
                        />

                    </div>


                    {/* ================= ACCIDENT ================= */}

                    <div className="aditya-subtitle">
                        o. In case of accident
                    </div>


                    <div className="aditya-grid">

                        <Radio
                            label="i. Is RTA"
                            name="isRTA"
                            value={formData.isRTA}
                            onChange={handleRadioChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                        />


                        <Input
                            label="ii. Date of injury"
                            name="injuryDate"
                            type="date"
                            value={formData.injuryDate}
                            onChange={handleChange}
                        />


                        <Radio
                            label="iii. Reported to Police"
                            name="reportedToPolice"
                            value={formData.reportedToPolice}
                            onChange={handleRadioChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                        />


                        <Input
                            label="iv. FIR No."
                            name="firNo"
                            value={formData.firNo}
                            onChange={handleChange}
                        />


                        <Radio
                            label="p. Injury / Disease caused due to substance abuse / alcohol consumption"
                            name="substanceAbuse"
                            value={formData.substanceAbuse}
                            onChange={handleRadioChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                            full
                        />


                        <Radio
                            label="Test conducted to establish this"
                            name="substanceTest"
                            value={formData.substanceTest}
                            onChange={handleRadioChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                            full
                        />

                    </div>


                    {/* ================= MATERNITY ================= */}

                    <div className="aditya-subtitle">
                        q. In case of Maternity
                    </div>


                    <div className="maternity-grid">

                        <Input
                            label="G"
                            name="maternityGP"
                            value={formData.maternityGP}
                            onChange={handleChange}
                        />


                        <Input
                            label="P"
                            name="maternityL"
                            value={formData.maternityL}
                            onChange={handleChange}
                        />


                        <Input
                            label="L"
                            name="maternityA"
                            value={formData.maternityA}
                            onChange={handleChange}
                        />


                        <Input
                            label="A"
                            name="maternityA"
                            value={formData.maternityA}
                            onChange={handleChange}
                        />


                        <Input
                            label="Date of Delivery"
                            name="deliveryDate"
                            type="date"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                        />

                    </div>

                </div>


                {/* ==================================================
                    PAGE 2
                ================================================== */}

                <div className="aditya-page-break"></div>


                <div className="aditya-page-section">

                    <SectionTitle>
                        DETAILS OF THE PATIENT ADMITTED
                    </SectionTitle>


                    <div className="aditya-grid">

                        <Input
                            label="a. Date of admission"
                            name="admissionDate"
                            type="date"
                            value={formData.admissionDate}
                            onChange={handleChange}
                        />


                        <Input
                            label="b. Time"
                            name="admissionTime"
                            type="time"
                            value={formData.admissionTime}
                            onChange={handleChange}
                        />


                        <Radio
                            label="c. Is this an emergency / a planned hospitalization event?"
                            name="hospitalizationType"
                            value={formData.hospitalizationType}
                            onChange={handleRadioChange}
                            options={[
                                "Emergency",
                                "Planned"
                            ]}
                            full
                        />


                        <Input
                            label="d. Expected no. of days stay in hospital"
                            name="expectedStayDays"
                            value={formData.expectedStayDays}
                            onChange={handleChange}
                        />


                        <Input
                            label="e. Room Type"
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                        />

                    </div>


                    <SectionTitle>
                        EXPECTED HOSPITALISATION EXPENSES
                    </SectionTitle>


                    <div className="cost-table">

                        <CostRow
                            label="f. Per Day Room Rent + Nursing & Service Charges + Patient's Diet"
                            name="roomRent"
                            value={formData.roomRent}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="g. Expected cost of investigation + diagnostics"
                            name="investigationCost"
                            value={formData.investigationCost}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="h. ICU Charges"
                            name="icuCharges"
                            value={formData.icuCharges}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="i. OT Charges"
                            name="otCharges"
                            value={formData.otCharges}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="j. Professional fees - Surgeon + Anaesthetist Fees + Consultation Charges"
                            name="professionalFees"
                            value={formData.professionalFees}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="k. Medicines + Consumables + Cost of Implants"
                            name="medicinesConsumables"
                            value={formData.medicinesConsumables}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="Other hospital expenses if any"
                            name="otherHospitalExpenses"
                            value={formData.otherHospitalExpenses}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="l. All inclusive package charges if any applicable"
                            name="packageCharges"
                            value={formData.packageCharges}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="m. Sum total expected cost of hospitalisation"
                            name="totalExpectedCost"
                            value={formData.totalExpectedCost}
                            onChange={handleChange}
                            total
                        />

                    </div>


                    <SectionTitle>
                        MANDATORY: PAST HISTORY OF ANY CHRONIC ILLNESS
                    </SectionTitle>


                    <div className="chronic-header">

                        <span>
                            Chronic Illness
                        </span>

                        <span>
                            If yes, since (month/year)
                        </span>

                    </div>


                    <ChronicRow
                        label="Diabetes"
                        name="diabetes"
                        value={formData.diabetes}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Heart Disease"
                        name="heartDisease"
                        value={formData.heartDisease}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Hypertension"
                        name="hypertension"
                        value={formData.hypertension}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Hyperlipidemias"
                        name="hyperlipidemias"
                        value={formData.hyperlipidemias}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Osteoarthritis"
                        name="osteoporosis"
                        value={formData.osteoarthritis}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Asthma / COPD / Bronchitis"
                        name="asthmaCOPDBronchitis"
                        value={formData.asthmaCOPDBronchitis}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Cancer"
                        name="cancer"
                        value={formData.cancer}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Alcohol or drug abuse"
                        name="alcoholDrugAbuse"
                        value={formData.alcoholDrugAbuse}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Any HIV or STD / Related ailment"
                        name="hivStd"
                        value={formData.hivStd}
                        onChange={handleChange}
                    />


                    <Input
                        label="Any other Ailment - give details"
                        name="otherAilment"
                        value={formData.otherAilment}
                        onChange={handleChange}
                        full
                    />


                    {/* ================= DECLARATION ================= */}

                    <SectionTitle>
                        DECLARATION
                    </SectionTitle>


                    <p className="declaration-intro">

                        We confirm having read understood and agreed
                        to the Declarations on the reverse of this form.

                    </p>


                    <div className="aditya-grid">

                        <Input
                            label="a. Name of the treating doctor"
                            name="treatingDoctor"
                            value={formData.treatingDoctor}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="b. Qualification"
                            name="doctorQualification"
                            value={formData.doctorQualification}
                            onChange={handleChange}
                        />


                        <Input
                            label="c. Registration No. with State Code"
                            name="doctorRegistration"
                            value={formData.doctorRegistration}
                            onChange={handleChange}
                        />

                    </div>


                    {/* ================= SEAL + SIGNATURE ================= */}

                    <div className="hospital-signature-area">

                        <div className="seal-box">

                            <label>
                                Hospital Seal
                                <br />
                                (Must include Hospital ID)
                            </label>


                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={handleHospitalSeal}
                            />


                            {formData.hospitalSeal && (

                                <img
                                    src={formData.hospitalSeal}
                                    alt="Hospital Seal"
                                    className="hospital-seal-preview"
                                />

                            )}

                        </div>


                        <div className="signature-box">

                            <label>
                                Patient / Insured Name & Signature
                            </label>


                            <Input
                                label=""
                                name="patientDeclarationName"
                                value={formData.patientDeclarationName}
                                onChange={handleChange}
                            />


                            <Signature
                                height={80}
                                design="line"
                                onSave={(image) => {

                                    setFormData((prev) => ({
                                        ...prev,
                                        patientSignature: image
                                    }));

                                }}
                            />

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    PAGE 3
                ================================================== */}

                <div className="aditya-page-break"></div>


                <div className="aditya-page-section">

                    <SectionTitle>
                        DECLARATION BY THE PATIENT / REPRESENTATIVE
                    </SectionTitle>


                    <div className="declaration-list">

                        <p>
                            <b>1.</b> I agree to allow the hospital to
                            submit all original documents pertaining to
                            hospitalization to the Insurer / TPA after
                            the discharge. I agree to sign on the Final
                            Bill & the Discharge Summary, before my
                            discharge.
                        </p>


                        <p>
                            <b>2.</b> Payment to hospital is governed by
                            the terms and conditions of the policy. In
                            case the Insurer / TPA is not liable to settle
                            the hospital bill, I undertake to settle the
                            bill as per the terms and conditions of the
                            policy.
                        </p>


                        <p>
                            <b>3.</b> All non-medical expenses and expenses
                            not relevant to current hospitalization and
                            amounts over & above the limit authorised by
                            the Insurer / TPA will be paid by me.
                        </p>


                        <p>
                            <b>4.</b> I hereby declare to abide by the
                            terms and conditions of the policy and if at
                            any time the facts disclosed by me are found
                            to be false or incorrect, I forfeit my claim.
                        </p>


                        <p>
                            <b>5.</b> I agree and understand that TPA is
                            in no way warranting the service of the
                            hospital and that the Insurer / TPA is in no
                            way guaranteeing that the services provided
                            by the hospital will be of a particular
                            quality or standard.
                        </p>


                        <p>
                            <b>6.</b> I hereby warrant the truth of the
                            foregoing particulars in every respect and
                            agree that false or untrue statement,
                            suppression or concealment may forfeit my
                            claim.
                        </p>


                        <p>
                            <b>7.</b> I agree to indemnify the hospital
                            against all expenses incurred on my behalf
                            which are not reimbursed by the Insurer / TPA.
                        </p>

                    </div>


                    <div className="patient-declaration-details">

                        <Input
                            label="Patient's / Insured's Name"
                            name="patientDeclarationName"
                            value={formData.patientDeclarationName}
                            onChange={handleChange}
                        />


                        <Input
                            label="Contact Number"
                            name="patientDeclarationContact"
                            value={formData.patientDeclarationContact}
                            onChange={handleChange}
                        />


                        <div className="signature-box">

                            <label>
                                Patient's / Insured's Signature
                            </label>


                            <Signature
                                height={80}
                                design="line"
                                onSave={(image) => {

                                    setFormData((prev) => ({
                                        ...prev,
                                        patientSignature: image
                                    }));

                                }}
                            />

                        </div>

                    </div>


                    {/* ================= HOSPITAL DECLARATION ================= */}

                    <SectionTitle>
                        HOSPITAL DECLARATION
                    </SectionTitle>


                    <div className="declaration-list">

                        <p>
                            <b>1.</b> We have no objection to any
                            authorized TPA / Insurance Company official
                            verifying documents pertaining to
                            hospitalization.
                        </p>


                        <p>
                            <b>2.</b> All valid original documents duly
                            countersigned by the insured / patient will
                            be sent to TPA / Insurance Company within
                            7 days of the patient's discharge.
                        </p>


                        <p>
                            <b>3.</b> All non-medical expenses or
                            expenses not relevant to hospitalization
                            or illness or expenses disallowed in the
                            Authorisation Letter will be collected
                            from the patient.
                        </p>


                        <p>
                            <b>4.</b> TPA / Insurance Company will not
                            be liable to make payment in the event of
                            discrepancy between facts in this form and
                            discharge summary or other documents.
                        </p>


                        <p>
                            <b>5.</b> The patient declaration has been
                            signed by the patient or representative in
                            our presence.
                        </p>


                        <p>
                            <b>6.</b> We agree to provide clarifications
                            for queries raised regarding this
                            hospitalization.
                        </p>


                        <p>
                            <b>7.</b> We will abide by the terms and
                            conditions agreed in the MOU.
                        </p>

                    </div>


                    {/* ================= HOSPITAL SIGNATURE ================= */}

                    <div className="hospital-signature-area">

                        <div className="seal-box">

                            <label>
                                Hospital Seal
                            </label>


                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={handleHospitalSeal}
                            />


                            {formData.hospitalSeal && (

                                <img
                                    src={formData.hospitalSeal}
                                    alt="Hospital Seal"
                                    className="hospital-seal-preview"
                                />

                            )}

                        </div>


                        <div className="signature-box">

                            <label>
                                Doctor's Signature
                            </label>


                            <Signature
                                height={80}
                                design="line"
                                onSave={(image) => {

                                    setFormData((prev) => ({
                                        ...prev,
                                        doctorSignature: image
                                    }));

                                }}
                            />

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    PAGE 4
                ================================================== */}

                <div className="aditya-page-break"></div>


                <div className="aditya-page-section">

                    <SectionTitle>
                        DOCUMENTS TO BE PROVIDED BY THE HOSPITAL
                        IN SUPPORT OF THE CLAIM
                    </SectionTitle>


                    <div className="document-list">

                        <p>
                            <b>1.</b> Detailed Discharge Summary and
                            all Bills from the hospital.
                        </p>


                        <p>
                            <b>2.</b> Cash Memos from the Hospitals /
                            Chemists supported by proper prescription.
                        </p>


                        <p>
                            <b>3.</b> Receipts and Pathological Test
                            Reports from Pathologists, supported by
                            note from the attending Medical
                            Practitioner / Surgeon recommending
                            such pathological Tests.
                        </p>


                        <p>
                            <b>4.</b> Surgeon's Certificate stating
                            nature of operation performed and
                            Surgeon's Bill and Receipt.
                        </p>


                        <p>
                            <b>5.</b> Certificates from attending
                            Medical Practitioner / Surgeon that the
                            patient is fully cured.
                        </p>

                    </div>


                    {/* ==================================================
                        PDF ACTION BUTTONS
                    ================================================== */}

                    <div className="insurance-action-buttons">

                        <button
                            type="button"
                            className="insurance-print-btn"
                            onClick={printInsurance}
                        >
                            🖨️ Print
                        </button>


                        <button
                            type="button"
                            className="insurance-pdf-btn"
                            onClick={saveInsurancePdf}
                        >
                            📄 Save PDF
                        </button>

                    </div>

                </div>

            </form>

        </div>

    );

}


// =============================================================
// SECTION TITLE
// =============================================================

function SectionTitle({ children }) {

    return (

        <div className="aditya-section-title">

            {children}

        </div>

    );

}


// =============================================================
// INPUT
// =============================================================

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
            className={`aditya-field ${
                full ? "full-field" : ""
            }`}
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


// =============================================================
// RADIO
// =============================================================

function Radio({
    label,
    name,
    value,
    onChange,
    options,
    full = false
}) {

    return (

        <div
            className={`aditya-radio-field ${
                full ? "full-field" : ""
            }`}
        >

            <label className="radio-title">
                {label}
            </label>


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


// =============================================================
// CHECKBOX
// =============================================================

function CheckBox({
    label,
    value,
    checked,
    onChange
}) {

    return (

        <label className="treatment-checkbox">

            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />

            <span>
                {label}
            </span>

        </label>

    );

}


// =============================================================
// CHRONIC ROW
// =============================================================

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
                placeholder="MM / YYYY"
                onChange={onChange}
            />

        </div>

    );

}


// =============================================================
// COST ROW
// =============================================================

function CostRow({
    label,
    name,
    value,
    onChange,
    total = false
}) {

    return (

        <div
            className={`cost-row ${
                total ? "total-cost" : ""
            }`}
        >

            <span>
                {label}
            </span>


            <div className="rupee-input">

                <span>
                    Rs.
                </span>


                <input
                    type="number"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                />

            </div>

        </div>

    );

}


export default AdityaBirlaInsurance;