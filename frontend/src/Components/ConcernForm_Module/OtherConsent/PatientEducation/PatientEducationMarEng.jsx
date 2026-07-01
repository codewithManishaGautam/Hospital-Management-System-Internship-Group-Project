import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import PatientEducation1HeaderDeclaration from "./PatientEducation1HeaderDeclaration";
import PatientDeclaration from "./PatientDeclaration";

function PatientEducationMarEng() {


    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital, Daund
            </h2>
            <h4 className="title">
                Patient Education (Page 1)
            </h4>

            <Table_Form />
            <div>
                <PatientEducation1HeaderDeclaration />

                <p className="paragraph">
                    मला वरील सर्व बाबींची माहिती माझ्या भाषेमध्ये समजावून सांगण्यात आली आहे व ती मला पूर्णपणे समजली आहे.
                    <br />
                    The above information has been explained to me in my language, and I have understood it completely in all aspects.
                </p>

                <PatientDeclaration
                    patientName="Patient Name"
                    anotherName="Doctor Name"
                    sign="Signature"
                    showDate={false}
                />
                <br />

                <p className="paragraph">
                    आरोग्य सेवेशी निगडित जंतुसंसर्गाबाबत माहिती :-
                    <br />
                    Information about Infection in Medical Field :-
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                </p>


                <p className="paragraph">
                    मला वरील सर्व बाबींची माहिती माझ्या भाषेमध्ये समजावून सांगण्यात आली आहे व ती मला पूर्णपणे समजली आहे.
                    <br />
                    The above information has been explained to me in my language, and I have understood it in all aspects.
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                </p>

                <PatientDeclaration
                    patientName="Patient Name"
                    anotherName="Name of I.C.N"
                    sign="Signature"
                    showDate={true}
                />

                <br /><br />

                <h4 className="title">
                    Patient Education (Page 2)
                </h4>

                <br />

                <p className="paragraph">
                    लसीकरणासंदर्भातील माहिती :-
                    <br />
                    Information about Vaccination :-
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                </p>

                <p className="paragraph">
                    मला वरील सर्व बाबींची माहिती माझ्या भाषेमध्ये समजावून सांगण्यात आली आहे व ती मला पूर्णपणे समजली आहे.
                    <br />
                    The above information has been explained to me in my language, and I have understood it in all aspects.
                </p>
                <br />

                <PatientDeclaration
                    patientName="Patient Name"
                    anotherName="Doctor Name"
                    sign="Signature"
                    showDate={false}
                />

                <p className="paragraph">
                    आहार व पोषणाबाबत रुग्णाला माहिती :-
                    <br />
                    Information about Diet and Nutrition :-
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                </p>

                <p className="paragraph">
                    मला वरील सर्व बाबींची माहिती माझ्या भाषेमध्ये समजावून सांगण्यात आली आहे व ती मला पूर्णपणे समजली आहे.
                    <br />
                    The above information has been explained to me in my language, and I have understood it in all aspects.
                </p>
                <br />
                <PatientDeclaration
                    patientName="Patient Name"
                    anotherName="Dietician's Name"
                    sign="Signature"
                    showDate={false}
                />
                <br />


                <p className="paragraph">
                    डिस्चार्ज प्रक्रियेदरम्यान :- <br />
                    १. सुरक्षित व प्रभावी औषधोपचार <br />
                    २. आहार, औषधे व औषधांच्या परिणामांबाबत दिलेली माहिती
                    <br />
                    Information about Discharge Procedure :- <br />
                    1. Safe & Effective Treatment <br />
                    2. Diet, Medicines & Effects of Medicines
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                    <SignaturePad width={700} height={30} design="line" />
                </p>

                <p className="paragraph">
                    मला वरील सर्व बाबींची माहिती माझ्या भाषेमध्ये समजावून सांगण्यात आली आहे व ती मला पूर्णपणे समजली आहे.
                    <br />
                    The above information has been explained to me in my language, and I have understood it in all aspects.
                </p>
                <br />
                <PatientDeclaration
                    patientName="Patient Name"
                    anotherName="Doctor Name"
                    sign="Signature"
                    showDate={false}
                />








            </div>
        </div>
    )
}

export default PatientEducationMarEng;