import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import TransfusionBloodMoreInfoEng from "./TransfusionBloodMoreInfoEng";
import DeclarationInfo from "./DeclarationInfo";
import DeclarationTable from "./DeclarationTable";



function TransfusionBloodEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                CONSENT FOR TRANSFUSION OF BLOOD AND BLOOD COMPONENTS
            </h4>

            <Table_Form />
            <div>
                <label >
                    Diagnosis : <br /> <SignaturePad width={700} height={30} design="none" />
                </label>
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "3px solid black"
                }} />
                <TransfusionBloodMoreInfoEng />
                <br />
                <DeclarationInfo />
                <p className="paragraph">
                    <b className="title" style={{ display: "block" }}>Patient's Relative</b> <br />
                    The patient is unable to give consent because <span><SignaturePad width={400} height={30} design="line" /></span>
                    and I Relation
                    therefore consent of the patient. I acknowledge that I have an opportunity to discuss this procedure, as
                    stated above, with my physician designee and hereby consent to this procedure. <br />
                    <label>
                        <input type="checkbox" />
                        I have read the above writing.
                    </label>
                    <br />

                    <label>
                        <input type="checkbox" />
                        The above writing has been read out to me.
                    </label>
                    <br />
                    I have understood the aforesaid and I am giving my consent willingly.
                </p>
                <br />

                <DeclarationTable
                    doctor="Doctor"
                    Witness="Witness"
                    PatientRelative="Patient Relative"
                    sign="Sign"
                    name="Name "
                    address="Address "
                    age="Age"
                    year="Year"
                    signThumb="Sign. and / or L.H.T.I."
                    date="Date and Time"

                />            
            </div>

        </div>

    )
}

export default TransfusionBloodEng;