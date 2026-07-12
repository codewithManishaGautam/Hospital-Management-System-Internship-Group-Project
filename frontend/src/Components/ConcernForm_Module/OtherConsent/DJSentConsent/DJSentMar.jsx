import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import PatientDeclaration from "./PatientDeclaration";


function DJSentMar() {


    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                DJ Stent काढण्यासाठीचे संमतीपत्र
            </h4>

            <Table_Form />
            <div>
                <p className="paragraph">
                    माझ्यावर शस्त्रकर्म करताना DJ STENT बसविण्यात आला आहे, हे डॉक्टरांनी आम्हाला समजावून सांगितले आहे.
                    सदरहू DJ STENT आजपासून <span><SignaturePad width={100} height={30} design="line"/></span> 
                    दिवसांपर्यंत काढणे आवश्यक आहे. जर DJ STENT सांगितलेल्या वेळेत काढला नाही तर त्याभोवती पुन्हा खडे तयार होऊ 
                    शकतात तसेच किडनीलाही त्रास होऊ शकतो, हे मला माहीत आहे. DJ STENT काढण्यासाठी मी 
                    <span><SignaturePad width={300} height={30} design="line"/></span> पर्यंत येईन.
                    DJ STENT काढून टाकण्यासाठी मी येऊ शकलो/शकले नाही, तर त्याची संपूर्ण जबाबदारी आमची राहील.
                </p>
                <br />
                <PatientDeclaration />
            </div>
        </div>
    )
}

export default DJSentMar;