import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import Layout from "./Layout";

import "../styles/doctor/doctorCommon.css";
import "../styles/doctor/doctorDashboard.css";
import "../styles/doctor/patientManagement.css";
import "../styles/doctor/appointmentManagement.css";
import "../styles/doctor/prescriptionSystem.css";
import "../styles/doctor/medicalReports.css";
import "../styles/doctor/doctorProfile.css";
import "../styles/doctor/doctorAnalytics.css";
import "../styles/doctor/doctorProfileDashboard.css";

const PatientTable = lazy(() => import("../Components/Doctor/PatientTable"));

const PatientDetailsModal = lazy(
  () => import("../Components/Doctor/PatientDetailsModal"),
);

const AppointmentCard = lazy(
  () => import("../Components/Doctor/AppointmentCard"),
);

const PrescriptionForm = lazy(
  () => import("../Components/Doctor/PrescriptionForm"),
);

const ReportUpload = lazy(() => import("../Components/Doctor/ReportUpload"));

const DoctorProfileDashboard = lazy(
  () => import("../Components/Doctor/DoctorProfileDashboard"),
);

const AnalyticsCard = lazy(() => import("../Components/Doctor/AnalyticsCard"));

const EmergencyPanel = lazy(
  () => import("../Components/Doctor/EmergencyPanel"),
);

const DoctorDashboardSummaryGrid = lazy(
  () => import("../Components/Doctor/DoctorDashboardSummaryGrid"),
);

const DoctorDashboardSection = lazy(
  () => import("../Components/Doctor/DoctorDashboardSection"),
);

