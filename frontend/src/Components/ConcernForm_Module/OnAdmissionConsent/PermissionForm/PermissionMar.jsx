import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationPermission from "./DeclarationPermission";


function PermissionMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                महात्मा ज्योतिराव फुले जन आरोग्य योजना <br />
                अनुमती पत्र
            </h4>

            <Table_Form />
            <div>
                <p >
                    <b className="title" style={{ display: "block" }}>अनुमती पत्र</b>

                </p>
                <DeclarationPermission />
                <br /><br />
                <p className="paragraph">
                    मी, <span><SignaturePad width={300} height={30} design="line" /></span> स्वतः / आमचे रुग्ण आज रोजी
                    <input type="datetime-local" style={{ border: "none", color: "blue", marginLeft: "5px" }} /> वाजता <b>श्रद्धा हॉस्पिटल
                        अँड आयसीयू</b>  या रुग्णालयात दाखल झाले / झालो / केले. रुग्णालयात दाखल झाल्यानंतर रुग्णालयातील डॉक्टरांनी मला /
                    आम्हास महात्मा ज्योतिराव फुले जन आरोग्य योजनेबाबत संपूर्ण माहिती दिली.
                </p>

                <br />
                <p className="paragraph">
                    1.<span><SignaturePad width={100} height={40} design="border" /></span>
                    <br />
                    <ol type="A">
                        <li>
                            रुग्णालयात दाखल झाल्यानंतर रुग्णालयातील डॉक्टरांनी मला / आमच्या रुग्णाला 
                            <span><SignaturePad width={265} height={30} design="line"/></span> 
                            <span><SignaturePad width={100} height={30} design="line"/></span> हा आजार असल्याचे सांगितले व
                            हा आजार / उपचार महात्मा ज्योतिराव फुले जन आरोग्य योजनेमध्ये समाविष्ट असल्याचेही
                            रुग्णालयातील डॉक्टरांकडून मला / आम्हाला सांगण्यात आले.
                        </li>

                        <li>
                            महात्मा ज्योतिराव फुले जन आरोग्य योजनेअंतर्गत मला / आमच्या रुग्णाला खालील सुविधा
                            निःशुल्क स्वरूपात मिळतील याची माहितीही रुग्णालयातील डॉक्टरांकडून मला / आम्हाला
                            देण्यात आली आहे.
                            <ol>
                                <li>रुग्णालयातील खाटा</li>
                                <li>निःशुल्क निदान सेवा</li>
                                <li>भूल सेवा व शस्त्रक्रिया</li>
                                <li>आवश्यक औषधोपचार</li>
                                <li>शुश्रूषा व भोजन</li>
                                <li>एक वेळेचा परतीचा प्रवास</li>
                            </ol>
                        </li>

                        <li>
                            अति प्रसंगिक / अपघाताच्या वेळी या योजनेचा लाभ घेत असताना आवश्यक असलेल्या सर्व
                            कागदपत्रांची पूर्तता विहित कालावधीत पूर्ण करण्यास मी / आम्ही बंधनकारक असेन /
                            आहोत.
                        </li>

                        <li>
                            अति प्रसंगिक / अपघाताच्या वेळी या योजनेचा लाभ घेत असताना आवश्यक असलेल्या सर्व
                            कागदपत्रांची पूर्तता विहित कालावधीत पूर्ण करण्यास असक्षम ठरलो / ठरल्यास, मी /
                            आम्ही या योजनेचा लाभ घेण्यापासून वंचित राहीन / राहणार आहोत. तसेच उपचारासाठी
                            आवश्यक सर्व कागदपत्रांची पूर्तता वेळेत न झाल्यामुळे उपचारासाठी लागणाऱ्या खर्चासाठी
                            मी / आम्ही स्वतः जबाबदार राहीन / राहणार आहोत.
                        </li>
                    </ol>
                </p>
                <br /><br />
                <p className="paragraph">
                    2.<span><SignaturePad width={100} height={40} design="border" /></span>
                    <br />
                    <ol type="A">
                        <li>
                            रुग्णालयात दाखल झाल्यानंतर रुग्णालयातील डॉक्टरांनी मला / आमच्या रुग्णाला
                            <span><SignaturePad width={265} height={30} design="line"/></span> 
                            <span><SignaturePad width={100} height={30} design="line"/></span> हा आजार असल्याचे सांगितले व
                            हा आजार / उपचार महात्मा ज्योतिराव फुले जन आरोग्य योजनेमध्ये समाविष्ट नसल्याचे
                            रुग्णालयातील डॉक्टरांकडून मला / आम्हाला सांगण्यात आले.
                        </li>

                        <li>
                            वरील आजार / उपचार हा महात्मा ज्योतिराव फुले जन आरोग्य योजनेमध्ये
                            समाविष्ट नसल्यामुळे संबंधित आजारावर मी / आम्ही स्वतःच्या खर्चाने उपचार घेऊ
                            इच्छितो / घेणार आहोत. तरी या बाबत वैयक्तिकरित्या माझी / आमची
                            रुग्णालयाबाबत कोणत्याही प्रकारची तक्रार नाही.
                        </li>
                    </ol>
                </p>

                <br /><br />

                <p className="paragraph">
                    अनुमतीपत्रातील वरील सर्व नमूद केलेल्या बाबी मी / आम्ही वाचल्या आहेत किंवा मला / आम्हाला माझ्या / 
                    आमच्या मातृभाषेत वाचून दाखविण्यात आल्या आहेत व त्या मला / आम्हाला मान्य आहेत.
                </p>

                <div className="card shadow-sm mb-1 p-1">

                <div className="row">


                     <div className="col-md-6 mb-3" >

                        <strong>दिनांक</strong>
                        <br />
                        <input type="datetime-local" />
                        <br /><br />
                    </div>


                    <div className="col-md-6 mb-3">
                        <strong>ठिकाण </strong>
                        <br />
                        <SignaturePad width={300} height={30} design="line" />
                        <br /><br />
                        <strong>रुग्ण / नातेवाईकाची सही </strong>
                        <br />
                        <SignaturePad width={250} height={40} design="border" />
                    </div>

                   

                </div>

            </div>

              

            </div>

        </div>

    )
}

export default PermissionMar;