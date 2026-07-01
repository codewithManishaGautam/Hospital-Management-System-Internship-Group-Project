import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import DeclarationInfo from "./DeclarationInfo";
import StampUpload from "../CommonCode/StampUpload";
import Stamp from "../../../../assets/stamp.png";


function ConsentFormMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना <br />
                महात्मा ज्योतिराव फुले जन आरोग्य योजना
            </h4>

            <Table_Form />
            <div>
                <p >
                    <b>संमती पत्र (योजना)</b>
                    <ol className="paragraph" >
                        <li>
                            एकत्रित आयुष्यमान भारत प्रधानमंत्री जन आरोग्य योजना व महात्मा ज्योतिबा फुले जन आरोग्य योजना या रुग्णालयामध्ये <b><u>उपलब्ध आहे</u></b>.
                        </li>

                        <li>
                            एकत्रित आयुष्यमान भारत प्रधानमंत्री जन आरोग्य योजना व महात्मा ज्योतिबा फुले जन आरोग्य योजनेचा लाभ घेण्यासाठी आयुष्यमान
                            भारत प्रधानमंत्री जन आरोग्य योजना <b><u>गोल्डन कार्ड व पिवळी शिधापत्रिका, केशरी शिधापत्रिका, अन्नपूर्णा कार्ड, अंत्योदय कार्ड
                                अथवा शुभ्रशिधापत्रिका धारक कुटुंब (वैश्विक कोरोना महामारीच्या काळापुरते मर्यादित)</u></b> यापैकी कुठलेही एक असणे आवश्यक आहे.
                        </li>

                        <li>
                            याचबरोबर रुग्णाचे शासन मान्य ओळखपत्र जसे मतदान कार्ड, आधार कार्ड, पॅन कार्ड इत्यादींपैकी कुठलेही एक अथवा
                            तलाठी/ग्रामसेवक यांची स्वाक्षरी व शिक्का असलेले रुग्णाच्या फोटोसहित रहिवासी ओळखपत्र असणे आवश्यक आहे.
                        </li>

                        <li>
                            आयुष्यमान भारत प्रधानमंत्री जन आरोग्य योजनेअंतर्गत एकूण <b>१२०९</b> व महात्मा ज्योतिबा फुले जन आरोग्य
                            योजनेअंतर्गत <b>९९६</b> उपचार पद्धतींचा समावेश असून आपला आजार या योजनेमध्ये समाविष्ट असल्यास रुग्णास पूर्ण उपचार मोफत करण्यात येतील.
                        </li>

                        <li>
                            <b>१२०९/९९६</b> उपचार पद्धतींपैकी <b>१३४/३७</b> उपचार हे केवळ शासकीय/सरकारी रुग्णालयांसाठी राखीव आहेत.
                        </li>

                        <li>
                            <b>वैश्विक कोरोना महामारीच्या पार्श्वभूमीवर शासनाने राज्यातील सर्व शिधापत्रिका धारक कुटुंबांना खासगी रुग्णालयांमध्ये ६७ CGHS
                                उपचार योजनेअंतर्गत सुविधा उपलब्ध करून दिल्या आहेत.</b>
                        </li>

                        <li>
                            एकत्रित आयुष्यमान भारत प्रधानमंत्री जन आरोग्य योजना व महात्मा ज्योतिबा फुले जन आरोग्य योजनेतील <b>१२०९/९९६</b> उपचार
                            पद्धतींमध्ये रुग्णाचे उपचार बसत नसतील किंवा संबंधित तज्ज्ञ सुविधेस रुग्णालयाला
                            योजनेतर्फे मान्यता मिळाली नसेल तर रुग्णास योजनेचा लाभ मिळणार नाही याची नोंद घ्यावी.
                        </li>

                        <li>
                            योजनेअंतर्गत रुग्ण भरती असल्यास त्यास योजनेत समाविष्ट आजारासंबंधी तपासण्या तसेच शस्त्रक्रिया व औषधोपचार, भोजन अथवा परक आहार या बाबी मोफत मिळतात व एकवेळचा
                            परतीचा प्रवास भत्ता देखील दिला जातो. या सर्व सुविधांसंबंधी चौकशीसाठी रुग्ण व संबंधितांनी <b><u>योजनेचे आरोग्य मित्र अथवा रुग्णालयातील वैद्यकीय समन्वयक</u></b> यांच्याशी त्वरित संपर्क साधावा.
                        </li>
                        <br />
                        <strong>
                            वरील सर्व माहिती आम्हाला समजली असून योजनेअंतर्गत लाभ घेण्यासाठी आवश्यक असलेल्या सर्व कागदपत्रांची पूर्तता आम्ही करू. त्यानंतरच आमच्या रुग्णाचे योजनेअंतर्गत उपचार सुरू राहतील याची पूर्ण माहिती रुग्णालयामार्फत आम्हाला देण्यात आलेली आहे.
                            अतिआवश्यक परिस्थितीत तातडीने उपचार देता येऊ शकतात व ठराविक मुदतीत संबंधित कागदपत्रांची पूर्तता करण्याची संपूर्ण जबाबदारी आमची राहील याची आम्हाला पूर्ण कल्पना आहे.
                        </strong>
                    </ol>
                </p>
                <DeclarationInfo />
                <hr style={{
                    width: "100%",
                    border: "0",
                    borderTop: "3px solid black"
                }} />

                <div>
                    <strong>
                        For Hospital : <br /> <span><SignaturePad width={700} height={30} design="line" /></span>
                    </strong>
                    <label >
                        Diagnosis : <br /> <span><SignaturePad width={700} height={30} design="line" /></span>
                    </label>
                    <label >
                        Procedure Required : <br /> <span><SignaturePad width={700} height={30} design="line" /></span>
                    </label>

                    <hr style={{
                        width: "100%",
                        border: "0",
                        borderTop: "3px solid black"
                    }} />
                    <div style={{ flexDirection: "column" }}>
                        <p className="paragraph">
                            Hospital (MD/CEO/MCO) Remark with reason (If not covered):
                            <br /> <span><SignaturePad width={700} height={30} design="line" /></span>
                        </p>
                        <br />
                        <img
                            src={Stamp}
                            width="100"
                            height="100"
                            alt="Stamp"
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={Stamp}
                                    width="100"
                                    height="100"
                                    alt="Stamp"
                                />

                                <p
                                    className="paragraph"
                                    style={{ textAlign: "center", marginTop: "5px" }}
                                >
                                    Sign stamp of Network Hospital (MD/CEO/MCO)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default ConsentFormMar;