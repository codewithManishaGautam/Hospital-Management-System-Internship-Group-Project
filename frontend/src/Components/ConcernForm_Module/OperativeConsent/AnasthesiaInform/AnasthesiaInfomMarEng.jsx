import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import AnasthesiaInformMoreInfo from "./AnasthesiaInfomMoreInfo";
import DeclarationTable from "../CommonCode/DeclarationTable";




function AnasthesiaInformMarEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                INFORMED CONSENT FOR ANESTHESIA
                <br />
                भूल देण्यासाठी लेखी संमतीपत्र
            </h4>
            <Table_Form />
            <div>

                <label>
                    Diagnosis :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <label>
                    Name of Procedure :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <label>
                    Date & Time of Surgery 
                </label>
                <br />
                <input type="datetime-local" />
                <br /> <br />

                <label>
                    Type of Anesthesia :-
                </label>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <AnasthesiaInformMoreInfo/>
                <br />
                <br />
                <DeclarationTable
                specialistEng="Anaesthetist"
                specialistMar="भूलतज्ञ :"/>

            </div>
        </div>
    )
}

export default AnasthesiaInformMarEng;