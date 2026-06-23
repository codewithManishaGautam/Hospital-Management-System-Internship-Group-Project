import React, {
  useState,
  useEffect,
} from "react";
import generateUHID from "./utils/generateUHID";
import "../../styles/Reception/registration.css";
function RegistrationForm({ patient }) {
  const [formData, setFormData] = useState({
    uhid: "",
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
  });
useEffect(() => {

  if (patient) {

    setFormData({
      uhid:
        patient.uhid || "",

      name:
        patient.patientName || "",

      age:
        patient.age || "",

      gender:
        patient.gender || "",

      mobile:
        patient.mobile || "",

      address:
        patient.address || "",
    });

  }

}, [patient]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateUHID = () => {
    if (!formData.mobile) {
      alert("Enter Mobile Number First");
      return;
    }

    const uhid = generateUHID(formData.mobile);

    setFormData({
      ...formData,
      uhid,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Patient Data:", formData);

    alert("Patient Registered Successfully");
  };

  return (
    <div className="registration-container">

      <div className="registration-header">
        <h2>Patient Registration</h2>
      </div>

      <form
        className="registration-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-group">
            <label>Patient Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Patient Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter Age"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>
          </div>

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>

            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
            />
          </div>

          <div className="form-group full-width">
            <label>UHID Number</label>

            <div className="uhid-container">

              <input
                type="text"
                value={formData.uhid}
                readOnly
                placeholder="Generated UHID"
              />

              <button
                type="button"
                className="generate-btn"
                onClick={handleGenerateUHID}
              >
                Generate UHID
              </button>

            </div>

          </div>

        </div>

        <div className="form-buttons">

          <button
            type="submit"
            className="save-btn"
          >
            Save Registration
          </button>

          <button
            type="button"
            className="send-btn"
          >
            Send To Doctor
          </button>

        </div>

      </form>

    </div>
  );
}

export default RegistrationForm;