import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";



function PatientRecordMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                रुग्ण पत्रिका <br />(Patient RECORD)
            </h4>

            <Table_Form />
            <div>
                <b className="title" style={{ display: "block" }}>
                    Medical Case Record
                </b>
                <br />
                <p className="paragraph">
                    <label>
                        रुग्णालयातून सोडल्याची किंवा मृत्यूची दिनांक व वेळ / Discharge or Death Date & Time : <input type="datetime-local" />
                    </label>

                    <br />
                    <label>
                        कोणी पाठविले / Reffered by : <span><SignaturePad width={200} height={30} design="line" /></span>
                    </label>
                    <br />

                    <label>
                        जवळच्या नातेवाईकाचे नाव / Next of Kin : <span><SignaturePad width={300} height={30} design="line" /></span>
                    </label>
                    <br />

                    <label>
                        पत्ता / Address : <span><SignaturePad width={300} height={30} design="line" /></span>
                    </label>
                    <br />
                </p>
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "3px solid black"
                }} />


                <p className="paragraph">
                    <label>
                        तात्पुरते रोगनिदान / Provisional Diagnosis : <br />
                        <span><SignaturePad width={700} height={30} design="line" /></span>
                    </label>

                    <br />
                    <label>
                        निश्चित रोगनिदान / Final Diagnosis : <br />
                        <span><SignaturePad width={700} height={30} design="line" /></span>
                    </label>
                    <br />

                    <label>
                        प्रक्रिया / Procedure : <br />
                        <span><SignaturePad width={700} height={30} design="line" /></span>
                    </label>
                    <br />
                </p>
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "3px solid black"
                }} />

                <b className="title" style={{ display: "block" }}>
                    रुग्ण अत्यवस्थ असल्याची माहिती
                </b>

                <p className="paragraph">
                    मला, माझा नातेवाईक <span><SignaturePad width={300} height={30} design="line" /></span>
                    यांची तब्येत अत्यवस्थ असल्याची कल्पना देण्यात आली आहे. तरी त्यांच्यावर / तिच्यावर आवश्यक ते सर्व उपचार व संबंधित
                    तपासण्या करण्यास मी डॉक्टरांना व व्यवस्थापनास संमती देत आहे. उपचार करताना प्रकृतीस कोणताही धोका निर्माण होऊ शकतो याची मला जाणीव आहे. उपचारादरम्यान प्रकृतीस
                    कोणताही धोका निर्माण झाल्यास त्याची जबाबदारी डॉक्टरांवर किंवा इतर सहकाऱ्यांवर राहणार नाही. हे मी स्वतःच्या इच्छेने व स्वखुशीने लिहून देत आहे.
                    <br /> <br />

                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <strong >
                            रुग्णाची / नातेवाईकाची सही <br />
                            <SignaturePad width={200} height={40} design="border" />
                        </strong>
                    </div>
                </p>

                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "3px solid black"
                }} />

                <b className="title" style={{ display: "block" }}>
                    साधारण संमती पत्र
                </b>

                <p className="paragraph">
                    मी <span><SignaturePad width={300} height={30} design="line" /></span>
                    स्वीकार करतो / करते की, मला / माझ्या नातेवाईकाच्या आजाराच्या उपचाराबाबत तसेच त्यावर होणाऱ्या संभाव्य
                    परिणामांविषयी पूर्ण माहिती देण्यात आली आहे. यासंबंधी मी विविध वैद्यकीय प्रक्रिया व उपचारांसाठी संमती देत आहे.
                    <br />
                    <ol>
                        <li>
                            उपचाराकरिता आवश्यक प्रक्रिया जसे बायोप्सी, एन्डोस्कोपी, एन्जिओग्राफी, सीटी स्कॅन इ. करिता.
                        </li>

                        <li>
                            कोणत्याही प्रकारच्या शस्त्रक्रियेसाठी किंवा भूल देण्याची आवश्यकता असल्यास.
                        </li>

                        <li>
                            किरण चिकित्सा (रेडिओथेरपी) / बाह्य किंवा आंतरिक (ब्रेकीथेरपी) / औषधोपचार (किमोथेरपी) च्या औषधांकरिता.
                        </li>

                        <li>
                            मला माहित आहे की, उपचाराच्या वेळी मला रक्त किंवा अवयवांची गरज भासू शकते. या प्रक्रियेत सर्व प्रकारची काळजी घेतली जाते, 
                            तरीसुद्धा काही दुष्परिणाम होऊ शकतात हे मला मान्य आहे. मी ब्लड बँकेला रक्त बदलविण्यापूर्वी आवश्यक त्या सर्व तपासण्या 
                            (जसे की हेपेटायटीस आणि एच.आय.व्ही.) करण्यास अनुमती देत आहे.
                        </li>

                        <li>
                            मी आय.सी.यू. विभागात / विभागातून बदली करण्याचा अधिकार माझे विशेषज्ञ किंवा आय.सी.यू. अधिकारी यांना देत आहे.
                        </li>

                        <li>
                            मी, माझा अकस्मात मृत्यू झाल्यास त्याची कारणे शोधण्यासाठी पोस्ट-मॉर्टेम करण्यास अनुमती देत आहे.
                        </li>
                    </ol>
                </p>
                <br />
                <DeclarationInfo/>




            </div>

        </div>

    )
}

export default PatientRecordMar;