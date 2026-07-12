import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";
import InformMoreInfoEng from "./InformMoreInfoEng";
import DeclarationFooter from "./DeclarationFooter";
import Stamp from "../../../../assets/stampeng.jpg"





function InformForSurgeryEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                INFORMED CONSENT FOR SURGERY <br />
                (GENERIC CONSENT)
            </h4>

            <Table_Form />
            <div>
                <DeclarationInfo
                    relativeInfo="Relative's Details"
                    relativeName="Relative Name"
                    ageGender=" Age / Sex"
                    relationPatient="Relation to the patient"
                    address="Address"
                    procedureName="Procedure Name"
                />
                <br />
                <InformMoreInfoEng/>
                <br />
                <DeclarationFooter
                witnessName="Witness"
                sign="Signature" 
                patientName="Name of Patient" 
                nameKey1="Name (Key Attendant 1)"
                nameKey2="Name (Key Attendant 2)" 
                surgeonName="Name of Surgeon"
                dateTime="Date & Time" 
                stampName="Stamp"
                Stamp={Stamp}
                />
            </div>

        </div>

    )
}

export default InformForSurgeryEng;