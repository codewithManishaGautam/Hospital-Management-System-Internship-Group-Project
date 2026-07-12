import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";



function TransferForDiagnosticEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                TRANSFER FOR DIAGNOSTIC PURPOSE CONSENT
            </h4>

            <Table_Form />
            <div>
                <p className="paragraph">
                    I acknowledge that my medical condition has been evaluated and explained to me by my attending physician
                    and/or designee who has recommended that I be transferred to the service of Dr.<span><SignaturePad width={400} height={30} design="line" /></span>
                    <br />at <span><SignaturePad width={310} height={30} design="line" /></span> for 
                    <span><SignaturePad width={310} height={30} design="line" /></span>
                    The potential benefits of such transfer for Diagnostic purpose, the potential risks associated with such transfer
                    and the probable risks of not being transferred have been explained to me and I fully understand them .
                    With this knowledge and understanding, I agree to be transferred and then back to Hospital.
                </p>
                    <br /><br />
                    <DeclarationInfo 
                    name="Name of Patient / Relative"
                    relation="Relation with Patient"
                    sign="Signature"
                    />
            </div>

        </div>

    )
}

export default TransferForDiagnosticEng;