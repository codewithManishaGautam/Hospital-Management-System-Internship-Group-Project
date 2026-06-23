import React from "react";
import PatientHeaderBar from "./PatientHeaderBar";

const DAMAConsentEng = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-300 font-sans text-slate-900 shadow-sm my-4">
      <h2 className="text-sm font-bold text-center underline uppercase mb-4">
        Consent for Discharge / Leaving Against Medical Advice
      </h2>
      <div className="text-right text-xs font-bold mb-4">
        Date: __________________
      </div>

      <PatientHeaderBar />

      <div className="text-xs space-y-4 mb-6">
        <div>
          <strong className="block mb-2">
            Diagnosis :
            _________________________________________________________________________________
          </strong>
        </div>

        <p className="font-bold">
          I acknowledge below mentioned facts which doctor has explained to me;
        </p>
        <ul className="list-disc pl-6 space-y-2 text-justify">
          <li>
            My/my patient's medical condition, prognosis and the necessary
            proposed treatment / procedure.
          </li>
          <li>
            All possible risk, consequences & complications for not undergoing /
            discontinuing treatment and leaving hospital against medical advice
            of the attending physician & hospital administration (DAMA /LAMA)
          </li>
        </ul>

        <p className="font-bold">I also state that</p>
        <ul className="list-disc pl-6 space-y-2 text-justify">
          <li>
            I have been given enough time to read, review & understand the
            information in this consent.
          </li>
          <li>
            I also have been given chance to ask questions and raise concerns
            with the doctor about my /my patient's condition, unfamiliar
            terminologies used, risk and consequences of LAMA which I understood
            clearly. My questions and concerns have been discussed and answered
            to my satisfaction.
          </li>
          <li>
            I understand that this decision may jeopardize my/ my relative's
            health and life.
          </li>
          <li>
            I hereby release the attending physician & hospital administration
            from all liabilities for any ill effect which may result from such
            discharge from hospital.
          </li>
          <li>
            I have been explained for all the above points in the language that
            I understand.
          </li>
          <li>
            I / we signed this consent voluntarily in sound health & body
            without under any pressure.
          </li>
        </ul>

        <p className="pt-2">
          I confirm that I have accurately interpreted the contents of this form
          and the related conversations between the patient and the doctor.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs font-medium pt-4 mb-8">
        <div>Date : __________________</div>
        <div>Time : __________________</div>
      </div>

      <div className="mt-8 space-y-3 text-xs border-t pt-4">
        <div className="flex justify-between">
          <div>
            Name of Patient/Family Member (Relation) :
            ___________________________
          </div>
          <div>Sign : ___________________</div>
        </div>
        <div className="flex justify-between">
          <div>
            Name of The Interpreter : <strong>Dr.KAPIL DESHMUKH</strong>
          </div>
          <div>Sign : ___________________</div>
        </div>
        <div className="flex justify-between">
          <div>
            Name of The Doctor / Consultant : <strong>Dr.KAPIL DESHMUKH</strong>
          </div>
          <div>Sign : ___________________</div>
        </div>
      </div>
    </div>
  );
};

export default DAMAConsentEng;
