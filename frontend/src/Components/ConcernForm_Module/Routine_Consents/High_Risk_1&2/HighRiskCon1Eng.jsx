import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"

function HighRiskCon1Eng() {
    return (
        <div className="consent-form">
            <h2 className="title" >
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                High Risk Consent
            </h4>
            <b style={{marginLeft:"100px"}}>(To be filled by the patient after the treating doctor has explained the consequences in detail)</b><br />
            <Table_Form/>
            <label >Diagnosis : <span><SignaturePad width={700} height={40} design="border"/></span></label>
            <b>
                I acknowledge below mentioned facts explained to me by my Doctor :
            </b>
            <ul>

  <li>
    My / my patient’s medical condition, prognosis, the necessary
    proposed treatment / procedure, expected outcome of treatment,
    and all possible risks, consequences, and complications
    have been explained to me.
  </li>

  <li>
    In view of my / my patient’s general condition and
    co-morbidities / medical illnesses such as diabetes mellitus,
    hypertension, Ischemic Heart Disease, Bronchial Asthma or others
    (specify)<span><SignaturePad width={700} height={30} design="line"/></span>
    <span><SignaturePad width={700} height={30} design="line"/></span>,
    I / my patient carries a high risk.
  </li>

  <li>
    I understand the poor guarded prognosis, the possible need for
    aggressive treatment and care in the Intensive Care Unit (ICU),
    and the possible requirement of artificial ventilation.
  </li>

  <li>
    Possible major and minor complications such as renal failure,
    multi organ failure, cardiac arrest, cardiac failure,
    lung atelectasis, deep vein thrombosis, pulmonary embolism,
    urinary tract infection, lung infection, wound infection,
    and septicaemia have been explained to me.
  </li>

</ul>
<b>
    I also state that
</b>
<ul>

  <li>
    I have been given enough time to read, review and understand
    the information mentioned in this consent.
  </li>

  <li>
    I have also been given an opportunity to ask questions and
    raise concerns with the doctor regarding my / my patient’s
    condition, unfamiliar terminologies used, risks and consequences
    of refusal of examination / treatment, which I have understood clearly.
    My questions and concerns have been discussed and answered
    to my satisfaction.
  </li>

  <li>
    Even though the treatment is being provided with all due care,
    judgment, skill and professional expertise, no guarantee has
    been given regarding the outcome of the treatment.
  </li>

  <li>
    All the above points have been explained to me in a language
    that I understand.
  </li>

  <li>
    I accept the risk of substantial and serious harm, including
    mild / moderate / high risk to life (death), as explained to me
    and my relatives, in the hope of obtaining the desired benefits
    from the treatment.
  </li>

  <li>
    I / We have signed this consent voluntarily, in sound mind and
    body, without any pressure, for the treatment considered
    necessary / advisable for the patient.
  </li>

</ul>
<p>
    I confirm that I have accurately interpreted the contents of this form 
    and the related conversations between the patient and the doctor.
</p>

<label >
    Name of Patient/Family Member : <span><SignaturePad width={270} height={30} design="line"/></span> Sign: <span><SignaturePad width={160} height={40} design="border"/></span>
</label>
<br />
<label >
    Name of The Interpreter : <span><SignaturePad width={320} height={30} design="line"/></span> Sign: <span><SignaturePad width={160} height={40} design="border"/></span>
</label>
<br />

<label >
   Name of The Doctor/Consultant : <span><SignaturePad width={275} height={30} design="line"/></span> Sign: <span><SignaturePad width={160} height={40} design="border"/></span>
</label>
<br />

<label >
   Date : <span><SignaturePad width={200} height={30} design="line"/></span><br />
   Time : <span><SignaturePad width={200} height={40} design="border"/></span>
</label>
        </div>
        );
    }

export default HighRiskCon1Eng;
