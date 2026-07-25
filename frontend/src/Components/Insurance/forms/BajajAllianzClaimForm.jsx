import React from 'react';
import BaseFormLayout from './BaseFormLayout';
import { useInsuranceForm } from './useInsuranceForm';
import { renderFields } from './FormRendererUtils';
import { FORM_TEMPLATES } from '../insuranceFormTemplates';

const BajajAllianzClaimForm = ({ patientData, mode }) => {
  const template = FORM_TEMPLATES.BAJAJ_ALLIANZ_CLAIM;
  const { formData, setFormData, handleChange, handleSubmit, loading } = useInsuranceForm(
    template.id, patientData, mode, template.sections
  );

  return (
    <BaseFormLayout
      title={template.name}
      subtitle="Official Reimbursement Claim Form"
      pdfLink="Bajaj_Allianz_Claim_Form.pdf"
      mode={mode}
      loading={loading}
      onSubmit={(e) => handleSubmit(e, template.name)}
    >
      {renderFields(template.sections, formData, handleChange, setFormData)}
    </BaseFormLayout>
  );
};

export default BajajAllianzClaimForm;
