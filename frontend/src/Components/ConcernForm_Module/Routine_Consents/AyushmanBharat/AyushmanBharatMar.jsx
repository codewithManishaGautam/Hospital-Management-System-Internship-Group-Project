import React, { useState } from 'react';
import PatientHeaderBar from './PatientHeaderBar';

const AyushmanBharatMar = () => {
  const [scheme, setScheme] = useState({ eligible: '', wish: '', denyReason: '', agreedDocs: false });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 shadow-md rounded-xl font-sans text-slate-800 my-4">
      <PatientHeaderBar />
      <div className="text-center border-b-2 border-green-600 pb-2 mb-4">
        <h2 className="text-md font-bold text-green-800">आयुष्यमान भारत-प्रधानमंत्री जन आरोग्य योजना / महात्मा ज्योतिबा फुले जन आरोग्य योजना</h2>
      </div>

      <div className="bg-green-50/60 p-4 rounded-lg border border-green-200 text-xs leading-relaxed space-y-2 mb-4 text-slate-700">
        <p><strong>१)</strong> सदर एकत्रित शासकीय मोफत उपचार योजना या रुग्णालयामध्ये उपलब्ध आहे.</p>
        <p><strong>२)</strong> लाभ मिळण्यासाठी गोल्डन कार्ड, पिवळी/केशरी शिधापत्रिका, किंवा अंत्योदय कार्ड यांसोबत आधार कार्ड किंवा मतदान ओळखपत्र जोडणे बंधनकारक आहे.</p>
        <p><strong>३)</strong> रुग्णाचा आजार या योजनेच्या विहित उपचार पद्धतींमध्ये समाविष्ट असल्यास उपचार पूर्णपणे मोफत केले जातील. आवश्यक कागदपत्रांची वेळेत पूर्तता न केल्यास खर्चाची जबाबदारी रुग्णाची असेल.</p>
      </div>

      <div className="space-y-4 border p-4 rounded-lg bg-slate-50 text-xs">
        <div>
          <p className="font-bold mb-2">Q1. आपणास देण्यात आलेल्या माहितीच्या आधारे आपण योजनेचे अधिकृत लाभार्थी आहात काय?</p>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1 cursor-pointer"><input type="radio" name="eligible" value="yes" checked={scheme.eligible==='yes'} onChange={(e)=>setScheme({...scheme, eligible: e.target.value})} /> <span>होय</span></label>
            <label className="flex items-center space-x-1 cursor-pointer"><input type="radio" name="eligible" value="no" checked={scheme.eligible==='no'} onChange={(e)=>setScheme({...scheme, eligible: e.target.value})} /> <span>नाही</span></label>
          </div>
        </div>

        <div>
          <p className="font-bold mb-2">Q2. आपण या मोफत योजनेचा लाभ घेण्यास पूर्णपणे इच्छुक आहात काय?</p>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-1 cursor-pointer"><input type="radio" name="wish" value="yes" checked={scheme.wish==='yes'} onChange={(e)=>setScheme({...scheme, wish: e.target.value})} /> <span>होय (इच्छुक आहे)</span></label>
            <label className="flex items-center space-x-1 cursor-pointer"><input type="radio" name="wish" value="no" checked={scheme.wish==='no'} onChange={(e)=>setScheme({...scheme, wish: e.target.value})} /> <span>नाही (लाभ नको आहे)</span></label>
          </div>
        </div>

        {scheme.wish === 'no' && (
          <div className="mt-2 transition-all">
            <p className="font-bold mb-1 text-red-800">लाभ घेण्यास इच्छुक नसल्यास / नाकारत असल्यास नातेवाईकांच्या हस्ताक्षरात सविस्तर कारण लिहा :</p>
            <textarea value={scheme.denyReason} onChange={(e)=>setScheme({...scheme, denyReason: e.target.value})} className="w-full border p-2 rounded bg-white text-xs" rows="2" placeholder="योजना नाकारण्याचे कारण प्रविष्ट करा (कलम ३.९.५ करारानुसार)"></textarea>
          </div>
        )}

        <label className="flex items-center space-x-2 font-bold text-slate-800 border-t pt-2 mt-2 cursor-pointer">
          <input type="checkbox" checked={scheme.agreedDocs} onChange={(e)=>setScheme({...scheme, agreedDocs: e.target.checked})} className="rounded text-green-600" />
          <span>आम्हाला योजनेचे नियम समजले असून विहित मुदतीत कागदपत्रे देण्यास कटिबद्ध आहोत.</span>
        </label>
      </div>
    </div>
  );
};

export default AyushmanBharatMar;
