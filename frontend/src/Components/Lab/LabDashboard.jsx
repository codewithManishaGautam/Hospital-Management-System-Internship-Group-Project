// import React, { useState } from "react";
// import "./style/LabDashboard.css";

// function LabDashboard() {

//   const [search, setSearch] = useState("");

//   const patients = [
//     {
//       id: 1,
//       uhid: "UH1001",
//       name: "Rahul Sharma",
//       doctor: "Dr. Patil",
//       ward: "ICU",
//       priority: "STAT",
//       tests: "CBC, LFT",
//       status: "Pending"
//     },
//     {
//       id: 2,
//       uhid: "UH1002",
//       name: "Anjali Verma",
//       doctor: "Dr. Shah",
//       ward: "IPD",
//       priority: "Urgent",
//       tests: "Blood Sugar",
//       status: "Processing"
//     },
//     {
//       id: 3,
//       uhid: "UH1003",
//       name: "Amit Kumar",
//       doctor: "Dr. Joshi",
//       ward: "Emergency",
//       priority: "STAT",
//       tests: "CBC, KFT, LFT",
//       status: "Completed"
//     }
//   ];

//   const filteredPatients = patients.filter((patient) =>
//     patient.name.toLowerCase().includes(search.toLowerCase()) ||
//     patient.uhid.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="lab-dashboard">

//       <div className="lab-header">
//         <h2>Lab Department Dashboard</h2>

//         <input
//           type="text"
//           placeholder="Search Patient..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Dashboard Cards */}

//       <div className="lab-cards">

//         <div className="lab-card pending">
//           <h3>Pending</h3>
//           <h1>12</h1>
//         </div>

//         <div className="lab-card processing">
//           <h3>Processing</h3>
//           <h1>6</h1>
//         </div>

//         <div className="lab-card completed">
//           <h3>Completed</h3>
//           <h1>35</h1>
//         </div>

//         <div className="lab-card emergency">
//           <h3>Emergency</h3>
//           <h1>4</h1>
//         </div>

//       </div>

//       {/* Table */}

//       <div className="table-container">

//         <table className="lab-table">

//           <thead>

//             <tr>

//               <th>UHID</th>
//               <th>Patient</th>
//               <th>Doctor</th>
//               <th>Ward</th>
//               <th>Priority</th>
//               <th>Tests</th>
//               <th>Status</th>
//               <th>Action</th>

//             </tr>

//           </thead>

//           <tbody>

//             {filteredPatients.map((patient) => (

//               <tr key={patient.id}>

//                 <td>{patient.uhid}</td>

//                 <td>{patient.name}</td>

//                 <td>{patient.doctor}</td>

//                 <td>{patient.ward}</td>

//                 <td>

//                   <span className={`priority ${patient.priority.toLowerCase()}`}>
//                     {patient.priority}
//                   </span>

//                 </td>

//                 <td>{patient.tests}</td>

//                 <td>

//                   <span className={`status ${patient.status.toLowerCase()}`}>
//                     {patient.status}
//                   </span>

//                 </td>

//                 <td>

//                   <button className="view-btn">
//                     Open
//                   </button>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

// export default LabDashboard;






import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadReport from "./UploadReport";
import ViewReport from "./ViewReport";
import "./style/LabDashboard.css";

function LabDashboard() {

  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");
  const [summary, setSummary] = useState({});

  const [selectedPatient, setSelectedPatient] = useState(null);

  const getPatients = async () => {

    try {

      const res = await axios.get(

        `http://localhost:5000/lab/patients?search=${search}`

      );

      setPatients(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    getPatients();

  }, [search]);

  // const getSummary = async () => {

  //   const res = await axios.get(

  //     "http://localhost:5000/lab/dashboard-summary"

  //   );

  //   setSummary(res.data);

  // };

  // useEffect(() => {

  //   getSummary();

  // }, []);



  const getSummary = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/lab/dashboard-summary"

      );

      setSummary(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    getSummary();

  }, []);



  return (

    <div className="lab-dashboard">

      <h2>

        Lab Department

      </h2>

      <input

        type="text"

        className="form-control"

        placeholder="Search Patient Name..."

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

      />


      {/* <div className="dashboard-cards">

        <div className="dashboard-card">

          <h3>

            Total Patients

          </h3>

          <h1>

            {summary.totalPatients}

          </h1>

        </div>

        <div className="dashboard-card">

          <h3>

            Pending Reports

          </h3>

          <h1>

            {summary.pendingReports}

          </h1>

        </div>

        <div className="dashboard-card">

          <h3>

            Uploaded Reports

          </h3>

          <h1>

            {summary.uploadedReports}

          </h1>

        </div>

        <div className="dashboard-card">

          <h3>

            Emergency Tests

          </h3>

          <h1>

            {summary.emergencyReports}

          </h1>

        </div> }



      { </div> */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h3>
            Total Patients
          </h3>

          <h1>
            {summary.totalPatients || 0}
          </h1>

        </div>

        <div className="dashboard-card">

          <h3>
            Pending Reports
          </h3>

          <h1>
            {summary.pendingReports || 0}
          </h1>

        </div>

        <div className="dashboard-card">

          <h3>
            Lab Reports
          </h3>

          <h1>
            {summary.labReports || 0}
          </h1>

        </div>

        <div className="dashboard-card">

          <h3>
            Diagnostic Reports
          </h3>

          <h1>
            {summary.diagnosticReports || 0}
          </h1>

        </div>

        <div className="dashboard-card">

          <h3>
            Emergency Tests
          </h3>

          <h1>
            {summary.emergencyReports || 0}
          </h1>

        </div>

      </div>

      <br />

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>UHID</th>

            <th>Name</th>

            <th>Age</th>

            <th>Gender</th>

            <th>Role</th>

            <th>Upload Report</th>

          </tr>

        </thead>

        <tbody>

          {

            patients.map((item) => (

              <tr key={item._id}>

                <td>{item.uhid}</td>

                <td>{item.name}</td>

                <td>{item.age}</td>

                <td>{item.gender}</td>

                <td>{item.role}</td>

                <td>

                  <button

                    className="btn btn-primary"

                    onClick={() =>

                      setSelectedPatient(item)

                    }

                  >

                    Upload

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

      {

        selectedPatient && (

          <UploadReport

            patient={selectedPatient}

          />

        )

      }

    </div>

  );

}

export default LabDashboard;