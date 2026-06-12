import React, { useState } from "react";

function DoctorProfileCard({ doctor, onSave }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: doctor?.name || "",
    specialization: doctor?.specialization || "",
    experience: doctor?.experience || "",
    availability: doctor?.availability || "",
    clinic: doctor?.clinic || "",
  });

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave?.(form);
    setEdit(false);
  }

  return (
    <div className="doctor-panel">
      <div className="doctor-panel__header">
        <div>
          <h3 className="doctor-panel__title">Doctor Profile</h3>
          <p className="doctor-panel__subtitle">Manage your availability and experience</p>
        </div>

        <div className="doctor-panel__actions">
          <button type="button" className="doctor-btn" onClick={() => setEdit((v) => !v)}>
            {edit ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {!edit ? (
        <div className="doctor-profile">
          <div className="doctor-profile__card">
            <div className="doctor-profile__avatar" aria-hidden="true">👨‍⚕️</div>
            <div className="doctor-profile__name">{doctor?.name || "Dr."}</div>
            <div className="doctor-profile__sub">{doctor?.specialization || "Specialization"}</div>

            <div className="doctor-profile__grid">
              <div className="doctor-kv">
                <div className="doctor-kv__k">Availability</div>
                <div className="doctor-kv__v">{doctor?.availability || "—"}</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Experience</div>
                <div className="doctor-kv__v">{doctor?.experience || "—"}</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Clinic</div>
                <div className="doctor-kv__v">{doctor?.clinic || "—"}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form className="doctor-form" onSubmit={handleSubmit}>
          <div className="doctor-form__grid">
            <div className="doctor-form__col">
              <label className="doctor-label">Name</label>
              <input className="doctor-input" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="doctor-form__col">
              <label className="doctor-label">Specialization</label>
              <input
                className="doctor-input"
                value={form.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
              />
            </div>
          </div>

          <div className="doctor-form__grid">
            <div className="doctor-form__col">
              <label className="doctor-label">Experience (years)</label>
              <input
                className="doctor-input"
                value={form.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
              />
            </div>
            <div className="doctor-form__col">
              <label className="doctor-label">Clinic</label>
              <input className="doctor-input" value={form.clinic} onChange={(e) => handleChange("clinic", e.target.value)} />
            </div>
          </div>

          <div className="doctor-form__section">
            <label className="doctor-label">Availability Timings</label>
            <textarea
              className="doctor-textarea"
              value={form.availability}
              onChange={(e) => handleChange("availability", e.target.value)}
              placeholder="e.g., Mon-Fri 10:00 AM - 5:00 PM"
            />
          </div>

          <div className="doctor-form__submit">
            <button type="submit" className="doctor-btn doctor-btn--primary">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default DoctorProfileCard;

