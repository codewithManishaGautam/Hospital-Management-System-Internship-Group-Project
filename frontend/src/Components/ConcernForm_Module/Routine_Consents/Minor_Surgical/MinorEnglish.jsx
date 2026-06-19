import React from "react";
import Table_Form from "../Tabel_Form";
import "./MinorEnglish.css";
import MinorTableEng from "./MinorTableEng";
import SignaturePad from "../SignaturePad";

function MinorEnglish() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h3 className="title">
                Consent for Minor Surgical Procedure
            </h3>
            <Table_Form />
            <p className="paragraph">
                I (or my authorized representative, i.e., parent guardian),<span><SignaturePad width="300px" height="30px" design="line" /></span>,
                consent to the medical/surgical procedures outlined below to be performed by   <span><SignaturePad width="300px" height="30px" design="line" /></span>   and his/her
                staff, associates, or assistants to whom the physician(s) performing the procedure may assign designated responsibilities.
                In the event one or more of the physicians is unable to perform or complete the procedure, a qualified substitute physician
                will perform or complete the procedure. The procedure has been explained to me in terms that I understand. The explanation included:
            </p>
            <ol>
                <li>
                    The nature and extent of the procedure to be performed.
                </li>

                <li>
                    General risks which may include pain, scarring, bleeding and infection.
                </li>

                <li>
                    The benefits of the procedure.
                </li>

                <li>
                    The estimated period of incapacity or convalescence, if any.
                </li>

                <li>
                    The risks and benefits of any reasonable alternatives to this procedure including having no treatment at all.
                </li>
            </ol>
            <p className="paragraph">
                I was given the opportunity to ask any questions I have regarding the procedure
                and I have had those questions answered to my satisfaction. I understand that I have
                the right to refuse any medical/surgical treatment recommended at any time prior to its
                performance. I authorize my physician to perform such additional procedures which in his/her
                judgment are incidentally necessary or appropriate to carry out my diagnosis/treatment. If any
                unforeseen condition arises during this procedure which requires transportation to a hospital,
                additional procedures, operation or medication including anesthesia and blood transfusions, I
                further request and authorize my physician to do whatever he/she deems advisable on my behalf.
                I understand the administration of sedative analgesia / Anesthesia is recommended. I have been
                explained about Complications with sedative analgesia / Anesthesia . I acknowledge that I have
                read (or had read to me) and fully understand the above information. Furthermore, I certify that
                all my questions and concerns regarding the procedure, its attendant risks, benefits and alternatives
                have been explained to my satisfaction. I hereby authorize my physician to perform the procedure. For
                the purpose of medical education, I consent to admission of observers in the operating room. I consent
                to photographing or video recording or any other form of publication of the procedure including appropriate
                recordings for medical, scientific, or educational purposes without revealing my identity. I give my permission
                to have any tissue(s) removed during the procedure be sent for for Pathologic examination and/or research purpose.
            </p>

            <MinorTableEng/>


         
        </div>
    )
}

export default MinorEnglish;