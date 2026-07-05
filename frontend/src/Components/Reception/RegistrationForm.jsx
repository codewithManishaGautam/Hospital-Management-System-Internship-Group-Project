// import React, {
//   useState,
//   useEffect,
// } from "react";
// import generateUHID from "./utils/generateUHID";
// import "../../styles/Reception/registration.css";
// function RegistrationForm({ patient }) {
//   const [formData, setFormData] = useState({
//     uhid: "",
//     name: "",
//     age: "",
//     gender: "",
//     mobile: "",
//     address: "",
//   });
// useEffect(() => {

//   if (patient) {

//     setFormData({
//       uhid:
//         patient.uhid || "",

//       name:
//         patient.patientName || "",

//       age:
//         patient.age || "",

//       gender:
//         patient.gender || "",

//       mobile:
//         patient.mobile || "",

//       address:
//         patient.address || "",
//     });

//   }

// }, [patient]);


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleGenerateUHID = () => {
//     if (!formData.mobile) {
//       alert("Enter Mobile Number First");
//       return;
//     }

//     const uhid = generateUHID(formData.mobile);

//     setFormData({
//       ...formData,
//       uhid,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Patient Data:", formData);

//     alert("Patient Registered Successfully");
//   };

//   return (
//     <div className="registration-container">

//       <div className="registration-header">
//         <h2>Patient Registration</h2>
//       </div>

//       <form
//         className="registration-form"
//         onSubmit={handleSubmit}
//       >

//         <div className="form-grid">

//           <div className="form-group">
//             <label>Patient Name</label>

//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Patient Name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Age</label>

//             <input
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleChange}
//               placeholder="Enter Age"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Gender</label>

//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//             >
//               <option value="">
//                 Select Gender
//               </option>

//               <option value="Male">
//                 Male
//               </option>

//               <option value="Female">
//                 Female
//               </option>

//               <option value="Other">
//                 Other
//               </option>

//             </select>
//           </div>

//           <div className="form-group">
//             <label>Mobile Number</label>

//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               placeholder="Enter Mobile Number"
//               required
//             />
//           </div>

//           <div className="form-group full-width">
//             <label>Address</label>

//             <textarea
//               rows="3"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Enter Address"
//             />
//           </div>

//           <div className="form-group full-width">
//             <label>UHID Number</label>

//             <div className="uhid-container">

//               <input
//                 type="text"
//                 value={formData.uhid}
//                 readOnly
//                 placeholder="Generated UHID"
//               />

//               <button
//                 type="button"
//                 className="generate-btn"
//                 onClick={handleGenerateUHID}
//               >
//                 Generate UHID
//               </button>

//             </div>

//           </div>

//         </div>

//         <div className="form-buttons">

//           <button
//             type="submit"
//             className="save-btn"
//           >
//             Save Registration
//           </button>

//           <button
//             type="button"
//             className="send-btn"
//           >
//             Send To Doctor
//           </button>

//         </div>

//       </form>

//     </div>
//   );
// }

// export default RegistrationForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
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

    role: "OPD",

    disease: "",

    doctor: "",

    admissionDate: "",

    roomNo: "",

    bedNo: "",

    status: "Waiting",
  });

  useEffect(() => {

    if (patient) {

      setFormData({

        uhid: patient.uhid || "",

        name: patient.patientName || patient.name || "",

        age: patient.age || "",

        gender: patient.gender || "",

        mobile: patient.mobile || "",

        address: patient.address || "",

        role: patient.role || "OPD",

        disease: patient.disease || "",

        doctor: patient.doctor || "",

        admissionDate: patient.admissionDate || "",

        roomNo: patient.roomNo || "",

        bedNo: patient.bedNo || "",

        status: patient.status || "Waiting",

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/add",

        formData

      );

      alert(res.data.message);

      setFormData({

        uhid: "",

        name: "",

        age: "",

        gender: "",

        mobile: "",

        address: "",

        role: "OPD",

        disease: "",

        doctor: "",

        admissionDate: "",

        roomNo: "",

        bedNo: "",

        status: "Waiting",

      });

    }

    catch (err) {

      console.log(err);

      alert("Registration Failed");

    }

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
        </div>
        {/* Patient Name */}

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

        {/* Age */}

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

        {/* Gender */}

        <div className="form-group">

          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >

            <option value="">Select Gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="Other">Other</option>

          </select>

        </div>

        {/* Mobile */}

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

        {/* Address */}

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

        {/* Patient Type */}

        <div className="form-group">

          <label>Patient Type</label>

          <select

            name="role"

            value={formData.role}

            onChange={handleChange}

          >

            <option value="OPD">OPD</option>

            <option value="IPD">IPD</option>

            <option value="ICU">ICU</option>

            <option value="OT">OT</option>

            <option value="General Ward">General Ward</option>

            <option value="Casualty">Casualty</option>

            <option value="Emergency">Emergency</option>

          </select>

        </div>

        {/* UHID */}

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

        {/* Extra Fields */}

        {formData.role !== "OPD" && (

          <>

            <div className="form-group">

              <label>Disease</label>

              <input

                type="text"

                name="disease"

                value={formData.disease}

                onChange={handleChange}

                placeholder="Disease"

              />

            </div>

            <div className="form-group">

              <label>Doctor</label>

              <input

                type="text"

                name="doctor"

                value={formData.doctor}

                onChange={handleChange}

                placeholder="Doctor Name"

              />

            </div>

            <div className="form-group">

              <label>Admission Date</label>

              <input

                type="date"

                name="admissionDate"

                value={formData.admissionDate}

                onChange={handleChange}

              />

            </div>

            <div className="form-group">

              <label>Room No</label>

              <input

                type="text"

                name="roomNo"

                value={formData.roomNo}

                onChange={handleChange}

                placeholder="Room No"

              />

            </div>

            <div className="form-group">

              <label>Bed No</label>

              <input

                type="text"

                name="bedNo"

                value={formData.bedNo}

                onChange={handleChange}

                placeholder="Bed No"

              />

            </div>

            <div className="form-group">

              <label>Status</label>

              <select

                name="status"

                value={formData.status}

                onChange={handleChange}

              >

                <option value="Waiting">Waiting</option>

                <option value="Admitted">Admitted</option>

                <option value="Shifted">Shifted</option>

                <option value="Discharged">Discharged</option>

              </select>

            </div>

          </>

        )}



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
        onClick={() => {

          if (!formData.uhid) {

            alert("Please Register Patient First");

            return;

          }

          alert(
            `Patient ${formData.name} Sent To ${formData.doctor || "Doctor"}`
          );

        }}
      >
        Send To Doctor
      </button>

      {
        formData.role === "OPD" &&

        <button
          type="button"
          className="generate-btn"
          onClick={() => {

            if (!formData.uhid) {

              alert("Register Patient First");

              return;

            }

            alert(
              `Appointment Generated for ${formData.name}`
            );

          }}
        >
          Generate Appointment
        </button>

      }

    </div>

</form >
</div >


  );

}

export default RegistrationForm;