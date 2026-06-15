import React from "react";
import Table_Form from "../Tabel_Form";
import SignaturePad from "../SignaturePad";
import "../Minor_Surgical/MinorEnglish.css";
import FormChart from "../Common_Code/FormChart";
import Stamp from "../../../../assets/Transurethral.png"
import PatientSurgeryDeclaration from "../Common_Code/PatientSurgeryDeclaration";



function TransurethralMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                मूत्रमार्गाद्वारे दुर्बिणीने प्रोस्टेट (पौरुष) ग्रंथीची शस्त्रक्रिया करण्यासाठी सूचित संमतीपत्र
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
                            <p><b>शस्त्रक्रियेचे नाव :</b>मूत्रमार्गाद्वारे दुर्बिणीने पुरुष (प्रोस्टेट) ग्रंथीची शस्त्रक्रिया :</p>
                        </div>
                    </div>
                </label>

                <b>मूत्रमार्गाद्वारे दुर्बिणीने पुरुष (प्रोस्टेट) ग्रंथीची शस्त्रक्रिया (TURP / Laser Prostate Surgery) :</b>
                या शस्त्रक्रियेमध्ये पुरुषांच्या प्रोस्टेट ग्रंथीची वाढ झाल्यामुळे मूत्रमार्गात निर्माण झालेला अडथळा मूत्रमार्गाद्वारे दुर्बिणीच्या सहाय्याने काढून टाकला जातो.
                अडथळा दूर करण्यासाठी विशेष ब्लेड किंवा लेसर वापरला जाऊ शकतो. यामुळे लघवीचा प्रवाह सुधारण्यास मदत होते.
                शस्त्रक्रियेनंतर काही काळासाठी मूत्राशय (युरिनरी ब्लॅडर) स्वच्छ ठेवण्यासाठी आणि रक्ताच्या गुठळ्या बाहेर काढण्यासाठी कॅथेटर (लघवीची नळी) ठेवली जाते.
                आवश्यकतेनुसार त्या नळीमार्फत सतत द्रव (Irrigation) दिला जातो.




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
                    <li>लघवीतील अडथळा दूर होणे.</li>
                    <li>लघवीचा प्रवाह सुधारणे.</li>
                </ul>
                <br /><br />

                <b>संभाव्य धोके :-</b>  <br />
                <ul>
                    <li><b style={{ fontWeight: "600", fontSize: "12px" }}>सामान्य</b></li>
                    <ul>
                        <li>
                            शस्त्रक्रियेनंतर काही काळ लघवी करताना जळजळ होणे किंवा थोड्या प्रमाणात रक्तस्त्राव होणे.
                        </li>
                        <li>
                            संभोगाच्या वेळी वीर्यस्खलन न होणे (Retrograde Ejaculation) होऊ शकते.
                        </li>
                        <li>
                            खुल्या शस्त्रक्रियेमध्ये अंदाजे 20% शक्यता.
                        </li>
                        <li>
                            दुर्बिणीद्वारे शस्त्रक्रियेमध्ये अंदाजे 75% शक्यता.
                        </li>
                        <li>
                            प्रोस्टेट ग्रंथीशी संबंधित सर्व लक्षणे पूर्णपणे दूर होतीलच याची हमी देता येत नाही.
                        </li>
                    </ul>
                    <br /><br />

                    <li><b>नैमित्तिक</b></li>
                    <ul>
                        <li>
                            लिंगोत्थान (Erection) पुरेसे न होण्याची शक्यता. काही रुग्णांमध्ये (सुमारे 5–10%) पूर्णपणे लिंगोत्थान न होण्याची समस्या उद्भवू शकते.
                        </li>
                        <li>
                            मूत्राशय किंवा मूत्रपिंडात संसर्ग होऊ शकतो, ज्यासाठी प्रतिजैविके (Antibiotics) व इतर उपचारांची आवश्यकता लागू शकते.
                        </li>
                        <li>
                            जास्त रक्तस्त्राव झाल्यास पुन्हा ऑपरेशन थिएटरमध्ये नेऊन तपासणी करावी लागू शकते किंवा रक्तदान (Blood Transfusion) करावे लागू शकते.
                        </li>
                        <li>
                            काही काळानंतर पुन्हा लघवीतील अडथळा निर्माण झाल्यास पुनः शस्त्रक्रियेची आवश्यकता भासू शकते (साधारण 10% रुग्णांमध्ये).
                        </li>
                        <li>
                            मूत्राशय कमकुवत असल्यास स्वतः कॅथेटर घालून लघवी मोकळी करावी लागू शकते.
                        </li>
                        <li>
                            शस्त्रक्रियेनंतर लघवी होण्यास अडचण आल्यास पुन्हा कॅथेटर बसवावा लागू शकतो.
                        </li>

                    </ul>
                    <br /><br />

                    <li><b>दुर्मिळ</b></li>  <br />

                    <ul>
                        <li>
                            प्रोस्टेट ग्रंथीच्या तपासणीत कर्करोग (कॅन्सर) आढळल्यास पुढील उपचार किंवा शस्त्रक्रियेची आवश्यकता भासू शकते.
                        </li>
                        <li>
                            शस्त्रक्रियेदरम्यान मूत्रमार्गाला इजा झाल्यास जखम भरून येण्यासाठी अधिक कालावधी लागू शकतो.
                        </li>
                        <li>
                            काही काळासाठी किंवा कायमस्वरूपी लघवीवरील नियंत्रण कमी होऊ शकते (Urinary Incontinence).
                        </li>
                        <li>
                            अत्यंत दुर्मिळ प्रसंगी शस्त्रक्रियेदरम्यान मूत्राशयाला इजा होऊन तो फाटू शकतो. अशा परिस्थितीत काही काळासाठी कॅथेटर ठेवावा लागू शकतो किंवा पुन्हा शस्त्रक्रिया करावी लागू शकते.
                        </li>
                    </ul>
                    <br /><br />

                    <li><b>पर्यायी उपचार पद्धती</b></li>  <br />
                    <div className="d-flex flex-column gap-2" style={{ marginLeft: "20px" }}>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>औषधोपचार करणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>लघवीची नळी (कॅथेटर) कायमस्वरूपी ठेवणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>पोट उघडून (ओपन) शस्त्रक्रिया करणे.</label>
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

export default TransurethralMar;













