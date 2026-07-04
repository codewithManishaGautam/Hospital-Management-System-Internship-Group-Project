import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style/TableForm.css";
import DeletePatientInTable from "./DeletePatientInTable";

function TableForm({search}) {

    const [patients, setPatients] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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

    }, []);

    useEffect(() => {

        if (page > 1) {

            getPatients();

        }

    }, [page]);

    useEffect(() => {

        setPage(1);

        getPatients(true);

    }, [search]);

    return (

        <div>

            <table border="5" className="table table-bordered mt-3">

                <thead>

                    <tr>

                        <th style={{ backgroundColor: "#1976d2" }}>Sr.No</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Name</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Age</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Gender</th>
                        <th style={{ backgroundColor: "#1976d2" }}>Delete</th>
                        <th style={{ backgroundColor: "#1976d2" }}>More INFO</th>

                    </tr>

                </thead>

                <tbody>

                    {patients
                        .filter((item) => item.role !== "OPD")
                        .map((item, index) => (

                            <tr key={item._id}>

                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.gender}</td>

                                <td>

                                    <DeletePatientInTable

                                        id={item._id}

                                        getPatients={() => getPatients(true)}

                                    />

                                </td>

                                <td>

                                    <Link to={`/patient/${item._id}`}>
                                        Detail
                                    </Link>

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

export default TableForm;







