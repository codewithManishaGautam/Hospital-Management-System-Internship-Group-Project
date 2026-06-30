


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style/TableForm.css";
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


            <hr />

            <table border="5" className="table table-bordered mt-3" >

                <thead >
                    <tr >
                        <th style={{ backgroundColor: "#1976d2" }}>Sr.No</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Name</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Age</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Gender</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Delete</th>
                        <th style={{ backgroundColor: "#1976d2" }}>More INFO</th>
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