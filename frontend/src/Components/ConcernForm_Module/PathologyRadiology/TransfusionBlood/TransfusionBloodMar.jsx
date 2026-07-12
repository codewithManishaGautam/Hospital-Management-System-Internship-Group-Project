import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationTable from "./DeclarationTable";
import TransfusionBloodMoreInfoMar from "./TransfusionBloodMoreInfoMar";



function TransfusionBloodMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                रक्त व रक्तघटकांच्या संक्रमणासाठी संमतीपत्र
            </h4>

            <Table_Form />
            <div>
                <label >
                    रोगनिदान : <br /> <SignaturePad width={700} height={30} design="none" />
                </label>
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "3px solid black"
                }} />
                <br />
                <TransfusionBloodMoreInfoMar/>
                <br />
                <p className="paragraph">
                    वरील सर्व मजकूर  <br />
                    <label>
                        <input type="checkbox" />
                        मी वाचला आहे
                    </label>
                    <br />

                    <label>
                        <input type="checkbox" />
                        मला वाचून दाखविण्यात आला आहे.
                    </label>  
                    <br />
                    मला तो समजला आहे व त्यास माझी संपूर्ण मान्यता आहे.
                </p>
                <br />
                <DeclarationTable
                doctor="डॉक्टर"
                Witness="साक्षीदार"
                PatientRelative="पेशंट / नातेवाईक"
                sign="सही"
                name="नाव "
                address="पत्ता "
                age="वय"
                year="वर्षे"
                signThumb="सही / डाव्या हाताचा अंगठा"
                date="तारीख व वेळ"

                />
            </div>

        </div>

    )
}

export default TransfusionBloodMar;