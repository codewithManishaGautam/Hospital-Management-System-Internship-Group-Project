import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";


function SchemeForm({patientOrRelativeSign ,showPatientForm=true, showRelativeForm=true}) {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                एकत्रित महात्मा ज्योतिराव फुले जन आरोग्य योजना व प्रधानमंत्री जन आरोग्य योजनेअंतर्गत लाभ न घेण्याबाबत 
                स्वतःच्या हस्ताक्षरातील निवेदन (करारामधील कलम ३.९.५ नुसार)
            </h4>

            <Table_Form />
            <div>
            
            {
                showRelativeForm &&
                (
                    <p className="paragraph">
                        माझे नातेवाईक  <span><SignaturePad width={380} height={30} design="line" /></span> ,वय 
                        <span><SignaturePad width={130} height={30} design="line" /></span>यांचा,
                        <span><SignaturePad width={300} height={30} design="line" /></span>
                        या आजाराकरिता <b>श्रद्धा हॉस्पिटल अँड आयसीयू</b> या रुग्णालयात उपचार चालू आहे. 
                        एकत्रित महात्मा ज्योतिराव फुले जन आरोग्य योजना व प्रधानमंत्री जन 
                        आरोग्य योजनेअंतर्गत मी लाभार्थी असल्याबाबत व माझ्यावर चालू असलेला <span><SignaturePad width={300} height={30} design="line" /></span> 
                        (कोड नंबर <span><SignaturePad width={250} height={30} design="line" /></span>) हा उपचार योजनेच्या यादीत बसत असून मला हा
                        उपचार मोफत मिळू शकतो, याबाबत मला रुग्णालयातील आरोग्यमित्र <span><SignaturePad width={450} height={30} design="line" /></span> व वैद्यकीय समन्वयक  <br />
                        श्री <span><SignaturePad width={300} height={30} design="line" /></span> यांनी मला माझ्या भाषेत समजावून सांगितले आहे. तरीसुद्धा मला मोफत 
                        उपचार न घेता रुग्णालयाचे शुल्क भरून उपचार घ्यावयाचा आहे.
                        <br /><br />
                        (मी रुग्णाचा नातेवाईक असून, माझी सही करण्यापूर्वी याबाबत रुग्णाची संमती घेतली आहे.)
                    </p>
                )
            }
                {
                    showPatientForm &&
                    (
                        <p className="paragraph" >
                        माझा <span><SignaturePad width={300} height={30} design="line" /></span>
                        या आजाराकरिता <b>श्रद्धा हॉस्पिटल अँड आयसीयू</b> या रुग्णालयात उपचार चालू आहे. 
                        एकत्रित महात्मा ज्योतिराव फुले जन आरोग्य योजना व प्रधानमंत्री जन 
                        आरोग्य योजनेअंतर्गत मी लाभार्थी असल्याबाबत व माझ्यावर चालू असलेला <span><SignaturePad width={300} height={30} design="line" /></span> 
                        (कोड नंबर <span><SignaturePad width={250} height={30} design="line" /></span>) हा उपचार योजनेच्या यादीत बसत असून मला हा
                        उपचार मोफत मिळू शकतो, याबाबत मला रुग्णालयातील आरोग्यमित्र <span><SignaturePad width={450} height={30} design="line" /></span> व वैद्यकीय समन्वयक  <br />
                        श्री <span><SignaturePad width={300} height={30} design="line" /></span> यांनी मला माझ्या भाषेत समजावून सांगितले आहे. तरीसुद्धा मला मोफत 
                        उपचार न घेता रुग्णालयाचे शुल्क भरून उपचार घ्यावयाचा आहे.
                        </p>
                    )
                }

                <br />
               
                <div className="card shadow-sm mb-1 p-1">

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <strong>{patientOrRelativeSign} </strong>
                        <br />
                        <SignaturePad width={300} height={40} design="border" />
                        <br /><br />
                        <strong>आरोग्यमित्राची सही</strong>
                        <br />
                        <SignaturePad width={250} height={40} design="border" />
                    </div>
                    <div className="col-md-6 mb-3">
                        <strong>(मोबाईल क्र.)</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                        <br /><br />
                        <strong>(मोबाईल क्र.)</strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                    </div>

                   

                </div>

            </div>

               


            </div>

        </div>

    )
}

export default SchemeForm;