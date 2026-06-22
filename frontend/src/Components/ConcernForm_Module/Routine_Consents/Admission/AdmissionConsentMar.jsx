import React, { useState } from "react";

const AdmissionConsentMar = () => {
  const [signs, setSigns] = useState({
    general: false,
    critical: false,
    dama: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 shadow-sm rounded-xl font-sans text-slate-800 my-4 space-y-6">
      <h2 className="text-xl font-bold text-center text-blue-900 border-b pb-2">
        प्रवेश व उपचार संमती पत्रे (मराठी)
      </h2>

      {/* १. संमती पत्र */}
      <div className="border p-4 rounded-lg bg-slate-50">
        <h3 className="font-bold text-sm text-slate-900 mb-2">
          १. उपचार व तपासणी संमती पत्र
        </h3>
        <p className="text-xs leading-relaxed mb-3 text-slate-700">
          मी राहणार **PHULE NAGAR DAUND** माझ्या रुग्णाला **SHRADDHA HOSPITAL
          AND ICU** च्या डॉक्टरांचे उपचार देण्यास संमती देत आहे. इलाजाकरिता
          आवश्यक त्या तपासण्या करण्यास माझी संमती आहे.
        </p>
        <label className="flex items-center space-x-2 text-xs font-bold text-blue-800 cursor-pointer">
          <input
            type="checkbox"
            checked={signs.general}
            onChange={(e) => setSigns({ ...signs, general: e.target.checked })}
            className="rounded text-blue-600"
          />
          <span>मी वरील मजकूर वाचला असून मला मंजूर आहे.</span>
        </label>
      </div>

      {/* २. रुग्ण अत्यवस्थेत असल्याची माहिती */}
      <div className="border border-amber-200 p-4 rounded-lg bg-amber-50">
        <h3 className="font-bold text-sm text-amber-950 mb-2">
          २. रुग्ण अत्यवस्थ (Critical) असल्याची माहिती
        </h3>
        <p className="text-xs leading-relaxed mb-3 text-amber-900">
          माझ्या रुग्णाची तब्येत अत्यावस्थेत आहे याची मला पूर्ण जाणीव आहे.
          डॉक्टरांनी मला समजेल अशा भाषेत याची कल्पना दिली असून पुढील आवश्यक
          उपचारास माझी परवानगी आहे.
        </p>
        <label className="flex items-center space-x-2 text-xs font-bold text-amber-950 cursor-pointer">
          <input
            type="checkbox"
            checked={signs.critical}
            onChange={(e) => setSigns({ ...signs, critical: e.target.checked })}
            className="rounded text-amber-700"
          />
          <span>रुग्ण गंभीर असल्याची मला पूर्ण जाणीव आहे.</span>
        </label>
      </div>

      {/* ३. डॉक्टरांच्या सल्ल्याविरुद्ध रुग्णास नेणे */}
      <div className="border border-red-200 p-4 rounded-lg bg-red-50">
        <h3 className="font-bold text-sm text-red-950 mb-2">
          ३. डॉक्टरांच्या सल्ल्याविरुद्ध रुग्णास नेणे (DAMA)
        </h3>
        <p className="text-xs leading-relaxed mb-3 text-red-900">
          मी माझ्या रुग्णास डॉक्टरांच्या सल्ल्याविरुद्ध स्वतःच्या जबाबदारीवर
          हॉस्पिटलमधून घेऊन जात आहे. पुढील सर्व परिस्थितीची व धोक्यांची मला
          पूर्ण कल्पना दिली आहे.
        </p>
        <label className="flex items-center space-x-2 text-xs font-bold text-red-950 cursor-pointer">
          <input
            type="checkbox"
            checked={signs.dama}
            onChange={(e) => setSigns({ ...signs, dama: e.target.checked })}
            className="rounded text-red-700"
          />
          <span>मी स्वतःच्या जबाबदारीवर रुग्णास घेऊन जात आहे.</span>
        </label>
      </div>
    </div>
  );
};

export default AdmissionConsentMar;
