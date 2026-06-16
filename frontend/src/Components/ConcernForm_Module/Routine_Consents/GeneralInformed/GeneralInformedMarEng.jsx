import React from "react";
import SignaturePad from "../SignaturePad";
import FormChart from "../Common_Code/FormChart";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css";


function GeneralInformedMarEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                GENERAL INFORMED CONSENT FORM
            </h4>
            <p className="title">
                For Authorization of Medical Treatment, Administration of Anesthesia, Performance of Surgery or any Procedure,
                Diagnostic/Therapeutic Procedures or any Investigations
            </p>

            <Table_Form />
            <div>
                <b>Diagnosis : </b> <span><SignaturePad width={700} height={40} design="border"/></span>
                <br /><br />

                <ol>
                    <li>
                        I hereby authorize the hospital and those whom the hospital recognizes as “Hospital Staff” to perform upon me medical treatment, administration of anesthesia, surgery, diagnostic/therapeutic procedures, investigations, or any other procedures required by my treating consultant.
                        <br />
                        मी वरील हॉस्पिटल आणि हॉस्पिटलतर्फे नियुक्त करण्यात आलेल्या कर्मचाऱ्यांना माझ्यावर / माझ्या रुग्णावर उपचारासाठी कोणत्याही प्रकारचे भूल देणे, शस्त्रक्रिया करणे, तपासण्या करणे किंवा माझे डॉक्टर सुचवतील त्या इतर आवश्यक प्रक्रिया करण्याची संमती देत आहे.
                    </li>
                    <br />

                    <li>
                        It has been explained to me that during the course of operation or procedures, unforeseen conditions may arise which may require additional or different surgical or emergency procedures.
                        <br />
                        शस्त्रक्रिया / उपचारादरम्यान उद्भवू शकणाऱ्या आपत्कालीन परिस्थितीबाबत मला सविस्तर माहिती देण्यात आली आहे. अशा परिस्थितीत पूर्वनियोजित प्रक्रियेपेक्षा वेगळी किंवा अतिरिक्त शस्त्रक्रिया / उपचार करावे लागू शकतात याची मला कल्पना देण्यात आली आहे.
                    </li>
                    <br />

                    <li>
                        I consent to the administration of anesthesia and such anesthetics as may be required or desirable.
                        <br />
                        मी माझ्यावर ठरविण्यात आलेल्या उपचारांसाठी आवश्यक असलेली भूल तसेच इतर गरजेच्या प्रक्रियांना संमती देत आहे.
                    </li>
                    <br />

                    <li>
                        I state that I will not hide my past medical history, allergies, drug reactions, or any adverse medical events from my consultant.
                        <br />
                        मी खात्री देतो की, माझा / माझ्या रुग्णाचा वैद्यकीय इतिहास, अॅलर्जी, औषधांवरील प्रतिक्रिया किंवा पूर्वी घडलेल्या वैद्यकीय गुंतागुंतींबाबतची संपूर्ण माहिती मी डॉक्टरांना देईन.
                    </li>
                    <br />

                    <li>
                        I have been explained the purpose, nature, alternative methods, prognosis, and possible complications of the proposed procedure.
                        <br />
                        मला शस्त्रक्रियेचा प्रकार, उद्देश, पद्धत, उपलब्ध पर्यायी उपचार, उपचारांचे फायदे, धोके आणि संभाव्य गुंतागुंत याबाबत सविस्तर माहिती देण्यात आली आहे.
                    </li>
                    <br />

                    <li>
                        I further consent to the administration of drugs, infusions, plasma, blood transfusions, or any other procedure deemed necessary.
                        <br />
                        मी संपूर्ण माहिती जाणून औषधे, रक्त, प्लाझ्मा, रक्तसंक्रमण (Blood Transfusion) किंवा इतर आवश्यक प्रक्रिया करण्यास संमती देत आहे.
                    </li>
                    <br />

                    <li>
                        I have been given an opportunity to ask questions and seek a second opinion.
                        <br />
                        शस्त्रक्रिया / उपचारासंबंधी प्रश्न विचारण्याची तसेच दुसरे वैद्यकीय मत (Second Opinion) घेण्याची पूर्ण संधी मला देण्यात आली आहे.
                    </li>
                    <br />

                    <li>
                        I acknowledge that no guarantee or promise has been made concerning the result of any procedure or treatment.
                        <br />
                        शस्त्रक्रिया किंवा उपचारांच्या परिणामांबाबत कोणतीही हमी देता येत नाही याची मला पूर्ण जाणीव करून देण्यात आली आहे.
                    </li>
                    <br />

                    <li>
                        I consent to photographing or recording of the operation or procedures for medical, scientific, or educational purposes, provided my identity is not revealed.
                        <br />
                        माझी ओळख गुप्त ठेवण्याच्या अटीवर वैद्यकीय, वैज्ञानिक किंवा शैक्षणिक कारणांसाठी माझ्या शस्त्रक्रियेचे / उपचारांचे छायाचित्रण किंवा चित्रीकरण करण्यास मी संमती देत आहे.
                    </li>
                    <br />

                    <li>
                        For the purpose of advanced medical education, I consent to the attendance of observers in the operating room.
                        <br />
                        वैद्यकीय शिक्षणाच्या उद्देशाने माझ्या शस्त्रक्रिया / उपचारादरम्यान निरीक्षकांना उपस्थित राहण्याची परवानगी मी देत आहे.
                    </li>
                    <br />

                    <li>
                        I consent to the disposal by hospital authorities of any tissues or body parts removed during the procedure or treatment.
                        <br />
                        शस्त्रक्रियेच्या दरम्यान काढण्यात आलेले ऊतक (Tissue), अवयव किंवा शरीराचे भाग यांची योग्य विल्हेवाट लावण्याची परवानगी मी रुग्णालयास देत आहे.
                    </li>
                    <br />

                    <li>
                        I certify that the contents of this consent form have been read and explained to me in a language I understand and that I fully understand its implications.
                        <br />
                        मी प्रमाणित करतो की, या संमतीपत्रातील मजकूर मला समजणाऱ्या भाषेत वाचून व समजावून सांगण्यात आला आहे. या संमतीपत्राचे परिणाम मला पूर्णपणे समजले असून मी त्यास संमती देत आहे.
                    </li>
                    <br />

                    <li>
                        I understand that all papers related to my treatment will remain in the safe custody of the hospital, and I may obtain a summary or attested photocopy when required.
                        <br />
                        माझ्या उपचारांशी संबंधित सर्व कागदपत्रे रुग्णालयाच्या सुरक्षित ताब्यात ठेवली जातील, याची मला जाणीव आहे. आवश्यकतेनुसार मला त्यांचा सारांश अथवा प्रमाणित छायांकित प्रत (Attested Photocopy) मिळू शकते यास मी संमती देत आहे.
                    </li>
                    <br />
                </ol>
                <FormChart showInterpreterDeclaration={false}  showOtherDeclaration={false}/>
            </div>
        </div>
    )
}

export default GeneralInformedMarEng;