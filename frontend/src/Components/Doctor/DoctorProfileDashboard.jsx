import React, { useEffect, useState } from "react";

function DoctorProfileDashboard({ currentDoctor }) {
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Demo doctors data fallback
  const demoAllDoctors = [
    {
      _id: "d1",
      name: "Dr. A. Sharma",
      specialization: "Cardiology",
      qualification: "MBBS, MD Cardiology",
      experience: "8",
      phone: "9876543210"
    },
    {
      _id: "d2",
      name: "Dr. Neha Kapoor",
      specialization: "Cardiology",
      qualification: "MBBS, DM Cardiology",
      experience: "6",
      phone: "9876543211"
    },
    {
      _id: "d3",
      name: "Dr. R. Mehta",
      specialization: "Endocrinology",
      qualification: "MBBS, MD Endocrinology",
      experience: "10",
      phone: "9876543212"
    },
    {
      _id: "d4",
      name: "Dr. Vikram Iyer",
      specialization: "General Medicine",
      qualification: "MBBS, MD General Medicine",
      experience: "7",
      phone: "9876543213"
    },
    {
      _id: "d5",
      name: "Dr. Sameer Kulkarni",
      specialization: "Cardiology",
      qualification: "MBBS, DM Cardiology",
      experience: "9",
      phone: "9876543214"
    },
    {
      _id: "d6",
      name: "Dr. Priya Nair",
      specialization: "Cardiology",
      qualification: "MBBS, MD Cardiology",
      experience: "5",
      phone: "9876543215"
    },
    {
      _id: "d7",
      name: "Dr. Kavita Joshi",
      specialization: "Endocrinology",
      qualification: "MBBS, MD Endocrinology",
      experience: "7",
      phone: "9876543216"
    },
    {
      _id: "d8",
      name: "Dr. Rahul Bansal",
      specialization: "Endocrinology",
      qualification: "MBBS, DM Endocrinology",
      experience: "4",
      phone: "9876543217"
    }
  ];

  // Fetch all doctors from backend
  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const res = await fetch("/api/doctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          console.warn("Backend not available, using demo data");
          setAllDoctors(demoAllDoctors);
          setLoading(false);
          return;
        }

        const payload = await res.json();
        const doctorsList = payload?.data || payload?.doctors || demoAllDoctors;
        setAllDoctors(doctorsList.length > 0 ? doctorsList : demoAllDoctors);
      } catch (err) {
        console.warn("Error fetching doctors, using demo data:", err.message);
        setAllDoctors(demoAllDoctors);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDoctors();
  }, []);

  return (
    <div className="doctor-profile-dashboard">
      {/* Current Doctor Profile Section */}
      <section className="profile-dashboard__current-section">
        <h2 className="profile-dashboard__title">My Profile</h2>
        
        {currentDoctor ? (
          <div className="profile-dashboard__current-card">
            <div className="profile-dashboard__avatar">
              {currentDoctor.photo ? (
                <img 
                  src={currentDoctor.photo} 
                  alt={currentDoctor.name}
                  className="profile-dashboard__avatar-img"
                />
              ) : (
                <div className="profile-dashboard__avatar-placeholder">
                  {currentDoctor.name?.charAt(0)?.toUpperCase()}
                </div>
              )}
            </div>

            <div className="profile-dashboard__current-info">
              <div className="profile-dashboard__current-header">
                <h3 className="profile-dashboard__doctor-name">{currentDoctor.name}</h3>
                <span className="profile-dashboard__badge-current">Current Doctor</span>
              </div>

              <div className="profile-dashboard__details">
                <div className="profile-dashboard__detail-item">
                  <span className="profile-dashboard__label">Specialization:</span>
                  <span className="profile-dashboard__value">{currentDoctor.specialization}</span>
                </div>

                {currentDoctor.qualification && (
                  <div className="profile-dashboard__detail-item">
                    <span className="profile-dashboard__label">Qualification:</span>
                    <span className="profile-dashboard__value">{currentDoctor.qualification}</span>
                  </div>
                )}

                {currentDoctor.experience && (
                  <div className="profile-dashboard__detail-item">
                    <span className="profile-dashboard__label">Experience:</span>
                    <span className="profile-dashboard__value">{currentDoctor.experience} years</span>
                  </div>
                )}

                {currentDoctor.phone && (
                  <div className="profile-dashboard__detail-item">
                    <span className="profile-dashboard__label">Phone:</span>
                    <span className="profile-dashboard__value">{currentDoctor.phone}</span>
                  </div>
                )}

                {currentDoctor.clinic && (
                  <div className="profile-dashboard__detail-item">
                    <span className="profile-dashboard__label">Clinic:</span>
                    <span className="profile-dashboard__value">{currentDoctor.clinic}</span>
                  </div>
                )}

                {currentDoctor.availability && (
                  <div className="profile-dashboard__detail-item">
                    <span className="profile-dashboard__label">Availability:</span>
                    <span className="profile-dashboard__value">{currentDoctor.availability}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-dashboard__no-data">No current doctor profile available</div>
        )}
      </section>

      {/* All Doctors Section */}
      <section className="profile-dashboard__all-doctors-section">
        <h2 className="profile-dashboard__title">Hospital Doctors Directory</h2>

        {loading && (
          <div className="profile-dashboard__loading">Loading doctors...</div>
        )}

        {error && (
          <div className="profile-dashboard__error">{error}</div>
        )}

        {!loading && allDoctors.length === 0 && !error && (
          <div className="profile-dashboard__no-data">No doctors available</div>
        )}

        {!loading && allDoctors.length > 0 && (
          <div className="profile-dashboard__grid">
            {allDoctors.map((doctor) => (
              <div 
                key={doctor._id || doctor.id} 
                className={`profile-dashboard__doctor-card ${
                  doctor._id === currentDoctor?._id || doctor.id === currentDoctor?.id
                    ? "profile-dashboard__doctor-card--current"
                    : ""
                }`}
              >
                <div className="profile-dashboard__card-header">
                  {doctor._id === currentDoctor?._id || doctor.id === currentDoctor?.id ? (
                    <span className="profile-dashboard__badge-current-small">Current</span>
                  ) : null}
                </div>

                <div className="profile-dashboard__card-content">
                  <h3 className="profile-dashboard__card-name">{doctor.name}</h3>

                  <div className="profile-dashboard__card-specialization">
                    <span className="profile-dashboard__spec-label">Specialist in:</span>
                    <p className="profile-dashboard__spec-value">{doctor.specialization}</p>
                  </div>

                  <div className="profile-dashboard__card-details">
                    {doctor.qualification && (
                      <div className="profile-dashboard__card-detail">
                        <strong>Qualification:</strong> {doctor.qualification}
                      </div>
                    )}

                    {doctor.experience && (
                      <div className="profile-dashboard__card-detail">
                        <strong>Experience:</strong> {doctor.experience} years
                      </div>
                    )}

                    {doctor.phone && (
                      <div className="profile-dashboard__card-detail">
                        <strong>Contact:</strong> {doctor.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DoctorProfileDashboard;
