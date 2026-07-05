import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import EstimateBillTable from "./EstimateBillTable";
import DoctorDeclaration from "./DoctorDeclaration";
import PatientDeclaration from "../RestraintAdministration/PatientDeclaration";




function EstimateMar() {


    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                खर्चाचा अंदाज
            </h4>

            <Table_Form />
            <div>

                <div>
                    <strong>अंदाजे बिल दिल्याची तारीख व वेळ :-</strong>
                    <br />
                    <input type="datetime-local" />
                    <br /> <br />

                    <strong>रोगाचे निदान :-</strong>
                    <SignaturePad width={700} height={30} design="line" />


                    <strong>शस्त्रक्रियेची गरज :-</strong><br />
                    <input type="checkbox" /> आहे
                    &nbsp;&nbsp;&nbsp;
                    <input type="checkbox" /> नाही
                </div>
                <br />

                <EstimateBillTable />

                <br />

                <div>
                    <p className="paragraph">
                        <b>
                            खालील बाबींचे चार्जेस वेगळे आकारले जातील याची नोंद घ्यावी :
                        </b>
                        <ol>
                            <li>
                                औषधे, कन्झ्युमेबल, डिस्पोजेबल
                            </li>

                            <li>
                                लॅब व रेडिओलॉजी चाचण्या
                            </li>

                            <li>
                                स्पेशल कन्सल्टेशन
                            </li>

                            <li>
                                आहारतज्ज्ञाचा सल्ला
                            </li>

                            <li>
                                अतिरिक्त इंटरव्हेन्शन / प्रोसीजर्स
                            </li>
                        </ol>
                        कृपया हा फक्त बिलाचा अंदाज आहे. रुग्णाच्या वैद्यकीय स्थितीमध्ये चढ-उतार किंवा बदल झाल्यास किंवा ॲडमिशन झाल्यानंतर काही 
                        वैद्यकीय समस्या आढळल्यास सुधारित अंदाज देण्यात येईल. खर्चाचा अंदाज मला पूर्णपणे समजावून सांगण्यात आला आहे व तो मला पूर्णपणे मान्य आहे.
                    </p>
                    <br />
                    <DoctorDeclaration/>
                    <br />
                    <PatientDeclaration/>
                </div>


            </div>
        </div>
    )
}

export default EstimateMar;