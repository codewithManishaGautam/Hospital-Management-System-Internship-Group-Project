import React, { useState } from "react";
import PatientHeaderBar from "./PatientHeaderBar";

const AdmissionConsentEng = () => {
  const [formData, setFormData] = useState({
    relativeName: "",
    language: "",
    interpreter: "",
    checked: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 shadow-md rounded-xl font-sans text-slate-800 my-4 print:border-0 print:shadow-none">
      <PatientHeaderBar />
      <h2 className="text-lg font-bold text-center text-slate-900 border-b pb-2 mb-2">
        ADMISSION CONSENT
      </h2>
      <p className="text-[11px] text-center text-slate-500 font-bold uppercase tracking-wide mb-4">
        AUTHORIZATION FOR INVESTIGATION, PROCEDURE, TREATMENT, RELEASE OF
        INFORMATION AND PAYMENTS
      </p>

      <div className="space-y-3 text-xs leading-relaxed text-justify border p-4 rounded-lg bg-slate-50 shadow-inner h-80 overflow-y-auto mb-4 print:h-auto print:bg-white print:border-0 print:p-0">
        <p>
          I, the undersigned{" "}
          <input
            type="text"
            placeholder="..................................."
            value={formData.relativeName}
            onChange={(e) =>
              setFormData({ ...formData, relativeName: e.target.value })
            }
            className="border-b border-slate-400 bg-transparent px-1 focus:outline-none text-center font-semibold w-64 inline"
          />{" "}
          do hereby give my consent in full sense and sound mind for
          my/patient's admission to <strong>SHRADDHA HOSPITAL AND ICU</strong>.
        </p>
        <p>
          I hereby authorize the hospital medical staff to provide care and
          administer such diagnostic, radiological and/or therapeutic procedures
          as deemed necessary. I authorize any or all persons caring for me to
          release my personal health information to other healthcare providers
          treating me during this hospitalization.
        </p>
        <p>
          I have been explained about the approximate cost of treatment. I
          understand that the final bill depends on the variety of factors like
          days of hospitalization, investigations performed, drugs used, and
          severity of illness. I undertake full responsibility of clearing all
          dues payable to the hospital authorities.
        </p>
        <p>
          All cash, jewelry and other valuable shall be removed by me to a place
          of safety. I shall not hold the hospital authorities responsible for
          any kind of loss.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
        <input
          type="text"
          placeholder="Spoken Language (e.g. Marathi)"
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Interpreter Name"
          value={formData.interpreter}
          onChange={(e) =>
            setFormData({ ...formData, interpreter: e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>

      <label className="flex items-center space-x-2 text-xs font-bold bg-slate-100 p-2.5 border rounded cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={formData.checked}
          onChange={(e) =>
            setFormData({ ...formData, checked: e.target.checked })
          }
          className="w-4 h-4 text-blue-600 rounded"
        />
        <span>
          I have read and fully understood the above English Admission Consent
          terms.
        </span>
      </label>
    </div>
  );
};

export default AdmissionConsentEng;
