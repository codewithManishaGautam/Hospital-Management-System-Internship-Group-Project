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

  // Schedule
  const [scheduleSpeciality, setScheduleSpeciality] =
    useState("General Medicine");

  const [scheduleDoctorId, setScheduleDoctorId] = useState("d4");

  // ------------------------------------------------------------------
  // Doctor Directory (Demo)
  // ------------------------------------------------------------------

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
        ],
      },
      {
        speciality: "Neurology",
        types: ["Neurologist"],
        doctors: [
          {
            id: "d11",
            name: "Dr. Ananya Sen",
            specialization: "Neurology",
            experience: "9",
            availability: "Mon-Wed 10:00 AM - 2:00 PM",
            clinic: "NeuroCare",
          },
        ],
      },
      {
        speciality: "Orthopedics",
        types: ["Orthopedic Surgeon", "Orthopedist"],
        doctors: [
          {
            id: "d12",
            name: "Dr. Rohan Gupta",
            specialization: "Orthopedics",
            experience: "11",
            availability: "Tue-Fri 11:00 AM - 5:00 PM",
            clinic: "OrthoHub",
          },
        ],
      },
      {
        speciality: "Pediatrics",
        types: ["Pediatrician"],
        doctors: [
          {
            id: "d13",
            name: "Dr. Meera Kulkarni",
            specialization: "Pediatrics",
            experience: "8",
            availability: "Mon-Thu 9:30 AM - 1:30 PM",
            clinic: "KidsFirst",
          },
        ],
      },
      {
        speciality: "Dermatology",
        types: ["Dermatologist"],
        doctors: [
          {
            id: "d14",
            name: "Dr. Farah Ali",
            specialization: "Dermatology",
            experience: "7",
            availability: "Wed-Sat 10:00 AM - 4:00 PM",
            clinic: "SkinSphere",
          },
        ],
      },
      {
        speciality: "Psychiatry",
        types: ["Psychiatrist"],
        doctors: [
          {
            id: "d15",
            name: "Dr. Kunal Verma",
            specialization: "Psychiatry",
            experience: "10",
            availability: "Mon-Fri 2:00 PM - 6:00 PM",
            clinic: "MindCare Clinic",
          },
        ],
      },
      {
        speciality: "Gastroenterology",
        types: ["Gastroenterologist"],
        doctors: [
          {
            id: "d16",
            name: "Dr. Priyanka Das",
            specialization: "Gastroenterology",
            experience: "9",
            availability: "Tue-Thu 10:00 AM - 3:00 PM",
            clinic: "GastroGrove",
          },
        ],
      },
      {
        speciality: "Pulmonology",
        types: ["Pulmonologist"],
        doctors: [
          {
            id: "d17",
            name: "Dr. Sameer Iqbal",
            specialization: "Pulmonology",
            experience: "8",
            availability: "Mon-Wed 11:00 AM - 4:00 PM",
            clinic: "RespiraCare",
          },
        ],
      },
      {
        speciality: "Nephrology",
        types: ["Nephrologist"],
        doctors: [
          {
            id: "d18",
            name: "Dr. Shreya Nair",
            specialization: "Nephrology",
            experience: "12",
            availability: "Tue-Fri 9:00 AM - 2:00 PM",
            clinic: "KidneyLane",
          },
        ],
      },
      {
        speciality: "Urology",
        types: ["Urologist"],
        doctors: [
          {
            id: "d19",
            name: "Dr. Aditya Roy",
            specialization: "Urology",
            experience: "9",
            availability: "Mon-Thu 1:00 PM - 5:00 PM",
            clinic: "UrineCare",
          },
        ],
      },

      {
        speciality: "Oncology",
        types: ["Oncologist"],
        doctors: [
          {
            id: "d21",
            name: "Dr. Tanya Bose",
            specialization: "Oncology",
            experience: "13",
            availability: "Tue-Sat 9:00 AM - 2:00 PM",
            clinic: "CancerCare",
          },
        ],
      },
      {
        speciality: "Obstetrics & Gynecology",
        types: ["Gynecologist", "Obstetrician"],
        doctors: [
          {
            id: "d22",
            name: "Dr. Ritu Sharma",
            specialization: "Obstetrics & Gynecology",
            experience: "9",
            availability: "Mon-Thu 10:30 AM - 3:30 PM",
            clinic: "WomenWell",
          },
        ],
      },
      {
        speciality: "General Surgery",
        types: ["General Surgeon"],
        doctors: [
          {
            id: "d23",
            name: "Dr. Harsh Patel",
            specialization: "General Surgery",
            experience: "12",
            availability: "Mon-Wed 1:00 PM - 5:00 PM",
            clinic: "SurgiCore",
          },
        ],
      },
      {
        speciality: "ENT",
        types: ["ENT Specialist", "Otolaryngologist"],
        doctors: [
          {
            id: "d24",
            name: "Dr. Farhan Qureshi",
            specialization: "ENT",
            experience: "8",
            availability: "Wed-Sat 10:00 AM - 4:30 PM",
            clinic: "EarNoseThroat Hub",
          },
        ],
      },
      {
        speciality: "Emergency Medicine",
        types: ["Emergency Physician"],
        doctors: [
          {
            id: "d25",
            name: "Dr. Neel Mehra",
            specialization: "Emergency Medicine",
            experience: "7",
            availability: "Mon-Sun 24x7 (demo)",
            clinic: "Emergency Department",
          },
        ],
      },

      // Alternate demo doctors
      {
        speciality: "Cardiology (Alt)",
        types: ["Cardiologist"],
        doctors: [
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
        speciality: "Endocrinology (Alt)",
        types: ["Endocrinologist"],
        doctors: [
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
        speciality: "General Medicine (Alt)",
        types: ["Physician"],
        doctors: [
          {
            id: "d9",
            name: "Dr. Sharavani Rao",
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
    [],
  );

  const doctorsBySpecialityDeduped = useMemo(() => {
    const seen = new Set();

    return doctorsBySpeciality.filter((item) => {
      const key = item?.speciality || "";

      if (!key) return true;

      if (seen.has(key)) return false;

      seen.add(key);

      return true;
    });
  }, [doctorsBySpeciality]);

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
        specialization: user.role,
        email: user.email,
        mobile: user.mobile,
        availability: "Available",
        clinic: "Shraddha Hospital",
      });
    }
  }, []);

  const doctor = useMemo(() => {
    return (
      loggedInDoctor || {
        name: "Doctor",
        specialization: "",
        availability: "",
        clinic: "",
      }
    );
  }, [loggedInDoctor]);

  const allReferralDoctors = useMemo(() => {
    const seen = new Set();

    return doctorsBySpeciality
      .flatMap((group) => group.doctors || [])
      .filter((doc) => {
        const key = String(doc?.id || doc?.name || "");

        if (!key || seen.has(key)) return false;

        seen.add(key);

        return true;
      });
  }, [doctorsBySpeciality]);

  const doctorsForSchedule = useMemo(() => {
    const map = {};

    doctorsBySpeciality.forEach((group) => {
      map[group.speciality] = group.doctors || [];
    });

    return map;
  }, [doctorsBySpeciality]);

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

        const res = await fetch("/api/doctor/patients", {
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

        const normalized = rawPatients.map((p) => ({
          uHID: p?.uHID || p?.UHID || "",
          name: p?.name || "",
          age: p?.age || "",
          gender: p?.gender || "",
          bloodGroup: p?.bloodGroup || "",
          allergy: p?.allergy || "",
          condition: p?.condition || "",
          phone: p?.phone || "",
          lastVisit: p?.lastVisit || "",
          status: p?.status || "",
          history: Array.isArray(p?.history) ? p.history : [],
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

  const [earnings] = useState({
    today: 2400,
    week: 14500,
    month: 58000,
  });

  const [rating] = useState({
    avg: 4.7,
    count: 182,
  });

  const [pendingReports] = useState(3);

  const [medicineReminders] = useState([
    {
      time: "9:00 AM",
      text: "Patient: Asha — Metformin 500mg",
    },
    {
      time: "2:00 PM",
      text: "Patient: Ravi — Amlodipine 5mg",
    },
    {
      time: "8:00 PM",
      text: "Patient: Neha — Vitamin D3",
    },
  ]);

  const [recentActivity] = useState([
    {
      time: "2 min ago",
      text: "Prescription created for Asha (UHID-1042)",
    },
    {
      time: "1 hour ago",
      text: "Accepted appointment with Ravi (UHID-1099)",
    },
    {
      time: "Yesterday",
      text: "Reviewed Blood Panel report for Neha",
    },
  ]);

  const [emergencyAlerts] = useState([
    {
      severity: "danger",
      text: "Patient Asha — Chest pain (UHID-1042)",
    },
    {
      severity: "warn",
      text: "Patient Ravi — High BP (UHID-1099)",
    },
  ]);

  const [calendarDays] = useState(() => {
    const start = new Date();

    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date(start);

      d.setDate(start.getDate() + i);

      return {
        label: d.getDate(),
        isToday: i === 0,
        hasAppt: [1, 3, 5, 7, 10].includes(i),
      };
    });
  });

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
                      title: "Appointments",
                      value: upcomingCountDisplay,
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
                      description: patientsLoading
                        ? "Loading receptionist records..."
                        : "Patients in your records",
                    },
                    {
                      title: "Pending Reports",
                      value: pendingReports,
                      icon: "📝",
                      accent: "#0ea5e9",
                      onClick: () => setStep("reports"),
                      description: "Uploaded / awaiting review",
                    },
                    {
                      title: "Emergency Cases",
                      value: emergencyAlerts.length,
                      icon: "🚨",
                      accent: "#ef4444",
                      onClick: () => setStep("emergency"),
                      description: "Recent alerts",
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
                    {pendingReports} medical reports pending
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

            <PatientTable
              patients={patients}
              loading={patientsLoading}
              error={patientsError}
              search={patientQuery}
              setSearch={setPatientQuery}
              filter={patientFilter}
              setFilter={setPatientFilter}
              onSelect={handleSelectPatient}
            />

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

            <EmergencyPanel alerts={emergencyAlerts} doctor={doctor} />
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

        {step === "schedule" && (
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
        )}

        {step === "notifications" && (
          <>
            <BackToDashboard title="Notifications" />

            <div className="doctor-card">
              <h3>Medicine Reminders</h3>

              {medicineReminders.map((item, index) => (
                <div key={index} className="doctor-listItem">
                  <strong>{item.time}</strong> — {item.text}
                </div>
              ))}

              <hr />

              <h3>Recent Activity</h3>

              {recentActivity.map((item, index) => (
                <div key={index} className="doctor-listItem">
                  <strong>{item.time}</strong> — {item.text}
                </div>
              ))}
            </div>
          </>
        )}

        {step === "analytics" && (
          <>
            <BackToDashboard title="Analytics" />

            <AnalyticsCard
              earnings={earnings}
              rating={rating}
              pendingReports={pendingReports}
              patients={patients.length}
              appointments={upcomingAppointments.length}
              calendarDays={calendarDays}
            />
          </>
        )}
      </Suspense>
    </Layout>
  );
}

export default Doctor;
