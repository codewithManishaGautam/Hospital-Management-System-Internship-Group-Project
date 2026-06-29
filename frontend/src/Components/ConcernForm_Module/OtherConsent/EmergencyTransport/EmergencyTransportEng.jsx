import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css"
import EmergencyHeader from "./EmergencyHeader";
import PatientDeclaration from "./PatientDeclaration";

function EmergencyTransportEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                <u>AMBULANCE CALL</u>
            </h4>

            <Table_Form />
            <div>
                <EmergencyHeader />
                <h4 className="title">
                    <u>CONSENT FOR EMERGENCY TRANSPORT</u>
                </h4>
                <p className="paragraph">
                    I <span><SignaturePad width={400} height={30} design="line" /></span> concerned relative of patient in relationship as
                    <span><SignaturePad width={300} height={30} design="line" /></span> want to shift our patient from
                    <span><SignaturePad width={200} height={30} design="line" /></span> to <span><SignaturePad width={300} height={30} design="line" /></span>
                    <span><SignaturePad width={300} height={30} design="line" /></span> Hospital for further management. We are aware of the risk and disadvantage
                    associated for shifting the patient. Ambulance crew has already informed us about consequences, along with all hospital
                    formalities. Understanding the severity we are ready to shift our patient thorough ambulance to <span><SignaturePad width={300} height={30} design="line"/></span>
                    Hospital at our own risk and as relative we take full responsibility of consequences.
                </p>
                <PatientDeclaration/>

            </div>

        </div>
    );
}

export default EmergencyTransportEng;