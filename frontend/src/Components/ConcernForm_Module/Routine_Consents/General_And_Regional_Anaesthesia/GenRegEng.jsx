import React from "react";
import SignaturePad from "../SignaturePad";
import Table_Form from "../Tabel_Form";
import "../Minor_Surgical/MinorEnglish.css"

function GenRegEng() {
    return (
        <div className="consent-form">
            <h2 className="title">
                Shradha Hospital,Daund
            </h2>
            <h4 className="title">
                CONSENT FORM FOR GENERAL ANAESTHESIA + REGIONAL ANAESTHESIA
            </h4>
            <Table_Form />


            <p className="paragraph">
                General anaesthesia involves rendering a patient unconscious before an operation.
                This ensures the patient is not aware of events and does not feel pain during the operation.
                It is produced by drugs given through a vein and/ or breathed from an anaesthesia Machine.
                Regional anaesthesia involves using a local anaesthetic to numb a specific area of the body
                for surgery. Prolonged pain relief without numbness can be achieved by infusing weak solutions
                of local anaesthetics and narcotic drugs to particular parts of the body after surgery or injury.
            </p>
            <b>RISKS</b> <br /><br />

            <p> 
                Common Risks for ALL Patinets includes:
            </p>

            <ul className="paragraph">
                <li>
                    Bruising at the site of injections or drips.
                </li>

                <li>
                    Nausea or vomiting (although the anesthetist will limit or prevent this as far as possible).
                </li>

                <li>
                    Sore throat from the gases and / or the breathing tube.
                    You may notice temporary difficulty in speaking.
                    This should improve after some hours.
                </li>

                <li>
                    Temporary muscle pains.
                </li>

                <li>
                    Temporary headache or blurred vision.
                </li>

            </ul>

            <b>Uncommon risks for ALL patients include :</b><br />

            <ul>

  <li>
    Awareness of activity in the operating room during anesthesia,
    particularly during certain operations and in some emergency situations.
  </li>

  <li>
    Eye abrasions causing pain and requiring treatment with medication and patching.
  </li>

  <li>
    Damage to teeth or dental work, lips or tongue.
  </li>

</ul>
<b>Extremely rare risks for ALL patients. These may cause brain damage or death and include :</b><br /><br />
<ul>

  <li>
    Obstructions in the breathing passage that cannot be readily controlled.
    These can lead to severe difficulty with breathing.
  </li>

  <li>
    Allergy to drugs causing wheezing and rash and, in rare cases,
    severe swelling, low blood pressure and poor circulation.
  </li>

  <li>
    Inherited muscle sensitivity to particular anesthetic drugs
    (malignant hyperthermia). This can cause a rapid rise in
    temperature, heart rate and breathing with high blood pressure
    and muscle rigidity.
  </li>

  <li>
    Heart attacks, strokes and pneumonia.
    While these are uncommon, the risks are higher for patients
    with diseases of the arteries or lungs and in smokers.
    Regional anesthesia has some of the risks listed above and
    several other risks or consequences.
  </li>

  <li>
    Muscle weakness in the anaesthetized limb, or difficulty
    passing urine for a lower body block while the anesthetic
    is working. While this returns to normal as the drug effects
    wear off, a temporary urinary catheter may be necessary.
  </li>

  <li>
    Headache, which is usually short-lived but can be severe
    and last for some days.
  </li>

  <li>
    Damage to nearby blood vessels or organs, e.g. lungs.
  </li>

  <li>
    Backache may follow spinal or epidural anesthesia.
    This usually improves quickly, but occasionally can be lasting.
  </li>

  <li>
    There is a very small risk of infection or bleeding
    at the injection site, which may require antibiotic
    or surgical treatment.
  </li>

  <li>
    Rarely, nerves may be damaged resulting in long-term weakness,
    pain, altered sensation or paralysis.
  </li>

</ul>
<p>
    Types of Anaesthesia : <span><SignaturePad width={180} height={80} design="none" /></span>
    Indication for Anaesthesia : <span><SignaturePad width={180} height={80} design="none" /></span>
</p>

<p>
    INDIVIDUAL RISKS (to be completed by the anesthetis completing this form) 
    The following are examples of possible risks and complications specific to this patient :
    <span><SignaturePad width={700} height={35} design="line" /></span>
    <span><SignaturePad width={700} height={35} design="line" /></span>

</p>

<b><u>Location and circumstances of obtaining this patient's consent for anaesthesia :</u></b><br /><br />
<label>
    DECLARATION BY PATIENT/ GUARDIAN/ PROXY
</label>
<br /><br />

<ul>

  <li>
    I acknowledge that the anesthetist has informed me about
    the anesthetic procedure, alternative treatments, and has
    answered my specific queries and concerns regarding this matter.
  </li>

  <li>
    I acknowledge that I have discussed with the anesthetist
    the significant risks and complications specific to my
    individual circumstances, which I have considered in deciding
    to undergo general anesthesia.
  </li>

  <li>
    I understand that an anesthetist other than the consultant
    anesthetist may administer the anesthesia.
  </li>

</ul>

<label >
    Signature of patient :    <span><SignaturePad width={250} height={45} design="border" /></span>
    Date :    <span><SignaturePad width={200} height={35} design="border" /></span>
</label>
<br /><br />

<label >
    Name : <span><SignaturePad width={400} height={35} design="line" /></span>
</label>
<br /><br />

<label >
    Signature of the person <br />consenting if not the patient :  <span><SignaturePad width={250} height={45} design="border" /></span>
    Date :    <span><SignaturePad width={200} height={35} design="border" /></span>
</label>
<br /><br />

<label >
    Name : <span><SignaturePad width={250} height={35} design="line" /></span>
    Relationship to patient :  <span><SignaturePad width={200} height={35} design="line" /></span>
</label>
<br /><br />

<label >
    Name of The Nurse : : <span><SignaturePad width={300} height={35} design="line" /></span>
    sign :  <span><SignaturePad width={200} height={35} design="border" /></span>
</label>
<br /><br />
<b>DECLARATION BY THE ANAESTHETIST PROVIDING INFORMATION FOR THIS CONSENT</b><br /><br />
<ul>

  <li>
    I declare that I have explained the nature of general and / or
    regional anesthesia to be given and discussed the risks that
    particularly concern this patient.
  </li>

  <li>
    I have given the patient an opportunity to ask questions
    and I have answered these.
  </li>

</ul>
<br /><br />
<label >
    Date :    <span><SignaturePad width={200} height={35} design="border" /></span>
</label>
<br /><br />

<label >
    Anaesthetist Name :  <span><SignaturePad width={250} height={35} design="line" /></span>
    Anaesthetist Signature :  <span><SignaturePad width={150} height={45} design="border" /></span>
</label>


        </div>
    );
}

export default GenRegEng;




