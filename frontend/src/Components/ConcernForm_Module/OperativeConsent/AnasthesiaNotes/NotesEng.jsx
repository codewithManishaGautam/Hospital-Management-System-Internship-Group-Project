import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationHeader from "./DeclarationHeader";
import NoteMoreInfo from "./NotesMoreInfo";
import DeclarationFooter from "./DeclarationFooter";



function NotesEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                ANAESTHESIA NOTES
            </h4>

            <Table_Form />
            <div>
                <DeclarationHeader />
                <br />
                <strong>
                    ANAESTHESIA :-
                </strong>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <strong>
                    ANAESTHETIST :-
                </strong>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <strong>
                    SURGEON NAME :-
                </strong>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <strong>
                    PROVISIONAL DIAGNOSIS :-
                </strong>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <strong>
                    PROCEDURE :-
                </strong>
                <SignaturePad width={720} height={30} design="line" />
                <br />

                <div>
                    <b className="title" style={{ display: "block" }}><u>IMMIDIATE PREANAESTHESIA EVALUATION</u></b>

                    <strong>
                        COMPLAINTS:-
                    </strong>
                    <SignaturePad width={720} height={30} design="line" />
                    <br />

                    <strong>
                        GENERAL EXAMINATION:-
                    </strong>
                    <SignaturePad width={720} height={30} design="line" />
                    <br />

                    <strong>
                        SYSTEMIC EXAMINATION:-
                    </strong>
                    <SignaturePad width={720} height={30} design="line" />
                    <br />

                    <strong>
                        INVESTIGATION:-
                    </strong>
                    <SignaturePad width={720} height={30} design="line" />
                    <SignaturePad width={720} height={30} design="line" />
                    <SignaturePad width={720} height={30} design="line" />
                    <br />

                    <strong>
                        ALLERGY HISTORY:-
                    </strong>
                    <SignaturePad width={720} height={30} design="line" />
                    <br />

                    <strong>
                        PAST MEDICAL HISTORY:-
                    </strong>
                    <SignaturePad width={720} height={30} design="line" />
                    <br />

                    <strong>
                        CURRENT DRUG HISTORY:-
                    </strong>
                    <SignaturePad width={720} height={30} design="line" />
                    <br />

                </div>

                <NoteMoreInfo />
                <br />
                <DeclarationFooter/>

                

            </div>
        </div>
    )
}

export default NotesEng;