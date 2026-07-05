import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";
import DeclarationPICCBoneMarrowChemo from "../Common_Code/DeclarationPICCBoneMarrowChemo";



function ChemotherapyEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                Chemotherapy Consent
            </h4>


            <Table_Form />
            <div>
                <strong>
                    Diagnosis: <span><SignaturePad width={700} height={40} design="border" /></span>
                </strong>
                <br /><br />

                <strong>
                    Proposed Treatment: <span><SignaturePad width={700} height={40} design="border" /></span>
                </strong>
                <br />
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />
                <br />
                <p className="paragraph">
                    <strong>Purpose of Treatment:</strong><br />
                    The primary goal of chemotherapy is to control the progression of blood cancer and
                    improve the patient’s quality of life. While a complete cure cannot be guaranteed,
                    treatment aims to manage symptoms and prolong survival.
                </p>
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />
                <br />

                <p className="paragraph">
                    <strong>Expected Benefits:</strong><br />
                    <ul>
                        <li>
                            Approximately <span><SignaturePad width={15} height={30} design="none"/></span>% response rate with standard chemotherapy
                        </li>

                        <li>
                            Risk of recurrence is around <span><SignaturePad width={15} height={30} design="none"/></span>%
                        </li>

                        <li>
                            Possible remission or disease control
                        </li>

                        <li>
                            Long-term complications such as neutropenia-related conditions may increase mortality risk by approximately <span><SignaturePad width={15} height={30} design="none"/></span>%
                        </li>
                    </ul>
                </p>

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />
                <br />

                <p className="paragraph">
                    <strong>Potential Risks and Side Effects:</strong>
                    <ul>
                        <li>
                            <strong>Infections:</strong>
                            High risk of bacterial, fungal, or viral infections due to immune suppression.
                        </li>

                        <li>
                            <strong>Tumor Lysis Syndrome:</strong>
                            Rapid tumor breakdown causing kidney failure and electrolyte imbalances.
                        </li>

                        <li>
                            <strong>Severe Cytopenia:</strong>
                            Low blood counts leading to infections, bleeding, or ICU admission.
                        </li>

                        <li>
                            <strong>Thrombocytopenia:</strong>
                            Increased risk of internal bleeding and intracranial hemorrhage.
                        </li>

                        <li>
                            <strong>Neutropenia:</strong>
                            Critically low white blood cell count increasing the risk of severe infections.
                        </li>

                        <li>
                            <strong>Organ Toxicity:</strong>
                            Potential kidney (renal toxicity) and heart (cardiotoxicity) damage.
                        </li>

                        <li>
                            <strong>Gastrointestinal Effects:</strong>
                            Severe nausea, vomiting, diarrhea, and mucositis.
                        </li>

                        <li>
                            <strong>Neurological Effects:</strong>
                            Peripheral neuropathy and cognitive impairment.
                        </li>

                        <li>
                            <strong>Reproductive Impact:</strong>
                            Infertility, ovarian dysfunction, early menopause, and sperm damage.
                        </li>

                        <li>
                            <strong>Other Side Effects:</strong>
                            Fatigue, hair loss (alopecia), loss of appetite, and secondary malignancies.
                        </li>

                        <li>
                            <strong>Need for Hospitalization:</strong>
                            Hospitalization may be required due to severe treatment-related complications, including infections, organ failure, or bleeding.
                        </li>

                        <li>
                            <strong>Ventilatory Support:</strong>
                            In severe cases, mechanical ventilation may be required for respiratory failure or life-threatening infections.
                        </li>

                        <li>
                            <strong>Supportive Care:</strong>
                            Additional interventions such as blood transfusions, antibiotics, electrolyte management, and ICU admission may be necessary during treatment.
                        </li>

                        <li>
                            <strong>Possible risks and complications specific to this patient: </strong> <br /> <span><SignaturePad width={700} height={30} design="line"/></span>
                        </li>
                    </ul>
                </p>

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />
                <br />

                <p className="paragraph">
                    <strong>Post-Treatment Care:</strong> <br />
                    Special precautions and detailed care instructions have been discussed for the
                    period following chemotherapy, especially during low blood count phases.
                </p>

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />
                <br />

                <p>
                    <strong>
                        Understanding and Consent:
                    </strong>
                    <ul>
                        <li>
                            The nature of the disease, treatment risks, and benefits have been thoroughly explained to us.
                        </li>

                        <li>
                            We understand there is no guarantee of cure, and treatment goals are disease control and quality of life improvement.
                        </li>

                        <li>
                            We have had the opportunity to ask questions, and all concerns have been addressed satisfactorily.
                        </li>
                    </ul>
                </p>
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />
                <br />

                <p className="paragraph">
                    <strong>Agreement:</strong><br />
                    By signing below, we voluntarily consent to proceed with chemotherapy treatment, acknowledging 
                    the associated risks and the absence of guaranteed outcomes.
                </p>
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "2px solid black"
                }} />
                <br />

                <DeclarationPICCBoneMarrowChemo
                    patientSign="Patient Signature :"
                    parentName="Parent/Guardian Name :"
                    parentSign="Parent/Guardian Signature :"
                    date="Date :"
                    patientRelative="Relationship to Patient :" />



            </div>


        </div>


    )
}

export default ChemotherapyEng;