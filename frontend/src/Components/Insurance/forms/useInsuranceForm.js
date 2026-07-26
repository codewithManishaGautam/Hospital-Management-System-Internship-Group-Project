import { useState, useEffect } from 'react';
import { insuranceService } from '../../../services/insuranceService';

export const useInsuranceForm = (providerId, patientData, mode, templateSections) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patientData && templateSections) {
      const initialData = {};
      templateSections.forEach(section => {
        section.fields.forEach(field => {
          if (field.autoFill && patientData[field.autoFill]) {
            initialData[field.name] = patientData[field.autoFill];
          } else {
            initialData[field.name] = field.type === 'checkbox' ? false : "";
          }
        });
      });
      // Set defaults for common medical fields
      if (!initialData.clinicalDiagnosis) initialData.clinicalDiagnosis = "Acute illness evaluation";
      if (!initialData.icd10Code) initialData.icd10Code = "Z00.00";
      if (!initialData.roomRentPerDay) initialData.roomRentPerDay = 3500;
      if (!initialData.estimatedStay) initialData.estimatedStay = 3;
      if (!initialData.totalEstimatedCost) initialData.totalEstimatedCost = 15000;
      
      setFormData(initialData);
    }
  }, [providerId, patientData, templateSections]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Auto-calculate total cost
      if (name === "roomRentPerDay" || name === "estimatedStay") {
        const rent = Number(name === "roomRentPerDay" ? value : prev.roomRentPerDay || 0);
        const stay = Number(name === "estimatedStay" ? value : prev.estimatedStay || 0);
        updated.totalEstimatedCost = rent * stay + (Number(prev.professionalFees || prev.treatmentCharges || 0));
      }
      return updated;
    });
  };

  const handleSubmit = async (e, providerName) => {
    e.preventDefault();

    // Strict Client-Side Validation
    const newErrors = {};
    let hasErrors = false;
    
    templateSections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required) {
          const val = formData[field.name];
          if (val === undefined || val === null || val === "") {
            newErrors[field.name] = true;
            hasErrors = true;
          }
        }
      });
    });

    if (hasErrors) {
      setErrors(newErrors);
      alert("Please fill in all required fields marked in red.");
      return;
    }

    setLoading(true);
    try {
      // Resolve required fields for the backend schemas dynamically from form data
      const docName = formData.treatingDoctorName || formData.treatingDoctor || formData.admittingDoctor || patientData?.admittingDoctor || "Attending Physician";
      const diagnosisText = formData.clinicalDiagnosis || formData.natureOfIllness || formData.provisionalDiagnosis || formData.chiefComplaints || formData.diagnosisText || formData.diagnosis || "Provisional Diagnosis";
      const treatmentText = formData.proposedTreatment || formData.proposedLineOfTreatment || formData.proposedProcedure || formData.treatmentType || formData.procedureDescription || formData.clinicalNotes || "Medical Management";
      const estCost = Number(formData.totalEstimatedCost || formData.totalEstimate || formData.totalClaimAmount || formData.totalNivaBupaEstimate || formData.estimatedTotal || formData.totalEstimateCost || formData.totalBillAmount || 10000);

      // Resolve dates
      const admDate = formData.firstConsultationDate || formData.hospitalizationDate || formData.admissionDate || new Date().toISOString().split('T')[0];
      const disDate = formData.dischargeDate || new Date(new Date(admDate).getTime() + (Number(formData.estimatedStay || formData.durationOfAilment || 3) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

      const payload = {
        patientId: patientData?._id || patientData?.id || "64f1b2c3e4d5a67890123456",
        providerTemplateUsed: providerId,
        providerSpecificData: formData,
        
        admittingDoctor: docName,
        treatingDoctor: docName,
        diagnosis: diagnosisText,
        proposedTreatment: treatmentText,
        estimatedCost: estCost,
        
        claimType: formData.claimType || "Cashless",
        admissionDate: admDate,
        dischargeDate: disDate,
        totalBilledAmount: estCost,
        claimedAmount: estCost
      };

      if (patientData?.policyId) {
        payload.policyId = patientData.policyId;
      }
      if (patientData?.schemeId) {
        payload.schemeId = patientData.schemeId;
      }

      if (mode === "claim") {
        const res = await insuranceService.createClaim(payload);
        alert(`Claim submitted successfully to ${providerName}! Generated Claim No: ${res.data?.data?.claimNumber || 'N/A'}`);
      } else {
        await insuranceService.createPreAuth(payload);
        alert(`Pre-Authorization request successfully submitted to ${providerName}!`);
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed: " + (err.response?.data?.error || err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return { formData, setFormData, handleChange, handleSubmit, loading, errors };
};
