import React from 'react';

const InpatientConsentMar = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-400 font-sans text-slate-900 shadow-sm my-4">
      <h2 className="text-base font-bold text-center border-b border-slate-800 pb-2 mb-6">आंतररुग्ण संमती पत्र (Inpatient Consent)</h2>
      
      <p className="text-xs leading-relaxed text-justify mb-6">
        मी श्री/सौ ________________________________________________ असे लिहून देतो की आमचा पेशंट <strong>Mrs. DIPALI NILESH KUTHE</strong> राहणार <strong>PHULE NAGAR DAUND</strong> वय <strong>33 वर्ष</strong> यांना SHRADDHA HOSPITAL AND ICU च्या डॉ. ________________________ यांच्या कडे ________________________ या आजारासाठी ऍडमिट करत आहोत. ऍडमिट केल्यानंतर किंवा उपचार सुरु असताना ही पेशंट ची तब्येत सिरीयस होवू शकते प्रसंगी जीवाला हि धोका होवू शकतो, अशी डॉ. ________________________ यांनी कल्पना दिलेली आहे. आजारात पेशंटला असे त्रास उद्भवू शकतात. पेशंटला ________________________ भासू शकते असे ही डॉक्टरांनी सांगितले आहे. प्रसंगी आय सी यु किंवा मोठ्या हॉस्पिटलला हलवण्याची गरज पडू शकते याची संपूर्ण कल्पना दिली तरीही आम्ही पेशंटला ऍडमिट व उपचाराची परवानगी देत आहोत.
      </p>

      <p className="text-xs font-semibold bg-slate-50 p-2 border mb-8">
        वरील सर्व बाबी आम्हाला आमच्या शब्दांत तोंडी व लेखी स्वरुपात मांडल्या आहेत. यापुढे होणाऱ्या परिणामांची जबाबदारी आमची राहील. त्यासाठी डॉ. व SHRADDHA HOSPITAL AND ICU स्टाफ जबाबदार राहणार नाही.
      </p>

      <div className="grid grid-cols-2 gap-4 text-xs font-medium pt-4">
        <div className="space-y-3">
          <div>नाव : __________________________________________</div>
          <div>सही : __________________________________________</div>
        </div>
        <div className="space-y-3 pl-8">
          <div>मोबाईल नं : ______________________________________</div>
          <div>दिनांक : ______ / ______ / २०१___</div>
        </div>
      </div>
    </div>
  );
};

export default InpatientConsentMar;
