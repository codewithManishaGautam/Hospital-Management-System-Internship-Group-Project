import React from 'react'
import "./style/BillingDept.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PdfCreate from './PdfCreate';
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { getTime, getDate } from "./GetDate_Time";
import Profile from './Profile';
import TableForm from './TableForm';

function BillingDept() {


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
                <input placeholder='Patient name' className="form-control" placeholder="Patient Name" style={{width:"300px"}}></input>
                {/* <p className="position-relative">
                    <FontAwesomeIcon icon={faBell} style={{ margin: "5px 0 0 0", height: "40px", width: "30px" }} />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ margin: "5px 0 0 0", height: "auto" }}>
                        5+
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </p> */}

                    <Profile ></Profile>
            </nav>
            <br />

            

            <TableForm></TableForm>


        </div>
    );
}

export default BillingDept;