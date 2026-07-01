import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import PatientDeclaration from "./PatientDeclaration";


function DiagnosticProcedureEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                Consent for Diagnostic Procedure and Authorization for  <br />
                Release of Information and Assignment of Benefits
            </h4>

            <Table_Form />
            <div>

                <p className="paragraph">
                    By signing below, I understand that all medical procedures may involve discomforts as well as risks. I have had
                    sufficient opportunity to discuss the proposed procedure and risks with my physician and all of my questions
                    have been answered to my satisfaction.I acknowledge, by my signature, that I understand the above information
                    and that I am freely and knowingly giving my consent to have this diagnostic procedure.
                </p>

                <strong >
                    Name of Procedure :-
                </strong>
                <SignaturePad width={700} height={30} design="line" />
                <br />
                <p className="paragraph">
                    I confirm that I have accurately interpreted the contents of this form and the related conversations
                    between the patient and the doctor.
                </p>

                <PatientDeclaration
                    Date="Date"
                    Time="Time"
                    patientName="Name of Patient/Family Member (Relation)"
                    sign="Signature"
                    doctorName="Name of The Interpreter"
                    consulantDoctor="Name of The Doctor / Consultant"
                />

                <br />
                <p className="paragraph">
                    I hereby authorize release of my films and/or medical records as needed for subsequent medical care. I also authorize my
                    attending and/or referring physician and any other healthcare provider to release my films and/or medical 
                    records for use with this diagnostic procedure .
                </p>
                
            </div>
        </div>
    )
}

export default DiagnosticProcedureEng;