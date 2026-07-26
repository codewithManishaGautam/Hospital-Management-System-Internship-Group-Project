import React, { useState } from 'react';
import api from '../services/api';
import { Shield, FileText, CheckCircle, Clock } from 'lucide-react';
import './Insurance.css';

const PatientPortal = () => {
  const [patientId, setPatientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!patientId.trim()) return;
    
    setLoading(true);
    setError('');
    setCases(null);
    try {
      const response = await api.get(`/insurance/cases?patientId=${patientId}`);
      if (response.data.success) {
        if (response.data.data.length === 0) {
          setError('No insurance cases found for this Patient ID.');
        } else {
          setCases(response.data.data);
        }
      }
    } catch (err) {
      setError('Failed to fetch your insurance records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    if (status.includes('SETTLED') || status.includes('APPROVED')) return <CheckCircle className="text-green-500" />;
    if (status.includes('CLOSED') || status.includes('CANCELLED')) return <Shield className="text-gray-500" />;
    return <Clock className="text-yellow-500 animate-pulse" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-12 p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <Shield className="mx-auto text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-slate-800">Patient Insurance Portal</h1>
          <p className="text-slate-600 mt-2">Track your insurance claims and pre-authorizations in real-time.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-slate-200">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input 
              type="text" 
              placeholder="Enter your Patient ID (e.g., 60f3b...)" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Track Status'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>

        {cases && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Your Active Cases ({cases.length})</h2>
            {cases.map((c) => (
              <div key={c._id} className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Case #{c.caseNumber}</h3>
                    <p className="text-slate-600">Provider: {c.insuranceCompanyId?.companyName || 'N/A'}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
                    {getStatusIcon(c.status)}
                    <span className="font-medium text-slate-800">{c.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-500 mb-1">Total Hospital Bill</p>
                    <p className="text-xl font-bold text-slate-800">
                      ₹{c.financials?.totalBilled ? c.financials.totalBilled.toLocaleString() : '0'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700 mb-1">Insurance Approved</p>
                    <p className="text-xl font-bold text-green-700">
                      ₹{c.financials?.approvedAmount ? c.financials.approvedAmount.toLocaleString() : '0'}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-orange-700 mb-1">Your Payable Co-pay</p>
                    <p className="text-xl font-bold text-orange-700">
                      ₹{c.financials?.patientPayable ? c.financials.patientPayable.toLocaleString() : '0'}
                    </p>
                  </div>
                </div>

                {c.claimPackagePath && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                    <a 
                      href={`http://localhost:5000/${c.claimPackagePath}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <FileText className="mr-2" size={18} />
                      Download Final Claim Package
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientPortal;
