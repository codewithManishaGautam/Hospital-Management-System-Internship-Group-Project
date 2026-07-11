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
const PatientDetailsModal = lazy(() => import("../Components/Doctor/PatientDetailsModal"));
const AppointmentCard = lazy(() => import("../Components/Doctor/AppointmentCard"));
const PrescriptionForm = lazy(() => import("../Components/Doctor/PrescriptionForm"));
const ReportUpload = lazy(() => import("../Components/Doctor/ReportUpload"));
const DoctorProfileDashboard = lazy(() => import("../Components/Doctor/DoctorProfileDashboard"));
const AnalyticsCard = lazy(() => import("../Components/Doctor/AnalyticsCard"));
const EmergencyPanel = lazy(() => import("../Components/Doctor/EmergencyPanel"));

const DoctorDashboardSummaryGrid = lazy(() => import("../Components/Doctor/DoctorDashboardSummaryGrid"));
const DoctorDashboardSection = lazy(() => import("../Components/Doctor/DoctorDashboardSection"));







function Doctor() {


  const [step, setStep] = useState("dashboard");

  const [patientQuery, setPatientQuery] = useState("");
  const [patientFilter, setPatientFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Schedule UI state
  const [scheduleSpeciality, setScheduleSpeciality] = useState("General Medicine");
  const [scheduleDoctorId, setScheduleDoctorId] = useState("d4");


  // Demo data: doctor schedule should support "multiple types of doctors" (UI-level categories).
  // Expanded hospital-relevant specializations (frontend demo directory + schedule filter).
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

      // --- Added: common hospital departments / specialties ---
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
        speciality: "Radiology",
        types: ["Radiologist"],
        doctors: [
          {
            id: "d20",
            name: "Dr. Manav Jain",
            specialization: "Radiology",
            experience: "10",
            availability: "Mon-Fri 10:00 AM - 4:00 PM",
            clinic: "ImagiTech",
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

      // keep original ids (if token matches them)
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
    []
  );

  // Deduplicate by specialization so same specialist shows only once.
  // (Applies when expanded demo list has multiple entries for same specialization.)
  const doctorsBySpecialityDeduped = useMemo(() => {
    const seen = new Set();
    return doctorsBySpeciality.filter((s) => {
      const key = s?.speciality || "";
      if (!key) return true;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [doctorsBySpeciality]);

  // Current logged-in doctor (demo)
  const [loggedInDoctor, setLoggedInDoctor] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Backend routes/controllers in this repo currently expose only:
    // - /api/doctor/patients
    // - /api/doctor/upcoming-appointments
    // - /api/doctor/doctor/prescriptions (through doctorRoutes)
    // There is NO implemented endpoint for doctor profile.
    // So we derive “logged-in doctor” info from the decoded token payload if possible.
    try {
      const parts = token.split(".");
      if (parts.length < 2) return;

      // JWT payload is base64url encoded
      const payloadStr = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(
        decodeURIComponent(
          atob(payloadStr)
            .split("")
            .map((c) => {
              return `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`;
            })
            .join("")
        )
      );

      // Common keys used in various backends
      const doctorId = decoded?.doctorId || decoded?.id || decoded?.userId || decoded?._id || decoded?.doctor?._id;
      const doctorName = decoded?.name || decoded?.doctor?.name;
      const specialization = decoded?.specialization || decoded?.doctor?.specialization;

      // If token contains a doctorId, try to match from demo doctors list.
      if (doctorId) {
        const match = doctorsBySpeciality
          .flatMap((s) => s.doctors || [])
          .find((d) => String(d.id) === String(doctorId));
        setLoggedInDoctor(
          match || {
            id: String(doctorId),
            name: doctorName || match?.name || "Dr.",
            specialization: specialization || match?.specialization || "",
            experience: match?.experience || "",
            availability: match?.availability || "",
            clinic: match?.clinic || "",
          }
        );
        return;
      }

      if (doctorName) {
        setLoggedInDoctor({
          id: decoded?.doctorId || "",
          name: doctorName,
          specialization: specialization || "",
          experience: "",
          availability: "",
          clinic: "",
        });
      }
    } catch {
      // Ignore decoding errors; UI will fall back to demo doctor.
    }
  }, [doctorsBySpeciality]);

  const doctor = useMemo(() => {
    // Fallback to General Medicine before other demo doctors if we can't infer logged-in doctor.
    const generalMedicineDoctor = doctorsBySpeciality
      .find((s) => s.speciality === "General Medicine")
      ?.doctors?.[0];

    return (
      loggedInDoctor ||
      generalMedicineDoctor ||
      doctorsBySpeciality[0]?.doctors?.[0] ||
      {
        name: "Dr.",
        specialization: "",
        availability: "",
        clinic: "",
      }
    );
  }, [loggedInDoctor, doctorsBySpeciality]);

  const allReferralDoctors = useMemo(() => {
    const seen = new Set();
    return doctorsBySpeciality
      .flatMap((group) => group.doctors || [])
      .filter((item) => {
        const key = String(item?.id || item?.name || "");
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [doctorsBySpeciality]);

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
          age: p?.age || p?.patientAge || p?.years || "",
          gender: p?.gender || p?.sex || "",
          bloodGroup: p?.bloodGroup || p?.blood_group || p?.blood || "",
          allergy: p?.allergy || p?.allergyAlert || p?.allergies || "",
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

  // Display helpers: show "Upcoming" while loading, otherwise a numeric count (0 if missing)
  const upcomingCountDisplay = upcomingAppointmentsLoading
    ? "Upcoming"
    : Array.isArray(upcomingAppointments)
    ? upcomingAppointments.length
    : 0;

  const upcomingHasItems = Array.isArray(upcomingAppointments) && upcomingAppointments.length > 0;



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

  // ===== NEW: Local UI-only state for dashboard widgets =====
  const [today, setToday] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" });
  });
  const [earnings] = useState({ today: 2400, week: 14500, month: 58000 });
  const [rating] = useState({ avg: 4.7, count: 182 });
  const [pendingReports] = useState(3);
  const [medicineReminders] = useState([
    { time: "9:00 AM", text: "Patient: Asha — Metformin 500mg" },
    { time: "2:00 PM", text: "Patient: Ravi — Amlodipine 5mg" },
    { time: "8:00 PM", text: "Patient: Neha — Vitamin D3" },
  ]);
  const [recentActivity] = useState([
    { time: "2 min ago", text: "Prescription created for Asha (UHID-1042)" },
    { time: "1 hour ago", text: "Accepted appointment with Ravi (UHID-1099)" },
    { time: "Yesterday", text: "Reviewed Blood Panel report for Neha" },
  ]);
  const [emergencyAlerts] = useState([
    { severity: "danger", text: "Patient Asha — Chest pain (UHID-1042)" },
    { severity: "warn", text: "Patient Ravi — High BP (UHID-1099)" },
  ]);
  const [calendarDays] = useState(() => {
    // Build a 14-day mini calendar starting from today
    const start = new Date();
    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return {
        label: d.getDate(),
        isToday: i === 0,
        muted: i < 0,
        hasAppt: [1, 3, 5, 7, 10].includes(i),
      };
    });
  });
  // ==============================================================

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
      <Suspense fallback={<div className="doctor-empty">Loading doctor module...</div>}>
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
                  {upcomingHasItems ? (
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
                  {upcomingHasItems ? (
                    upcomingAppointments.slice(0, 3).map((a) => (
                      <AppointmentCard
                        key={a.id}
                        appt={a}
                        onAccept={() => handleAcceptAppointment(a)}
                        onReject={() => handleRejectAppointment(a)}
                      />
                    ))
                  ) : (
                    <div className="doctor-empty">No appointments yet.</div>
                  )}
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
              {typeof upcomingCountDisplay === "number"
                ? `Today: ${upcomingCountDisplay} appointment(s)`
                : `Today: ${upcomingCountDisplay}`}
            </div>

            {upcomingHasItems ? (
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
          doctors={allReferralDoctors}
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

      {/* Profile edit moved to profile-dashboard, keeping old profile step for backward compatibility */}
      {step === "profile" && (
        <DoctorProfileDashboard
          currentDoctor={doctor}
        />
      )}

      {step === "profile-dashboard" && (
        <DoctorProfileDashboard
          currentDoctor={doctor}
        />
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
              value={upcomingCountDisplay}
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

      </Suspense>
    </Layout>
  );
}

export default Doctor;

