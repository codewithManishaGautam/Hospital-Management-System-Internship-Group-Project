import React from "react";
import Table_Form from "../Tabel_Form";
import SignaturePad from "../SignaturePad";
import "../Minor_Surgical/MinorEnglish.css";
import FormChart from "../Common_Code/FormChart";
import Stamp from "../../../../assets/Percutaneous.png"
import PatientSurgeryDeclaration from "../Common_Code/PatientSurgeryDeclaration";



function PercutaneousMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                परक्युटेनिअस नेफ्रोलिथोटॉमी (PCNL) शस्त्रक्रियेसाठी सूचित संमतीपत्र
            </h4>

            <p className="title">
                (डॉक्टरांनी शस्त्रक्रियेबाबत सविस्तर माहिती समजावून सांगितल्यानंतर रुग्ण / रुग्णाचे नातेवाईक आणि डॉक्टर यांनी स्वाक्षरी करावयाची आहे.)
            </p>

            <Table_Form />
            <div>

                <label >
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <b>पूर्व निदान :</b> <span><SignaturePad width={260} height={30} design="line" /></span>
                            <b>भुलेचा प्रकार :</b> <span><SignaturePad width={260} height={30} design="line" /></span>
                        </div>
                        <br />


                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p><b>शस्त्रक्रियेचे नाव :</b>परक्युटेनिअस नेफ्रोलिथोटॉमी (PCNL) शस्त्रक्रिया :</p>
                            <p><b>बाजु :</b> <span><SignaturePad width={300} height={30} design="line" /></span></p>
                        </div>
                    </div>
                </label>

                <b>परक्युटेनिअस नेफ्रोलिथोटॉमी (PCNL) शस्त्रक्रिया :</b>
                या शस्त्रक्रियेमध्ये पाठीच्या बाजूने त्वचेत एक लहान छिद्र (पंक्चर) करून दुर्बिण मूत्रपिंडात (किडनीमध्ये) प्रवेश केली जाते. त्यानंतर अल्ट्रासोनिक, लिथोक्लास्ट किंवा लेसर तंत्रज्ञानाच्या सहाय्याने मूत्रपिंडातील खडा फोडून बाहेर काढला जातो. ही शस्त्रक्रिया मोठ्या किंवा गुंतागुंतीच्या मूत्रपिंडातील खड्यांच्या उपचारासाठी केली जाते.




                <br /><br />

                <div >
                    <img

                        src={Stamp}
                        width="750"
                        height="300"
                        alt="Stamp"

                    />
                </div>
                <br /><br />

                <b>शस्त्रक्रियेचे फायदे</b>
                <br />
                <ul>
                    <li>मूत्रपिंडातील (किडनीतील) खडा काढून टाकणे.</li>
                </ul>
                <br /><br />

                <b>संभाव्य धोके :-</b>  <br />
                <ul>
                    <li><b style={{ fontWeight: "600", fontSize: "12px" }}>सामान्य</b></li>
                    <ul>
                        <li>
                            तात्पुरत्या काळासाठी मूत्रमार्गात किंवा मूत्रवाहिनीत कॅथेटर किंवा डीजे स्टेंट (DJ Stent) ठेवावा लागू शकतो.
                        </li>
                        <li>
                            तात्पुरत्या काळासाठी पोटात गोळा येणे किंवा अस्वस्थता जाणवणे.
                        </li>
                        <li>
                            काही काळासाठी रक्तमिश्रित किंवा लालसर लघवी होणे.
                        </li>
                        <li>
                            तात्पुरता ताप येणे.
                        </li>
                    </ul>
                    <br /><br />

                    <li><b>नैमित्तिक</b></li>
                    <ul>
                        <li>
                            काही वेळा शस्त्रक्रियेदरम्यान एकापेक्षा अधिक ठिकाणी छिद्र (पंक्चर) करावे लागू शकते.
                        </li>
                        <li>
                            सर्व खडे या शस्त्रक्रियेद्वारे पूर्णपणे काढता येतील किंवा खडे पुन्हा होणार नाहीत याची हमी देता येत नाही.
                        </li>
                        <li>
                            भविष्यात मूत्रपिंडात पुन्हा नवीन खडे तयार होऊ शकतात.
                        </li>
                    </ul>
                    <br /><br />

                    <li><b>दुर्मिळ</b></li>  <br />

                    <ul>
                        <li>
                            शस्त्रक्रियेदरम्यान मूत्रपिंडातून जास्त रक्तस्त्राव झाल्यास रक्त चढवावे लागू शकते, पोट उघडून रक्तस्त्राव थांबवावा लागू शकतो किंवा अत्यंत दुर्मिळ प्रसंगी मूत्रपिंड काढून टाकावे लागू शकते.
                        </li>
                        <li>
                            फुफ्फुस, आतडे, प्लीहा (Spleen) किंवा यकृत (Liver) यांना इजा झाल्यास पुढील शस्त्रक्रियेची आवश्यकता भासू शकते.
                        </li>
                        <li>
                            मूत्रपिंड निकामी होणे किंवा संसर्ग होणे, ज्यासाठी पुढील उपचारांची गरज लागू शकते.
                        </li>
                        <li>
                            शस्त्रक्रियेदरम्यान वापरलेल्या सलाईनचे शरीरात जास्त प्रमाणात शोषण झाल्यास हृदयावर अतिरिक्त ताण येऊ शकतो.

                        </li>
                        <li>
                            इतर अवयव किंवा रक्तवाहिन्यांना इजा झाल्यास खुली शस्त्रक्रिया (Open Surgery) करावी लागू शकते.

                        </li>
                    </ul>
                    <br /><br />

                    <li><b>पर्यायी उपचार पद्धती</b></li>  <br />
                    <div className="d-flex flex-column gap-2" style={{ marginLeft: "20px" }}>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>एक्स्ट्राकॉर्पोरियल शॉक वेव्ह लिथोट्रिप्सी (ESWL) द्वारे खडा फोडणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>खुली शस्त्रक्रिया (पोट उघडून) करून खडा काढणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>प्रतीक्षा करणे व नियमित निरीक्षण ठेवणे.</label>
                        </div>
                    </div>
                </ul>
                <br /><br />

                <PatientSurgeryDeclaration />
                <br /><br />
            </div>
            <FormChart showInterpreterDeclaration={false} />
        </div>
    )
}

export default PercutaneousMar;


