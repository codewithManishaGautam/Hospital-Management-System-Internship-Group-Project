import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import SurgeryMoreInfo from "./SurgeryMoreInfo"
import DeclarationTable from "../CommonCode/DeclarationTable";




function SurgeryProcedureMarEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                INFORMED CONSENT FORM FOR SURGERY / PROCEDURE
                <br />
                शस्त्रक्रिया किंवा तत्सम प्रक्रियेसाठी संमतीपत्र
            </h4>
            <Table_Form />
            <div>

                <label>
                    Diagnosis :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <label>
                    Name of Procedure - शस्त्रक्रियेचे नाव :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <label>
                    Name of Surgeon - शल्यचिकित्सकाचे नाव :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                
                <br />

                <SurgeryMoreInfo/>
                <br />
                <br />
                <DeclarationTable
                specialistEng="Doctor"
                specialistMar="चिकित्सक :"/>

            </div>
        </div>
    )
}

export default SurgeryProcedureMarEng;