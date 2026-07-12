import React from "react";

const SedationFormEnglish = () => {
  return (
    <div className="container border p-4">
      <h4 className="text-center fw-bold">
        CONSENT FORM FOR SEDATION DURING PROCEDURE
      </h4>

      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <td>Patient Name</td>
            <td></td>
            <td>Gender / Age</td>
            <td></td>
          </tr>

          <tr>
            <td>Diagnosis</td>
            <td colSpan="3"></td>
          </tr>

          <tr>
            <td>Name of Procedure</td>
            <td colSpan="3"></td>
          </tr>

          <tr>
            <td>Attending Anaesthesiologist</td>
            <td></td>
            <td>Attending Consultant</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p>
        Procedures are required to resolve the patient's current medical
        problems. During some procedures appropriate sedation is needed to
        reduce pain, fear and provide comfort and safer physical condition
        during procedure.
      </p>

      <h6 className="fw-bold">Sedation</h6>
      <p>
        It is a technique that makes the patient feel more pleasantly or less
        anxious during the treatment process / procedure.
      </p>

      <h6 className="fw-bold">Sedatives</h6>
      <p>Drugs helping to get sleep, relax and make patient feel very calm.</p>

      <h6 className="fw-bold">Types</h6>

      <ul>
        <li>
          <b>Minimal Sedation</b> – Relaxed but awake and able to answer
          questions.
        </li>

        <li>
          <b>Moderate Sedation</b> – Likely sleep through procedure but easily
          awakened.
        </li>

        <li>
          <b>Deep Sedation</b> – Sleep through entire procedure and may not
          remember procedure.
        </li>
      </ul>

      <h6 className="fw-bold">Risks with Sedation Anaesthesia</h6>

      <ul>
        <li>Prolonged drowsiness</li>
        <li>Vomiting</li>
        <li>Motor imbalance</li>
        <li>Airway obstruction</li>
        <li>Hypoventilation</li>
        <li>Hypoxia</li>
        <li>Hypotension</li>
      </ul>

      <h5 className="text-center mt-4">DECLARATION BY PATIENT / GUARDIAN</h5>

      <div className="border p-3">
        I acknowledge that the Anaesthesiologist has explained sedation,
        procedure, risks, alternatives and emergency treatment plans. I have
        been given enough time to read and understand this consent and all my
        questions have been answered to my satisfaction.
      </div>

      <div className="row mt-5">
        <div className="col-6">
          Patient / Relative Signature
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>

        <div className="col-6">
          Doctor Signature
          <div style={{ borderBottom: "1px solid black", height: 50 }}></div>
        </div>
      </div>
    </div>
  );
};

export default SedationFormEnglish;
