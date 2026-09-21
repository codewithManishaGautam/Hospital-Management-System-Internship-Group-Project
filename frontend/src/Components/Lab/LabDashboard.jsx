// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UploadReport from "./UploadReport";
// import ViewReport from "./ViewReport";
// import "./style/LabDashboard.css";

// function LabDashboard() {

//   const [patients, setPatients] = useState([]);

//   const [search, setSearch] = useState("");
//   const [summary, setSummary] = useState({});

//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const getPatients = async () => {

//     try
//     {

//       const res = await axios.get(

//         `http://localhost:5000/lab/patients?search=${search}`

//       );

//       setPatients(res.data);

//     }

//     catch (err) {

//       console.log(err);

//     }

//   };

//   useEffect(() => {

//     getPatients();

//   }, [search]);

//   const getSummary = async () => {

//     try {

//       const res = await axios.get(

//         "http://localhost:5000/lab/dashboard-summary"

//       );

//       setSummary(res.data);

//     }

//     catch (err) {

//       console.log(err);

//     }

//   };

//   useEffect(() => {

//     getSummary();

//   }, []);



//   return (

//     <div className="lab-dashboard">

//       <h2>

//         Lab Department

//       </h2>

//       <input

//         type="text"

//         className="form-control"

//         placeholder="Search Patient Name..."

//         value={search}

//         onChange={(e) =>

//           setSearch(e.target.value)

//         }

//       />


//       <div className="dashboard-cards">

//         <div className="dashboard-card">

//           <h3>
//             Total Patients
//           </h3>

//           <h1>
//             {summary.totalPatients || 0}
//           </h1>

//         </div>

//         <div className="dashboard-card">

//           <h3>
//             Pending Reports
//           </h3>

//           <h1>
//             {summary.pendingReports || 0}
//           </h1>

//         </div>

//         <div className="dashboard-card">

//           <h3>
//             Lab Reports
//           </h3>

//           <h1>
//             {summary.labReports || 0}
//           </h1>

//         </div>

//         <div className="dashboard-card">

//           <h3>
//             Diagnostic Reports
//           </h3>

//           <h1>
//             {summary.diagnosticReports || 0}
//           </h1>

//         </div>

//         <div className="dashboard-card">

//           <h3>
//             Emergency Tests
//           </h3>

//           <h1>
//             {summary.emergencyReports || 0}
//           </h1>

//         </div>

//       </div>

//       <br />

//       <table className="table table-bordered">

//         <thead>

//           <tr>

//             <th>UHID</th>

//             <th>Name</th>

//             <th>Age</th>

//             <th>Gender</th>

//             <th>Role</th>

//             <th>Upload Report</th>

//           </tr>

//         </thead>

//         <tbody>

//           {

//             patients.map((item) => (

//               <tr key={item._id}>

//                 <td>{item.uhid}</td>

//                 <td>{item.name}</td>

//                 <td>{item.age}</td>

//                 <td>{item.gender}</td>

//                 <td>{item.role}</td>

//                 <td>

//                   <button

//                     className="btn btn-primary"

//                     onClick={() =>

//                       setSelectedPatient(item)
//                     }

//                   >

//                     Upload

//                   </button>

//                 </td>

//               </tr>

//             ))

//           }

//         </tbody>

//       </table>

//       {/* {

//         selectedPatient && (

//           <UploadReport

//             patient={selectedPatient}

//           />

//         )

//       } */}

//     </div>

//   );

// }

// export default LabDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadReport from "./UploadReport";
import { useNavigate } from "react-router-dom";
import "./style/LabDashboard.css";

function LabDashboard() {

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [summary, setSummary] = useState({});

  const [selectedPatient, setSelectedPatient] = useState(null);

  const [hasMore, setHasMore] = useState(true);



  


  // ================= GET PATIENTS =================



  
    const getPatients = async (reset = false) => {

        try {

            const currentPage = reset ? 1 : page;

            const res = await axios.get(

                `http://localhost:5000/patients?page=${currentPage}&limit=10&search=${search}`

            );

            const data = res.data.patients || [];

            if (reset) {

                setPatients(data);

            } else {

                setPatients((prev) => [...prev, ...data]);

            }

            setHasMore(res.data.hasMore);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getPatients(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (page > 1) {

            getPatients();

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {

        setPage(1);

        getPatients(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

  // ================= GET SUMMARY =================

  const getSummary = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/lab/dashboard-summary"
      );

      setSummary(res.data);
      console.log(res.data);

    } catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    getSummary();

  }, []);


  // =================================================
  //                  UPLOAD REPORT PAGE
  // =================================================

  if (selectedPatient) {

    return (

      <UploadReport

        patient={selectedPatient}

        onBack={() => setSelectedPatient(null)}

      />

    );

  }




  // =================================================
  //                  DASHBOARD
  // =================================================

  return (

    <div className="lab-dashboard">



      <h2 style={{textAlign:"center", fontSize:"60px"}}>
          Lab Department
      </h2>

      <div className="lab-nav">

      <button onClick={() => navigate(-1)} className="btn btn-light">
        🔙
      </button>


    

        {/* SEARCH */}

        <input

          type="text"

          className="form-control"

          placeholder="Search Patient"

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

      </div>


      {/* ================= CARDS ================= */}

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


      {/* ================= PATIENT TABLE ================= */}

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>UHID</th>

            <th>Name</th>

            <th>Age</th>

            <th>Gender</th>

            <th>Role</th>

            <th className="upload-th">Upload Report</th>

          </tr>

        </thead>


        <tbody>

          {patients.map((item) => (

            <tr key={item._id}>

              <td>
                {item.uhid}
              </td>

              <td>
                {item.name}
              </td>

              <td>
                {item.age}
              </td>

              <td>
                {item.gender}
              </td>

              <td>
                {item.role}
              </td>

              <td >

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

          ))}

        </tbody>

      </table>

      {hasMore && (

                <div style={{ textAlign: "center", marginTop: "20px" }}>

                    <button

                        className="btn btn-primary"

                        onClick={() => setPage((prev) => prev + 1)}

                    >

                        Load More

                    </button>

                </div>

            )}

    </div>

  );

}

export default LabDashboard;