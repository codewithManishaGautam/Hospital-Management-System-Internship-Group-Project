import React from 'react';

export const renderFields = (sections, formData, handleChange, setFormData, errors = {}) => {
  return sections.map((section, idx) => (
    <div key={idx} className="form-section">
      <h4>{section.title}</h4>
      <div className="fields-grid">
        {section.fields.map((field) => (
          <div key={field.name} className={`field-group ${field.type === 'textarea' ? 'full-width' : ''}`}>
            <label>
              {field.label} {field.required && <span className="req">*</span>}
            </label>

            {field.type === 'text' || field.type === 'number' || field.type === 'date' || field.type === 'time' ? (
              <input 
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                className={errors[field.name] ? 'input-error' : ''}
                style={errors[field.name] ? { borderColor: '#e74c3c', backgroundColor: '#fdf0ed' } : {}}
              />
            ) : field.type === 'select' ? (
              <select 
                name={field.name} 
                value={formData[field.name] || ""} 
                onChange={handleChange}
                required={field.required}
                className={errors[field.name] ? 'input-error' : ''}
                style={errors[field.name] ? { borderColor: '#e74c3c', backgroundColor: '#fdf0ed' } : {}}
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
                className={errors[field.name] ? 'input-error' : ''}
                style={errors[field.name] ? { borderColor: '#e74c3c', backgroundColor: '#fdf0ed' } : {}}
              ></textarea>
            ) : field.type === 'checkbox' ? (
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  name={field.name} 
                  checked={formData[field.name] || false} 
                  onChange={handleChange} 
                  className={`checkbox-input ${errors[field.name] ? 'input-error' : ''}`}
                />
                <span className="checkbox-label" style={errors[field.name] ? { color: '#e74c3c' } : {}}>Yes</span>
              </div>
            ) : field.type === 'file' ? (
              <input 
                type="file" 
                name={field.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.files[0]?.name || "Attached" }))} 
                className={`file-input ${errors[field.name] ? 'input-error' : ''}`}
                required={field.required}
              />
            ) : null}
            
            {errors[field.name] && (
              <div className="error-message" style={{ color: '#e74c3c', fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ⚠️ This field is required
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  ));
};
