// import React, { useState,useEffect } from "react";
// import axios from "axios";

// function TableForm() {

//     const [formData, setFormData] = useState({
//         name: "",
//         age: ""
//     });

//     const [records, setRecords] = useState([]);

//     // input change
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     // form submit
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         setRecords([...records, formData]);

//         setFormData({
//             name: "",
//             age: ""
//         });
//     };

//     return (
//         <div className="container mt-4">

//             <h2>Student Form</h2>

//             <form onSubmit={handleSubmit}>

//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Enter Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="form-control mb-2"
//                 />

//                 <input
//                     type="number"
//                     name="age"
//                     placeholder="Enter Age"
//                     value={formData.age}
//                     onChange={handleChange}
//                     className="form-control mb-2"
//                 />

//                 <button className="btn btn-primary">
//                     Submit
//                 </button>

//             </form>

//             <hr />

//             <table className="table table-bordered mt-3">

//                 <thead>
//                     <tr>
//                         <th>Sr no</th>
//                         <th>Name</th>
//                         <th>
//                             Payment
//                             <select name="pay" style={{ marginLeft: "10px" }}>
//                                 <option value="online">online</option>
//                                 <option value="offline">offline</option>
//                                 <option value="both">both</option>
//                             </select>
//                         </th>

//                         <th>Lab Test</th>
//                         <th>Pharmacy</th>
//                         <th>Activity Chart</th>
//                     </tr>
//                 </thead>

//                 <tbody>

//                     {
//                         records.map((item, index) => (
//                             <tr key={index}>

//                                 <td>{index + 1}</td>
//                                 <td><a href="https://localhost:3000/${item.name}">{item.name}</a></td>
//                                 <td><a>Pdf</a></td>
//                                 <td><a>Pdf</a></td>
//                                 <td><a>Pdf</a></td>
//                             </tr>
//                         ))
//                     }

//                 </tbody>

//             </table>

//         </div>
//     );
// }

// export default TableForm;






import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './css/TableForm.css';
import DeletePatientInTable from "./DeletePatientInTable";



function TableForm() {




    const [patientname, setPatientNames] =
        useState([]);

    const getPatients =
        async () => {

            try {

                const res =
                    await axios.get(

                        "http://localhost:5000/patients"

                    );

                setPatientNames(
                    res.data
                );

            } catch (error) {

                console.log(error);

            }

        };

        useEffect(() => {
        getPatients();
    }, []);



    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    const [patients, setPatients] = useState([]);






    // save data
    const handleSubmit = async () => {

        await axios.post("http://localhost:5000/add", {
            name,
            age,
            gender
        });

        alert("Data Saved");
    };

    // get data
    const getData = async () => {

        const res = await axios.get(
            "http://localhost:5000/patients"
        );

        setPatients(res.data);
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div >

            {/* <h2>Patient Form</h2>

            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
            />

            <select onChange={(e) => setGender(e.target.value)}>

                <option value="">Select Gender</option>

                <option value="Male">
                    Male
                </option>

                <option value="Female">
                    Female
                </option>

                <option value="Transgender">
                    Transgender
                </option>

            </select>

            <button onClick={handleSubmit}>
                Save
            </button> */}

            <hr />

            <table border="5" className="table table-bordered mt-3" >

                <thead >
                    <tr >
                        <th style={{ backgroundColor: "orange" }}>Sr.No</th>
                        <th style={{ backgroundColor: "orange" }}>Name</th>
                        <th style={{ backgroundColor: "orange" }}>Age</th>
                        <th style={{ backgroundColor: "orange" }}>Gender</th>
                        <th style={{ backgroundColor: "orange" }}>Delete</th>
                        <th style={{ backgroundColor: "orange" }}>More INFO</th>
                    </tr>

                </thead>
                <tbody>

                    {
                        patients.map((item, index) => (

                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.gender}</td>
                                <td ><DeletePatientInTable

                                    id={item._id}

                                    getPatients={getPatients}

                                /></td>

                                <td>

                                    <Link to={`/patient/${item._id}`}>
                                        Detail
                                    </Link>

                                </td>
                            </tr>

                        ))
                    }

                </tbody>



            </table>

        </div>
    );
}

export default TableForm;