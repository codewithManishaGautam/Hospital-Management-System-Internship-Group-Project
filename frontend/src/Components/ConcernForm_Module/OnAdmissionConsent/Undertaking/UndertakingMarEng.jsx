import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import UndertakingEng from "./UndertakingEng";
import UndertakingMar from "./UndertakingMar";
import DeclarationInfo from "./DeclarationInfo";


function UndertakingMarEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                Undertaking Consent
            </h4>

            <Table_Form />
            <UndertakingEng />
            <hr style={{
                width: "100%",
                border: "0",
                borderTop: "2px solid black"
            }} />
            <UndertakingMar/>
            <DeclarationInfo/>



        </div>

    )
}

export default UndertakingMarEng;