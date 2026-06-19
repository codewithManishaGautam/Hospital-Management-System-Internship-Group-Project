import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';
import { FORM_TEMPLATES } from './insuranceFormTemplates';
import './ProviderFormRenderer.css';

const ProviderFormRenderer = ({ patientData, mode = "pre-auth" }) => {
  const [selectedProvider, setSelectedProvider] = useState("IRDAI_STANDARD");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const currentTemplate = FORM_TEMPLATES[selectedProvider];

  useEffect(() => {
    if (patientData && currentTemplate) {
      const initialData = {};
      currentTemplate.sections.forEach(section => {
        section.fields.forEach(field => {
          if (field.autoFill && patientData[field.autoFill]) {
            initialData[field.name] = patientData[field.autoFill];
          } else {
            initialData[field.name] = field.type === 'checkbox' ? false : "";
          }
        });
      });
      setFormData(initialData);
    }
  }, [selectedProvider, patientData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        patientId: patientData?._id || patientData?.id || "64f1b2c3e4d5a67890123456",
        providerTemplateUsed: selectedProvider,
        providerSpecificData: formData
      };
      
      if (mode === "claim") {
        await insuranceService.createClaim(payload);
      } else {
        await insuranceService.createPreAuth(payload);
      }

      alert("Submitted successfully to " + currentTemplate.name + "! It is now registered in the HMS Database.");
    } catch (err) {
      alert("Submission failed: " + (err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="provider-form-renderer">
      <div className="form-selector">
        <label>Select Insurance Provider / Scheme Template:</label>
        <select 
          value={selectedProvider} 
          onChange={(e) => setSelectedProvider(e.target.value)}
        >
          {Object.keys(FORM_TEMPLATES).map(key => (
            <option key={key} value={key}>{FORM_TEMPLATES[key].name}</option>
          ))}
        </select>
      </div>

      <div className="form-paper">
        <div className="form-header">
          <h3>{currentTemplate.name}</h3>
          <p>Official Pre-Authorization / Claim Request Form</p>
        </div>

        <form onSubmit={handleSubmit}>
          {currentTemplate.sections.map((section, idx) => (
            <div key={idx} className="form-section">
              <h4>{section.title}</h4>
              <div className="fields-grid">
                {section.fields.map((field) => (
                  <div key={field.name} className={`field-group ${field.type === 'textarea' ? 'full-width' : ''}`}>
                    <label>
                      {field.label} {field.required && <span className="req">*</span>}
                    </label>

                    {field.type === 'text' || field.type === 'number' ? (
                      <input 
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        required={field.required}
                      />
                    ) : field.type === 'select' ? (
                      <select 
                        name={field.name} 
                        value={formData[field.name] || ""} 
                        onChange={handleChange}
                        required={field.required}
                      >
                        <option value="">-- Select --</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea 
                        name={field.name} 
                        value={formData[field.name] || ""} 
                        onChange={handleChange}
                        required={field.required}
                        rows="3"
                      ></textarea>
                    ) : field.type === 'checkbox' ? (
                      <input 
                        type="checkbox" 
                        name={field.name} 
                        checked={formData[field.name] || false} 
                        onChange={handleChange} 
                        className="checkbox-input"
                      />
                    ) : field.type === 'file' ? (
                      <input 
                        type="file" 
                        name={field.name} 
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.files[0]?.name || "Attached" }))} 
                        className="file-input"
                        required={field.required}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => window.print()}>🖨️ Print to PDF</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "📤 Submit to TPA / Insurer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderFormRenderer;
