import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import CashlessMediclaimMar from "./CashlessMediclaimMar";
import CashlessMediclaimEng from "./CashlessMediclaimEng";
import DeclarationCashlessMediclaim from "./DeclarationCashlessMediclaim";


function CashlessMediclaimMarEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                कॅशलेस मेडिक्लेम
            </h4>

            <Table_Form />
            <div>
                <CashlessMediclaimMar/>
                <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />
                <CashlessMediclaimEng/>
                <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />
                <DeclarationCashlessMediclaim/>
            </div>

        </div>

    )
}

export default CashlessMediclaimMarEng;