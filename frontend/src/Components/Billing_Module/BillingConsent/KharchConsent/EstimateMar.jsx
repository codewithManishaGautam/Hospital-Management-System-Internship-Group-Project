


import React from "react";

import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";

import "../CommonCode/FormBasic.css";

import EstimateBillTable from "./EstimateBillTable";
import DoctorDeclaration from "./DoctorDeclaration";
import PatientDeclaration from "./PatientDeclaration";


function EstimateMar({

    patient,
    onDataChange

}) {

    return (

        <div>

            {/* ================= PAGE 1 ================= */}

            <div className="consent-form">

                <h2 className="title">

                    श्रद्धा हॉस्पिटल, दौंड

                </h2>

                <h4 className="title">

                    खर्चाचा अंदाज

                </h4>

                <div className="page-section">

                    <Table_Form patient={patient} />

                    <br />

                    <strong>

                        अंदाजे बिल दिल्याची तारीख व वेळ :

                    </strong>

                    <br />

                    <input
                        type="datetime-local"
                        className="form-control w-50"
                    />

                    <br />

                    <strong>

                        रोगाचे निदान :

                    </strong>

                    <SignaturePad
                        height={30}
                        design="line"
                    />

                    <br />

                    <strong>

                        शस्त्रक्रियेची गरज :

                    </strong>

                    <br />

                    <input type="checkbox" />

                    &nbsp; आहे

                    &nbsp;&nbsp;&nbsp;

                    <input type="checkbox" />

                    &nbsp; नाही

                    <br />
                    <br />


                </div>

                <div style={{width:"100%"}}>
                    <EstimateBillTable  />
                </div>
                
                  
            </div>

            <div className="page-break"></div>

            {/* ================= PAGE 2 ================= */}

            <div className="consent-form">

                <div className="page-section">

                    <p className="paragraph">

                        <b>

                            खालील बाबींचे चार्जेस वेगळे आकारले जातील याची नोंद घ्यावी :

                        </b>

                    </p>

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

                    <p>

                        कृपया हा फक्त बिलाचा अंदाज आहे.

                        रुग्णाच्या वैद्यकीय स्थितीमध्ये बदल झाल्यास

                        सुधारित अंदाज देण्यात येईल.

                    </p>

                    <p>

                        खर्चाचा अंदाज मला पूर्णपणे समजावून सांगण्यात आला

                        असून तो मला मान्य आहे.

                    </p>

                    <br />

                    <DoctorDeclaration
                        patient={patient}
                        onDataChange={onDataChange}
                    />

                    <br />

                    <PatientDeclaration
                        patient={patient}
                        onDataChange={onDataChange}
                    />

                </div>

            </div>

        </div>

    );

}

export default EstimateMar;
