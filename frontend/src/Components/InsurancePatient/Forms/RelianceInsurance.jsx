import React, { useState } from "react";
import Signature from "./CommonCode/SignaturePad";
import "./Style/RelianceInsurance.css";

function RelianceInsurance({ patientId }) {
    const [formData, setFormData] = useState({
        insuredName: "",
        mobileNo: "",
        policyNo: "",
        claimNo: "",
        emailId: "",
        groupPolicyCompany: "",
        employeeId: "",
        panNo: "",
        sourceOfFunds: [],
        monthlyIncome: "",
        agentSubAgentName: "",
        agentMobileNo: "",
        agentEmailId: "",

        patientName: "",
        patientUHID: "",
        age: "",
        dob: "",
        gender: "",
        patientMobileNo: "",
        patientEmailId: "",
        relationWithInsured: "",
        address: "",
        city: "",
        pinCode: "",
        attendantName: "",
        attendantMobileNo: "",
        attendantEmailId: "",

        hospitalName: "",
        hospitalCode: "",
        hospitalAddress: "",
        hospitalCity: "",
        hospitalPinCode: "",
        hospitalEmployeeName: "",
        hospitalEmployeeTelephone: "",
        hospitalEmployeeFax: "",
        hospitalEmployeeEmail: "",
        doctorName: "",
        doctorQualification: "",
        doctorRegistrationNo: "",
        doctorMobileNo: "",

        presentingComplaint: "",
        duration: "",
        firstOnsetConsult: "",
        pastIllnessHistory: "",
        clinicalFindings: "",
        investigationFindings: "",
        provisionalDiagnosis: "",
        treatmentPlan: [],
        obstetricHistory: "",
        lmp: "",
        edd: "",
        injuryDetails: "",
        alcoholDrug: "",
        attachedCopy: [],
        mlcFirNumber: "",
        mlcFirPlace: "",
        medicalHistory: {
            htn: { value: "", details: "" },
            ihdCad: { value: "", details: "" },
            diabetes: { value: "", details: "" },
            asthmaCopdTb: { value: "", details: "" },
            paralysisCvaEpilepsy: { value: "", details: "" },
            arthritis: { value: "", details: "" },
            cancerTumorCyst: { value: "", details: "" },
            stdHiv: { value: "", details: "" },
            alcoholDrugAbuse: { value: "", details: "" },
            psychiatricCondition: { value: "", details: "" },
            others: { value: "", details: "" }
        },

        roomType: [],
        hospitalRoomName: "",
        admissionType: "",
        expectedDOA: "",
        lengthOfStay: "",
        packageRate: "",
        packageCharges: "",
        implantCharges: "",
        billingRemarks: "",
        roomRentNursingCharges: "",
        surgeonAssistantCharges: "",
        anaesthesiaCharges: "",
        operationTheatreCharges: "",
        doctorVisitCharges: "",
        investigationCharges: "",
        pharmacyCharges: "",
        implantCost: "",
        totalHospitalizationCost: "",

        patientSignature: "",
        treatingDoctorSignature: "",
        claimantSignature: "",
        datePlace: "",
        declarationPlace: "",
        declarationDate: ""
    });

    const updateField = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const updateCheckboxArray = (name, value, checked) => {
        setFormData((prev) => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter((item) => item !== value)
        }));
    };

    const updateMedicalHistory = (key, field, value) => {
        setFormData((prev) => ({
            ...prev,
            medicalHistory: {
                ...prev.medicalHistory,
                [key]: {
                    ...prev.medicalHistory[key],
                    [field]: value
                }
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reliance Insurance Claim:", {
            patientId,
            ...formData
        });
        alert("Reliance General Insurance Pre-Authorization Form submitted.");
    };

    const medicalHistoryRows = [
        ["htn", "HTN"],
        ["ihdCad", "IHD/CAD"],
        ["diabetes", "Diabetes"],
        ["asthmaCopdTb", "Asthma/COPD/TB"],
        ["paralysisCvaEpilepsy", "Paralysis/CVA/Epilepsy"],
        ["arthritis", "Arthritis"],
        ["cancerTumorCyst", "Cancer/Tumor/Cyst"],
        ["stdHiv", "STD/HIV"],
        ["alcoholDrugAbuse", "Alcohol/Drug abuse"],
        ["psychiatricCondition", "Psychiatric condition"],
        ["others", "Others"]
    ];

    return (
        <div className="reliance-page">
            <form className="reliance-form" onSubmit={handleSubmit}>

                {/* HEADER */}
                <header className="reliance-header">
                    <div className="reliance-logo">
                        <div className="reliance-logo-text">RELIANCE</div>
                        <div className="reliance-logo-sub">GENERAL<br />INSURANCE</div>
                        <small>A RELIANCE CAPITAL COMPANY</small>
                    </div>

                    <div className="reliance-contact">
                        <strong>reliancegeneral.co.in</strong>
                        <span>(Toll Free) <b>1800 3009</b></span>
                        <span>(022) <b>4890 3009</b> (Paid)</span>
                    </div>
                </header>

                <h1 className="form-title">PRE-AUTHORIZATION REQUEST FORM</h1>

                <p className="portal-note">
                    Please use Reliance Provider Portal to communicate with us -
                    https://provider.reliancegeneral.co.in/
                </p>

                {/* PART 1 */}
                <section className="pdf-section">
                    <div className="side-title">Part 1<br />Insured Details</div>

                    <div className="section-body">
                        <div className="grid-2">
                            <Field label="Insured Name" name="insuredName" value={formData.insuredName} onChange={updateField} />
                            <Field label="Claim No." name="claimNo" value={formData.claimNo} onChange={updateField} />
                            <Field label="Mobile No." name="mobileNo" value={formData.mobileNo} onChange={updateField} />
                            <Field label="Policy No." name="policyNo" value={formData.policyNo} onChange={updateField} />
                            <Field label="E-mail Id" name="emailId" value={formData.emailId} onChange={updateField} full />
                            <Field label="If Group Policy, Company Name" name="groupPolicyCompany" value={formData.groupPolicyCompany} onChange={updateField} />
                            <Field label="Employee id" name="employeeId" value={formData.employeeId} onChange={updateField} />
                            <Field label="PAN No." name="panNo" value={formData.panNo} onChange={updateField} full />
                        </div>

                        <CheckRow
                            label="Source of Funds"
                            name="sourceOfFunds"
                            values={["Business", "Profession", "Salary", "Agricultural Income", "Savings", "Others"]}
                            selected={formData.sourceOfFunds}
                            onChange={updateCheckboxArray}
                        />

                        <div className="form-row">
                            <label>Monthly Income:</label>
                            {["Upto ₹ 20,000", "₹ 20,001 to ₹ 50,000", "₹ 50,001 to ₹ 1,00,000", "₹ 1,00,001 and above"].map((v) => (
                                <label className="check-inline" key={v}>
                                    <input type="radio" name="monthlyIncome" value={v} checked={formData.monthlyIncome === v} onChange={updateField} />
                                    {v}
                                </label>
                            ))}
                        </div>

                        <div className="grid-3">
                            <Field label="Agent/Sub Agent Name" name="agentSubAgentName" value={formData.agentSubAgentName} onChange={updateField} />
                            <Field label="Agent Mobile No." name="agentMobileNo" value={formData.agentMobileNo} onChange={updateField} />
                            <Field label="Agent Email ID" name="agentEmailId" value={formData.agentEmailId} onChange={updateField} />
                        </div>
                    </div>
                </section>

                {/* PART 2 */}
                <section className="pdf-section">
                    <div className="side-title">Part 2<br />Patient Details</div>

                    <div className="section-body">
                        <div className="grid-2">
                            <Field label="Patient Name" name="patientName" value={formData.patientName} onChange={updateField} full />
                            <Field label="Patient UHID" name="patientUHID" value={formData.patientUHID} onChange={updateField} />
                            <Field label="Age" name="age" value={formData.age} onChange={updateField} />
                            <Field label="DOB" name="dob" value={formData.dob} onChange={updateField} type="date" />
                            <div className="field">
                                <label>Gender</label>
                                <div className="check-inline-group">
                                    {["Male", "Female"].map((v) => (
                                        <label className="check-inline" key={v}>
                                            <input type="radio" name="gender" value={v} checked={formData.gender === v} onChange={updateField} />
                                            {v}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <Field label="Patient Mobile No." name="patientMobileNo" value={formData.patientMobileNo} onChange={updateField} />
                            <Field label="Patient Email id" name="patientEmailId" value={formData.patientEmailId} onChange={updateField} />
                        </div>

                        <div className="form-row">
                            <label>Relation with insured:</label>
                            {["Self", "Spouse", "Mother", "Father", "Son", "Daughter", "Others"].map((v) => (
                                <label className="check-inline" key={v}>
                                    <input type="radio" name="relationWithInsured" value={v} checked={formData.relationWithInsured === v} onChange={updateField} />
                                    {v}
                                </label>
                            ))}
                        </div>

                        <div className="grid-2">
                            <Field label="Address" name="address" value={formData.address} onChange={updateField} full />
                            <Field label="City" name="city" value={formData.city} onChange={updateField} />
                            <Field label="Pin Code" name="pinCode" value={formData.pinCode} onChange={updateField} />
                            <Field label="Attendant Name" name="attendantName" value={formData.attendantName} onChange={updateField} full />
                            <Field label="Attendant Mobile no" name="attendantMobileNo" value={formData.attendantMobileNo} onChange={updateField} />
                            <Field label="Attendant email id" name="attendantEmailId" value={formData.attendantEmailId} onChange={updateField} />
                        </div>
                    </div>
                </section>

                {/* PART 3 */}
                <section className="pdf-section">
                    <div className="side-title">Part 3<br />Service Provider Details</div>

                    <div className="section-body">
                        <div className="grid-2">
                            <Field label="Hospital Name" name="hospitalName" value={formData.hospitalName} onChange={updateField} />
                            <Field label="Hospital Code" name="hospitalCode" value={formData.hospitalCode} onChange={updateField} />
                            <Field label="Hospital Address" name="hospitalAddress" value={formData.hospitalAddress} onChange={updateField} full />
                            <Field label="City" name="hospitalCity" value={formData.hospitalCity} onChange={updateField} />
                            <Field label="Pin Code" name="hospitalPinCode" value={formData.hospitalPinCode} onChange={updateField} />
                        </div>

                        <div className="provider-columns">
                            <div>
                                <h4>Contact Details (Hospital Employee)</h4>
                                <Field label="Name" name="hospitalEmployeeName" value={formData.hospitalEmployeeName} onChange={updateField} />
                                <Field label="Telephone no./Mobile no." name="hospitalEmployeeTelephone" value={formData.hospitalEmployeeTelephone} onChange={updateField} />
                                <Field label="Fax No." name="hospitalEmployeeFax" value={formData.hospitalEmployeeFax} onChange={updateField} />
                                <Field label="E-mail Id" name="hospitalEmployeeEmail" value={formData.hospitalEmployeeEmail} onChange={updateField} />
                            </div>

                            <div>
                                <h4>Treating Doctor Detail</h4>
                                <Field label="Name: Dr." name="doctorName" value={formData.doctorName} onChange={updateField} />
                                <Field label="Qualification" name="doctorQualification" value={formData.doctorQualification} onChange={updateField} />
                                <Field label="Registration No." name="doctorRegistrationNo" value={formData.doctorRegistrationNo} onChange={updateField} />
                                <Field label="Mobile No." name="doctorMobileNo" value={formData.doctorMobileNo} onChange={updateField} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* PART 4 */}
                <section className="pdf-section">
                    <div className="side-title">Part 4<br />Case Information<br />(filled by treating doctor)</div>

                    <div className="section-body">
                        <Field label="Presenting Complaint" name="presentingComplaint" value={formData.presentingComplaint} onChange={updateField} full />
                        <div className="grid-2">
                            <Field label="Duration" name="duration" value={formData.duration} onChange={updateField} />
                            <Field label="Date of first onset/Consult" name="firstOnsetConsult" value={formData.firstOnsetConsult} onChange={updateField} type="date" />
                            <Field label="H/O of past illness related to present complaint" name="pastIllnessHistory" value={formData.pastIllnessHistory} onChange={updateField} full />
                            <Field label="Relevant Clinical findings" name="clinicalFindings" value={formData.clinicalFindings} onChange={updateField} full />
                            <Field label="Investigation findings" name="investigationFindings" value={formData.investigationFindings} onChange={updateField} full />
                            <Field label="Provisional Diagnosis" name="provisionalDiagnosis" value={formData.provisionalDiagnosis} onChange={updateField} />
                        </div>

                        <div className="doctor-case-grid">
                            <div>
                                <div className="form-row">
                                    <label>Treatment Plan:</label>
                                    {["Medical", "Surgical"].map((v) => (
                                        <label className="check-inline" key={v}>
                                            <input
                                                type="checkbox"
                                                checked={formData.treatmentPlan.includes(v)}
                                                onChange={(e) => updateCheckboxArray("treatmentPlan", v, e.target.checked)}
                                            />
                                            {v}
                                        </label>
                                    ))}
                                </div>

                                <div className="sub-block">
                                    <strong>In case of Maternity</strong>
                                    <Field label="Obstetric History G P L A" name="obstetricHistory" value={formData.obstetricHistory} onChange={updateField} />
                                    <div className="grid-2">
                                        <Field label="LMP" name="lmp" value={formData.lmp} onChange={updateField} type="date" />
                                        <Field label="EDD" name="edd" value={formData.edd} onChange={updateField} type="date" />
                                    </div>
                                </div>

                                <div className="sub-block">
                                    <strong>In case to Injury/RTA/Self Injury</strong>
                                    <Field label="Under Influence of Alcohol/Drug abuse" name="alcoholDrug" value={formData.alcoholDrug} onChange={updateField} type="select" options={["", "Yes", "No"]} />
                                    <CheckRow
                                        label="Attached Copy of"
                                        name="attachedCopy"
                                        values={["MLC", "FIR", "PIL"]}
                                        selected={formData.attachedCopy}
                                        onChange={updateCheckboxArray}
                                    />
                                    <div className="grid-2">
                                        <Field label="MLC/FIR Number" name="mlcFirNumber" value={formData.mlcFirNumber} onChange={updateField} />
                                        <Field label="Place" name="mlcFirPlace" value={formData.mlcFirPlace} onChange={updateField} />
                                    </div>
                                </div>
                            </div>

                            <div className="medical-history">
                                <div className="medical-history-head">
                                    <span>Past Medical History</span>
                                    <span>Duration/Details</span>
                                </div>

                                {medicalHistoryRows.map(([key, label]) => (
                                    <div className="history-row" key={key}>
                                        <span>{label}</span>
                                        <label><input type="radio" name={`${key}-value`} value="Y" checked={formData.medicalHistory[key].value === "Y"} onChange={(e) => updateMedicalHistory(key, "value", e.target.value)} /> Y</label>
                                        <label><input type="radio" name={`${key}-value`} value="N" checked={formData.medicalHistory[key].value === "N"} onChange={(e) => updateMedicalHistory(key, "value", e.target.value)} /> N</label>
                                        <input
                                            type="text"
                                            value={formData.medicalHistory[key].details}
                                            onChange={(e) => updateMedicalHistory(key, "details", e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* PART 5 */}
                <section className="pdf-section">
                    <div className="side-title">Part 5<br />Billing details<br />(filled by hospital)</div>

                    <div className="section-body">
                        <div className="billing-grid">
                            <div>
                                <CheckRow
                                    label="Room Type"
                                    name="roomType"
                                    values={["Single AC", "Single NON AC", "Twin Sharing AC", "Twin Sharing NON AC", "Multi-bed", "Others"]}
                                    selected={formData.roomType}
                                    onChange={updateCheckboxArray}
                                />

                                <Field label="Hospital Room Name." name="hospitalRoomName" value={formData.hospitalRoomName} onChange={updateField} />

                                <div className="form-row">
                                    <label>Type of Admission:</label>
                                    {["Planned", "Emergency"].map((v) => (
                                        <label className="check-inline" key={v}>
                                            <input type="radio" name="admissionType" value={v} checked={formData.admissionType === v} onChange={updateField} />
                                            {v}
                                        </label>
                                    ))}
                                </div>

                                <div className="grid-2">
                                    <Field label="Expected DOA" name="expectedDOA" value={formData.expectedDOA} onChange={updateField} type="date" />
                                    <Field label="Length of Stay (Days)" name="lengthOfStay" value={formData.lengthOfStay} onChange={updateField} />
                                </div>

                                <div className="form-row">
                                    <label>Package Rate:</label>
                                    {["Yes", "No"].map((v) => (
                                        <label className="check-inline" key={v}>
                                            <input type="radio" name="packageRate" value={v} checked={formData.packageRate === v} onChange={updateField} />
                                            {v}
                                        </label>
                                    ))}
                                </div>

                                <Field label="If Yes, Package Charges" name="packageCharges" value={formData.packageCharges} onChange={updateField} />
                                <Field label="Implant Charges" name="implantCharges" value={formData.implantCharges} onChange={updateField} />
                                <Field label="Remarks (if Any)" name="billingRemarks" value={formData.billingRemarks} onChange={updateField} />
                            </div>

                            <div>
                                {[
                                    ["Room Rent + Nursing Charges", "roomRentNursingCharges"],
                                    ["Surgeon/Assistant Surgeon Charges", "surgeonAssistantCharges"],
                                    ["Anaesthesia/Anesthetist Charges", "anaesthesiaCharges"],
                                    ["Operation theatre Charges", "operationTheatreCharges"],
                                    ["Doctor's Visit Charges", "doctorVisitCharges"],
                                    ["Investigation Charges", "investigationCharges"],
                                    ["Pharmacy Charges", "pharmacyCharges"],
                                    ["Implant Cost(if any)", "implantCost"],
                                    ["Total Cost of Hospitalization", "totalHospitalizationCost"]
                                ].map(([label, name]) => (
                                    <Field key={name} label={label} name={name} value={formData[name]} onChange={updateField} type="number" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* NOTE */}
                <div className="important-note">
                    <strong>Please note:</strong> In case the Health Gain Policy under which the cashless claim is being lodged
                    has been taken on installment basis then in the event of cashless claim being admissible, the company will
                    deduct the balance installments due if any, from the claim approved amount and pay the balance due to the Policyholder.
                    Consent by the Patient/Insured/Beneficiary confirms understanding that cashless facility is not automatically guaranteed.
                </div>

                {/* SIGNATURES */}
                <section className="signature-section">
                    <div className="signature-box">
                        <label>Patient Signature:</label>
                        <Signature
                            height={60}
                            design="line"
                            onSave={(image) =>
                                setFormData((prev) => ({ ...prev, patientSignature: image }))
                            }
                        />
                    </div>

                    <div className="signature-box">
                        <label>Treating Doctor's Signature:</label>
                        <Signature
                            height={60}
                            design="line"
                            onSave={(image) =>
                                setFormData((prev) => ({ ...prev, treatingDoctorSignature: image }))
                            }
                        />
                    </div>

                    <div className="signature-box">
                        <label>Date &amp; Place:</label>
                        <input
                            type="text"
                            name="datePlace"
                            value={formData.datePlace}
                            onChange={updateField}
                        />
                    </div>

                    <div className="signature-box">
                        <div className="seal-box">

                            <label>
                                Stamp of Hospital:
                            </label>

                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={(e) => {

                                    const file = e.target.files[0];

                                    if (file) {

                                        setFormData((prev) => ({
                                            ...prev,
                                            hospitalSeal: file
                                        }));

                                    }

                                }}
                            />

                        </div>

                    </div>
                </section>
                <br />

                {/* DECLARATION */}
                <section className="declaration-section">
                    <div className="side-title">Declaration</div>

                    <div className="declaration-body">
                        <div className="p-data">


                            <p>
                                I hereby agree, affirm and declare that, the statements/information given/stated by me/us in this claim
                                form is true, correct and complete. No material information which is relevant to the processing of the
                                claim or which in any manner has a bearing on the claim has been withheld or not disclosed.
                            </p>

                            <p>
                                If I have given/made any false or fraudulent statement/information, or suppressed or concealed or in any
                                manner failed to disclose material information, the policy shall be void &amp; I shall not be entitled to
                                all/any rights to recover there under in respect of any or all claims, past, present or future.
                            </p>

                            <p>
                                I hereby provide my consent and authorize Reliance General Insurance Company Ltd to seek any medical
                                information from any hospital/Medical Practitioner who has at any time attended on the insured person.
                            </p>
                        </div>

                        <div className="declaration-fields">
                            <Field label="Place" name="declarationPlace" value={formData.declarationPlace} onChange={updateField} />
                            <Field label="Date" name="declarationDate" value={formData.declarationDate} onChange={updateField} type="date" />
                        </div>

                        <div className="claimant-signature">
                            <label>(Signature of Claimant)</label>
                            <Signature
                                height={60}
                                design="line"
                                onSave={(image) =>
                                    setFormData((prev) => ({ ...prev, claimantSignature: image }))
                                }
                            />

                        </div>
                    </div>
                </section>

                {/* IMPORTANT INFORMATION */}
                <section className="important-information">
                    <h2>IMPORTANT INFORMATION FOR HOSPITALS:</h2>

                    <ol>
                        <li>The Pre-authorisation Request Form should be filled with due care including the unique number received by the Insured/member/beneficiary. All columns are required to be filled in block letters.</li>
                        <li>Completed Pre-authorization Request Form should be faxed to RCare-Health on 1800 3010 3001, or emailed at rgicl.rcarehealth@relianceada.com by the provider hospital. It should reach us at least 4 days prior to likely date of admission. In case of emergency Pre-Authorization Request Form should be sent within 4 hours of admission.</li>
                        <li>Authorisation may be denied if complete information is not provided or queries are not replied to.</li>
                        <li>Discrepancy in the information provided by the hospital records found at the time of claim may render the authorisation given null and void.</li>
                        <li>Any changes in Diagnosis/Treatment plan should be intimated before discharge of the patient.</li>
                        <li>All queries raised by us need to be replied at the earliest &amp; maximum within 24hrs.</li>
                        <li>Request for authorisation/enhancement will not be entertained after discharges of the patient.</li>
                        <li>We shall share the authorization denial letter to the concerned hospital within 24 hours of complete and correct information being provided.</li>
                        <li>If clinical details provided are insufficient, there may be a delay in the authorisation or denial for cashless.</li>
                        <li>As per IRDAI any claimed amount above 1lac, copy of PAN card/form 60 of the insured/Policy holder/Proposer is mandatory and for below 1lac, Photo identity proof is mandatory.</li>
                    </ol>

                    <div className="footer-contact">
                        Email: rgicl.rcarehealth@relianceada.com, Help line: 1800 3009 (Toll free)
                        (022) 4890 3009 (Paid)
                    </div>

                    <p><strong>IRDAI Registration No. 103.</strong> UIN of Reliance HealthGain Policy: UIN: RELHLIP13001V011213</p>
                    <p>UIN of Reliance HealthWise Policy : UIN: RELHLIP06001V010506</p>
                    <p>UIN of Group Mediclaim: UIN: RELHLGP02001V010102</p>
                </section>

                <button className="reliance-submit" type="submit">
                    Submit Insurance Claim
                </button>

            </form>
        </div>
    );
}

function Field({ label, name, value, onChange, type = "text", full = false, options = [] }) {
    return (
        <div className={`field ${full ? "full" : ""}`}>
            <label>{label}</label>

            {type === "select" ? (
                <select name={name} value={value} onChange={onChange}>
                    {options.map((option) => (
                        <option key={option} value={option}>{option || "Select"}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
}

function CheckRow({ label, name, values, selected, onChange }) {
    return (
        <div className="form-row checkbox-row">
            <label>{label}:</label>

            {values.map((value) => (
                <label className="check-inline" key={value}>
                    <input
                        type="checkbox"
                        checked={selected.includes(value)}
                        onChange={(e) => onChange(name, value, e.target.checked)}
                    />
                    {value}
                </label>
            ))}
        </div>
    );
}

export default RelianceInsurance;