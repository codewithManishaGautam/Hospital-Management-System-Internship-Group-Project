import React, { useEffect, useMemo, useState } from "react";

function DoctorProfileCard({ doctor, onSave }) {
  const defaultDoctor = useMemo(() => {
    return {
      name: doctor?.name || "",
      specialization: doctor?.specialization || "",
      experience: doctor?.experience || "",
      availability: doctor?.availability || "",
      clinic: doctor?.clinic || "",
      // extra UI fields (no backend dependency; stored locally only)
      phone: doctor?.phone || "",
      email: doctor?.email || "",
      bio: doctor?.bio || "",
      certifications: doctor?.certifications || "",
    };
  }, [doctor]);

  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState("profile"); // profile | availability | preferences
  const [form, setForm] = useState(defaultDoctor);
  const [status, setStatus] = useState({ kind: "idle", message: "" });

  useEffect(() => {
    // sync when parent doctor changes
    setForm(defaultDoctor);
  }, [defaultDoctor]);

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetAndExit() {
    setForm(defaultDoctor);
    setEdit(false);
    setTab("profile");
    setStatus({ kind: "idle", message: "" });
  }

  function validate() {
    if (!form.name?.trim()) return "Name is required.";
    const exp = String(form.experience ?? "").trim();
    if (exp && !/^[0-9]+(\.[0-9]+)?$/.test(exp)) return "Experience must be a number.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ kind: "error", message: err });
      return;
    }

    onSave?.(form);
    setStatus({ kind: "success", message: "Profile updated successfully." });
    setEdit(false);
    setTab("profile");

    // keep form values (so success screen shows the updated data)
  }

  const avatarText = useMemo(() => {
    const n = (form.name || "").trim();
    if (!n) return "👨‍⚕️";
    const parts = n.split(/\s+/).filter(Boolean);
    const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
    return initials || "👨‍⚕️";
  }, [form.name]);

  return (
    <div className="doctor-panel">
      <div className="doctor-panel__header">
        <div>
          <h3 className="doctor-panel__title">My Profile</h3>
          <p className="doctor-panel__subtitle">Update your details, availability, and preferences</p>
        </div>

        <div className="doctor-panel__actions">
          {!edit ? (
            <button type="button" className="doctor-btn" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          ) : (
            <button type="button" className="doctor-btn" onClick={resetAndExit}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {status.kind !== "idle" ? (
        <div
          className={
            status.kind === "success" ? "doctor-profile__status doctor-profile__status--success" : "doctor-profile__status doctor-profile__status--error"
          }
          role={status.kind === "success" ? "status" : "alert"}
        >
          {status.message}
        </div>
      ) : null}

      <div className="doctor-profile">
        {!edit ? (
          <div className="doctor-profile__card">
            <div className="doctor-profile__avatar" aria-hidden="true">
              {avatarText}
            </div>
            <div className="doctor-profile__name">{doctor?.name || "Dr."}</div>
            <div className="doctor-profile__sub">{doctor?.specialization || "Specialization"}</div>

            <div className="doctor-profile__grid">
              <div className="doctor-kv">
                <div className="doctor-kv__k">Availability</div>
                <div className="doctor-kv__v">{doctor?.availability || "—"}</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Experience</div>
                <div className="doctor-kv__v">{doctor?.experience || "—"} yrs</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Clinic</div>
                <div className="doctor-kv__v">{doctor?.clinic || "—"}</div>
              </div>
            </div>

            {(doctor?.bio || doctor?.phone || doctor?.email) ? (
              <div className="doctor-profile__details">
                {doctor?.bio ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">Bio</div>
                    <div className="doctor-profile__detailVal">{doctor.bio}</div>
                  </div>
                ) : null}
                {doctor?.phone ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">Phone</div>
                    <div className="doctor-profile__detailVal">{doctor.phone}</div>
                  </div>
                ) : null}
                {doctor?.email ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">Email</div>
                    <div className="doctor-profile__detailVal">{doctor.email}</div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <form className="doctor-form" onSubmit={handleSubmit}>
            <div className="doctor-profile__tabs" role="tablist" aria-label="Doctor profile tabs">
              <button
                type="button"
                className={tab === "profile" ? "doctor-profile__tab doctor-profile__tab--active" : "doctor-profile__tab"}
                onClick={() => setTab("profile")}
                role="tab"
                aria-selected={tab === "profile"}
              >
                My Profile
              </button>
              <button
                type="button"
                className={tab === "availability" ? "doctor-profile__tab doctor-profile__tab--active" : "doctor-profile__tab"}
                onClick={() => setTab("availability")}
                role="tab"
                aria-selected={tab === "availability"}
              >
                Availability
              </button>
              <button
                type="button"
                className={tab === "preferences" ? "doctor-profile__tab doctor-profile__tab--active" : "doctor-profile__tab"}
                onClick={() => setTab("preferences")}
                role="tab"
                aria-selected={tab === "preferences"}
              >
                Preferences
              </button>
            </div>

            {tab === "profile" ? (
              <>
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
                      placeholder="e.g., 8"
                    />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Clinic</label>
                    <input className="doctor-input" value={form.clinic} onChange={(e) => handleChange("clinic", e.target.value)} />
                  </div>
                </div>

                <div className="doctor-form__section">
                  <label className="doctor-label">Bio (short description)</label>
                  <textarea
                    className="doctor-textarea"
                    value={form.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    placeholder="e.g., Cardiology focus, preventive care, lifestyle guidance..."
                  />
                </div>

                <div className="doctor-form__grid">
                  <div className="doctor-form__col">
                    <label className="doctor-label">Phone (optional)</label>
                    <input className="doctor-input" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Email (optional)</label>
                    <input className="doctor-input" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                  </div>
                </div>
              </>
            ) : null}

            {tab === "availability" ? (
              <>
                <div className="doctor-form__section">
                  <label className="doctor-label">Availability Timings</label>
                  <textarea
                    className="doctor-textarea"
                    value={form.availability}
                    onChange={(e) => handleChange("availability", e.target.value)}
                    placeholder="e.g., Mon-Fri 10:00 AM - 5:00 PM"
                  />
                </div>

                <div className="doctor-form__grid">
                  <div className="doctor-form__col">
                    <label className="doctor-label">Quick note (optional)</label>
                    <input className="doctor-input" value={""} readOnly placeholder="e.g., Walk-ins 2-4 PM" />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Appointment mode</label>
                    <input className="doctor-input" value={"In-clinic"} readOnly />
                  </div>
                </div>
              </>
            ) : null}

            {tab === "preferences" ? (
              <>
                <div className="doctor-form__section">
                  <label className="doctor-label">Certifications (comma separated)</label>
                  <input
                    className="doctor-input"
                    value={form.certifications}
                    onChange={(e) => handleChange("certifications", e.target.value)}
                    placeholder="e.g., ACLS, BLS, MBBS"
                  />

                  <label className="doctor-label" style={{ marginTop: 12 }}>
                    Education (comma separated)
                  </label>
                  <input
                    className="doctor-input"
                    value={form.education || ""}
                    onChange={(e) => handleChange("education", e.target.value)}
                    placeholder="e.g., MBBS (Year), MS (Year), Fellowship (Year)"
                  />
                </div>

                <div className="doctor-form__section">
                  <label className="doctor-label">Preferences note</label>
                  <textarea
                    className="doctor-textarea"
                    value={""}
                    readOnly
                    placeholder="UI placeholder: configure reminder preferences later"
                  />
                </div>
              </>
            ) : null}

            <div className="doctor-form__submit">
              <button type="submit" className="doctor-btn doctor-btn--primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default DoctorProfileCard;


