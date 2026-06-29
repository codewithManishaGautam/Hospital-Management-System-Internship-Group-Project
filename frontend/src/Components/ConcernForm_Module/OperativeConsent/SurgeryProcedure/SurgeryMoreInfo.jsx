import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import "../CommonCode/FormBasic.css";

function SurgeryMoreInfo() {
    return (
        <div>
            <div>
                <ol className="paragraph">

                    <li>
                        I hereby authorize Dr. <span><SignaturePad width={300} height={30} design="line"/></span> or his/her associates to perform surgery / operative procedure 
                        upon me / the above named patient. The name of the procedure is :- <br /> <SignaturePad width={600} height={30} design="line"/>
                        डॉ. <span><SignaturePad width={300} height={30} design="line"/></span> किंवा त्यांच्या सहकाऱ्यांना माझ्यावर / माझ्या रुग्णावर शस्त्रक्रिया / तत्सम प्रक्रिया करण्यास परवानगी देत आहे. शस्त्रक्रिया / तत्सम प्रक्रियेचे नाव :- 
                        <br /> <SignaturePad width={600} height={30} design="line"/>
                    </li>

                    <li>
                        I have been fully explained, in a language I understand, about the kind of procedure the Surgeon will perform. I have been 
                        given an opportunity to ask questions and all my questions have been answered satisfactorily. He/She answered my questions 
                        about my condition and the procedure to my satisfaction.<br />
                        प्रक्रियेबाबत मला / आम्हाला समजणाऱ्या सरळ आणि सोप्या भाषेत समजावून सांगण्यात आलेले आहे. त्याचप्रमाणे मला प्रश्न विचारण्याची संधी देण्यात आली व माझ्या 
                        शंका / कुशंका आणि प्रत्येक प्रश्नाचे समाधान होईपर्यंत मला कळविण्यात आलेले आहे.
                    </li>

                    <li>
                        Doctor has fully explained to me the nature and purpose of operation/procedure and has also informed me of expected benefits 
                        and complications, attendant discomfort and risks that may arise, as well as possible alternatives to the proposed treatment.<br />
                        डॉक्टरांनी मला ऑपरेशनचा उद्देश आणि त्याची प्रक्रिया याबाबत माहिती दिलेली आहे. तसेच ऑपरेशन करण्याचे फायदे, तोटे, अडचणी, उद्भवू शकणारे धोके तसेच 
                        पर्यायी चिकित्सा पद्धती याबाबत माहिती दिलेली आहे.
                    </li>

                    <li>
                        The Doctor explained the likelihood of major risks or complications that may occur during this procedure including 
                        but not limited to loss of limb function, brain damage, paralysis, hemorrhage, infection, drug reaction, blood clots 
                        or sometimes loss of life. I understand those risks and I am willing to undergo the procedure. I have been explained 
                        about the risks of not undergoing this procedure. The doctor has explained to me the possible problems related to recovery.<br />
                        शस्त्रक्रियेदरम्यान अचानक उद्भवणारे धोके किंवा गुंतागुंत जसे की हात-पाय बधीर होणे किंवा अपंगत्व येणे, लकवा मारणे, मेंदूमध्ये बिघाड, रक्तस्त्राव होणे, जंतुसंसर्ग होणे, 
                        औषधाची रिअॅक्शन येणे, रक्ताची गुठळी होणे, काही वेळा मृत्यू येणे किंवा तत्सम इतर धोके याबाबत मला विवरण आणि समज देण्यात आलेली आहे. त्याचप्रमाणे डॉक्टरांनी
                        शस्त्रक्रियेनंतर उद्भवू शकणाऱ्या विविध समस्या आणि संपूर्ण बरे होईपर्यंत काय होऊ शकते याबाबत मला समजावून सांगितले आहे.
                    </li>

                    <li>
                        I understand that during the course of procedure or operation, unforeseen conditions may arise which require procedures different 
                        from those planned. I therefore consent to the performance of additional procedures which the above named physician or his/her 
                        associates may consider necessary.<br />
                        मला याचीही जाणीव करून देण्यात आलेली आहे की, ऑपरेशनदरम्यान अचानक उद्भवणाऱ्या परिस्थितीनुसार निश्चित केलेल्या प्रक्रियेपेक्षा इतर प्रक्रिया / ऑपरेशन करण्याची 
                        गरज पडू शकते. त्यामुळे अशा परिस्थितीमध्ये उपरोक्त नमूद केलेल्या शल्य चिकित्सकाला किंवा त्यांच्या सहाय्यकाला अशा प्रकारची प्रक्रिया करण्यास मी संमती देत आहे.
                    </li>

                    <li>
                        I further consent to the administration of such anesthesia as may be considered necessary. I recognize that there are occasional 
                        risks associated with anesthesia and such have been fully explained to me.<br />
                        शस्त्रक्रिया किंवा प्रक्रियेसाठी गरजेच्या असलेल्या भूल प्रकार देण्यास मी संमती देत आहे. भूल देताना क्वचित प्रसंगी उद्भवू शकणाऱ्या धोक्यांबद्दल मला पूर्णपणे समजावून सांगण्यात आलेले आहे.
                    </li>

                    <li>
                        I hereby consent to the procedure being performed on me.<br />
                        उपरोक्त बाबी समजावून घेतल्यानंतर मी माझ्यावर शस्त्रक्रिया करण्याची संमती देत आहे.
                    </li>

                </ol>
            </div>
        </div>
    )
}

export default SurgeryMoreInfo;