import React, { useMemo, useState } from "react";
import Layout from "./Layout";

import "../styles/doctor/doctorCommon.css";
import "../styles/doctor/doctorDashboard.css";
import "../styles/doctor/patientManagement.css";
import "../styles/doctor/appointmentManagement.css";
import "../styles/doctor/prescriptionSystem.css";
import "../styles/doctor/medicalReports.css";
import "../styles/doctor/doctorProfile.css";
import "../styles/doctor/doctorAnalytics.css";
import "../styles/doctor/doctorSidebar.css";

import PatientTable from "../Components/Doctor/PatientTable";
import PatientDetailsModal from "../Components/Doctor/PatientDetailsModal";
import AppointmentCard from "../Components/Doctor/AppointmentCard";
import PrescriptionForm from "../Components/Doctor/PrescriptionForm";
import ReportUpload from "../Components/Doctor/ReportUpload";
import DoctorProfileCard from "../Components/Doctor/DoctorProfileCard";
import AnalyticsCard from "../Components/Doctor/AnalyticsCard";
import DoctorShell from "../Components/Doctor/DoctorShell";
import EmergencyPanel from "../Components/Doctor/EmergencyPanel";

function Doctor() {
  const [step, setStep] = useState("patients");
  const [patientQuery, setPatientQuery] = useState("");
  const [patientFilter, setPatientFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const doctor = useMemo(
    () => ({
      id: "d1",
      name: "Dr. A. Sharma",
      specialization: "Cardiology",
      experience: "8",
      availability: "Mon-Fri 10:00 AM - 5:00 PM",
      clinic: "City Heart Clinic",
    }),
    []
  );

  const patients = useMemo(
    () => [
      {
        uHID: "UHID-1029",
        name: "Rahul Verma",
        condition: "Cardiac",
        phone: "+91 98765 12345",
        lastVisit: "2026-05-20",
        status: "Pending",
        history: [
          { date: "2026-04-02", note: "Chest discomfort", treatment: "ECG + lifestyle changes" },
          { date: "2026-05-20", note: "Follow-up", treatment: "Beta blocker adjusted" },
        ],
      },
      {
        uHID: "UHID-1182",
        name: "Ananya Singh",
        condition: "Diabetes",
        phone: "+91 91234 55421",
        lastVisit: "2026-05-19",
        status: "Approved",
        history: [
          { date: "2026-03-11", note: "High HbA1c", treatment: "Metformin optimization" },
        ],
      },
      {
        uHID: "UHID-1210",
        name: "Vikram Rao",
        condition: "General",
        phone: "+91 99887 44321",
        lastVisit: "2026-05-18",
        status: "Critical",
        history: [
          { date: "2026-05-10", note: "Fever and fatigue", treatment: "Tests + supportive care" },
        ],
      },
    ],
    []
  );

  const upcomingAppointments = useMemo(
    () => [
      {
        id: "a1",
        patientName: "Rahul Verma",
        time: "10:30 AM",
        department: "Cardiology",
        date: "Today",
        status: "Pending",
      },
      {
        id: "a2",
        patientName: "Ananya Singh",
        time: "12:00 PM",
        department: "Endocrinology",
        date: "Today",
        status: "Accepted",
      },
      {
        id: "a3",
        patientName: "Vikram Rao",
        time: "3:15 PM",
        department: "General Medicine",
        date: "Tomorrow",
        status: "Pending",
      },
    ],
    []
  );

  function handleSelectPatient(p) {
    setSelectedPatient(p);
    setModalOpen(true);
  }

  function handleAcceptAppointment(appt) {
    alert(`Appointment accepted (UI placeholder): ${appt?.patientName || "patient"}`);
  }

  function handleRejectAppointment(appt) {
    alert(`Appointment rejected (UI placeholder): ${appt?.patientName || "patient"}`);
  }



  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <Layout role="Doctor" setStep={setStep}>
      <DoctorShell
        active={step}
        onNavigate={(next) => setStep(next)}
        doctor={doctor}
        onLogout={handleLogout}
      >
        {step === "patients" && (
          <PatientTable
            patients={patients}
            query={patientQuery}
            setQuery={setPatientQuery}
            filter={patientFilter}
            setFilter={setPatientFilter}
            onSelectPatient={(p) => handleSelectPatient(p)}
          />
        )}

        {step === "appointments" && (
          <div className="doctor-appts">
            <div className="doctor-appts__col">
              {upcomingAppointments.map((a) => (
                <AppointmentCard
                  key={a.id}
                  appt={a}
                  onAccept={() => handleAcceptAppointment(a)}
                  onReject={() => handleRejectAppointment(a)}
                />
              ))}
            </div>

            <div className="doctor-appts__side">
              <div className="doctor-calendar">
                <div className="doctor-calendar__title">Schedule Snapshot</div>
                <div className="doctor-hint" style={{ marginTop: 0 }}>
                  Lightweight calendar UI (placeholder)
                </div>
                <div className="doctor-calendar__grid" style={{ marginTop: 10 }}>
                  {[...Array(14)].map((_, i) => {
                    const isToday = i === 3;
                    const muted = i < 2;
                    return (
                      <div
                        key={i}
                        className={
                          "doctor-cal-cell" +
                          (muted ? " doctor-cal-cell--muted" : "") +
                          (isToday ? " doctor-cal-cell--today" : "")
                        }
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>


            </div>
          </div>
        )}

        {step === "prescriptions" && (
          <PrescriptionForm
            patient={selectedPatient}
            doctor={doctor}
            onSubmit={() => alert("Prescription saved (UI placeholder)." )}
          />
        )}

        {step === "emergency" && <EmergencyPanel patients={patients} />}

        {step === "reports" && (
          <ReportUpload
            patient={selectedPatient}
            onUpload={() => alert("Report uploaded (UI placeholder)." )}
          />
        )}

        {step === "profile" && (
          <DoctorProfileCard
            doctor={doctor}
            onSave={() => alert("Profile updated (UI placeholder)." )}
          />
        )}

        {step === "analytics" && (
          <div>
            <div className="doctor-panel__header">
              <div>
                <h3 className="doctor-panel__title">Doctor Analytics</h3>
                <p className="doctor-panel__subtitle">Performance overview (lightweight)</p>
              </div>
              <div className="doctor-panel__actions">
                <button className="doctor-btn" type="button" onClick={() => setStep("patients")}>Back</button>
              </div>
            </div>

            <div className="doctor-analytics-row">
              <AnalyticsCard
                title="Appointments"
                value={upcomingAppointments.length}
                subtitle="Upcoming requests"
              />
              <AnalyticsCard title="Patients" value={patients.length} subtitle="Active records" accent="#2563eb" />
              <AnalyticsCard title="Reports" value={3} subtitle="Uploaded/Reviewed" accent="#1c53ab" />
            </div>

            <div style={{ height: 14 }} />
            <div className="doctor-panel--inner">
              <div className="doctor-form__section-title">Weekly Statistics (Placeholder)</div>
              <div className="doctor-hint" style={{ marginTop: 0 }}>
                Add chart integration later if backend/stat endpoints exist.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10, marginTop: 12 }}>
                {[60, 72, 55, 80, 68, 74, 90].map((v, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        height: v,
                        background: "rgba(37,99,235,.15)",
                        border: "1px solid rgba(37,99,235,.22)",
                        borderRadius: 12,
                      }}
                    />
                    <div
                      style={{
                        marginTop: 8,
                        color: "#64748b",
                        fontWeight: 900,
                        fontSize: 12,
                      }}
                    >
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DoctorShell>

      {modalOpen && selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setModalOpen(false)}
          onAddPrescription={(p) => {
            setSelectedPatient(p);
            setModalOpen(false);
            setStep("prescriptions");
          }}
        />
      )}
    </Layout>
  );
}

export default Doctor;

