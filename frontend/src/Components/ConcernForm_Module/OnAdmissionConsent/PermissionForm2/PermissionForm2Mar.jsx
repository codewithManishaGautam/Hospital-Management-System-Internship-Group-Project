import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import RulesForm from "./RulesForm";
import DeclarationTableForm from "./DeclarationTableForm";


function PermissionForm2Mar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                अनुमती पत्र
            </h4>

            <Table_Form />
            <div>
                <p >
                    <b className="title" style={{ display: "block" }}>अनुमती पत्र</b>

                </p>
                
                <div>
                    <label>नातेवाईकाचे नाव </label> <span><SignaturePad width={330} height={30} design="line"/></span> <br />
                    <label>पत्ता </label> <span><SignaturePad width={400} height={30} design="line"/></span> <br />
                    <label>दूरध्वनी क्रमांक </label> <span><SignaturePad width={340} height={30} design="line"/></span> <br />
                </div>
                <br />
                <RulesForm/>
                <br />
                <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />
                <DeclarationTableForm/>
                
              

            </div>

        </div>

    )
}

export default PermissionForm2Mar;