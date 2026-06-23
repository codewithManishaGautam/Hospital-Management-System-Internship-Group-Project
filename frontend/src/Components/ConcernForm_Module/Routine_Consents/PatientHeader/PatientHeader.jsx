import React from "react";

const PatientHeaderBar = () => {
  const info = {
    uhid: "SHI023192",
    doa: "13-May-2026 / 7:00 AM",
    genderAge: "F / 33",
    ipdId: "126",
    patientName: "Mrs. DIPALI NILESH KUTHE",
    doctor: "Dr. KAPIL DESHMUKH",
  };

  return (
    <div className="w-full border-2 border-slate-900 text-xs font-sans text-slate-950 mb-6 bg-white print:border-slate-900">
      {/* पहिली ओळ - UHID, DOA, Gender */}
      <div className="grid grid-cols-3 border-b border-slate-900 p-2 font-bold bg-slate-50/50">
        <div>UHID : {info.uhid}</div>
        <div className="text-center">DOA : {info.doa}</div>
        <div className="text-right">Gender / Age : {info.genderAge}</div>
      </div>

      {/* दुसरी ओळ - IPD, Patient Name, Doctor */}
      <div className="grid grid-cols-3 p-2 font-bold text-left">
        <div className="border-r border-slate-300 pr-2">
          <span className="block font-normal text-[10px] text-slate-600 uppercase tracking-wide">
            IPD ID
          </span>
          {info.ipdId}
        </div>
        <div className="text-center border-r border-slate-300 px-2">
          <span className="block font-normal text-[10px] text-slate-600 uppercase tracking-wide">
            Patient Name
          </span>
          {info.patientName}
        </div>
        <div className="text-right pl-2">
          <span className="block font-normal text-[10px] text-slate-600 uppercase tracking-wide">
            Consulting Doctor
          </span>
          {info.doctor}
        </div>
      </div>
    </div>
  );
};

export default PatientHeaderBar;
