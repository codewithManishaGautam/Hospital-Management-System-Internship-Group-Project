import React from "react";
import Table_Form from "../Tabel_Form";
import SignaturePad from "../SignaturePad";
import "../Minor_Surgical/MinorEnglish.css";
import FormChart from "../Common_Code/FormChart";
import Stamp from "../../../../assets/Laparoscopic.png"
import PatientSurgeryDeclaration from "../Common_Code/PatientSurgeryDeclaration";



function LaparoscopicMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                लॅप्रोस्कोपिक पायलोप्लास्टी शस्त्रक्रियेसाठी सूचित संमतीपत्र
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
                            <p><b>शस्त्रक्रियेचे नाव :</b> लॅप्रोस्कोपिक पायलोप्लास्टी</p>
                            <p><b>बाजु :</b> <span><SignaturePad width={300} height={30} design="line" /></span></p>
                        </div>
                    </div>
                </label>

                <b>लॅप्रोस्कोपिक पायलोप्लास्टी शस्त्रक्रिया :</b>
                या शस्त्रक्रियेमध्ये मूत्रपिंड (किडनी) आणि मूत्रवाहिनी (यूरेटर) यांच्या जोडणीच्या ठिकाणी असलेला अडथळा, अरुंदता किंवा जखम दूर केली जाते.
                आवश्यकतेनुसार मूत्राचा प्रवाह सुरळीत राहण्यासाठी आणि जखम लवकर भरून येण्यासाठी तात्पुरत्या स्वरूपात कृत्रिम नळी (स्टेंट) बसविली जाते.
                या प्रक्रियेमुळे मूत्रपिंडातून मूत्राचा प्रवाह योग्य प्रकारे होण्यास मदत होते.

                <br /><br />

                <div>
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
                    <li>मूत्रपिंडातील (किडनीतील) मूत्राचा निचरा सुधारण्यासाठी.</li>
                    <li>वेदना कमी करण्यासाठी व आराम मिळण्यासाठी.</li>
                </ul>
                <br /><br />

                <b>संभाव्य धोके :-</b>  <br />
                <ul>
                    <li><b style={{ fontWeight: "600", fontSize: "12px" }}>सामान्य</b></li>
                    <ul>
                        <li>तात्पुरत्या काळासाठी खांद्यात वेदना होणे.</li>
                        <li>तात्पुरत्या काळासाठी पोटात गोळा येणे किंवा अस्वस्थता जाणवणे.</li>
                        <li>काही काळासाठी मूत्राशयात कॅथेटर (नळी) व जखमेच्या ठिकाणी ड्रेन बसवावे लागू शकते.</li>
                        <li>युरेट्रिक स्टेंट काढण्यासाठी नंतर स्थानिक भूल देऊन स्वतंत्र प्रक्रिया करावी लागू शकते.</li>
                    </ul>
                    <br /><br />

                    <li><b>नैमित्तिक</b></li>
                    <ul>
                        <li>संसर्ग किंवा वेदना होऊ शकतात, ज्यासाठी पुढील उपचारांची आवश्यकता भासू शकते.</li>
                        <li>आजार पुन्हा उद्भवण्याची शक्यता असून त्यासाठी पुन्हा शस्त्रक्रिया करावी लागू शकते.</li>
                        <li>या शस्त्रक्रियेचे अल्पकालीन यशाचे प्रमाण ओपन शस्त्रक्रियेप्रमाणेच आहे.</li>
                        <li>मात्र दीर्घकालीन परिणाम पूर्णपणे निश्चित नाहीत.</li>
                    </ul>
                    <br /><br />

                    <li><b>अतिदुर्मिळ</b></li>  <br />

                    <ul>
                        <li>
                            शस्त्रक्रियेदरम्यान जास्त रक्तस्त्राव झाल्यास ओपन शस्त्रक्रिया (पोट उघडून शस्त्रक्रिया) किंवा रक्त चढविण्याची आवश्यकता लागू शकते.
                        </li>

                        <li>
                            शस्त्रक्रियेदरम्यान इतर अवयव किंवा रक्तवाहिन्यांना इजा झाल्यास ओपन शस्त्रक्रिया करावी लागू शकते.
                        </li>

                        <li>
                            वारंवार अडथळा निर्माण होऊन मूत्रपिंड अधिक खराब झाल्यास भविष्यात मूत्रपिंड काढून टाकावे लागू शकते.

                        </li>

                        <li>
                            भूल, हृदय किंवा रक्ताभिसरणाशी संबंधित गंभीर गुंतागुंत झाल्यास रुग्णास अतिदक्षता विभागात (ICU) दाखल करावे लागू शकते.
                        </li>

                        <li>
                            छातीतील संसर्ग, पल्मोनरी एम्बोलिझम, स्ट्रोक, डीव्हीटी (Deep Vein Thrombosis), हृदयविकाराचा झटका किंवा मृत्यू यांसारख्या गंभीर गुंतागुंती होऊ शकतात.
                        </li>
                    </ul>
                    <br /><br />

                    <li><b>पर्यायी उपचार पद्धती</b></li>  <br />
                    <div className="d-flex flex-column gap-2" style={{ marginLeft: "20px" }}>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>प्रतीक्षा करून नियमित निरीक्षण करणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>तात्पुरत्या स्वरूपात प्लास्टिक ट्यूब (स्टेंट) बसविणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>दुर्बिणीद्वारे (एंडोस्कोपिक पद्धतीने) अडथळा कापणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>खुली (ओपन) शस्त्रक्रिया करणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>अरुंद झालेला भाग विस्तृत करणे (डायलेशन करणे).</label>
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

export default LaparoscopicMar;



