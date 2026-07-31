import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/doctor/doctorProfile.css";

function ProfileDashboard({ doctorName }) {
  const [doctor, setDoctor] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      fetchDoctor();
    }
  }, []);

  const fetchDoctor = async () => {
    try {
      console.log("doctorName =", doctorName);

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/api/doctor/profile/${user.doctorId}`,
      );

      console.log("API Response =", res.data);

      setDoctor(res.data.doctor);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/doctor/profile/${doctor._id}`,
        doctor,
      );

      alert("Profile Updated Successfully");

      setEdit(false);

      fetchDoctor();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="profile-dashboard">
      <div className="profile-header">
        <div className="profile-avatar">
          {doctor.name ? doctor.name.charAt(0).toUpperCase() : "D"}
        </div>

        <div>
          <h2>Doctor Profile</h2>
          <p>Manage your personal information</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-row">
          <div className="profile-field">
            <label>Name</label>

            <input
              type="text"
              value={doctor.name || ""}
              disabled={!edit}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="profile-field">
            <label>Specialization</label>

            <input
              type="text"
              value={doctor.specialization || ""}
              disabled={!edit}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  specialization: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <label>Qualification</label>

            <input
              type="text"
              value={doctor.qualification || ""}
              disabled={!edit}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  qualification: e.target.value,
                })
              }
            />
          </div>

          <div className="profile-field">
            <label>Experience</label>

            <input
              type="text"
              value={doctor.experience || ""}
              disabled={!edit}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  experience: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <label>Mobile</label>

            <input
              type="text"
              value={doctor.mobile || ""}
              disabled={!edit}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  mobile: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="profile-buttons">
          {!edit ? (
            <button className="edit-btn" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          ) : (
            <button className="save-btn" onClick={handleUpdate}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard;