function Doctor() {
  const [step, setStep] = useState("dashboard");

  const [patientQuery, setPatientQuery] = useState("");
  const [patientFilter, setPatientFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ------------------------------------------------------------------
  // Doctor Directory (Demo)
  // ------------------------------------------------------------------

  const [doctorsBySpeciality, setDoctorsBySpeciality] = useState([]);

  const doctorsBySpecialityDeduped = doctorsBySpeciality;

  // ----------------------------------------------------
  // Logged In Doctor
  // ----------------------------------------------------

  const [loggedInDoctor, setLoggedInDoctor] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setLoggedInDoctor({
        id: user._id,
        name: user.name,
        specialization: user.specialization,
        email: user.email,
        mobile: user.mobile,
      });
    }
  }, []);

  const doctor = useMemo(() => {
    return (
      loggedInDoctor || {
        _id: "",
        name: "",
        specialization: "",
        qualification: "",
        experience: "",
        phone: "",
        email: "",
        clinic: "",
        availability: "",
      }
    );
  }, [loggedInDoctor]);

  const allReferralDoctors = doctorsBySpeciality;

  // ----------------------------------------------------
  // Patients
  // ----------------------------------------------------

  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [patientsError, setPatientsError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setPatientsLoading(true);
        setPatientsError("");

        const token = localStorage.getItem("token");

        const user = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(`/api/doctor/patients/${user._id}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch patients: ${res.status}`);
        }

        const payload = await res.json();

        const rawPatients = payload?.data || payload?.patients || payload || [];

        const normalized = rawPatients.map((p) => ({
          _id: p._id,
          uHID: p.uhid,
          name: p.name,
          age: p.age,
          gender: p.gender,
          phone: p.mobile,
          doctor: p.doctor,
          condition: p.disease,
          lastVisit: p.createdAt,
          status: p.status,
        }));

        setPatients(normalized);
      } catch (err) {
        setPatients([]);
        setPatientsError(err.message || "Unable to load patients");
      } finally {
        setPatientsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // ----------------------------------------------------
  // Upcoming Appointments
  // ----------------------------------------------------

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [upcomingAppointmentsLoading, setUpcomingAppointmentsLoading] =
    useState(false);
  const [upcomingAppointmentsError, setUpcomingAppointmentsError] =
    useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setUpcomingAppointmentsLoading(true);
        setUpcomingAppointmentsError("");

        const token = localStorage.getItem("token");

        const res = await fetch("/api/doctor/upcoming-appointments", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch appointments: ${res.status}`);
        }

        const payload = await res.json();

        const raw = payload?.data || payload?.appointments || payload || [];

        const normalized = raw.map((a) => ({
          id: a?.id || a?._id || "",
          patientName: a?.patientName || "",
          department: a?.department || "",
          date: a?.date || "",
          time: a?.time || "",
          symptoms: a?.symptoms || "",
          status: a?.status || "",
        }));

        setUpcomingAppointments(normalized);
      } catch (err) {
        setUpcomingAppointments([]);
        setUpcomingAppointmentsError(
          err.message || "Unable to load appointments",
        );
      } finally {
        setUpcomingAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const upcomingCountDisplay = upcomingAppointmentsLoading
    ? "Upcoming"
    : upcomingAppointments.length;

  const upcomingHasItems = upcomingAppointments.length > 0;

  function handleSelectPatient(patient) {
    setSelectedPatient(patient);
    setModalOpen(true);
  }

  function handleAcceptAppointment(appt) {
    alert(
      `Appointment accepted (UI placeholder): ${
        appt?.patientName || "patient"
      }`,
    );
  }

  function handleRejectAppointment(appt) {
    alert(
      `Appointment rejected (UI placeholder): ${
        appt?.patientName || "patient"
      }`,
    );
  }

  const pageTitles = {
    patients: "Patients",
    appointments: "Appointments",
    prescriptions: "Prescriptions",
    emergency: "Emergency Cases",
    reports: "Medical Reports",
    profile: "My Profile",
    "profile-dashboard": "Profile & Doctors Directory",
    schedule: "Doctor Schedule",
    notifications: "Notifications",
    analytics: "Analytics",
  };

  const [dashboard, setDashboard] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
  });

  // ----------------------------------------------------
  // Dashboard UI State
  // ----------------------------------------------------

  const [today] = useState(() => {
    const d = new Date();

    return d.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(`/api/doctor/dashboard/${user._id}`);

        const data = await res.json();

        setDashboard(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  // const [earnings] = useState({
  //   today: 2400,
  //   week: 14500,
  //   month: 58000,
  // });

  // const [rating] = useState({
  //   avg: 4.7,
  //   count: 182,
  // });

  // const [pendingReports] = useState(3);

  // const [medicineReminders] = useState([
  //   {
  //     time: "9:00 AM",
  //     text: "Patient: Asha — Metformin 500mg",
  //   },
  //   {
  //     time: "2:00 PM",
  //     text: "Patient: Ravi — Amlodipine 5mg",
  //   },
  //   {
  //     time: "8:00 PM",
  //     text: "Patient: Neha — Vitamin D3",
  //   },
  // ]);

  // const [recentActivity] = useState([
  //   {
  //     time: "2 min ago",
  //     text: "Prescription created for Asha (UHID-1042)",
  //   },
  //   {
  //     time: "1 hour ago",
  //     text: "Accepted appointment with Ravi (UHID-1099)",
  //   },
  //   {
  //     time: "Yesterday",
  //     text: "Reviewed Blood Panel report for Neha",
  //   },
  // ]);

  // const [emergencyAlerts] = useState([
  //   {
  //     severity: "danger",
  //     text: "Patient Asha — Chest pain (UHID-1042)",
  //   },
  //   {
  //     severity: "warn",
  //     text: "Patient Ravi — High BP (UHID-1099)",
  //   },
  // ]);

  // const [calendarDays] = useState(() => {
  //   const start = new Date();

  //   return Array.from({ length: 14 }).map((_, i) => {
  //     const d = new Date(start);

  //     d.setDate(start.getDate() + i);

  //     return {
  //       label: d.getDate(),
  //       isToday: i === 0,
  //       hasAppt: [1, 3, 5, 7, 10].includes(i),
  //     };
  //   });
  // });

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
    <Layout role="Doctor" setStep={setStep}>
      <Suspense
        fallback={<div className="doctor-empty">Loading doctor module...</div>}
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
                      title: "Total Patients",
                      value: dashboard.totalPatients,
                      icon: "👥",
                      accent: "#2563eb",
                    },
                    {
                      title: "Today's Appointments",
                      value: dashboard.todayAppointments,
                      icon: "📅",
                      accent: "#16a34a",
                    },
                    {
                      title: "Pending Appointments",
                      value: dashboard.pendingAppointments,
                      icon: "⏳",
                      accent: "#f59e0b",
                    },
                    {
                      title: "Completed Appointments",
                      value: dashboard.completedAppointments,
                      icon: "✅",
                      accent: "#0ea5e9",
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
                  {upcomingHasItems ? (
                    upcomingAppointments.slice(0, 3).map((a, index) => (
                      <div key={a.id} className="doctor-queue__item">
                        <div>
                          <div className="doctor-queue__name">
                            {a.patientName}
                          </div>

                          <div className="doctor-queue__meta">
                            {a.department} • {a.time}
                          </div>
                        </div>

                        <span className="doctor-queue__status">
                          {index === 0
                            ? "Waiting"
                            : index === 1
                              ? "Next"
                              : "Scheduled"}
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
                  <button
                    className="doctor-btn doctor-btn--primary"
                    onClick={() => setStep("appointments")}
                  >
                    Start Consultation
                  </button>

                  <button
                    className="doctor-btn"
                    onClick={() => setStep("prescriptions")}
                  >
                    Add Prescription
                  </button>

                  <button
                    className="doctor-btn"
                    onClick={() => setStep("reports")}
                  >
                    Review Reports
                  </button>

                  <button
                    className="doctor-btn"
                    onClick={() => setStep("patients")}
                  >
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
                    {/* {pendingReports}*/} medical reports pending 
                  </div>

                  <div className="doctor-alerts__item">
                    Next appointment starts soon
                  </div>
                </div>
              </DoctorDashboardSection>
            </div>
          </div>
        )}

        {step === "patients" && (
          <>
            <BackToDashboard title="Patients" />

            {/* <PatientTable
              patients={patients}
              loading={patientsLoading}
              error={patientsError}
              search={patientQuery}
              setSearch={setPatientQuery}
              filter={patientFilter}
              setFilter={setPatientFilter}
              onSelect={handleSelectPatient}
            /> */}

            {modalOpen && (
              <PatientDetailsModal
                patient={selectedPatient}
                onClose={() => setModalOpen(false)}
              />
            )}
          </>
        )}

        {step === "appointments" && (
          <>
            <BackToDashboard title="Appointments" />

            {upcomingAppointmentsLoading ? (
              <div className="doctor-empty">Loading appointments...</div>
            ) : upcomingAppointmentsError ? (
              <div className="doctor-empty">{upcomingAppointmentsError}</div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="doctor-empty">No appointments available.</div>
            ) : (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onAccept={() => handleAcceptAppointment(appointment)}
                  onReject={() => handleRejectAppointment(appointment)}
                />
              ))
            )}
          </>
        )}

        {step === "prescriptions" && (
          <>
            <BackToDashboard title="Prescriptions" />

            <PrescriptionForm
              patient={selectedPatient}
              doctor={doctor}
              doctors={allReferralDoctors}
              autoSelectPatientCta
            />
          </>
        )}

        {step === "reports" && (
          <>
            <BackToDashboard title="Medical Reports" />

            <ReportUpload />
          </>
        )}

        {step === "emergency" && (
          <>
            <BackToDashboard title="Emergency Cases" />

            <EmergencyPanel alerts={[]} doctor={doctor} />
          </>
        )}

        {step === "profile" && (
          <>
            <BackToDashboard title="My Profile" />

            <DoctorProfileDashboard doctor={doctor} />
          </>
        )}

        {step === "profile-dashboard" && (
          <>
            <BackToDashboard title="Profile & Doctors Directory" />

            <DoctorProfileDashboard
              doctor={doctor}
              doctors={doctorsBySpecialityDeduped}
            />
          </>
        )}

        {/* {step === "schedule" && (
          <>
            <BackToDashboard title="Doctor Schedule" />

            <div className="doctor-schedule">
              <div className="doctor-formGroup">
                <label>Speciality</label>

                <select
                  value={scheduleSpeciality}
                  onChange={(e) => setScheduleSpeciality(e.target.value)}
                >
                  {Object.keys(doctorsForSchedule).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="doctor-formGroup">
                <label>Doctor</label>

                <select
                  value={scheduleDoctorId}
                  onChange={(e) => setScheduleDoctorId(e.target.value)}
                >
                  {(doctorsForSchedule[scheduleSpeciality] || []).map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )} */}

        {step === "notifications" && (
          <>
            <BackToDashboard title="Notifications" />

            <div className="doctor-card">
              <div className="doctor-card">No Notifications</div>

              <h3>Medicine Reminders</h3>

              {/* {medicineReminders.map((item, index) => (
                <div key={index} className="doctor-listItem">
                  <strong>{item.time}</strong> — {item.text}
                </div>
              ))} */}

              <hr />

              <h3>Recent Activity</h3>

              {/* {recentActivity.map((item, index) => (
                <div key={index} className="doctor-listItem">
                  <strong>{item.time}</strong> — {item.text}
                </div>
              ))} */}
            </div>
          </>
        )}

        {step === "analytics" && (
          <>
            <BackToDashboard title="Analytics" />

            <div className="doctor-card">Analytics Coming Soon</div>

            {/* <AnalyticsCard
              earnings={earnings}
              rating={rating}
              pendingReports={pendingReports}
              patients={patients.length}
              appointments={upcomingAppointments.length}
              calendarDays={calendarDays}
            /> */}
          </>
        )}
      </Suspense>
    </Layout>
  );
}

export default Doctor;
