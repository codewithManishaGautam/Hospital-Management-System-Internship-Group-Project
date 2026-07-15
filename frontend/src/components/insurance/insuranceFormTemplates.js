export const FORM_TEMPLATES = {
  "IRDAI_STANDARD": {
    "id": "IRDAI_STANDARD",
    "name": "IRDAI Standard Private Insurance",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "MEDI_ASSIST": {
    "id": "MEDI_ASSIST",
    "name": "Medi Assist Cashless Request",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "LIBERTY_GENERAL": {
    "id": "LIBERTY_GENERAL",
    "name": "Liberty General Insurance Cashless Request",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "ICICI_LOMBARD": {
    "id": "ICICI_LOMBARD",
    "name": "ICICI Lombard Cashless Request",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          },
          {
            "name": "ntCode",
            "label": "ICICI NT Code",
            "type": "text"
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          },
          {
            "name": "idProofType",
            "label": "ID/Age Proof Attached",
            "type": "select",
            "options": [
              "Aadhar Card",
              "Passport",
              "Driving License",
              "10th Class Certificate",
              "Others"
            ]
          },
          {
            "name": "idProofUpload",
            "label": "Upload ID Proof",
            "type": "file",
            "condition": {
              "dependsOn": "idProofType",
              "value": [
                "Aadhar Card",
                "Passport",
                "Driving License",
                "10th Class Certificate",
                "Others"
              ]
            }
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "NIVA_BUPA": {
    "id": "NIVA_BUPA",
    "name": "Niva Bupa Cashless Request",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          },
          {
            "name": "helplineNumber",
            "label": "Customer Helpline Number",
            "type": "text"
          },
          {
            "name": "faxEmail",
            "label": "Fax no./Email ID",
            "type": "text"
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "HEALTHINDIA_TPA": {
    "id": "HEALTHINDIA_TPA",
    "name": "HealthIndia TPA Cashless Request",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "HEALTHINDIA_BANK_DETAILS": {
    "id": "HEALTHINDIA_BANK_DETAILS",
    "name": "HealthIndia TPA Bank Details (NEFT/RTGS)",
    "sections": [
      {
        "title": "Bank Details for NEFT / RTGS",
        "fields": [
          {
            "name": "policyNumber",
            "label": "Policy No/Certif No",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "policyHolderName",
            "label": "Policy Holder's Name",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "address",
            "label": "Address",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "telephone",
            "label": "Telephone No",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "email",
            "label": "Email ID",
            "type": "email",
            "required": true
          },
          {
            "name": "hiidNo",
            "label": "HIID No",
            "type": "text"
          },
          {
            "name": "claimNo",
            "label": "Claim No",
            "type": "text"
          },
          {
            "name": "accountHolderName",
            "label": "Name of Account Holder",
            "type": "text",
            "required": true
          },
          {
            "name": "bankName",
            "label": "Name of Bank",
            "type": "text",
            "required": true
          },
          {
            "name": "branchName",
            "label": "Branch Name",
            "type": "text",
            "required": true
          },
          {
            "name": "branchAddress",
            "label": "Branch Address",
            "type": "textarea",
            "required": true
          },
          {
            "name": "accountType",
            "label": "Type of Account: SB/CD",
            "type": "select",
            "options": [
              "SB",
              "CD"
            ],
            "required": true
          },
          {
            "name": "accountNo",
            "label": "Account No",
            "type": "text",
            "required": true
          },
          {
            "name": "micrCode",
            "label": "MICR Code",
            "type": "text"
          },
          {
            "name": "ifscCode",
            "label": "IFSC Code",
            "type": "text",
            "required": true
          },
          {
            "name": "cancelledCheque",
            "label": "Cancelled Cheque Attached?",
            "type": "select",
            "options": [
              "Y",
              "N"
            ],
            "required": true
          },
          {
            "name": "bedNumber",
            "label": "Bed Number",
            "type": "text"
          },
          {
            "name": "date",
            "label": "Date",
            "type": "date",
            "required": true
          },
          {
            "name": "place",
            "label": "Place",
            "type": "text",
            "required": true
          }
        ]
      }
    ]
  },
  "BAJAJ_ALLIANZ": {
    "id": "BAJAJ_ALLIANZ",
    "name": "Bajaj Allianz General Insurance",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          },
          {
            "name": "ckycProposer",
            "label": "CKYC of the Proposer",
            "type": "text"
          },
          {
            "name": "ckycConsent",
            "label": "Consent/Declaration for CKYC uploaded?",
            "type": "file"
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "EAST_WEST_ASSIST": {
    "id": "EAST_WEST_ASSIST",
    "name": "East West Assist Insurance TPA",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "INDUSIND_GENERAL": {
    "id": "INDUSIND_GENERAL",
    "name": "IndusInd General Insurance",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          },
          {
            "name": "panNo",
            "label": "PAN No",
            "type": "text",
            "required": false
          },
          {
            "name": "monthlyIncome",
            "label": "Monthly Income",
            "type": "text",
            "required": false
          },
          {
            "name": "sourceOfFunds",
            "label": "Source of Funds",
            "type": "text",
            "required": false
          },
          {
            "name": "pepDeclaration",
            "label": "PEP Declaration (Are you a Politically Exposed Person?)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": false
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "PARAMOUNT_HEALTH": {
    "id": "PARAMOUNT_HEALTH",
    "name": "Paramount Health Services TPA",
    "sections": [
      {
        "title": "Details of Third Party Administrator / Hospital",
        "fields": [
          {
            "name": "hospitalName",
            "label": "Name of Hospital",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalAddress",
            "label": "Address",
            "type": "text",
            "required": true
          },
          {
            "name": "rohiniId",
            "label": "Rohini ID",
            "type": "text",
            "required": true
          },
          {
            "name": "hospitalEmail",
            "label": "E-mail ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Insured/Patient",
        "fields": [
          {
            "name": "patientName",
            "label": "Name of the Patient",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "gender",
            "label": "Gender",
            "type": "select",
            "options": [
              "Male",
              "Female",
              "Third Gender"
            ],
            "required": true,
            "autoFill": "gender"
          },
          {
            "name": "ageYears",
            "label": "Age (Years)",
            "type": "number",
            "required": true,
            "autoFill": "age"
          },
          {
            "name": "ageMonths",
            "label": "Age (Months)",
            "type": "number"
          },
          {
            "name": "dob",
            "label": "Date of Birth",
            "type": "date",
            "required": true,
            "autoFill": "dob"
          },
          {
            "name": "contact",
            "label": "Contact Number",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "relativeContact",
            "label": "Contact number of attending Relative",
            "type": "text"
          },
          {
            "name": "cardNumber",
            "label": "Insured Card ID number",
            "type": "text",
            "required": true,
            "autoFill": "cardNumber"
          },
          {
            "name": "policyNumber",
            "label": "Policy number/Name of Corporate",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "employeeId",
            "label": "Employee ID",
            "type": "text"
          },
          {
            "name": "hasOtherInsurance",
            "label": "Currently do you have any other mediclaim / health insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "otherInsuranceName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "otherInsuranceDetails",
            "label": "Give Details",
            "type": "text",
            "condition": {
              "dependsOn": "hasOtherInsurance",
              "value": "Yes"
            }
          },
          {
            "name": "hasFamilyPhysician",
            "label": "Do you have a family Physician?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "required": true
          },
          {
            "name": "familyPhysicianName",
            "label": "Name of the Family Physician",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "familyPhysicianContact",
            "label": "Contact number, if any",
            "type": "text",
            "condition": {
              "dependsOn": "hasFamilyPhysician",
              "value": "Yes"
            }
          },
          {
            "name": "patientAddress",
            "label": "Current Address of Insured Patient",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "patientOccupation",
            "label": "Occupation of Insured Patient",
            "type": "text",
            "required": true
          }
        ]
      },
      {
        "title": "To Be Filled By Treating Doctor / Hospital",
        "fields": [
          {
            "name": "treatingDoctorName",
            "label": "Name of the treating Doctor",
            "type": "text",
            "required": true
          },
          {
            "name": "treatingDoctorContact",
            "label": "Contact Number",
            "type": "text",
            "required": true
          },
          {
            "name": "clinicalDiagnosis",
            "label": "Nature of Illness / Disease with presenting complaint",
            "type": "textarea",
            "required": true
          },
          {
            "name": "clinicalFindings",
            "label": "Relevant Critical Findings",
            "type": "textarea",
            "required": true
          },
          {
            "name": "durationOfAilment",
            "label": "Duration of the present ailment (Days)",
            "type": "number",
            "required": true
          },
          {
            "name": "firstConsultationDate",
            "label": "Date of First consultation",
            "type": "date",
            "required": true
          },
          {
            "name": "pastHistory",
            "label": "Past history of present ailment, if any",
            "type": "textarea"
          },
          {
            "name": "provisionalDiagnosis",
            "label": "Provisional diagnosis",
            "type": "text",
            "required": true
          },
          {
            "name": "icd10Code",
            "label": "ICD 10 code",
            "type": "text",
            "required": true
          },
          {
            "name": "proposedTreatment",
            "label": "Proposed line of treatment",
            "type": "select",
            "options": [
              "Medical Management",
              "Surgical Management",
              "Intensive care",
              "Investigation",
              "Non-allopathic treatment"
            ],
            "required": true
          },
          {
            "name": "drugAdministrationRoute",
            "label": "Route of Drug Administration",
            "type": "select",
            "options": [
              "IV",
              "Oral",
              "Other"
            ],
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": [
                "Medical Management",
                "Investigation"
              ]
            }
          },
          {
            "name": "drugAdministrationRouteOther",
            "label": "Specify Other Route",
            "type": "text",
            "condition": {
              "dependsOn": "drugAdministrationRoute",
              "value": "Other"
            }
          },
          {
            "name": "surgeryName",
            "label": "If surgical, name of surgery",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "icd10PcsCode",
            "label": "ICD 10 PCS code",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Surgical Management"
            }
          },
          {
            "name": "otherTreatmentDetails",
            "label": "If other treatment, provide details",
            "type": "text",
            "condition": {
              "dependsOn": "proposedTreatment",
              "value": "Non-allopathic treatment"
            }
          },
          {
            "name": "injuryCause",
            "label": "How did injury occur",
            "type": "text"
          },
          {
            "name": "isRta",
            "label": "In case of accident: Is it RTA?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "injuryDate",
            "label": "Date of Injury",
            "type": "date",
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "policeReport",
            "label": "Report to Police",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "isRta",
              "value": "Yes"
            }
          },
          {
            "name": "firNo",
            "label": "FIR NO.",
            "type": "text",
            "condition": {
              "dependsOn": "policeReport",
              "value": "Yes"
            }
          },
          {
            "name": "substanceAbuse",
            "label": "Injury / Disease caused due to substance abuse/alcohol consumption",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "testConducted",
            "label": "Test conducted to establish this (if yes, attach report)",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ],
            "condition": {
              "dependsOn": "substanceAbuse",
              "value": "Yes"
            }
          },
          {
            "name": "isMaternity",
            "label": "Is it a maternity case?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "maternityG",
            "label": "Gravida (G)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityP",
            "label": "Para (P)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityL",
            "label": "Live (L)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "maternityA",
            "label": "Abortion (A)",
            "type": "number",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          },
          {
            "name": "expectedDeliveryDate",
            "label": "Expected date of Delivery",
            "type": "date",
            "condition": {
              "dependsOn": "isMaternity",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Patient Admitted",
        "fields": [
          {
            "name": "admissionDate",
            "label": "Date of admission",
            "type": "date",
            "required": true
          },
          {
            "name": "admissionTime",
            "label": "Time of admission (HH:MM)",
            "type": "time",
            "required": true
          },
          {
            "name": "admissionType",
            "label": "Is this an emergency / planned hospitalization event?",
            "type": "select",
            "options": [
              "Emergency",
              "Planned"
            ],
            "required": true
          },
          {
            "name": "expectedDays",
            "label": "Expected number of Days / stay in hospital",
            "type": "number",
            "required": true
          },
          {
            "name": "daysInIcu",
            "label": "Days in ICU",
            "type": "number"
          },
          {
            "name": "roomCategory",
            "label": "Room Type",
            "type": "text",
            "required": true
          },
          {
            "name": "roomRentPerDay",
            "label": "Per day room rent + nursing and service charges + patients diet",
            "type": "number",
            "required": true
          },
          {
            "name": "investigationsCost",
            "label": "Expected cost of investigation + diagnostic",
            "type": "number",
            "required": true
          },
          {
            "name": "icuCharges",
            "label": "ICU charges",
            "type": "number"
          },
          {
            "name": "otCharges",
            "label": "OT charges",
            "type": "number"
          },
          {
            "name": "professionalFees",
            "label": "Professional fees Surgeon + Anesthetist Fees + Consultation Charges",
            "type": "number",
            "required": true
          },
          {
            "name": "medicinesConsumables",
            "label": "Medicines + Consumables + Cost of Implants",
            "type": "number",
            "required": true
          },
          {
            "name": "otherHospitalExpenses",
            "label": "Other hospital expenses if any",
            "type": "number"
          },
          {
            "name": "allInclusivePackage",
            "label": "All - inclusive package charges if any applicable",
            "type": "number"
          },
          {
            "name": "totalEstimatedCost",
            "label": "Sum Total expected cost of hospitalization",
            "type": "number",
            "required": true
          }
        ]
      }
    ]
  },
  "GENERIC_REIMBURSEMENT_CLAIM": {
    "id": "GENERIC_REIMBURSEMENT_CLAIM",
    "name": "Standard Reimbursement Claim Form",
    "sections": [
      {
        "title": "Details of Primary Insured",
        "fields": [
          {
            "name": "policyNo",
            "label": "Policy No",
            "type": "text",
            "required": true,
            "autoFill": "policyNumber"
          },
          {
            "name": "tpaId",
            "label": "TPA ID No",
            "type": "text"
          },
          {
            "name": "insuredName",
            "label": "Name",
            "type": "text",
            "required": true,
            "autoFill": "name"
          },
          {
            "name": "address",
            "label": "Address",
            "type": "textarea",
            "required": true,
            "autoFill": "address"
          },
          {
            "name": "city",
            "label": "City",
            "type": "text",
            "required": true
          },
          {
            "name": "state",
            "label": "State",
            "type": "text",
            "required": true
          },
          {
            "name": "pinCode",
            "label": "Pin Code",
            "type": "text",
            "required": true
          },
          {
            "name": "phoneNo",
            "label": "Phone No",
            "type": "text",
            "required": true,
            "autoFill": "mobile"
          },
          {
            "name": "email",
            "label": "Email ID",
            "type": "email",
            "required": true
          }
        ]
      },
      {
        "title": "Details of Insurance History",
        "fields": [
          {
            "name": "currentlyCovered",
            "label": "Currently covered by any other Mediclaim / Health Insurance?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "otherCompanyName",
            "label": "Company Name (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "currentlyCovered",
              "value": "Yes"
            }
          },
          {
            "name": "otherPolicyNo",
            "label": "Policy No",
            "type": "text",
            "condition": {
              "dependsOn": "currentlyCovered",
              "value": "Yes"
            }
          },
          {
            "name": "otherSumInsured",
            "label": "Sum Insured (Rs.)",
            "type": "number",
            "condition": {
              "dependsOn": "currentlyCovered",
              "value": "Yes"
            }
          },
          {
            "name": "hospitalizedLast4Years",
            "label": "Have you been hospitalized in the last four years?",
            "type": "select",
            "options": [
              "Yes",
              "No"
            ]
          },
          {
            "name": "diagnosisLast4Years",
            "label": "Diagnosis (If yes)",
            "type": "text",
            "condition": {
              "dependsOn": "hospitalizedLast4Years",
              "value": "Yes"
            }
          }
        ]
      },
      {
        "title": "Details of Claim",
        "fields": [
          {
            "name": "preHospitalizationExp",
            "label": "Pre-hospitalization expenses (Rs.)",
            "type": "number"
          },
          {
            "name": "hospitalizationExp",
            "label": "Hospitalization expenses (Rs.)",
            "type": "number"
          },
          {
            "name": "postHospitalizationExp",
            "label": "Post-hospitalization expenses (Rs.)",
            "type": "number"
          },
          {
            "name": "healthCheckupCost",
            "label": "Health-Check up cost (Rs.)",
            "type": "number"
          },
          {
            "name": "ambulanceCharges",
            "label": "Ambulance Charges (Rs.)",
            "type": "number"
          },
          {
            "name": "otherCharges",
            "label": "Others (Rs.)",
            "type": "number"
          },
          {
            "name": "totalClaim",
            "label": "Total Claim Amount (Rs.)",
            "type": "number",
            "required": true
          }
        ]
      },
      {
        "title": "Details of Bills Enclosed",
        "fields": [
          {
            "name": "billsEnclosed",
            "label": "Checklist of Bills Enclosed",
            "type": "textarea",
            "required": true
          }
        ]
      },
      {
        "title": "Details of Primary Insured's Bank Account",
        "fields": [
          {
            "name": "pan",
            "label": "PAN",
            "type": "text",
            "required": true
          },
          {
            "name": "accountNumber",
            "label": "Account Number",
            "type": "text",
            "required": true
          },
          {
            "name": "bankName",
            "label": "Bank Name and Branch",
            "type": "text",
            "required": true
          },
          {
            "name": "ifscCode",
            "label": "IFSC Code",
            "type": "text",
            "required": true
          }
        ]
      }
    ]
  }
};
