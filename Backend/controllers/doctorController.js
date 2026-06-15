const addDoctorPrescription = (req, res) => {
  // Payload from frontend PrescriptionForm.jsx
  // { patientUHID, medicines, instructions, doctorId, lab{required,testType}, scan{required,scanType}, createdAt }
  const payload = req.body || {};

  // Simple in-memory store (backend models are not wired in this project yet)
  global.__doctorPrescriptions = global.__doctorPrescriptions || [];

  const saved = {
    id: String(Date.now()),
    ...payload,
  };

  global.__doctorPrescriptions.push(saved);

  return res.status(201).json({
    message: "Prescription saved successfully",
    data: saved,
  });
};

module.exports = {
  addDoctorPrescription,
};

