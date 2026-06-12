import React, { useMemo, useState } from "react";
import DoctorLayoutShell from "../Components/Doctor/DoctorLayoutShell";

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

import DoctorDashboardSummaryGrid from "../Components/Doctor/DoctorDashboardSummaryGrid";
import DoctorDashboardSection from "../Components/Doctor/DoctorDashboardSection";







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
        date: "2026-06-07",
        symptoms: "Chest discomfort, fatigue",
        status: "Pending",
      },
      {
        id: "a2",
        patientName: "Ananya Singh",
        time: "12:00 PM",
        department: "Endocrinology",
        date: "2026-06-07",
        symptoms: "Frequent urination, thirst",
        status: "Accepted",
      },
      {
        id: "a3",
        patientName: "Vikram Rao",
        time: "3:15 PM",
        department: "General Medicine",
        date: "2026-06-08",
        symptoms: "Fever and body ache",
        status: "Pending",
      },
      {
        id: "a4",
        patientName: "Sanya Gupta",
        time: "5:10 PM",
        department: "Cardiology",
        date: "2026-06-08",
        symptoms: "Palpitations",
        status: "Completed",
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
        <div className="doctor-dashboard" aria-label="Doctor dashboard">
          <div className="doctor-dashboard__top">
            <DoctorDashboardSection
              title="Doctor Overview"
              subtitle="Today at a glance"
            >
              <DoctorDashboardSummaryGrid
                cards={[
                  {
                    title: "Appointments",
                    value: upcomingAppointments.length,
                    icon: "📅",
                    accent: "#2563eb",
                    onClick: () => setStep("appointments"),
                    description: "Upcoming requests",
                  },
                  {
                    title: "Active Patients",
                    value: patients.length,
                    icon: "🧑‍⚕️",
                    accent: "#1c53ab",
                    onClick: () => setStep("patients"),
                    description: "Patients in your records",
                  },
                  {
                    title: "Pending Reports",
                    value: 3,
                    icon: "📝",
                    accent: "#0ea5e9",
                    onClick: () => setStep("reports"),
                    description: "Uploaded/awaiting review",
                  },
                  {
                    title: "Emergency Cases",
                    value: 1,
                    icon: "🚨",
                    accent: "#ef4444",
                    onClick: () => setStep("emergency"),
                    description: "Recent alerts & notifications",
                  },
                ]}
              />
            </DoctorDashboardSection>
          </div>

          <div className="doctor-dashboard__middle">

            <div className="doctor-dashboard__col doctor-dashboard__col--wide">
              <DoctorDashboardSection
                title="Upcoming Appointments"
                subtitle="Next 48 hours"
                right={
                  <button
                    className="doctor-btn doctor-btn--primary"
                    type="button"
                    onClick={() => setStep("appointments")}
                  >
                    View all
                  </button>
                }
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {upcomingAppointments.slice(0, 3).map((a) => (
                    <AppointmentCard
                      key={a.id}
                      appt={a}
                      onAccept={() => handleAcceptAppointment(a)}
                      onReject={() => handleRejectAppointment(a)}
                    />
                  ))}
                  {upcomingAppointments.length === 0 ? (
                    <div className="doctor-empty">No appointments yet.</div>
                  ) : null}
                </div>
              </DoctorDashboardSection>
            </div>

            <div className="doctor-dashboard__col doctor-dashboard__col--narrow">
              {/* Keep section widths consistent with other dashboard cards */}
              <DoctorDashboardSection
                title="Recent Patients"

                subtitle="Quick access"
                right={
                  <button
                    className="doctor-btn"
                    type="button"
                    onClick={() => setStep("patients")}
                  >
                    Open
                  </button>
                }
              >
                <div className="doctor-recentPatients">
                  {patients.slice(0, 3).map((p) => (
                    <div key={p.uHID} className="doctor-recentPatients__item">
                      <div className="doctor-recentPatients__meta">
                        <div style={{ fontWeight: 950, color: "#0f172a", fontSize: 13 }}>
                          {p.name}
                        </div>
                        <div style={{ color: "var(--doctor-muted)", fontWeight: 800, fontSize: 12 }}>
                          {p.condition} • Last visit {p.lastVisit}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="doctor-btn"
                        onClick={() => handleSelectPatient(p)}
                        style={{ padding: "8px 10px" }}
                      >
                        Details
                      </button>
                    </div>
                  ))}
                  {patients.length === 0 ? (
                    <div className="doctor-empty">No patient records yet.</div>
                  ) : null}
                </div>
              </DoctorDashboardSection>

              <DoctorDashboardSection
                title="Reports & Notifications"
                subtitle="Pending review"
                right={
                  <button
                    className="doctor-btn"
                    type="button"
                    onClick={() => setStep("reports")}
                  >
                    Reports
                  </button>
                }
              >
                <div className="doctor-pendingReports">
                  {[
                    { title: "ECG Analysis", meta: "Uploaded 2 days ago" },
                    { title: "Blood Panel", meta: "Uploaded 5 days ago" },
                    { title: "Diabetes Review", meta: "Uploaded 7 days ago" },
                  ].map((r) => (
                    <div key={r.title} className="doctor-pendingReports__item">
                      <div className="doctor-pendingReports__meta">
                        <div style={{ fontWeight: 950, color: "#0f172a", fontSize: 13 }}>
                          {r.title}
                        </div>
                        <div style={{ color: "var(--doctor-muted)", fontWeight: 800, fontSize: 12 }}>
                          {r.meta}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="doctor-iconBtn"
                        onClick={() => setStep("reports")}
                        aria-label={`Open ${r.title}`}
                        title="Open"
                      >
                        ➜
                      </button>
                    </div>
                  ))}
                </div>
              </DoctorDashboardSection>

              {/* Extra section to cover side blank space */}
              <DoctorDashboardSection
                title="Quick Actions"
                subtitle="Common workflows"
                right={
                  <button
                    className="doctor-btn"
                    type="button"
                    onClick={() => setStep("profile")}
                  >
                    Settings
                  </button>
                }
              >
                <div className="doctor-recentPatients" style={{ gap: 10 }}>
                  {[ 
                    {
                      title: "Write Prescription",
                      sub: "Start with patient details",
                      icon: "💊",
                      onClick: () => setStep("patients"),
                    },
                    {
                      title: "View Appointments",
                      sub: "Accept/reject requests",
                      icon: "📅",
                      onClick: () => setStep("appointments"),
                    },
                    {
                      title: "Check Emergency",
                      sub: "Recent alerts & cases",
                      icon: "🚨",
                      onClick: () => setStep("emergency"),
                    },
                  ].map((x) => (
                    <div key={x.title} className="doctor-recentPatients__item">
                      <div className="doctor-recentPatients__meta" style={{ gap: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(37,99,235,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {x.icon}
                          </div>
                          <div style={{ fontWeight: 950, color: "#0f172a", fontSize: 13 }}>{x.title}</div>
                        </div>
                        <div style={{ color: "var(--doctor-muted)", fontWeight: 800, fontSize: 12 }}>{x.sub}</div>
                      </div>
                      <button
                        type="button"
                        className="doctor-btn"
                        onClick={x.onClick}
                        style={{ padding: "8px 10px" }}
                      >
                        Open
                      </button>
                    </div>
                  ))}
                </div>
              </DoctorDashboardSection>

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

