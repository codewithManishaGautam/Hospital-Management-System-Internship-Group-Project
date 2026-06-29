import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import SedationProcedureCommon from "./SedationProcedureCommon";
import PatientDeclaration from "./PatientDeclaration";
import DoctorDeclaration from "./DoctorDeclaration";
import WitnessDeclaration from "./WitnessDeclaration";

function SedationProcedureEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                Consent Form for Sedation during Procedure
            </h4>

            <p className="title">
                (To be filled by the Anaesthesiologist before procedure)
            </p>

            <Table_Form />
            <div>
                <SedationProcedureCommon />
                <br />
                <b>
                    DECLARATION BY PATIENT/GUARDIAN
                </b>
                <br /><br />
                <p className="paragraph">
                    I acknowledge that the Anaesthesiologist has explained to me :
                    <ul className="paragraph">
                        <li>
                            Sedation is required for undergoing the above-mentioned procedure, and
                            <span><SignaturePad width={200} height={30} design="line" /></span> medicine will be used for sedation.
                        </li>

                        <li>
                            My / my patient's medical condition, prognosis, and the proposed
                            procedure, including any additional treatment required if the doctor
                            finds something unexpected, have been explained to me.
                        </li>

                        <li>
                            The risks related to sedation, anesthesia, and the procedure,
                            including the risks that are specific to me / my patient, as well as
                            the risks of not undergoing the procedure, have been explained to me.
                        </li>

                        <li>
                            Other relevant alternative options for sedation and their associated
                            risks have also been explained to me.
                        </li>

                        <li>
                            If an immediate life-threatening event occurs during the sedation or
                            surgery/procedure, the treating team will provide appropriate
                            resuscitation and emergency treatment to save my / my patient's life
                            as per the Acute Resuscitation Plan.
                        </li>
                    </ul>
                </p>


                <p>
                    I also state that
                    <ul className="paragraph">
                        <li>
                            I have been given enough time to read and understand this consent.
                        </li>

                        <li>
                            I have also been given the opportunity to ask questions and raise concerns with the doctor regarding my / my patient's condition, sedation, its risks, and other available options. My questions and concerns have been discussed and answered to my satisfaction.
                        </li>

                        <li>
                            All the above points have been explained to me in a language that I understand, with illustrations wherever required.
                        </li>

                        <li>
                            I have signed this consent voluntarily, while being of sound mind and body, and without being under any pressure.
                        </li>

                        <li>
                            I hereby give my consent to Dr.<span><SignaturePad width={300} height={30} design="line" /></span> for administering sedation to me / my patient for the above-mentioned procedure.
                        </li>
                    </ul>
                    I confirm that I have accurately interpreted the contents of this form and the related conversations between the patient
                    and the doctor.
                </p>
                <br />
                <PatientDeclaration
                Date="Date"
                Time="Time"
                patientName="Name of Patient/Family Member(Relation) "
                doctorName="Name of The Interpreter"
                sign="Signature"
                />
                <br />
                <DoctorDeclaration/>
                <br />
                <WitnessDeclaration
                witness1="Witness 1"
                witness2="Witness 2"
                name="Name"
                sign="Signature"
                Date="Date"
                address="Address"
                phoneNo="Phone No."
                />


            </div>
        </div>
    )
}

export default SedationProcedureEng;