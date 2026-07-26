import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, Edit } from 'lucide-react';
import api from '../../services/api';

const DynamicFormsManager = ({ onFillOnline }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [forms, setForms] = useState({ mandatory: [], optional: [] });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // Assuming a master endpoint exists for companies
      const res = await api.get('/insurance/master/companies');
      if (res.data.success) {
        setCompanies(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  const fetchFormsByCompany = async (companyId) => {
    setLoading(true);
    try {
      const res = await api.get(`/insurance/forms-registry/company/${companyId}`);
      if (res.data.success) {
        setForms({
          mandatory: res.data.mandatory,
          optional: res.data.optional
        });
      } else {
        setForms({ mandatory: [], optional: [] });
      }
    } catch (err) {
      console.error("Failed to fetch forms", err);
      setForms({ mandatory: [], optional: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    fetchFormsByCompany(company._id);
  };

  const filteredCompanies = companies.filter(c => 
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.shortName && c.shortName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-[calc(100vh-100px)] bg-slate-50 overflow-hidden">
      {/* Left Sidebar - Companies */}
      <div className="w-1/3 bg-white border-r border-slate-200 flex flex-col h-full">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Insurance Providers</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search companies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {filteredCompanies.map(company => (
            <div 
              key={company._id}
              onClick={() => handleCompanySelect(company)}
              className={`p-4 border-b border-slate-50 cursor-pointer transition-colors ${
                selectedCompany?._id === company._id 
                  ? 'bg-blue-50 border-l-4 border-blue-600' 
                  : 'hover:bg-slate-50 border-l-4 border-transparent'
              }`}
            >
              <h4 className="font-semibold text-slate-800">{company.companyName}</h4>
              {company.shortName && <p className="text-sm text-slate-500">{company.shortName}</p>}
            </div>
          ))}
          {filteredCompanies.length === 0 && (
            <p className="p-4 text-slate-500 text-center">No companies found.</p>
          )}
        </div>
      </div>

      {/* Main Content - Forms Grid */}
      <div className="w-2/3 flex flex-col h-full">
        {selectedCompany ? (
          <>
            <div className="p-6 border-b border-slate-200 bg-white">
              <h2 className="text-2xl font-bold text-slate-800">{selectedCompany.companyName} Forms</h2>
              <p className="text-slate-600 mt-1">Select an official form to print or fill digitally.</p>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {forms.mandatory.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Mandatory Forms</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {forms.mandatory.map(form => <FormCard key={form._id} form={form} onFillOnline={onFillOnline} />)}
                      </div>
                    </div>
                  )}

                  {forms.optional.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Optional / Supplementary Forms</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {forms.optional.map(form => <FormCard key={form._id} form={form} onFillOnline={onFillOnline} />)}
                      </div>
                    </div>
                  )}

                  {forms.mandatory.length === 0 && forms.optional.length === 0 && (
                    <div className="text-center text-slate-500 py-12">
                      <FileText className="mx-auto text-slate-300 mb-3" size={48} />
                      <p>No official forms registered for this company yet.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <FileText className="text-slate-300 mb-4" size={64} />
            <p className="text-lg">Select an insurance company from the sidebar</p>
            <p className="text-sm">to view and manage its official forms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FormCard = ({ form, onFillOnline }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <FileText className="text-blue-600" size={20} />
        <h4 className="font-semibold text-slate-800">{form.formName}</h4>
      </div>
      <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
        {form.formCategory}
      </span>
    </div>
    {form.description && <p className="text-sm text-slate-600 mb-4 line-clamp-2">{form.description}</p>}
    <div className="text-xs text-slate-500 mb-4 flex justify-between">
      <span>Code: {form.formCode || 'N/A'}</span>
      <span>v{form.versionNumber}</span>
    </div>
    
    <div className="flex gap-2 mt-auto">
      <button className="flex-1 flex items-center justify-center gap-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-1.5 px-3 rounded text-sm font-medium transition-colors">
        <Download size={16} /> Print Blank
      </button>
      <button 
        onClick={() => onFillOnline(form.templateId || 'HEALTHINDIA_TPA')} // fallback to the new template for demo
        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors"
      >
        <Edit size={16} /> Fill Online
      </button>
    </div>
  </div>
);

export default DynamicFormsManager;
