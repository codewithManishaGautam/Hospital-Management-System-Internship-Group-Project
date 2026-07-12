import React from 'react'
import { useState } from 'react';
import "./style/BillingDept.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PdfCreate from './PdfCreate';
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { getTime, getDate } from "./GetDate_Time";
import Profile from './Profile';
import TableForm from './TableForm';


function BillingDept() {
        const [search, setSearch] = useState("");


    return (
        <div className='billing-page'>
            <h1>Billing Department</h1>
            <nav className="navbar">
                <FontAwesomeIcon icon={faBars} style={{ margin: "5px 0 0 0" }} />
                <p className='DateTime'>
                    📅 {getDate()}
                    <br />
                    🕐 &nbsp;&nbsp; {getTime()}
                    
                </p>

                <b>
                    Shradha Hospital
                    daund
                </b>
                <input
                className="form-control"
                placeholder="Patient Name"
                style={{ width: "300px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

                    <Profile ></Profile>
            </nav>
            <br />

            

            <TableForm search={search}></TableForm>


        </div>
    );
}

export default BillingDept;