import React from "react";
import Table_Form from "../Tabel_Form";
import SignaturePad from "../SignaturePad";
import "../Minor_Surgical/MinorEnglish.css";
import FormChart from "../Common_Code/FormChart";
import Stamp from "../../../../assets/Cystoscopy&Optical.png"
import PatientSurgeryDeclaration from "../Common_Code/PatientSurgeryDeclaration";



function CystoOpticalMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                रिजिड सिस्टोस्कोपी आणि ऑप्टिकल युरेथ्रोटॉमी शस्त्रक्रियेसाठी सूचित संमतीपत्र
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
                            <p><b>शस्त्रक्रियेचे नाव :</b> रिजिड सिस्टोस्कोपी आणि ऑप्टिकल युरेथ्रोटॉमी शस्त्रक्रिया</p>
                        </div>
                    </div>
                </label>

                <b>रिजिड सिस्टोस्कोपी आणि ऑप्टिकल युरेथ्रोटॉमी शस्त्रक्रिया :</b>
                या शस्त्रक्रियेमध्ये दुर्बिणीद्वारे मूत्रमार्ग (युरेथ्रा) व मूत्राशयाची तपासणी केली जाते.
                मूत्रमार्गामध्ये असलेला अडथळा किंवा अरुंद झालेला भाग दुर्बिणीच्या सहाय्याने विशेष ब्लेड किंवा लेसर वापरून कापून काढला जातो,
                ज्यामुळे मूत्राचा प्रवाह सुरळीत होण्यास मदत होते.


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
                    <li>लघवी सुरळीत होण्यासाठी मूत्रमार्गातील अडथळा दूर करणे.</li>
                </ul>
                <br /><br />

                <b>संभाव्य धोके :-</b>  <br />
                <ul>
                    <li><b style={{ fontWeight: "600", fontSize: "12px" }}>सामान्य</b></li>
                    <ul>
                        <li>शस्त्रक्रियेनंतर काही काळ लघवी करताना जळजळ होणे किंवा थोड्या प्रमाणात रक्त येणे.</li>
                        <li>तात्पुरत्या स्वरूपात कॅथेटर (लघवीची नळी) बसवावी लागू शकते.</li>
                        <li>मूत्रमार्ग पुन्हा अरुंद होऊ नये किंवा बंद होऊ नये यासाठी काही रुग्णांना स्वतः कॅथेटर घालण्याचे प्रशिक्षण घ्यावे लागू शकते.</li>
                    </ul>
                    <br /><br />

                    <li><b>नैमित्तिक</b></li>
                    <ul>
                        <li>मूत्राशयात संसर्ग झाल्यास प्रतिजैविके (Antibiotics) व इतर औषधोपचारांची आवश्यकता लागू शकते.</li>
                        <li>मूत्राशयात विकृती किंवा खडा (स्टोन) आढळल्यास तो दुर्बिणीद्वारे काढावा लागू शकतो.</li>
                        <li>मूत्रमार्ग वारंवार बंद झाल्यास अडथळा दूर करण्याची प्रक्रिया पुन्हा करावी लागू शकते.</li>
                    </ul>
                    <br /><br />

                    <li><b>दुर्मिळ</b></li>  <br />

                    <ul>
                        <li>
                            अत्यंत कमी प्रमाणात पुरुष रुग्णांमध्ये लिंगोत्थानाशी (Erection) संबंधित तक्रारी उद्भवू शकतात, ज्यासाठी पुढील उपचारांची आवश्यकता भासू शकते.
                        </li>
                    </ul>
                    <br /><br />

                    <li><b>पर्यायी उपचार पद्धती</b></li>  <br />
                    <div className="d-flex flex-column gap-2" style={{ marginLeft: "20px" }}>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>निरीक्षण करणे / प्रतीक्षा करणे.</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>मूत्रमार्गाचा व्यास वाढविणे (डायलेशन करणे).</label>
                        </div>
                        <div>
                            <input type="checkbox" className="form-check-input me-2" />
                            <label>दुर्बिणीऐवजी खुल्या शस्त्रक्रियेद्वारे मूत्रमार्गातील अडथळा दूर करणे.</label>
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

export default CystoOpticalMar;












