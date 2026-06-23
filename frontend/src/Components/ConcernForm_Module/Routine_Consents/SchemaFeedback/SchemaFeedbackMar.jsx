import React from "react";
import PatientHeaderBar from "./PatientHeaderBar";

const SchemeFeedbackMar = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-300 font-sans text-slate-900 shadow-sm my-4">
      <h2 className="text-base font-bold text-center underline tracking-wide mb-4">
        Consent / संमती
      </h2>

      <PatientHeaderBar />

      <div className="text-xs text-justify leading-loose space-y-6 mt-6">
        <p>
          मी / आम्ही असे लिहून देतो कि माझे / आमच्या रुग्णाचे उपचार सदर हॉस्पिटल
          मध्ये योजनेतून मोफत झाले आहे. मला / आम्हाला उपचाराचा खर्च आलेला नाही.
          शिवाय औषधे, जेवण, तपासण्या इ. योजनेतून झाल्या आहेत. माझी / आमची
          कोणतीही तक्रार नाही. रुग्ण घरी सोडताना भाड्यापोटी रक्कम भेटली आहे.
          चांगल्या प्रकारे उपचार झाले आहे. मी / आम्ही उपचाराबाबत समाधानी आहोत.
          भविष्यात कोणतीही तक्रार राहणार नाही.
        </p>

        <div className="bg-slate-50 border p-4 rounded-md flex items-center space-x-2 font-bold text-slate-800">
          <span>उपचाराबाबत गुण द्यायचे झाल्यास १० पैकी</span>
          <input
            type="text"
            className="border-b border-slate-900 w-16 text-center bg-transparent focus:outline-none"
            placeholder="______"
          />
          <span>एवढे गुण देऊ इच्छितो. समाधान / असमाधान व्यक्त करतो.</span>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 text-xs font-semibold">
        <div className="space-y-4">
          <div>
            रुग्णाचे नाव :{" "}
            <span className="underline">Mrs. DIPALI NILESH KUTHE</span>
          </div>
          <div>नाते : _____________________________________</div>
          <div>पत्ता : _____________________________________</div>
          <div>फोन नं. : ___________________________________</div>
        </div>
        <div className="space-y-4 pl-12 flex flex-col justify-between items-start">
          <div className="pt-2">सही : _________________________________</div>
          <div>स्थळ : _________________________________</div>
          <div>दिनांक : ____ / ____ / २०२___</div>
        </div>
      </div>
    </div>
  );
};

export default SchemeFeedbackMar;
