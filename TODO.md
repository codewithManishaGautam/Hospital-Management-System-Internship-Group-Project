# Doctor Module TODO

## Planned changes (approved)
- [x] Understand existing Doctor module UI structure (Doctor.jsx, PrescriptionForm, PatientDetailsModal).
- [x] Update `frontend/src/Components/Doctor/PrescriptionForm.jsx`:
  - [x] Add dropdowns for **Needs Lab Test?** + **Lab Test Type** (4 options)
  - [x] Add dropdowns for **Needs Scan?** + **Scan Type** (4 options)
  - [x] Include selected Lab/Scan order info in preview + payload.
- [ ] Update `frontend/src/pages/Doctor.jsx` only if needed to pass/route data (likely none required).
- [x] Update `frontend/src/Components/Doctor/PatientDetailsModal.jsx` prescription tab text/CTA (optional, UI clarity).


- [ ] Style updates in `frontend/src/styles/doctor/prescriptionSystem.css` (only if dropdown layout looks bad).

- [x] Run/verify frontend build & check Doctor → patient → prescription → print/download includes Lab/Scan orders.



