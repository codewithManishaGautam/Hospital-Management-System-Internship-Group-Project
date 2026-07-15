import React, { useMemo } from 'react';
import BaseFormLayout from './BaseFormLayout';
import { useInsuranceForm } from './useInsuranceForm';
import { renderFields } from './FormRendererUtils';
import { FORM_TEMPLATES } from '../insuranceFormTemplates';

const UniversalInsuranceForm = ({ patientData, mode, providerKey }) => {
  // Determine which template to use
  const template = FORM_TEMPLATES[providerKey] || FORM_TEMPLATES.IRDAI_STANDARD;
  
  const { formData, setFormData, handleChange, handleSubmit, loading, errors } = useInsuranceForm(
    template.id, patientData, mode, template.sections
  );

  // Filter sections conditionally based on formData (e.g. proposedTreatment, maternity, etc.)
  const dynamicSections = useMemo(() => {
    return template.sections.map(section => {
      const filteredFields = section.fields.filter(field => {
        // Conditionals:
        if (field.condition) {
          if (field.condition.dependsOn) {
            const depValue = formData[field.condition.dependsOn];
            if (Array.isArray(field.condition.value)) {
              return field.condition.value.includes(depValue);
            }
            return depValue === field.condition.value;
          }
        }
        return true;
      });
      return { ...section, fields: filteredFields };
    });
  }, [template, formData]);

  return (
    <BaseFormLayout
      title={template.name}
      subtitle={`Official ${mode === "claim" ? "Claim Form" : "Pre-Authorization Request Form"}`}
      pdfLink={`${providerKey}_Form.pdf`}
      mode={mode}
      loading={loading}
      onSubmit={(e) => handleSubmit(e, template.name)}
    >
      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #3498db' }}>
        <h4 style={{ margin: 0, color: '#2980b9' }}>💡 Strict Validation Mode Enabled</h4>
        <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#34495e' }}>All fields marked with a red asterisk (*) are mandatory. The form will not submit if they are missed.</p>
      </div>
      
      {renderFields(dynamicSections, formData, handleChange, setFormData, errors)}
    </BaseFormLayout>
  );
};

export default UniversalInsuranceForm;
