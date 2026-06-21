import React, { useState } from "react";

const PropertyValuationMar = () => {
  const [valData, setValData] = useState({ name: "", relation: "", date: "" });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 shadow-sm rounded-xl font-sans text-slate-800 my-4">
      <h2 className="text-md font-bold text-slate-900 border-b pb-2 mb-3">
        दागिने व मौल्यवान वस्तू ताब्यात घेतल्याचे संमतीपत्र
      </h2>
      <p className="text-xs leading-relaxed mb-4 text-slate-700">
        मी असे लिहून देतो की माझे पेशंट रुग्णालयात ऍडमिट केले असून, त्यांच्या
        अंगावरील सर्व सोने-चांदी इत्यादी धातूंचे दागिने, मौल्यवान वस्तू व मोबाईल
        फोन मी माझ्या स्वतःच्या ताब्यात घेतले आहेत. यांपैकी कोणतीही वस्तू गहाळ
        झाल्यास हॉस्पिटल प्रशासन किंवा स्टाफ जबाबदार राहणार नाही.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50 p-3 rounded border text-xs">
        <input
          type="text"
          placeholder="नातेवाईकाचे पूर्ण नाव"
          value={valData.name}
          onChange={(e) => setValData({ ...valData, name: e.target.value })}
          className="border p-2 rounded bg-white w-full"
        />
        <input
          type="text"
          placeholder="रुग्णाशी नाते"
          value={valData.relation}
          onChange={(e) => setValData({ ...valData, relation: e.target.value })}
          className="border p-2 rounded bg-white w-full"
        />
        <input
          type="date"
          value={valData.date}
          onChange={(e) => setValData({ ...valData, date: e.target.value })}
          className="border p-2 rounded bg-white w-full"
        />
      </div>
    </div>
  );
};

export default PropertyValuationMar;
