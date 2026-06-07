import React, { useMemo, useState } from "react";
import DoctorLayoutShell from "../Components/Doctor/DoctorLayoutShell";

import DashboardCard from "../Components/Doctor/DashboardCard";

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
import EmergencyPanel from "../Components/Doctor/EmergencyPanel";

function Doctor() {
  const [step, setStep] = useState("dashboard");

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
    <DoctorLayoutShell
      step={step}
      onNavigate={(next) => setStep(next)}
      doctor={doctor}
      onLogout={handleLogout}
    >
      {step === "dashboard" && (
        <div>
          <div className="doctor-dashboard-grid">
            <div className="doctor-dashboard-card-col">
              <DashboardCard
                title="Total Patients"
                value={patients.length}
                icon="🧑 Patients"
                onClick={() => setStep("patients")}
              />
            </div>

            <div className="doctor-dashboard-card-col">
              <DashboardCard
                title="Today Appointments"
                value={upcomingAppointments.filter((a) => a.date === "Today").length}
                icon="📅"
                onClick={() => setStep("appointments")}
              />
            </div>

            <div className="doctor-dashboard-card-col">
              <DashboardCard
                title="Pending Reports"
                value={3}
                icon="🧪"
                onClick={() => setStep("reports")}
              />
            </div>

            <div className="doctor-dashboard-card-col" style={{ gridColumn: "span 9" }}>
              <div className="doctor-panel--inner">
                <div className="doctor-panel__header">
                  <div>
                    <p className="doctor-panel__title">Doctor Dashboard</p>
                    <p className="doctor-panel__subtitle">Quick actions & status overview</p>
                  </div>
                  <button className="doctor-btn" type="button" onClick={() => setStep("analytics")}>
                    View Analytics
                  </button>
                </div>

                <div className="doctor-analytics-row">
                  <AnalyticsCard
                    title="Appointments"
                    value={upcomingAppointments.length}
                    subtitle="Upcoming requests"
                  />
                  <AnalyticsCard
                    title="Patients"
                    value={patients.length}
                    subtitle="Active records"
                    accent="#2563eb"
                  />
                  <AnalyticsCard
                    title="Reports"
                    value={3}
                    subtitle="Uploaded/Reviewed"
                    accent="#1c53ab"
                  />
                </div>

                <div style={{ height: 14 }} />

                <div className="doctor-panel__header" style={{ marginBottom: 0 }}>
                  <div>
                    <p className="doctor-panel__title" style={{ fontSize: 16 }}>
                      Today Highlights
                    </p>
                    <p className="doctor-panel__subtitle">Fast navigation to key areas</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
                  <button className="doctor-btn" type="button" onClick={() => setStep("patients")}>
                    Patients
                  </button>
                  <button className="doctor-btn" type="button" onClick={() => setStep("appointments")}>
                    Appointments
                  </button>
                  <button className="doctor-btn" type="button" onClick={() => setStep("reports")}>
                    Pending Reports
                  </button>
                  <button className="doctor-btn doctor-btn--primary" type="button" onClick={() => setStep("emergency")}>
                    Emergency Cases
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


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
          onSubmit={() => alert("Prescription saved (UI placeholder).")}
        />
      )}

      {step === "emergency" && <EmergencyPanel patients={patients} />}

      {step === "reports" && (
        <ReportUpload
          patient={selectedPatient}
          onUpload={() => alert("Report uploaded (UI placeholder).")}
        />
      )}

      {step === "profile" && (
        <DoctorProfileCard
          doctor={doctor}
          onSave={() => alert("Profile updated (UI placeholder).")}
        />
      )}

      {step === "schedule" && (
        <div className="doctor-panel--inner">
          <div className="doctor-form__section-title">Doctor Schedule</div>
          <div className="doctor-hint">Mon-Fri 10:00 AM - 5:00 PM (UI placeholder)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12, marginTop: 14 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={d} style={{ textAlign: "center" }}>
                <div
                  style={{
                    borderRadius: 14,
                    padding: 12,
                    border: "1px solid rgba(37,99,235,.22)",
                    background: i < 5 ? "rgba(37,99,235,.12)" : "#f8fafc",
                    fontWeight: 900,
                    color: "#0f172a",
                  }}
                >
                  {d}
                </div>
                <div style={{ marginTop: 8, color: "#64748b", fontWeight: 800, fontSize: 12 }}>
                  {i < 5 ? "Clinic" : "Off"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "notifications" && (
        <div className="doctor-panel--inner">
          <div className="doctor-form__section-title">Notifications</div>
          <div className="doctor-hint">No new alerts (UI placeholder)</div>
          <div className="doctor-empty doctor-empty-block">You're all caught up.</div>
        </div>
      )}

      {step === "analytics" && (
        <div>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginTop: 12 }}>
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
    </DoctorLayoutShell>
  );
}

export default Doctor;

