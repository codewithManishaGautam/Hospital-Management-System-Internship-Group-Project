import React, { useState } from 'react';
import PatientHeaderBar from './PatientHeaderBar';

const MediclaimCashlessMar = () => {
  const [checked, setChecked] = useState(false);
  const [relativeInfo, setRelativeInfo] = useState({ name: '', phone: '', relation: '' });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 shadow-md rounded-xl font-sans text-slate-800 my-4">
      <PatientHeaderBar />
      <h2 className="text-md font-bold text-center text-purple-900 border-b pb-2 mb-4">मेडिकलेम प्रक्रिया व कॅशलेस संमती पत्र (CONSENT FOR CASHLESS)</h2>
      
      <div className="text-xs space-y-1.5 text-slate-700 h-48 overflow-y-auto border p-3 rounded bg-slate-50 mb-4 shadow-inner">
        <p><strong>१.</strong> मेडिकलेम विभागाला पॉलिसी पेपर्स, कॅशलेस कार्ड, आधारकार्ड व पॅन कार्ड पहिल्याच दिवशी सादर करणे नातेवाईकांवर बंधनकारक आहे.</p>
        <p><strong>२.</strong> विमा कंपन्यांच्या नियमांनुसार सुरुवातीला प्राथमिक जनरल वॉर्ड बेड दिला जाईल. रूम प्रकार अपग्रेड केल्यास फरक रक्कम स्वतः भरावी लागेल.</p>
        <p><strong>३.</strong> अंतिम मंजुरी (Final Approval) मिळण्यासाठी डिस्चार्ज घोषित केल्यानंतर साधारण ५ तास किंवा अधिक वेळ लागू शकतो, तोपर्यंत पेशंटला वॉर्डमध्ये थांबावे लागेल.</p>
        <p><strong>४.</strong> विमा कंपन्या नॉन-मेडिकल वस्तू (Surgical consumables / Administrative items) मंजूर करत नाहीत. ही कपात झालेली रक्कम बिलातून रुग्णाने देणे आवश्यक आहे.</p>
        <p><strong>५.</strong> जर काही कारणास्तव विमा कंपनीने कॅशलेस क्लेम नाकारला (Denial / Rejection), तर हॉस्पिटलचे संपूर्ण बिल स्वखर्चाने त्वरित भरण्याची जबाबदारी माझी असेल.</p>
      </div>

      <div className="bg-purple-50 p-4 rounded border border-purple-200 space-y-3">
        <label className="flex items-start space-x-2 text-xs font-bold text-purple-950 cursor-pointer">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="mt-0.5 rounded text-purple-700 w-4 h-4" />
          <span>I / Patient agree to make payment in all below situations & giving consent for the same by signing (कॅशलेस अप्रूव न झाल्यास किंवा कपात झाल्यास उर्वरित पैसे भरण्यास माझी पूर्ण संमती आहे).</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
          <input type="text" placeholder="जबाबदारी घेणाऱ्याचे नाव" value={relativeInfo.name} onChange={(e)=>setRelativeInfo({...relativeInfo, name: e.target.value})} className="border p-2 rounded bg-white" />
          <input type="text" placeholder="मोबाईल क्रमांक" value={relativeInfo.phone} onChange={(e)=>setRelativeInfo({...relativeInfo, phone: e.target.value})} className="border p-2 rounded bg-white" />
          <input type="text" placeholder="रुग्णाशी नाते" value={relativeInfo.relation} onChange={(e)=>setRelativeInfo({...relativeInfo, relation: e.target.value})} className="border p-2 rounded bg-white" />
        </div>
      </div>
    </div>
  );
};

export default MediclaimCashlessMar;
