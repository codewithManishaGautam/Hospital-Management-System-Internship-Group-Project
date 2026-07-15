import React from 'react';
import BaseFormLayout from './BaseFormLayout';
import { useInsuranceForm } from './useInsuranceForm';
import { renderFields } from './FormRendererUtils';
import { FORM_TEMPLATES } from '../insuranceFormTemplates';

const NivaBupaForm = ({ patientData, mode }) => {
  const template = FORM_TEMPLATES.NIVA_BUPA;
  const { formData, setFormData, handleChange, handleSubmit, loading } = useInsuranceForm(
    template.id, patientData, mode, template.sections
  );

  return (
    <BaseFormLayout
      title={template.name}
      subtitle={`Official ${mode === "claim" ? "Cashless Claim Form" : "Pre-Authorization Request Form"}`}
      pdfLink="Niva_Bupa_PreAuth_Form.pdf"
      mode={mode}
      loading={loading}
      onSubmit={(e) => handleSubmit(e, template.name)}
    >
      {renderFields(template.sections, formData, handleChange, setFormData)}
    </BaseFormLayout>
  );
};

export default NivaBupaForm;
