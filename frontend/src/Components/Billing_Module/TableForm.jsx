


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/TableForm.css";
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