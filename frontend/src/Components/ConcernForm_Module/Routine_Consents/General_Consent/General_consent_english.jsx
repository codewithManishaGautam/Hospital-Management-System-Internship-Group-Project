
import React from "react";
import "./Consent_English.css";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";


function General_consent_english() {

  const handlePrint = () => {
    window.print();
  };



  return (
    <div>

      <button onClick={handlePrint} className="print-btn">
        Print
      </button>

      <div className="consent-form">

        <h2 className="title" >
          Shradha Hospital , Daund
        </h2>

        <h3 className="title">
          General Consent For Admission And IV / IM/ SC Injection
        </h3>

        <Table_Form/>

        {/* Paragraph */}
        <p className="paragraph">
            I / We agree to be admitted as an admitted as an inpatient in SHRADDHA HOSPITAL AND ICU for treatment of my / his / her
            illness. I am knowledgeable the rights and responsibilities of an inpatient. I / my relative agree to undergo medical
            examination, performance of any diagnostic investigations, biopsy as advised by the attending physician, which are required for
            the diagnosis of my / his / her disease during the course of this hospitalization. I / my relative agree to abide by all the rules
            and regulations laid down by the hospital governing my treatment as an inpatient. The cost of treatment / procedure has been explained
            to me as being approximately<span><SignaturePad width={100} height={25} design="line"/></span>
(cost of drugs and food excluded). I also undertake to bear the hospital charges,
            fees, costs and expenses in connection with the hospitalization and treatment of the patient.
        </p>

        <p className="paragraph">
            IM, IV, & SC injections are treatments that deliver medications directly in to a muse or into the tissue under the skin respectively.
            Treatments are typically well tolerated without any adverse reactions. Sometimes a series of injections are recommended for satisfactory
            outcome. Potential side effects include but are not limited to......1-Local skin irritation and bruising. ...2- Swelling and I or Pain at
            the injection sites 3-Infection is very rare but possible even if all standard precautions ( Gloves,alcohol cleansing ) are taken to prevent
            infection....4-Nerve damage from improper injection is also very rare but possible... 5-Allergic reactions :-Potential for anaphylaxis is low,
            however there have been cases where patients have reacted to the medication administered... 6-By signing this document i am agreeing to treatment
            with IM ,IV ./Sub Q injections. I also have been informed of the risks and benefits involved with this treatment ano-understand the potential side
            effects....7 I have been informed the administrators of any allergies, medic. that I am taking and all past negative experiences with food medications
            and previous injections.        
        </p>

        <p className="paragraph">
            I understand english i have been explained all the above points in english by I am ready to accept conditions given in them. i hereby singing below
            without any fear/pressure or in a hurry.

        </p>

        {/* Signature Section */}
        <div className="signature-grid">

          <div>
            <p>Patient Name : <SignaturePad width="250" height="35" design="line"/></p>
            <p>Relative Name : <SignaturePad width="250" height="35" design="line"/></p>
            <p>Nurse Name: <SignaturePad width="250" height="35" design="line"/></p>
          </div>

          <div>
            <p>Patient Signature: <SignaturePad width="250" height="35"/></p>
            <p>Relative Sign: <SignaturePad width="250" height="35"/></p>
            <p>Nurse Sign: <SignaturePad width="250" height="35"/></p>
          </div>

        </div>

        {/* Interpreter */}
        <h4 className="center">
          INTERPRETOR'S UNDERTAKING
        </h4>

        <p className="paragraph">
          I have been explained all the risks to patients and his / her relatives in Marathi / English / Hindi language. I have cleared all the query to them and they are ready to give permission without any pressure.
        </p>

        <div className="signature-grid">
          <div>
            Interpreter's Name : <SignaturePad width="250" height="35" design="line"/>
          </div>

          <div>
            Interpreter's Sign : <SignaturePad width="250" height="35"/>
          </div>
        </div>

        {/* Doctor */}
        <h4 className="center">
          DOCTOR'S UNDERTAKING
        </h4>

        <p className="paragraph">
            I have Certified that personally counselled this patient about the above risks and answered to his / her query. and patient and relatives agreed to all risks.
        </p>


        <div className="signature-grid">
          <div>
            <p>Doctor Name: <SignaturePad width="250" height="35" design="line"/></p>
            <p>Date & Time : <SignaturePad width="250" height="35" design="line"/></p>
          </div>

          <div>
            <p>Doctor Sign : <SignaturePad width="250" height="35"/></p>
            <p>Stamp : <SignaturePad width="250" height="35" design="line"/></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default General_consent_english;