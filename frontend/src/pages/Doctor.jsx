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

import DashboardWidgetTitle from "../Components/Doctor/DashboardWidgetTitle";
import DoctorDashboardSummaryGrid from "../Components/Doctor/DoctorDashboardSummaryGrid";
import DoctorDashboardSection from "../Components/Doctor/DoctorDashboardSection";

import StatusBadge from "../Components/Doctor/StatusBadge";
import SearchBar from "../Components/Doctor/SearchBar";



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
        <div className="doctor-dashboard">
          <div className="doctor-dashboard__top">
            <DoctorDashboardSummaryGrid
              cards={[
                {
                  title: "Total Patients",
                  value: patients.length,
                  icon: "🧑",
                  accent: "#2563eb",
                  description: "Active patient records",
                  onClick: () => setStep("patients"),
                },
                {
                  title: "Today Appointments",
                  value: upcomingAppointments.filter((a) => a.date === "2026-06-07").length,
                  icon: "📅",
                  accent: "#1c53ab",
                  description: "Appointments for today",
                  onClick: () => setStep("appointments"),
                },
                {
                  title: "Pending Reports",
                  value: 3,
                  icon: "🧪",
                  accent: "#2563eb",
                  description: "Awaiting doctor review",
                  onClick: () => setStep("reports"),
                },
                {
                  title: "Emergency Cases",
                  value: patients.filter((p) => p.status === "Critical").length,
                  icon: "🚨",
                  accent: "#dc2626",
                  description: "Critical alerts",
                  onClick: () => setStep("emergency"),
                },
                {
                  title: "Completed Appointments",
                  value: upcomingAppointments.filter((a) => a.status === "Completed").length,
                  icon: "✅",
                  accent: "#16a34a",
                  description: "Finished consultations",
                  onClick: () => setStep("appointments"),
                },
                {
                  title: "Total Prescriptions",
                  value: 12,
                  icon: "💊",
                  accent: "#1d4ed8",
                  description: "Prescriptions created",
                  onClick: () => setStep("prescriptions"),
                },
              ]}
            />
          </div>

          <div className="doctor-dashboard__middle">
            <div className="doctor-dashboard__col doctor-dashboard__col--wide">
              <DoctorDashboardSection
                title="Upcoming Appointments"
                subtitle="Manage and update appointment status"
                right={
                  <div className="doctor-apptTools">
                    <SearchBar placeholder="Search patient..." value={patientQuery} onChange={setPatientQuery} />
                    <div className="doctor-apptTools__filters">
                      <label className="doctor-apptTools__label">Status</label>
                      <select
                        className="doctor-select"
                        value={patientFilter}
                        onChange={(e) => setPatientFilter(e.target.value)}
                      >
                        <option value="all">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                }
              >
                <div className="doctor-tableWrap">
                  <table className="doctor-table doctor-table--striped">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Symptoms</th>
                        <th>Status</th>
                        <th className="doctor-table__action">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAppointments
                        .filter((a) => {
                          const q = patientQuery.trim().toLowerCase();
                          const matchesQuery =
                            !q ||
                            a.patientName.toLowerCase().includes(q) ||
                            a.department.toLowerCase().includes(q);
                          const matchesStatus = patientFilter === "all" ? true : a.status === patientFilter;
                          return matchesQuery && matchesStatus;
                        })
                        .map((a) => (
                          <tr key={a.id}>
                            <td>
                              <div className="doctor-cellMain">
                                <div className="doctor-cellMain__title">{a.patientName}</div>
                                <div className="doctor-cellMain__sub">{a.department}</div>
                              </div>
                            </td>
                            <td>{a.date}</td>
                            <td>{a.time}</td>
                            <td className="doctor-muted">{a.symptoms}</td>
                            <td>
                              <StatusBadge status={a.status} />
                            </td>
                            <td>
                              <div className="doctor-rowActions">
                                <button
                                  className="doctor-btn doctor-btn--primary"
                                  type="button"
                                  onClick={() => handleAcceptAppointment(a)}
                                >
                                  Accept
                                </button>
                                <button
                                  className="doctor-btn doctor-btn--danger"
                                  type="button"
                                  onClick={() => handleRejectAppointment(a)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {upcomingAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="doctor-table__empty">
                            No appointments found.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </DoctorDashboardSection>

              <DoctorDashboardSection title="Pending Reports" subtitle="Awaiting review" right={<button className="doctor-btn" type="button" onClick={() => setStep("reports")}>View Reports</button>}>
                <div className="doctor-pendingReports">
                  {[
                    { patientName: "Rahul Verma", type: "Lab Test", date: "2026-06-06", status: "Pending" },
                    { patientName: "Ananya Singh", type: "Blood Work", date: "2026-06-06", status: "Pending" },
                    { patientName: "Vikram Rao", type: "ECG", date: "2026-06-05", status: "Pending" },
                  ].map((r, idx) => (
                    <div key={idx} className="doctor-pendingReports__item">
                      <div className="doctor-cellMain">
                        <div className="doctor-cellMain__title">{r.patientName}</div>
                        <div className="doctor-cellMain__sub">{r.type}</div>
                      </div>
                      <div className="doctor-pendingReports__meta">
                        <div className="doctor-kv__k">Uploaded</div>
                        <div className="doctor-kv__v">{r.date}</div>
                      </div>
                      <div>
                        <StatusBadge status={r.status} />
                      </div>
                      <div>
                        <button className="doctor-iconBtn" type="button" onClick={() => setStep("reports")} aria-label="Download">
                          ⬇️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </DoctorDashboardSection>
            </div>

            <div className="doctor-dashboard__col doctor-dashboard__col--narrow">
              <DoctorDashboardSection title="Emergency Cases" subtitle="Critical patient monitoring">
                <EmergencyPanel patients={patients} />
              </DoctorDashboardSection>

              <DoctorDashboardSection title="Pending Reports" subtitle="Awaiting doctor review">
                <div className="doctor-pendingReports">
                  {[
                    { patientName: "Rahul Verma", type: "Lab Test", date: "2026-06-06", status: "Pending" },
                    { patientName: "Ananya Singh", type: "Blood Work", date: "2026-06-06", status: "Pending" },
                    { patientName: "Vikram Rao", type: "ECG", date: "2026-06-05", status: "Pending" },
                  ].map((r, idx) => (
                    <div key={idx} className="doctor-pendingReports__item">
                      <div className="doctor-cellMain">
                        <div className="doctor-cellMain__title">{r.patientName}</div>
                        <div className="doctor-cellMain__sub">{r.type}</div>
                      </div>
                      <div className="doctor-pendingReports__meta">
                        <div className="doctor-kv__k">Uploaded</div>
                        <div className="doctor-kv__v">{r.date}</div>
                      </div>
                      <div>
                        <StatusBadge status={r.status} />
                      </div>
                      <div>
                        <button className="doctor-iconBtn" type="button" onClick={() => setStep("reports")} aria-label="Download">
                          ⬇️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </DoctorDashboardSection>
            </div>

          </div>

          <div className="doctor-dashboard__bottom">
            <div className="doctor-dashboard__col doctor-dashboard__col--wide">
              <DoctorDashboardSection
                title="Recent Patients"
                subtitle="Quick access to patient history"
                right={
                  <button className="doctor-btn" type="button" onClick={() => setStep("patients")}>
                    Open Patients
                  </button>
                }
              >
                <div className="doctor-recentPatients">
                  {patients
                    .slice()
                    .sort((a, b) => (a.lastVisit < b.lastVisit ? 1 : -1))
                    .slice(0, 3)
                    .map((p, idx) => (
                      <div key={idx} className="doctor-recentPatients__item">
                        <div className="doctor-cellMain">
                          <div className="doctor-cellMain__title">{p.name}</div>
                          <div className="doctor-cellMain__sub">{p.uHID} • {p.condition}</div>
                        </div>
                        <div className="doctor-recentPatients__meta">
                          <div className="doctor-kv__k">Last Visit</div>
                          <div className="doctor-kv__v">{p.lastVisit}</div>
                        </div>
                        <div>
                          <StatusBadge status={p.status} />
                        </div>
                        <div>
                          <button className="doctor-btn" type="button" onClick={() => handleSelectPatient(p)}>
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </DoctorDashboardSection>
            </div>

            <div className="doctor-dashboard__col doctor-dashboard__col--narrow">
              <DoctorDashboardSection title="Recent Activity" subtitle="Doctor actions & updates" right={<button className="doctor-btn" type="button" onClick={() => setStep("dashboard")}>Refresh</button>}>
                <div className="doctor-activity">
                  {[
                    { text: "Updated prescription", meta: "Rahul Verma • 2 hours ago" },
                    { text: "Reviewed medical report", meta: "Ananya Singh • 1 day ago" },
                    { text: "Responded to emergency", meta: "Vikram Rao • 3 days ago" },
                  ].map((a, i) => (
                    <div key={i} className="doctor-activity-item">
                      <div className="doctor-activity-item__left">
                        <div className="doctor-activity-item__dot" aria-hidden="true" />
                        <div className="doctor-activity-item__desc">
                          <div className="doctor-activity-item__text">{a.text}</div>
                          <div className="doctor-activity-item__meta">{a.meta}</div>
                        </div>
                      </div>
                      <button className="doctor-iconBtn" type="button" aria-label="Open">
                        ↗️
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

