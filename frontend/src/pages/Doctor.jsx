import React, { useEffect, useMemo, useState } from "react";

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

  // Schedule UI state
  const [scheduleSpeciality, setScheduleSpeciality] = useState("Cardiology");
  const [scheduleDoctorId, setScheduleDoctorId] = useState("d1");


  // Demo data: doctor schedule should support "multiple types of doctors" (UI-level categories).
  const doctorsBySpeciality = useMemo(
    () => [
      {
        speciality: "Cardiology",
        types: ["Cardiologist"],
        doctors: [
          {
            id: "d1",
            name: "Dr. A. Sharma",
            specialization: "Cardiology",
            experience: "8",
            availability: "Mon-Fri 10:00 AM - 5:00 PM",
            clinic: "City Heart Clinic",
          },
          {
            id: "d2",
            name: "Dr. Neha Kapoor",
            specialization: "Cardiology",
            experience: "6",
            availability: "Mon-Thu 11:00 AM - 6:00 PM",
            clinic: "Pulse Care Center",
          },
          {
            id: "d5",
            name: "Dr. Sameer Kulkarni",
            specialization: "Cardiology",
            experience: "9",
            availability: "Tue-Sat 9:00 AM - 2:00 PM",
            clinic: "Apex Cardio",
          },
          {
            id: "d6",
            name: "Dr. Priya Nair",
            specialization: "Cardiology",
            experience: "5",
            availability: "Mon-Fri 1:00 PM - 6:00 PM",
            clinic: "HeartBeat Clinic",
          },
        ],
      },
      {
        speciality: "Endocrinology",
        types: ["Endocrinologist"],
        doctors: [
          {
            id: "d3",
            name: "Dr. R. Mehta",
            specialization: "Endocrinology",
            experience: "10",
            availability: "Tue-Sat 9:30 AM - 4:30 PM",
            clinic: "Diabetes & You",
          },
          {
            id: "d7",
            name: "Dr. Kavita Joshi",
            specialization: "Endocrinology",
            experience: "7",
            availability: "Mon-Thu 10:00 AM - 5:00 PM",
            clinic: "Metabolic Care",
          },
          {
            id: "d8",
            name: "Dr. Rahul Bansal",
            specialization: "Endocrinology",
            experience: "4",
            availability: "Wed-Sat 11:00 AM - 6:00 PM",
            clinic: "Glucose Clinic",
          },
        ],
      },
      {
        speciality: "General Medicine",
        types: ["Physician"],
        doctors: [
          {
            id: "d4",
            name: "Dr. Vikram Iyer",
            specialization: "General Medicine",
            experience: "7",
            availability: "Mon-Fri 9:00 AM - 3:00 PM",
            clinic: "Green Valley Hospital",
          },
          {
            id: "d9",
            name: "Dr. Shalini Rao",
            specialization: "General Medicine",
            experience: "6",
            availability: "Mon-Thu 2:00 PM - 7:00 PM",
            clinic: "CareFirst General",
          },
          {
            id: "d10",
            name: "Dr. Arjun Verma",
            specialization: "General Medicine",
            experience: "5",
            availability: "Tue-Sat 8:30 AM - 1:30 PM",
            clinic: "Village Health Center",
          },
        ],
      },
    ],
    []
  );

  // Current logged-in doctor (demo)
  const doctor = useMemo(
    () => doctorsBySpeciality[0]?.doctors?.[0],
    [doctorsBySpeciality]
  );

  // Build speciality->doctors map for schedule dropdowns
  const doctorsForSchedule = useMemo(() => {
    const map = {};
    doctorsBySpeciality.forEach((s) => {
      map[s.speciality] = s.doctors || [];
    });
    return map;
  }, [doctorsBySpeciality]);



  // Receptionist-side patients (doctor dashboard should not show blank records)
  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [patientsError, setPatientsError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setPatientsLoading(true);
        setPatientsError("");

        const token = localStorage.getItem("token");
        const res = await fetch("/api/doctor/patients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch patients: ${res.status}`);
        }

        const payload = await res.json();
        const rawPatients = payload?.data || payload?.patients || payload || [];

        const normalized = (rawPatients || []).map((p) => ({
          uHID: p?.uHID || p?.UHID || p?.uhid || p?.patientUHID || "",
          name: p?.name || p?.patientName || "",
          condition: p?.condition || p?.diagnosis || "",
          phone: p?.phone || p?.contact || "",
          lastVisit: p?.lastVisit || p?.updatedAt || p?.visitDate || "",
          status: p?.status || "",
          history: Array.isArray(p?.history)
            ? p.history.map((h) => ({
                date: h?.date || h?.createdAt || "",
                note: h?.note || h?.symptoms || "",
                treatment: h?.treatment || h?.plan || "",
              }))
            : [],
        }));

        setPatients(normalized);
      } catch (err) {
        setPatients([]);
        setPatientsError(err?.message || "Unable to load patient records");
      } finally {
        setPatientsLoading(false);
      }
    };

    fetchPatients();
  }, []);


  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [upcomingAppointmentsLoading, setUpcomingAppointmentsLoading] = useState(false);
  const [upcomingAppointmentsError, setUpcomingAppointmentsError] = useState("");

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        setUpcomingAppointmentsLoading(true);
        setUpcomingAppointmentsError("");

        const token = localStorage.getItem("token");
        const res = await fetch("/api/doctor/upcoming-appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch appointments: ${res.status}`);
        }

        const payload = await res.json();
        const rawAppointments = payload?.data || payload?.appointments || payload || [];

        const normalized = (rawAppointments || []).map((a) => ({
          id: a?.id || a?._id || "",
          patientName: a?.patientName || a?.patient || a?.name || "",
          time: a?.time || a?.appointmentTime || "",
          department: a?.department || a?.departmentName || "",
          date: a?.date || a?.appointmentDate || "",
          symptoms: a?.symptoms || a?.reason || "",
          status: a?.status || "",
        }));

        setUpcomingAppointments(normalized.filter((x) => x.patientName || x.id));
      } catch (err) {
        setUpcomingAppointments([]);
        setUpcomingAppointmentsError(err?.message || "Unable to load appointments");
      } finally {
        setUpcomingAppointmentsLoading(false);
      }
    };

    fetchUpcomingAppointments();
  }, []);



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

  const pageTitles = {
    patients: "Patients",
    appointments: "Appointments",
    prescriptions: "Prescriptions",
    emergency: "Emergency Cases",
    reports: "Medical Reports",
    profile: "My Profile",
    schedule: "Doctor Schedule",
    notifications: "Notifications",
    analytics: "Analytics",
  };

  function BackToDashboard({ title }) {
    return (
      <div className="doctor-pageBack">
        <button
          type="button"
          className="doctor-btn"
          onClick={() => setStep("dashboard")}
        >
          &larr; Back to Dashboard
        </button>
        {title ? <div className="doctor-pageBack__title">{title}</div> : null}
      </div>
    );
  }

  return (
    <DoctorLayoutShell
      step={step}
      onNavigate={(next) => setStep(next)}
      doctor={doctor}
      onLogout={handleLogout}
    >
      {/* Quick fix: schedule needs doctorsBySpeciality; all schedule UI lives inside this file for speed */}
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
                    accent: "#1043b4",
                    onClick: () => setStep("appointments"),
                    description: "Upcoming requests",
                  },
                  {
                    title: "Active Patients",
                    value: patientsLoading ? 0 : patients.length,
                    icon: "🧑‍⚕️",
                    accent: "#1c53ab",
                    onClick: () => setStep("patients"),
                    description: patientsLoading ? "Loading receptionist records..." : "Patients in your records",
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

          <div className="doctor-dashboard__features">
            <DoctorDashboardSection
              title="Today's Queue"
              subtitle="Live patient flow"
            >
              <div className="doctor-queue">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.slice(0, 3).map((a, index) => (
                      <div key={a.id} className="doctor-queue__item">
                        <div>
                          <div className="doctor-queue__name">{a.patientName}</div>
                          <div className="doctor-queue__meta">
                            {a.department} • {a.time}
                          </div>
                        </div>
                        <span className="doctor-queue__status">
                          {index === 0 ? "Waiting" : index === 1 ? "Next" : "Scheduled"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="doctor-empty">No upcoming appointments</div>
                  )}
                </div>

            </DoctorDashboardSection>

            <DoctorDashboardSection
              title="Quick Actions"
              subtitle="Common doctor tasks"
            >
              <div className="doctor-quickActions">
                <button className="doctor-btn doctor-btn--primary" onClick={() => setStep("appointments")}>
                  Start Consultation
                </button>
                <button className="doctor-btn" onClick={() => setStep("prescriptions")}>
                  Add Prescription
                </button>
                <button className="doctor-btn" onClick={() => setStep("reports")}>
                  Review Reports
                </button>
                <button className="doctor-btn" onClick={() => setStep("patients")}>
                  Search Patient
                </button>
              </div>
            </DoctorDashboardSection>

            <DoctorDashboardSection
              title="Critical Alerts"
              subtitle="Needs attention"
            >
              <div className="doctor-alerts">
                <div className="doctor-alerts__item doctor-alerts__item--danger">
                  Emergency case waiting for review
                </div>
                <div className="doctor-alerts__item">
                  3 medical reports pending
                </div>
                <div className="doctor-alerts__item">
                  Next appointment starts soon
                </div>
              </div>
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
                title="Profile Summary"
                subtitle="Availability & clinic"
                right={
                  <button
                    className="doctor-btn"
                    type="button"
                    onClick={() => setStep("profile")}
                  >
                    Edit
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


      {step !== "dashboard" && (
        <BackToDashboard title={pageTitles[step]} />
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
            <div className="doctor-empty doctor-empty-block">
              Today: {upcomingAppointments.length} appointment(s)
            </div>

            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((a) => (
                <AppointmentCard
                  key={a.id}
                  appt={a}
                  onAccept={() => handleAcceptAppointment(a)}
                  onReject={() => handleRejectAppointment(a)}
                />
              ))
            ) : (
              <div className="doctor-empty">No appointment scheduled.</div>
            )}
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
          autoSelectPatientCta
          onSelectPatient={() => setStep("patients")}
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
        <div key="doctor-profile">
          <DoctorProfileCard
            doctor={doctor}
            onSave={() => alert("Profile updated (UI placeholder).")}
          />
        </div>
      )}

      {step === "schedule" && (
        <div className="doctor-panel--inner">
          <div className="doctor-form__section-title">Doctor Schedule</div>
          <div className="doctor-hint">
            Doctor-type view (UI-level): Day-wise availability per speciality & doctor
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 14,
              alignItems: "center",
            }}
          >
            <div>
              <div className="doctor-hint" style={{ marginTop: 0 }}>
                Doctor Type / Speciality
              </div>
              <select
                value={scheduleSpeciality}
                onChange={(e) => {
                  const next = e.target.value;
                  setScheduleSpeciality(next);
                  const firstDoctor = doctorsBySpeciality.find((x) => x.speciality === next)?.doctors?.[0];
                  if (firstDoctor?.id) setScheduleDoctorId(firstDoctor.id);
                }}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(37,99,235,.22)",
                  background: "#fff",
                  fontWeight: 800,
                }}
              >
                {doctorsBySpeciality.map((s) => (
                  <option key={s.speciality} value={s.speciality}>
                    {s.speciality}
                  </option>
                ))}
              </select>
              <div style={{ color: "#64748b", fontWeight: 800, fontSize: 12, marginTop: 6 }}>
                {doctorsBySpeciality.find((x) => x.speciality === scheduleSpeciality)?.types?.join(", ") || ""}
              </div>
            </div>

            <div>
              <div className="doctor-hint" style={{ marginTop: 0 }}>
                Select Doctor
              </div>
              <select
                value={scheduleDoctorId}
                onChange={(e) => setScheduleDoctorId(e.target.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(37,99,235,.22)",
                  background: "#fff",
                  fontWeight: 800,
                  minWidth: 240,
                }}
              >
                {doctorsBySpeciality
                  .find((x) => x.speciality === scheduleSpeciality)
                  ?.doctors?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {(() => {
            const activeDoctor = doctorsBySpeciality
              .find((x) => x.speciality === scheduleSpeciality)
              ?.doctors?.find((d) => d.id === scheduleDoctorId);

            return (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 950, color: "#0f172a", fontSize: 14 }}>
                  {activeDoctor?.name || doctor?.name} • {activeDoctor?.specialization || doctor?.specialization}
                </div>
                <div style={{ color: "#64748b", fontWeight: 800, fontSize: 12, marginTop: 4 }}>
                  {activeDoctor?.availability || doctor?.availability} • {activeDoctor?.clinic || doctor?.clinic}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12, marginTop: 14 }}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => {
                    // UI rule: Mon-Fri clinic, Sat half-day, Sun off
                    const isClinic = i < 5;
                    const isSat = i === 5;
                    const label = isClinic ? "Clinic" : isSat ? "Clinic (half)" : "Off";
                    const bg = isClinic
                      ? "rgba(37,99,235,.12)"
                      : isSat
                        ? "rgba(37,99,235,.08)"
                        : "#f8fafc";

                    return (
                      <div key={d} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            borderRadius: 14,
                            padding: 12,
                            border: "1px solid rgba(37,99,235,.22)",
                            background: bg,
                            fontWeight: 900,
                            color: "#0f172a",
                          }}
                        >
                          {d}
                        </div>
                        <div style={{ marginTop: 8, color: "#64748b", fontWeight: 800, fontSize: 12 }}>
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="doctor-hint" style={{ marginTop: 14 }}>
                  Slot granularity (30-min) can be added later if backend provides appointment slots.
                </div>
              </div>
            );
          })()}
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

