import React, { useState } from "react";
import Signature from "./CommonCode/SignaturePad";
import "./Style/HDFCErgoInsurance.css";

function HDFCErgoInsurance({ patientId }) {

    const [formData, setFormData] = useState({

        // =========================================
        // TPA / INSURANCE COMPANY
        // =========================================

        tpaInsuranceCompany: "",
        tpaPhone: "",
        tpaFax: "",

        // =========================================
        // PATIENT DETAILS
        // =========================================

        patientFirstName: "",
        patientMiddleName: "",
        patientLastName: "",

        gender: "",
        ageYears: "",
        ageMonths: "",
        dob: "",

        contactNumber: "",
        attendingRelativeContact: "",

        insuredMemberId: "",
        policyNumber: "",
        corporateName: "",
        employeeId: "",

        otherInsurance: "",
        otherInsuranceCompany: "",
        otherInsuranceDetails: "",

        familyPhysician: "",
        familyPhysicianName: "",
        familyPhysicianContact: "",

        // =========================================
        // TREATING DOCTOR / HOSPITAL
        // =========================================

        treatingDoctor: "",
        doctorContact: "",

        natureOfIllness: "",
        clinicalFindings: "",
        ailmentDuration: "",
        firstConsultationDate: "",
        pastHistory: "",

        provisionalDiagnosis: "",
        icdCode: "",

        treatmentPlan: [],

        medicalManagementDetails: "",
        drugRoute: "",

        surgeryName: "",
        icd10PCSCode: "",

        otherTreatmentDetails: "",

        // =========================================
        // ACCIDENT
        // =========================================

        injuryCause: "",
        isRTA: "",
        injuryDate: "",
        reportedToPolice: "",
        firNo: "",

        substanceAbuse: "",
        substanceTest: "",

        // =========================================
        // HOSPITALIZATION
        // =========================================

        admissionDate: "",
        admissionTime: "",

        hospitalizationType: "",

        diabetes: "",
        osteoarthritis: "",
        heartDisease: "",
        asthmaCOPDBronchitis: "",
        hypertension: "",
        cancer: "",
        hivStd: "",
        hyperlipidemias: "",
        alcoholDrugAbuse: "",
        otherAilment: "",

        expectedStayDays: "",
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

        // =========================================
        // DECLARATION
        // =========================================

        doctorQualification: "",
        doctorRegistration: "",

        patientNameDeclaration: "",
        patientContactDeclaration: "",

        hospitalSeal: "",

        // Signature images
        patientSignature: "",
        hospitalSignature: ""

    });


    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // =========================================
    // TREATMENT CHECKBOX
    // =========================================

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


    // =========================================
    // HOSPITAL SEAL
    // =========================================

    const handleHospitalSeal = (e) => {

        const file = e.target.files[0];

        if (file) {

            setFormData((prev) => ({
                ...prev,
                hospitalSeal: file
            }));

        }

    };


    // =========================================
    // SUBMIT
    // =========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Patient ID:", patientId);

        console.log(
            "HDFC ERGO Insurance Claim:",
            formData
        );

        alert(
            "HDFC ERGO Insurance Claim submitted successfully."
        );

    };


    return (

        <div className="hdfc-page">

            <form
                className="hdfc-form"
                onSubmit={handleSubmit}
            >


                {/* =====================================================
                    PAGE 1
                ====================================================== */}

                <div className="hdfc-page-section">


                    {/* =========================================
                        HEADER
                    ========================================= */}

                    <div className="hdfc-header">

                        <div className="hdfc-company">

                            <div className="hdfc-logo">
                                HDFC
                            </div>

                            <div>

                                <h2>
                                    HDFC ERGO
                                </h2>

                                <p>
                                    General Insurance
                                </p>

                            </div>

                        </div>


                        <div className="hdfc-document-title">

                            <h2>
                                REQUEST FOR CASHLESS
                                HOSPITALISATION
                            </h2>

                            <p>
                                FOR MEDICAL INSURANCE POLICY
                            </p>

                            <small>
                                PLEASE FAX / SCAN PAGE 1 ONLY
                            </small>

                        </div>

                    </div>


                    {/* =========================================
                        TPA DETAILS
                    ========================================= */}

                    <div className="hdfc-section-title">

                        DETAILS OF THE THIRD PARTY
                        ADMINISTRATOR

                    </div>


                    <p className="mandatory-text">

                        (All fields are mandatory and fill in
                        CAPITALS only)

                    </p>


                    <div className="hdfc-grid">


                        <Input
                            label="a) Name of the TPA / Insurance Company"
                            name="tpaInsuranceCompany"
                            value={formData.tpaInsuranceCompany}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="b) Toll free phone no."
                            name="tpaPhone"
                            value={formData.tpaPhone}
                            onChange={handleChange}
                        />


                        <Input
                            label="c) Toll free FAX"
                            name="tpaFax"
                            value={formData.tpaFax}
                            onChange={handleChange}
                        />

                    </div>


                    {/* =========================================
                        INSURED / PATIENT
                    ========================================= */}

                    <div className="hdfc-section-title">

                        TO BE FILLED BY INSURED / PATIENT

                    </div>


                    <div className="hdfc-grid">


                        <Input
                            label="a) Name of the Patient - First Name"
                            name="patientFirstName"
                            value={formData.patientFirstName}
                            onChange={handleChange}
                        />


                        <Input
                            label="Middle Name"
                            name="patientMiddleName"
                            value={formData.patientMiddleName}
                            onChange={handleChange}
                        />


                        <Input
                            label="Last Name"
                            name="patientLastName"
                            value={formData.patientLastName}
                            onChange={handleChange}
                        />


                        <Radio
                            label="b) Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            options={[
                                "Male",
                                "Female"
                            ]}
                        />


                        <div className="hdfc-field">

                            <label>
                                c) Age
                            </label>

                            <div className="age-row">

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


                        <Input
                            label="d) Date of Birth"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                        />


                        <Input
                            label="e) Contact Number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />


                        <Input
                            label="f) Contact number of attending relative"
                            name="attendingRelativeContact"
                            value={formData.attendingRelativeContact}
                            onChange={handleChange}
                        />


                        <Input
                            label="g) Insured Member ID card No."
                            name="insuredMemberId"
                            value={formData.insuredMemberId}
                            onChange={handleChange}
                        />


                        <Input
                            label="h) Policy No. / Corporate Name"
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
                            label="i) Employee ID"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                        />


                        <Radio
                            label="j) Currently do you have any Mediclaim / Health Insurance?"
                            name="otherInsurance"
                            value={formData.otherInsurance}
                            onChange={handleChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                            full
                        />


                        <Input
                            label="k) Company Name"
                            name="otherInsuranceCompany"
                            value={formData.otherInsuranceCompany}
                            onChange={handleChange}
                        />


                        <Input
                            label="l) Give details"
                            name="otherInsuranceDetails"
                            value={formData.otherInsuranceDetails}
                            onChange={handleChange}
                        />


                        <Radio
                            label="m) Do you have a family physician?"
                            name="familyPhysician"
                            value={formData.familyPhysician}
                            onChange={handleChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                        />


                        <Input
                            label="n) Name of the family physician"
                            name="familyPhysicianName"
                            value={formData.familyPhysicianName}
                            onChange={handleChange}
                        />


                        <Input
                            label="o) Contact No, if any"
                            name="familyPhysicianContact"
                            value={formData.familyPhysicianContact}
                            onChange={handleChange}
                        />

                    </div>


                    <p className="form-footer-note">

                        (PLEASE COMPLETE DECLARATION ON THE
                        REVERSE SIDE OF THE FORM)

                    </p>


                    {/* =========================================
                        TREATING DOCTOR / HOSPITAL
                    ========================================= */}

                    <div className="hdfc-section-title">

                        TO BE FILLED BY TREATING DOCTOR /
                        HOSPITAL

                    </div>


                    <div className="hdfc-grid">


                        <Input
                            label="a) Name of the Treating Doctor"
                            name="treatingDoctor"
                            value={formData.treatingDoctor}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="b) Contact Number"
                            name="doctorContact"
                            value={formData.doctorContact}
                            onChange={handleChange}
                        />


                        <Input
                            label="c) Nature of illness / Disease with presenting complaints"
                            name="natureOfIllness"
                            value={formData.natureOfIllness}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="d) Relevant clinical findings"
                            name="clinicalFindings"
                            value={formData.clinicalFindings}
                            onChange={handleChange}
                            full
                        />


                        <div className="hdfc-field">

                            <label>
                                e) Duration of present ailment
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
                            label="f) Date of first consultation"
                            name="firstConsultationDate"
                            type="date"
                            value={formData.firstConsultationDate}
                            onChange={handleChange}
                        />


                        <Input
                            label="g) Past history of present ailment, if any"
                            name="pastHistory"
                            value={formData.pastHistory}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="h) Provisional Diagnosis"
                            name="provisionalDiagnosis"
                            value={formData.provisionalDiagnosis}
                            onChange={handleChange}
                        />


                        <Input
                            label="i) ICD Code"
                            name="icdCode"
                            value={formData.icdCode}
                            onChange={handleChange}
                        />

                    </div>


                    {/* =========================================
                        PROPOSED TREATMENT
                    ========================================= */}

                    <div className="hdfc-sub-title">

                        j) Proposed line of treatment

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
                            label="Intensive Care Unit"
                            value="Intensive Care Unit"
                            checked={formData.treatmentPlan.includes(
                                "Intensive Care Unit"
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


                    <div className="hdfc-grid">


                        <Input
                            label="k) Investigational & / or Medical Management - provide details"
                            name="medicalManagementDetails"
                            value={formData.medicalManagementDetails}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="m) Route of drug administration"
                            name="drugRoute"
                            value={formData.drugRoute}
                            onChange={handleChange}
                        />


                        <Input
                            label="n) If surgical, name of surgery"
                            name="surgeryName"
                            value={formData.surgeryName}
                            onChange={handleChange}
                        />


                        <Input
                            label="o) ICD 10 PCS code"
                            name="icd10PCSCode"
                            value={formData.icd10PCSCode}
                            onChange={handleChange}
                        />


                        <Input
                            label="p) If other treatment provide details"
                            name="otherTreatmentDetails"
                            value={formData.otherTreatmentDetails}
                            onChange={handleChange}
                            full
                        />

                    </div>


                    {/* =========================================
                        ACCIDENT
                    ========================================= */}

                    <div className="hdfc-sub-title">

                        q) How did injury occur

                    </div>


                    <Input
                        name="injuryCause"
                        value={formData.injuryCause}
                        onChange={handleChange}
                        full
                    />


                    <div className="hdfc-sub-title">

                        r) In case of Accident

                    </div>


                    <div className="accident-grid">


                        <Radio
                            label="i. Is RTA"
                            name="isRTA"
                            value={formData.isRTA}
                            onChange={handleChange}
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
                            label="iii. Reported to police"
                            name="reportedToPolice"
                            value={formData.reportedToPolice}
                            onChange={handleChange}
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
                            label="v. Injury / Disease caused due to substance abuse / alcohol consumption"
                            name="substanceAbuse"
                            value={formData.substanceAbuse}
                            onChange={handleChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                        />


                        <Radio
                            label="vi. Test conducted to establish this"
                            name="substanceTest"
                            value={formData.substanceTest}
                            onChange={handleChange}
                            options={[
                                "Yes",
                                "No"
                            ]}
                        />

                    </div>


                    {/* =========================================
                        DETAILS OF PATIENT ADMITTED
                    ========================================= */}

                    <div className="hdfc-section-title">

                        DETAILS OF PATIENT ADMITTED

                    </div>


                    <div className="hdfc-grid">


                        <Input
                            label="a) Date of admission"
                            name="admissionDate"
                            type="date"
                            value={formData.admissionDate}
                            onChange={handleChange}
                        />


                        <Input
                            label="b) Time"
                            name="admissionTime"
                            type="time"
                            value={formData.admissionTime}
                            onChange={handleChange}
                        />


                        <Radio
                            label="c) Is this a emergency / a planned hospitalisation event?"
                            name="hospitalizationType"
                            value={formData.hospitalizationType}
                            onChange={handleChange}
                            options={[
                                "Emergency",
                                "Planned"
                            ]}
                            full
                        />

                    </div>


                    {/* =========================================
                        CHRONIC ILLNESS
                    ========================================= */}

                    <div className="chronic-heading">

                        <span>
                            Mandatory: Past history of any chronic illness
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
                        label="Osteoarthritis"
                        name="osteoarthritis"
                        value={formData.osteoarthritis}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Heart Disease"
                        name="heartDisease"
                        value={formData.heartDisease}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Asthma / COPD / Bronchitis"
                        name="asthmaCOPDBronchitis"
                        value={formData.asthmaCOPDBronchitis}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Hypertension"
                        name="hypertension"
                        value={formData.hypertension}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Cancer"
                        name="cancer"
                        value={formData.cancer}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Any HIV or STD / Related ailments"
                        name="hivStd"
                        value={formData.hivStd}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Hyperlipidemias"
                        name="hyperlipidemias"
                        value={formData.hyperlipidemias}
                        onChange={handleChange}
                    />


                    <ChronicRow
                        label="Alcohol or drug abuse"
                        name="alcoholDrugAbuse"
                        value={formData.alcoholDrugAbuse}
                        onChange={handleChange}
                    />


                    <Input
                        label="Any other Ailment - give details"
                        name="otherAilment"
                        value={formData.otherAilment}
                        onChange={handleChange}
                        full
                    />


                    {/* =========================================
                        EXPECTED STAY
                    ========================================= */}

                    <div className="hdfc-grid">


                        <div className="hdfc-field">

                            <label>
                                d) Expected No. of days stay in hospital
                            </label>

                            <div className="inline-input">

                                <input
                                    type="number"
                                    name="expectedStayDays"
                                    value={formData.expectedStayDays}
                                    onChange={handleChange}
                                />

                                <span>
                                    Days
                                </span>

                            </div>

                        </div>


                        <Input
                            label="e) Room Type"
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                        />

                    </div>


                    {/* =========================================
                        EXPECTED HOSPITALIZATION COST
                    ========================================= */}

                    <div className="cost-table">

                        <CostRow
                            label="f) Per Day Room Rent + Nursing & Service Charges + Patient's Diet"
                            name="roomRent"
                            value={formData.roomRent}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="g) Expected cost for investigation + diagnostics"
                            name="investigationCost"
                            value={formData.investigationCost}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="h) ICU Charges"
                            name="icuCharges"
                            value={formData.icuCharges}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="i) OT Charges"
                            name="otCharges"
                            value={formData.otCharges}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="j) Professional fees - Surgeon + Anesthetist Fees + Consultation Charges"
                            name="professionalFees"
                            value={formData.professionalFees}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="k) Medicines + Consumables + Cost of Implants"
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
                            label="l) All inclusive package charges if any applicable"
                            name="packageCharges"
                            value={formData.packageCharges}
                            onChange={handleChange}
                        />


                        <CostRow
                            label="m) Sum Total expected cost of hospitalization"
                            name="totalExpectedCost"
                            value={formData.totalExpectedCost}
                            onChange={handleChange}
                            total
                        />

                    </div>

                </div>


                {/* =====================================================
                    PAGE BREAK
                ====================================================== */}

                <div className="hdfc-page-break"></div>


                {/* =====================================================
                    PAGE 2
                ====================================================== */}

                <div className="hdfc-page-section">


                    {/* =========================================
                        DECLARATION
                    ========================================= */}

                    <div className="hdfc-section-title">

                        DECLARATION

                    </div>


                    <p className="declaration-warning">

                        We confirm having read understood and agreed
                        to the Declarations on the reverse side of
                        the form.

                    </p>


                    <p className="declaration-text">

                        I/We hereby understand, declare, consent and
                        authorise the Company that personal health
                        details, medical history and financial
                        information, as provided to the Company may
                        be utilised for processing the claim made
                        under the Policy.

                    </p>


                    <p className="declaration-text">

                        I/We hereby also understand, declare and
                        consent that the Company shall have right
                        to retain the same for providing services
                        related to insurance.

                    </p>


                    {/* =========================================
                        DOCTOR DETAILS
                    ========================================= */}

                    <div className="hdfc-grid">


                        <Input
                            label="a) Name of the treating doctor"
                            name="treatingDoctor"
                            value={formData.treatingDoctor}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="b) Qualification"
                            name="doctorQualification"
                            value={formData.doctorQualification}
                            onChange={handleChange}
                            full
                        />


                        <Input
                            label="c) Registration No. with state code"
                            name="doctorRegistration"
                            value={formData.doctorRegistration}
                            onChange={handleChange}
                            full
                        />

                    </div>


                    {/* =========================================
                        HOSPITAL SEAL + PATIENT SIGNATURE
                    ========================================= */}

                    <div className="hospital-signature-area">


                        {/* HOSPITAL SEAL */}

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

                                <p className="selected-file">

                                    {formData.hospitalSeal.name}

                                </p>

                            )}

                        </div>


                        {/* PATIENT SIGNATURE */}

                        <div className="patient-signature-box">

                            <label>
                                Patient / Insured Name & Signature
                            </label>


                            <Input
                                label=""
                                name="patientNameDeclaration"
                                value={formData.patientNameDeclaration}
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


                    {/* =========================================
                        PATIENT / REPRESENTATIVE DECLARATION
                    ========================================= */}

                    <div className="hdfc-section-title">

                        DECLARATION BY THE PATIENT / REPRESENTATIVE

                    </div>


                    <div className="declaration-list">

                        <p>
                            <b>1.</b> I agree to allow the hospital
                            to submit all original documents pertaining
                            to hospitalization to the Insurer / TPA
                            after the discharge.
                        </p>


                        <p>
                            <b>2.</b> Payment to hospital is subject
                            to fulfilment of the terms and conditions
                            of the policy. In case the Insurer / TPA
                            is not liable to settle the hospital bill,
                            I undertake to settle the bill as per the
                            terms and conditions of the policy.
                        </p>


                        <p>
                            <b>3.</b> All non-medical expenses and
                            expenses not relevant to current
                            hospitalization and the amounts over and
                            above the limit authorized by the Insurer /
                            TPA will be paid by me.
                        </p>


                        <p>
                            <b>4.</b> I hereby declare to abide by
                            the terms and conditions of the policy
                            and if at any time the facts disclosed by
                            me are found to be false or incorrect I
                            forfeit my claim.
                        </p>


                        <p>
                            <b>5.</b> I agree and understand that TPA
                            is in no way warranting the service of
                            the hospital and that the Insurer / TPA
                            is in no way guaranteeing that the services
                            provided by the hospital will be of a
                            particular quality or standard.
                        </p>


                        <p>
                            <b>6.</b> I understand and declare that
                            the information, declaration & statements
                            provided by me is true in all aspects.
                        </p>


                        <p>
                            <b>7.</b> I agree to make payment to the
                            Hospital against all expenses incurred
                            on treatment which are not approved for
                            payment by the Insurer.
                        </p>

                    </div>


                    {/* =========================================
                        PATIENT SIGNATURE DETAILS
                    ========================================= */}

                    <div className="patient-declaration-details">


                        <Input
                            label="Patient's / Insured's Name"
                            name="patientNameDeclaration"
                            value={formData.patientNameDeclaration}
                            onChange={handleChange}
                        />


                        <Input
                            label="Contact No."
                            name="patientContactDeclaration"
                            value={formData.patientContactDeclaration}
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


                    {/* =========================================
                        HOSPITAL DECLARATION
                    ========================================= */}

                    <div className="hdfc-section-title">

                        HOSPITAL DECLARATION

                    </div>


                    <div className="declaration-list">

                        <p>
                            <b>1.</b> We have no objection to any
                            authorized TPA / Insurance Company official /
                            Authorised representative verifying documents
                            pertaining to hospitalization.
                        </p>


                        <p>
                            <b>2.</b> All valid original documents duly
                            countersigned by the insured / patient as
                            per the checklist mentioned in the claim
                            form will be sent to TPA / Insurance Company
                            within 7 days of the patient's discharge.
                        </p>


                        <p>
                            <b>3.</b> All non-medical expenses OR
                            expenses not relevant to hospitalization
                            or illness, OR expenses disallowed in the
                            Authorization Letter of the TPA / Insurance
                            Co. will be collected from the patient.
                        </p>


                        <p>
                            <b>4.</b> We agree that TPA / Insurance
                            Company will not be liable to make the
                            payment in the event of any discrepancy
                            between the facts in this form and discharge
                            summary or other documents.
                        </p>


                        <p>
                            <b>5.</b> The patient declaration has been
                            signed by the patient or by his representative
                            in our presence.
                        </p>


                        <p>
                            <b>6.</b> We agree to provide clarifications
                            for the queries raised regarding this
                            hospitalization.
                        </p>


                        <p>
                            <b>7.</b> We will abide by the terms and
                            conditions agreed in the MOU.
                        </p>

                    </div>


                    {/* =========================================
                        HOSPITAL SIGNATURE / SEAL
                    ========================================= */}

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

                        </div>


                        <div className="signature-box">

                            <label>
                                Hospital Representative Signature
                            </label>


                            <Signature
                                height={80}
                                design="line"
                                onSave={(image) => {

                                    setFormData((prev) => ({
                                        ...prev,
                                        hospitalSignature: image
                                    }));

                                }}
                            />

                        </div>

                    </div>


                    {/* =========================================
                        SUPPORTING DOCUMENTS
                    ========================================= */}

                    <div className="hdfc-section-title">

                        DOCUMENTS TO BE PROVIDED BY THE HOSPITAL
                        IN SUPPORT OF THE CLAIM

                    </div>


                    <div className="document-list">

                        <p>
                            <b>1.</b> Original copy of detailed
                            Discharge Summary and all Bills from
                            the hospital.
                        </p>


                        <p>
                            <b>2.</b> Original copy of cash Memos
                            from the Hospitals / Chemists supported
                            by prescription.
                        </p>


                        <p>
                            <b>3.</b> Original copy of receipts,
                            Investigation Reports and Radiological
                            Films, supported by note from the attending
                            Medical Practitioner / Surgeon recommending
                            such investigations.
                        </p>


                        <p>
                            <b>4.</b> Original copy of surgeon's
                            Certificate stating nature of operation
                            performed and Surgeon's Bill and Receipt.
                        </p>


                        <p>
                            <b>5.</b> Pre-authorization is approved
                            subject to successful submission of KYC
                            documents.
                        </p>


                        <p>
                            <b>6.</b> Please provide any one of the
                            following documents to fulfill KYC norms.
                        </p>


                        <p className="kyc-documents">

                            Driving License / AADHAR Card /
                            Voter Card / Passport / any other
                            Government authorised identity proof
                            of the insured carrying name and
                            photograph.

                        </p>

                    </div>


                    {/* =========================================
                        SUBMIT
                    ========================================= */}

                    <button
                        type="submit"
                        className="hdfc-submit-btn"
                    >

                        Submit HDFC ERGO Insurance Claim

                    </button>

                </div>

            </form>

        </div>
    );
}


/* =============================================================
   INPUT COMPONENT
============================================================= */

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
            className={`hdfc-field ${full ? "full-field" : ""}`}
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


/* =============================================================
   RADIO COMPONENT
============================================================= */

function Radio({
    label,
    name,
    value,
    options,
    onChange,
    full = false
}) {

    return (

        <div
            className={`hdfc-radio-field ${
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

                        <span>
                            {option}
                        </span>

                    </label>

                ))}

            </div>

        </div>
    );
}


/* =============================================================
   CHECKBOX
============================================================= */

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


/* =============================================================
   CHRONIC ROW
============================================================= */

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


/* =============================================================
   COST ROW
============================================================= */

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
                total ? "total-cost-row" : ""
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


export default HDFCErgoInsurance;