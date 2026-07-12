import React from "react";
import PatientHeaderBar from "./PatientHeaderBar";

const DAMAConsentMar = () => {
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
          डॉक्टरांनी मला समजावून सांगितलेल्या खालील बाबी मला मान्य आहेत.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-justify">
          <li>
            माझी / माझ्या रुग्णाची सद्य वैद्यकीय स्थिती, आजाराचे स्वरूप आणि
            आवश्यक उपचार.
          </li>
          <li>
            उपचार न घेता / पूर्ण न करता रुग्णालयातून जाण्याचे सर्व संभाव्य
            परिणाम व धोके
          </li>
        </ul>

        <p className="font-bold">मी नमूद करतो / करते की</p>
        <ul className="list-disc pl-6 space-y-2 text-justify">
          <li>
            सदर प्रपत्र वाचून व समजून घेण्यासाठी मला पुरेसा वेळ देण्यात आलेला
            आहे.
          </li>
          <li>
            माझी/माझ्या रुग्णाची सद्य वैद्यकीय स्थिती व सुचविण्यात आलेले उपचार न
            घेता होणारे संभाव्य परिणाम व धोक्यांबद्दल डॉक्टरांना प्रश्न
            विचारण्याची संधी मला देण्यात आली आहे प्रश्नांची संपूर्णतः समाधानकारक
            उत्तरे देण्यात आली आहेत.
          </li>
          <li>
            उपचार न घेता जाण्याचे संबधित परिणाम व धोके मला समजलेले आहेत. तरी मी
            / माझ्या रुग्णास उपचार न घेता रुग्णालयातून (घेऊन) जात आहे.
          </li>
          <li>
            यातुन जीवीतास उदभवनाऱ्या संबधित परिणाम, धोके व इजा इत्यादी साठी
            आम्ही रुग्णालयातील डॉक्टर, कर्मचारीवृंद, व्यवस्थापन जबाबदार धरणार
            नाही.
          </li>
          <li>
            वरील मजकूर मला समजेल अशा भाषेत समजावून सांगितले आहे व ते मला
            संपूर्णतः समजले आहेत.
          </li>
          <li>
            सदरच्या संमतीपत्रावर मी स्वेच्छेने व कुणाच्या दबावाखाली ने येता सही
            करत आहे.
          </li>
        </ul>

        <p className="pt-2 italic">
          मी पुष्टी करतो की मी या फॉर्मची सामग्री आणि रुग्णास आणि डॉक्टरांमधील
          संबंधित संभाषणे अचूकपणे व्याख्या केली आहे.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs font-medium pt-4 mb-8">
        <div>दिनांक : __________________</div>
        <div>वेळ : __________________</div>
      </div>

      <div className="mt-8 space-y-3 text-xs border-t pt-4">
        <div className="flex justify-between">
          <div>
            रुग्णाचे / नातेवाईकाचे नाव (रुग्णाशी नाते) :
            ___________________________
          </div>
          <div>सही : ___________________</div>
        </div>
        <div className="flex justify-between">
          <div>
            दुभाष्याचे नाव : <strong>Dr.KAPIL DESHMUKH</strong>
          </div>
          <div>सही : ___________________</div>
        </div>
        <div className="flex justify-between">
          <div>
            डॉक्टरांचे नाव : <strong>Dr.KAPIL DESHMUKH</strong>
          </div>
          <div>सही : ___________________</div>
        </div>
      </div>
    </div>
  );
};

export default DAMAConsentMar;
