import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";
import RestraintAssestmentTable from "./RestraintAssestmentTable";




function RestraintCommon() {

    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                Form For Restraint Administration
            </h4>

            <p className="title">
                (To be completed by nurse)
            </p>
            <Table_Form />



           
        </div>
    )
}

export default RestraintCommon;