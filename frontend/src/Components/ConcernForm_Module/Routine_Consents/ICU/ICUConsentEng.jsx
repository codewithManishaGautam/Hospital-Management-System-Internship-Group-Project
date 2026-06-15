import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"
import "./Declaration.css";
import Stamp from "../../../../assets/stampeng.jpg";
import DeclarationFooter from "./DeclarationFooter";

function ICUConsentEng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                ICU ADMISSION CONSENT
            </h4>
            <Table_Form />
            <p>I <span><SignaturePad width={750} height={30} design="line" /></span></p>

            <label >
                Relative to patient : <span><SignaturePad width={300} height={30} design="line" /></span>
            </label>

            <p className="paragraph">
                Have been explained in the language which is i understand the need and purpose for
                the patient to be admitted in ICU which is as follows : <br />
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
            </p>
            <br />

            <p className="paragraph">
                Also the risk associated with it has been explained to me : <br />
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
                <span><SignaturePad width={750} height={30} design="line" /></span>
            </p>

            <p className="paragraph">
                I hereby give consent to treat my patient in ICU.
            </p>

              <DeclarationFooter
                dateLabel="Date :"
                timeLabel="Time :"
                patientNameLabel="Patient Name :"
                patientSignLabel="Signature :"
                relativeTitle="Relatives"
                relativeName="Name"
                relativeSign="Signature"
                relationLabel="Relation to the Patient :"
                doctorNameLabel="Doctor Name :"
                doctorSignLabel="Doctor Signature :"
                stampLabel="Stamp :"
                Stamp={Stamp}
              />






        </div>
    );
}

export default ICUConsentEng;
