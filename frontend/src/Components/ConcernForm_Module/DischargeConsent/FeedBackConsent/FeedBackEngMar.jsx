import React from "react";
import SignaturePad from "../CommonCode/SignaturePad";
import Table_Form from "../CommonCode/Tabel_Form";
import "../CommonCode/FormBasic.css";
import PatientDeclaration from "./PatientDeclaration";


function FeedBackEngMar() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                श्रद्धा हॉस्पिटल, दौंड
            </h2>
            <h4 className="title">
                Consent / संमती
            </h4>
            <Table_Form />
            <div>
                <p className="paragraph">
                    मी / आम्ही असे लिहून देतो की माझे / आमच्या रुग्णाचे उपचार सदर हॉस्पिटलमध्ये योजनेतून मोफत झाले आहेत. मला / आम्हाला उपचाराचा कोणताही खर्च आलेला नाही. 
                    शिवाय औषधे, जेवण, तपासण्या इ. योजनेतून झाल्या आहेत. माझी / आमची कोणतीही तक्रार नाही. रुग्ण घरी सोडताना भाड्यापोटी रक्कम मिळाली आहे. चांगल्या प्रकारे 
                    उपचार झाले आहेत. मी / आम्ही उपचाराबाबत समाधानी आहोत. भविष्यात कोणतीही तक्रार राहणार नाही. उपचाराबाबत गुण द्यायचे झाल्यास १० 
                    पैकी <span><SignaturePad width={80} height={30} design="line"/></span> 
                    एवढे गुण देऊ इच्छितो. समाधान / असमाधान व्यक्त करतो.
                </p>
                <PatientDeclaration/>
            </div>
        </div>
    )
}

export default FeedBackEngMar;