import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import PatientDeclaration from "./PatientDeclaration";





function MedicalAdviceEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                Consent for Discharge / Leaving Against Medical Advice
            </h4>
            <Table_Form />
            <div>

                <label>
                    Diagnosis :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <p className="paragraph">
                    <strong>
                        I acknowledge below mentioned facts which doctor has explained to me;
                    </strong>
                    <br /><br />
                    <ul className="paragraph">
                        <li>
                            My/my patient’s medical condition, prognosis and the necessary proposed treatment / procedure.
                        </li>

                        <li>
                            All possible risk, consequences & complications for not undergoing / discontinuing treatment and leaving hospital against
                            medical advice of the attending physician & hospital administration (DAMA /LAMA)
                        </li>
                    </ul>
                </p>

                <p className="paragraph">
                    <strong>
                        I also state that
                    </strong>
                    <br /><br />
                    <ul className="paragraph">
                        <li>
                            I have been given enough time to read, review & understand the information in this consent.
                        </li>

                        <li>
                            I also have been given chance to ask questions and raise concerns with the doctor about my / my patient’s condition,
                            unfamiliar terminologies used, risk and consequences of LAMA which I understood clearly.
                            My questions and concerns have been discussed and answered to my satisfaction.
                        </li>

                        <li>
                            I understand that this decision may jeopardize my / my relative’s health and life.
                        </li>

                        <li>
                            I hereby release the attending physician & hospital administration from all liabilities for any ill effect which may result
                            from such discharge from hospital.
                        </li>

                        <li>
                            I have been explained for all the above points in the language that I understand.
                        </li>

                        <li>
                            I / we signed this consent voluntarily in sound health & body without under any pressure.
                        </li>
                    </ul>
                </p>

                <p className="paragraph">
                    I confirm that I have accurately interpreted the contents of this form and the related conversations between the patient and the
                    doctor.
                </p>

                <PatientDeclaration
                Date="Date"
                Time="Time"
                patientName="Name of Patient/Family Member(Relation) "
                doctorName="Name of The Interpreter"
                specialDoctor="Name of The Doctor / Consultant"
                sign="Signature"
                />






            </div>
        </div>
    )
}

export default MedicalAdviceEng;