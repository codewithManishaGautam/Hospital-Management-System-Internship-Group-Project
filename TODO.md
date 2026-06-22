# TODO
- [x] Add lazy-loading (React.lazy + Suspense) ONLY inside Doctor module (Doctor folder / related realte files). No new folders/files.
- [x] Update `frontend/src/pages/Doctor.jsx` to lazy-load heavy doctor subcomponents: PatientTable, PatientDetailsModal, AppointmentCard, PrescriptionForm, ReportUpload, DoctorProfileCard, AnalyticsCard, EmergencyPanel, DoctorDashboardSummaryGrid, DoctorDashboardSection.
- [x] Add a lightweight fallback UI using Suspense.
- [x] Remove direct imports for those lazy-loaded components.
- [ ] Run frontend build/test (npm test/build) to ensure no runtime/compile errors.


