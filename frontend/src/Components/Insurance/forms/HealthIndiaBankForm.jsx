import React from 'react';
import BaseFormLayout from './BaseFormLayout';
import { useInsuranceForm } from './useInsuranceForm';
import { renderFields } from './FormRendererUtils';
import { FORM_TEMPLATES } from '../insuranceFormTemplates';

const HealthIndiaBankForm = ({ patientData, mode }) => {
  const template = FORM_TEMPLATES.HEALTHINDIA_BANK_DETAILS;
  const { formData, setFormData, handleChange, handleSubmit, loading, errors } = useInsuranceForm(
    template.id, patientData, mode, template.sections
  );

  return (
    <BaseFormLayout
      title={template.name}
      subtitle={`Official NEFT / RTGS Bank Details Form`}
      pdfLink="HealthIndia_Bank_Details.pdf"
      mode={mode}
      loading={loading}
      onSubmit={(e) => handleSubmit(e, template.name)}
    >
      <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #3498db' }}>
        <h4 style={{ margin: 0, color: '#2980b9' }}>💡 Strict Validation Mode Enabled</h4>
        <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#34495e' }}>All fields marked with a red asterisk (*) are mandatory. The form will not submit if they are missed.</p>
      </div>
      
      {renderFields(template.sections, formData, handleChange, setFormData, errors)}
    </BaseFormLayout>
  );
};

export default HealthIndiaBankForm;
