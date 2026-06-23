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
      // ===== NEW FIELDS =====
      photo: doctor?.photo || "",
      languages: doctor?.languages || "English, Hindi",
      consultationFee: doctor?.consultationFee || "",
      licenseNumber: doctor?.licenseNumber || "",
      awards: doctor?.awards || "",
      publications: doctor?.publications || "",
      workingHours: doctor?.workingHours || "Mon-Fri 10:00 AM - 5:00 PM",
      accountStatus: doctor?.accountStatus || "Active",
      notifyEmail: doctor?.notifyEmail ?? true,
      notifySms: doctor?.notifySms ?? false,
      notifyAppointments: doctor?.notifyAppointments ?? true,
      notifyReports: doctor?.notifyReports ?? true,
      digitalSignature: doctor?.digitalSignature || "",
      twoFactorEnabled: doctor?.twoFactorEnabled ?? false,
    };
  }, [doctor]);
  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState("profile"); // profile | availability | preferences | security
  const [form, setForm] = useState(defaultDoctor);
  const [status, setStatus] = useState({ kind: "idle", message: "" });
  const [photoPreview, setPhotoPreview] = useState(doctor?.photo || "");
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordStatus, setPasswordStatus] = useState({
    kind: "idle",
    message: "",
  });

  useEffect(() => {
    // sync when parent doctor changes
    setForm(defaultDoctor);
  }, [defaultDoctor]);

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result;
      setPhotoPreview(dataUrl);
      handleChange("photo", dataUrl);
    };
    reader.readAsDataURL(file);
  }
  function handlePasswordChange(key, value) {
    setPasswordForm((prev) => ({ ...prev, [key]: value }));
  }
  function handlePasswordSubmit(e) {
    e.preventDefault();
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setPasswordStatus({
        kind: "error",
        message: "All password fields are required.",
      });
      return;
    }
    if (passwordForm.next.length < 6) {
      setPasswordStatus({
        kind: "error",
        message: "New password must be at least 6 characters.",
      });
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordStatus({
        kind: "error",
        message: "New password and confirm password do not match.",
      });
      return;
    }
    setPasswordStatus({
      kind: "success",
      message: "Password updated successfully (UI placeholder).",
    });
    setPasswordForm({ current: "", next: "", confirm: "" });
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
    if (exp && !/^[0-9]+(\.[0-9]+)?$/.test(exp))
      return "Experience must be a number.";
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
    if (!n) return "🩺";
    const parts = n.split(/\s+/).filter(Boolean);
    const initials = parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");
    return initials || "🩺";
  }, [form.name]);

  const statusBadgeColor = useMemo(() => {
    const s = (form.accountStatus || "").toLowerCase();
    if (s === "active") return { bg: "rgba(16,185,129,.15)", color: "#065f46" };
    if (s === "on leave")
      return { bg: "rgba(245,158,11,.15)", color: "#92400e" };
    if (s === "busy") return { bg: "rgba(239,68,68,.15)", color: "#7f1d1d" };
    return { bg: "rgba(100,116,139,.15)", color: "#334155" };
  }, [form.accountStatus]);

  return (
    <div className="doctor-panel">
      <div className="doctor-panel__header">
        <div>
          <h3 className="doctor-panel__title">My Profile</h3>
          <p className="doctor-panel__subtitle">
            Update your details, availability, and preferences
          </p>
        </div>

        <div className="doctor-panel__actions">
          {!edit ? (
            <button
              type="button"
              className="doctor-btn"
              onClick={() => setEdit(true)}
            >
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
            status.kind === "success"
              ? "doctor-profile__status doctor-profile__status--success"
              : "doctor-profile__status doctor-profile__status--error"
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
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ fontSize: 30, color: "#fff" }}>🩺</span>
              )}
            </div>
            <div className="doctor-profile__name">{doctor?.name || "Dr."}</div>
            <div className="doctor-profile__sub">
              {doctor?.specialization || "Specialization"}
            </div>
            {form.accountStatus ? (
              <span
                style={{
                  alignSelf: "flex-start",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 1000,
                  background: statusBadgeColor.bg,
                  color: statusBadgeColor.color,
                }}
              >
                ● {form.accountStatus}
              </span>
            ) : null}
            <div className="doctor-profile__grid">
              <div className="doctor-kv">
                <div className="doctor-kv__k">Availability</div>
                <div className="doctor-kv__v">
                  {doctor?.availability || "—"}
                </div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Experience</div>
                <div className="doctor-kv__v">
                  {doctor?.experience || "—"} yrs
                </div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Clinic</div>
                <div className="doctor-kv__v">{doctor?.clinic || "—"}</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Languages</div>
                <div className="doctor-kv__v">{form.languages || "—"}</div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">Consultation Fee</div>
                <div className="doctor-kv__v">
                  {form.consultationFee ? `₹ ${form.consultationFee}` : "—"}
                </div>
              </div>
              <div className="doctor-kv">
                <div className="doctor-kv__k">License No.</div>
                <div className="doctor-kv__v">{form.licenseNumber || "—"}</div>
              </div>
            </div>

            {doctor?.bio ||
            doctor?.phone ||
            doctor?.email ||
            form.awards ||
            form.publications ? (
              <div className="doctor-profile__details">
                {doctor?.bio ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">Bio</div>
                    <div className="doctor-profile__detailVal">
                      {doctor.bio}
                    </div>
                  </div>
                ) : null}
                {doctor?.phone ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">Phone</div>
                    <div className="doctor-profile__detailVal">
                      {doctor.phone}
                    </div>
                  </div>
                ) : null}
                {doctor?.email ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">Email</div>
                    <div className="doctor-profile__detailVal">
                      {doctor.email}
                    </div>
                  </div>
                ) : null}
                {form.awards ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">Awards</div>
                    <div className="doctor-profile__detailVal">
                      {form.awards}
                    </div>
                  </div>
                ) : null}
                {form.publications ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">
                      Publications
                    </div>
                    <div className="doctor-profile__detailVal">
                      {form.publications}
                    </div>
                  </div>
                ) : null}
                {form.digitalSignature ? (
                  <div className="doctor-profile__detailRow">
                    <div className="doctor-profile__detailKey">
                      Digital Signature
                    </div>
                    <div
                      className="doctor-profile__detailVal"
                      style={{ fontStyle: "italic", fontFamily: "cursive" }}
                    >
                      {form.digitalSignature}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <form className="doctor-form" onSubmit={handleSubmit}>
            <div
              className="doctor-profile__tabs"
              role="tablist"
              aria-label="Doctor profile tabs"
            >
              <button
                type="button"
                className={
                  tab === "profile"
                    ? "doctor-profile__tab doctor-profile__tab--active"
                    : "doctor-profile__tab"
                }
                onClick={() => setTab("profile")}
                role="tab"
                aria-selected={tab === "profile"}
              >
                My Profile
              </button>
              <button
                type="button"
                className={
                  tab === "availability"
                    ? "doctor-profile__tab doctor-profile__tab--active"
                    : "doctor-profile__tab"
                }
                onClick={() => setTab("availability")}
                role="tab"
                aria-selected={tab === "availability"}
              >
                Availability
              </button>
              <button
                type="button"
                className={
                  tab === "preferences"
                    ? "doctor-profile__tab doctor-profile__tab--active"
                    : "doctor-profile__tab"
                }
                onClick={() => setTab("preferences")}
                role="tab"
                aria-selected={tab === "preferences"}
              >
                Preferences
              </button>
              <button
                type="button"
                className={
                  tab === "security"
                    ? "doctor-profile__tab doctor-profile__tab--active"
                    : "doctor-profile__tab"
                }
                onClick={() => setTab("security")}
                role="tab"
                aria-selected={tab === "security"}
              >
                Security
              </button>
            </div>

            {tab === "profile" ? (
              <>
                <div className="doctor-form__section">
                  <label className="doctor-label">Profile Photo</label>
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 12,
                        background: "var(--doctor-muted, #eef2f7)",
                        display: "grid",
                        placeItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: 22 }}>👤</span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="doctor-input"
                      onChange={handlePhotoChange}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
                <div className="doctor-form__grid">
                  <div className="doctor-form__col">
                    <label className="doctor-label">Name</label>
                    <input
                      className="doctor-input"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Specialization</label>
                    <input
                      className="doctor-input"
                      value={form.specialization}
                      onChange={(e) =>
                        handleChange("specialization", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="doctor-form__grid">
                  <div className="doctor-form__col">
                    <label className="doctor-label">Experience (years)</label>
                    <input
                      className="doctor-input"
                      value={form.experience}
                      onChange={(e) =>
                        handleChange("experience", e.target.value)
                      }
                      placeholder="e.g., 8"
                    />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Clinic</label>
                    <input
                      className="doctor-input"
                      value={form.clinic}
                      onChange={(e) => handleChange("clinic", e.target.value)}
                    />
                  </div>
                </div>

                <div className="doctor-form__section">
                  <label className="doctor-label">
                    Bio (short description)
                  </label>
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
                    <input
                      className="doctor-input"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Email (optional)</label>
                    <input
                      className="doctor-input"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="doctor-form__grid">
                  <div className="doctor-form__col">
                    <label className="doctor-label">Languages Spoken</label>
                    <input
                      className="doctor-input"
                      value={form.languages}
                      onChange={(e) =>
                        handleChange("languages", e.target.value)
                      }
                      placeholder="e.g., English, Hindi, Marathi"
                    />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Consultation Fee (₹)</label>
                    <input
                      className="doctor-input"
                      type="number"
                      value={form.consultationFee}
                      onChange={(e) =>
                        handleChange("consultationFee", e.target.value)
                      }
                      placeholder="e.g., 600"
                    />
                  </div>
                </div>
                <div className="doctor-form__grid">
                  <div className="doctor-form__col">
                    <label className="doctor-label">Medical License No.</label>
                    <input
                      className="doctor-input"
                      value={form.licenseNumber}
                      onChange={(e) =>
                        handleChange("licenseNumber", e.target.value)
                      }
                      placeholder="e.g., MCI/12345"
                    />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Account Status</label>
                    <select
                      className="doctor-input"
                      value={form.accountStatus}
                      onChange={(e) =>
                        handleChange("accountStatus", e.target.value)
                      }
                    >
                      <option>Active</option>
                      <option>On Leave</option>
                      <option>Busy</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="doctor-form__section">
                  <label className="doctor-label">Awards & Achievements</label>
                  <textarea
                    className="doctor-textarea"
                    value={form.awards}
                    onChange={(e) => handleChange("awards", e.target.value)}
                    placeholder="e.g., Best Cardiologist 2022, Healthcare Excellence Award"
                  />
                </div>
                <div className="doctor-form__section">
                  <label className="doctor-label">
                    Publications / Research
                  </label>
                  <textarea
                    className="doctor-textarea"
                    value={form.publications}
                    onChange={(e) =>
                      handleChange("publications", e.target.value)
                    }
                    placeholder="e.g., Journal of Cardiology 2021, NEJM 2020"
                  />
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
                    onChange={(e) =>
                      handleChange("availability", e.target.value)
                    }
                    placeholder="e.g., Mon-Fri 10:00 AM - 5:00 PM"
                  />
                </div>
                <div className="doctor-form__section">
                  <label className="doctor-label">Day-wise Working Hours</label>
                  <input
                    className="doctor-input"
                    value={form.workingHours}
                    onChange={(e) =>
                      handleChange("workingHours", e.target.value)
                    }
                    placeholder="e.g., Mon 9-5, Tue 9-5, Wed OFF, Thu 9-1, Fri 9-5, Sat 9-12, Sun OFF"
                  />
                </div>
                <div className="doctor-form__grid">
                  <div className="doctor-form__col">
                    <label className="doctor-label">
                      Quick note (optional)
                    </label>
                    <input
                      className="doctor-input"
                      value={""}
                      readOnly
                      placeholder="e.g., Walk-ins 2-4 PM"
                    />
                  </div>
                  <div className="doctor-form__col">
                    <label className="doctor-label">Appointment mode</label>
                    <input
                      className="doctor-input"
                      value={"In-clinic"}
                      readOnly
                    />
                  </div>
                </div>
              </>
            ) : null}

            {tab === "preferences" ? (
              <>
                <div className="doctor-form__section">
                  <label className="doctor-label">
                    Certifications (comma separated)
                  </label>
                  <input
                    className="doctor-input"
                    value={form.certifications}
                    onChange={(e) =>
                      handleChange("certifications", e.target.value)
                    }
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
                  <label className="doctor-label">Digital Signature</label>
                  <input
                    className="doctor-input"
                    value={form.digitalSignature}
                    onChange={(e) =>
                      handleChange("digitalSignature", e.target.value)
                    }
                    placeholder="Type your full name as digital signature"
                    style={{ fontStyle: "italic", fontFamily: "cursive" }}
                  />
                </div>
                <div className="doctor-form__section">
                  <label className="doctor-label">
                    Notification Preferences
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginTop: 4,
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 800,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!form.notifyEmail}
                        onChange={(e) =>
                          handleChange("notifyEmail", e.target.checked)
                        }
                      />
                      Email notifications
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 800,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!form.notifySms}
                        onChange={(e) =>
                          handleChange("notifySms", e.target.checked)
                        }
                      />
                      SMS notifications
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 800,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!form.notifyAppointments}
                        onChange={(e) =>
                          handleChange("notifyAppointments", e.target.checked)
                        }
                      />
                      Appointment reminders
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 800,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!form.notifyReports}
                        onChange={(e) =>
                          handleChange("notifyReports", e.target.checked)
                        }
                      />
                      New report alerts
                    </label>
                  </div>
                </div>
              </>
            ) : null}
            {tab === "security" ? (
              <>
                <div className="doctor-form__section">
                  <label className="doctor-label">Change Password</label>
                  {passwordStatus.kind !== "idle" ? (
                    <div
                      className={
                        passwordStatus.kind === "success"
                          ? "doctor-profile__status doctor-profile__status--success"
                          : "doctor-profile__status doctor-profile__status--error"
                      }
                      role={
                        passwordStatus.kind === "success" ? "status" : "alert"
                      }
                    >
                      {passwordStatus.message}
                    </div>
                  ) : null}
                  <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                    <input
                      type="password"
                      className="doctor-input"
                      placeholder="Current password"
                      value={passwordForm.current}
                      onChange={(e) =>
                        handlePasswordChange("current", e.target.value)
                      }
                    />
                    <input
                      type="password"
                      className="doctor-input"
                      placeholder="New password (min 6 chars)"
                      value={passwordForm.next}
                      onChange={(e) =>
                        handlePasswordChange("next", e.target.value)
                      }
                    />
                    <input
                      type="password"
                      className="doctor-input"
                      placeholder="Confirm new password"
                      value={passwordForm.confirm}
                      onChange={(e) =>
                        handlePasswordChange("confirm", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="doctor-btn doctor-btn--primary"
                      onClick={handlePasswordSubmit}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="doctor-form__section">
                  <label className="doctor-label">
                    Two-Factor Authentication
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 800,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!form.twoFactorEnabled}
                      onChange={(e) =>
                        handleChange("twoFactorEnabled", e.target.checked)
                      }
                    />
                    Enable 2FA for secure login (UI placeholder)
                  </label>
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
