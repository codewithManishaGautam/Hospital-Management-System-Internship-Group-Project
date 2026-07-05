import React from 'react';

const GeneralAdmissionRulesMar = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-400 font-sans text-slate-900 shadow-sm my-4">
      <h2 className="text-base font-bold text-center border-b border-slate-800 pb-2 mb-4">अनुमती पत्र (General Terms)</h2>
      
      <div className="bg-slate-50 border border-slate-200 p-3 mb-4 text-xs space-y-1">
        <div className="grid grid-cols-2">
          <div><strong>नातेवाईकाचे नाव :</strong> ___________________________</div>
          <div><strong>पत्ता :</strong> PHULE NAGAR DAUND</div>
        </div>
        <div><strong>दूरध्वनी क्रमांक:</strong> 9028816910</div>
        <div className="text-red-700 font-bold italic mt-1">* रुग्णाला दाखल करून घेण्याचा हक्क ह्या रुग्णालयाच्या व्यवस्थापनाने राखून ठेवला आहे.</div>
      </div>

      <div className="text-xs space-y-2.5 text-justify">
        <p>१) डॉक्टरांनी मला / आम्हांला आमच्या रुग्णाच्या <strong>Mrs. DIPALI NILESH KUTHE</strong> आजाराची व प्रकृतीची संपूर्ण माहिती दिली आहे.</p>
        <p>२) डॉक्टरांनी कराव्या लागणाऱ्या तपासण्या, औषधोपचार, त्यांचे परिणाम व संभाव्य दुष्परिणाम किंवा अकल्पित प्रतिक्रिया इ. सर्व बाबींची स्पष्ट कल्पना दिली आहे.</p>
        <p>३) गरज भासल्यास रुग्णाच्या बाबतीत जरुरीप्रमाणे अतिरिक्त विशेष तज्ञांचा सल्ला घेण्यास माझी संमती आहे. त्या खर्चाची जबाबदारी माझ्यावर राहील.</p>
        <p>४) गरज भासल्यास अ.द.वि. (अतिदक्षता विभाग / ICU) मध्ये हलविण्यास माझी संमती आहे. अशा निर्णयाचा सर्व खर्च व जबाबदारी मी स्वीकारतो.</p>
        <p>५) प्रमाणित कंपन्यांची औषधे, सलाईन संच रुग्णालयात वापरण्यात येतात याची मला जाणीव आहे.</p>
        <p>६) रुग्ण अथवा नातेवाईकांकडून रुग्णालयातील वस्तूंची मोडतोड झाल्यास त्याचे सर्व आर्थिक नुकसान भरून देण्याची जबाबदारी माझी राहील.</p>
        <p>७) वैद्यकीय ज्ञानाच्या वृद्धीसाठी उपचार करतांना घेतलेली छायाचित्रे (Audio Visual Tapes) ओळख जाहीर न करता प्रदर्शित करण्यास माझी अनुमती आहे.</p>
        <p>८) रुग्णाच्या छाती / पाठीतील पाणी कुठल्याही भूलेसाठी काढून घेण्यास मी तयार आहे.</p>
      </div>

      <div className="mt-8 border border-slate-400 text-xs">
        <div className="grid grid-cols-3 bg-slate-100 font-bold border-b border-slate-400 p-2 text-center">
          <div>पेशंट / रुग्ण</div>
          <div>नातेवाईक १</div>
          <div>नातेवाईक २</div>
        </div>
        <div className="grid grid-cols-3 p-3 gap-4 h-32">
          <div className="space-y-1">
            <div>सही: _________________</div>
            <div>नांव: Mrs. DIPALI N. KUTHE</div>
            <div>मो. नं: 9028816910</div>
          </div>
          <div className="space-y-1 border-l pl-2">
            <div>सही: _________________</div>
            <div>नांव: _________________</div>
            <div>वय: ______ तारीख: ______</div>
          </div>
          <div className="space-y-1 border-l pl-2">
            <div>सही: _________________</div>
            <div>नांव: _________________</div>
            <div>पत्ता: PHULE NAGAR DAUND</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralAdmissionRulesMar;
