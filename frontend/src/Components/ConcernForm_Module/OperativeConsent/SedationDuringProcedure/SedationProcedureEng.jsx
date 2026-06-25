import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import SedationProcedureCommon from "./SedationProcedureCommon";

function SedationProcedureEng() 
{
    return(
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
                <SedationProcedureCommon/>
                <br />
                <b>
                    DECLARATION BY PATIENT/GUARDIAN
                </b>
                <p className="paragraph">
                    I acknowledge that the Anaesthesiologist has explained to me :
                </p>
                <br />
                
            </div>
        </div>
    )
}

export default SedationProcedureEng;