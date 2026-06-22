import React from 'react';

const HospitalRulesAndChargesMar = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-400 font-sans text-slate-900 shadow-sm my-4">
      <h1 className="text-base font-bold text-center text-slate-900 mb-4">SHRADDHA HOSPITAL AND ICU चे नियम व अटी</h1>
      
      <div className="text-xs space-y-2 text-justify mb-6">
        <p>१. मी रुग्ण / रुग्णाचे नातेवाईक ________________________ मान्य करतो की रुग्णालयामध्ये रुग्णाला भेटण्याच्या वेळा व इतर महत्वाच्या बाबींविषयी असणारे नियम व कायद्याचे पालन करू.</p>
        <p>२. रुग्णालयाच्या नियमानुसार मी / रुग्णाचे आधार कार्ड / पॅन कार्ड / मतदार ओळख पत्र हे ओळख पुरावा म्हणून सादर करेल.</p>
        <p>३. मी रुग्ण / रुग्णाचे नातेवाईक विमा कंपनी अथवा टीपीए कंपनी किंवा इतर मेडिक्लेम इन्शुरन्स हॉस्पिटलला पहिल्या दिवशीच कळवेल.</p>
        <p>४. मी काही तपासण्यांसाठी पेशंटला हॉस्पिटल व्यतिरिक्त इतर दुसऱ्या ठिकाणी गरज पडल्यास व डॉक्टरांनी सांगितल्यास माझ्या जबाबदारीवर रुग्णाला घेऊन जाईल.</p>
        <p>५. मी रुग्ण / रुग्णाचे नातेवाईक रुग्णाजवळ असलेल्या मौल्यवान वस्तु व दागिने व पैसे सांभाळून ठेवेल व त्याची पूर्ण जबाबदारी माझी राहील.</p>
        <p>६. रुग्णाची तब्येत कधीही अत्यवस्थ होऊ शकते हे जाणून आहे. त्यासाठी कधीही आय. सी. यु. मध्ये दाखल करण्याची परवानगी देत आहे.</p>
        <p>७. रुग्ण सोबतीला रात्री ९ वाजे नंतर ते सकाळी ८ वाजे पर्यंत एकच नातेवाईक / काळजीवाहक थांबेल याची मी खबरदारी घेईल.</p>
      </div>

      <h3 className="text-xs font-bold text-slate-900 mb-2">दैनंदीन हॉस्पिटल चार्ज खालील प्रमाणे (प्रतिदीन टेबल)</h3>
      
      {/* मुख्य बेड टेबल */}
      <table className="w-full border-collapse border border-slate-400 text-xs text-center font-bold mb-4">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-400 p-2 w-1/5">ICU</th>
            <th className="border border-slate-400 p-2 w-1/5">Delux AC Room</th>
            <th className="border border-slate-400 p-2 w-1/5">Special Room</th>
            <th className="border border-slate-400 p-2 w-1/5">Semi Special Room</th>
            <th className="border border-slate-400 p-2 w-1/5">General Ward</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-10">
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
          </tr>
        </tbody>
      </table>

      <p className="text-[10px] text-amber-800 font-semibold bg-amber-50 p-1.5 border border-amber-200 mb-4 leading-normal">
        * दैनंदीन चार्जेस, बेड चार्जेस, RMO Round, Nursing Charges, Nebulisation, Doctor 2 Visit, BMW, एकत्रित असतील इतर बाबीसाठी वेगळा खर्च व चार्जेस लागतील.
      </p>

      {/* अतिरिक्त सुविधा टेबल १ */}
      <table className="w-full border-collapse border border-slate-400 text-xs text-center font-semibold mb-4">
        <thead>
          <tr className="bg-slate-50">
            <th className="border border-slate-400 p-1.5">Oxyygen</th>
            <th className="border border-slate-400 p-1.5">Monitor</th>
            <th className="border border-slate-400 p-1.5">BIPAP</th>
            <th className="border border-slate-400 p-1.5">Ventilator</th>
            <th className="border border-slate-400 p-1.5">Procedure</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-8">
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
          </tr>
        </tbody>
      </table>

      {/* अतिरिक्त सुविधा टेबल २ */}
      <table className="w-full border-collapse border border-slate-400 text-xs text-center font-semibold mb-6">
        <thead>
          <tr className="bg-slate-50">
            <th className="border border-slate-400 p-1.5">Emergency</th>
            <th className="border border-slate-400 p-1.5">ECG</th>
            <th className="border border-slate-400 p-1.5">Other Doctor Visit</th>
            <th className="border border-slate-400 p-1.5">Sugar</th>
            <th className="border border-slate-400 p-1.5">Food</th>
            <th className="border border-slate-400 p-1.5">Other</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-8">
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
            <td className="border border-slate-400"></td>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-4 text-xs font-medium border-t pt-4">
        <div className="space-y-2">
          <div>रुग्णाचे / नातेवाइकांचे नाव : ______________________</div>
          <div>सही : ______________________</div>
        </div>
        <div className="space-y-2 pl-12">
          <div>मोबाईल नं : ______________________</div>
          <div>दिनांक : ______ / ______ / २०१___</div>
        </div>
      </div>
    </div>
  );
};

export default HospitalRulesAndChargesMar;
