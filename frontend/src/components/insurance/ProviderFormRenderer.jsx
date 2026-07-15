import React, { useState } from 'react';
import { FORM_TEMPLATES } from './insuranceFormTemplates';
import './ProviderFormRenderer.css';
import UniversalInsuranceForm from './forms/UniversalInsuranceForm';

const ProviderFormRenderer = ({ patientData, mode = "pre-auth", preselectedTemplate }) => {
  const [selectedProvider, setSelectedProvider] = useState(preselectedTemplate || "MEDI_ASSIST");

  // If preselectedTemplate changes, update the selectedProvider
  React.useEffect(() => {
    if (preselectedTemplate) {
      setSelectedProvider(preselectedTemplate);
    }
  }, [preselectedTemplate]);

  return (
    <div className="provider-form-renderer">
      {!preselectedTemplate && (
        <div className="form-selector">
          <label>Select Insurance Company / Form Template:</label>
          <select 
            value={selectedProvider} 
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            {Object.keys(FORM_TEMPLATES).map(key => (
              <option key={key} value={key}>{FORM_TEMPLATES[key].name}</option>
            ))}
          </select>
        </div>
      )}

      <UniversalInsuranceForm 
        patientData={patientData} 
        mode={mode} 
        providerKey={selectedProvider} 
      />
    </div>
  );
};

export default ProviderFormRenderer;
