import React from 'react'
import './css/BillingDept.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PdfCreate from './PdfCreate';
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import Profile from './Profile';
import TableForm from './TableForm';

function BillingDept() {


    return (
        <div >
            <h1>Billing Department</h1>
            <nav className="nav">
                <FontAwesomeIcon icon={faBars} style={{ margin: "5px 0 0 0" }} />
                <input placeholder='Patient name' className="form-control" style={{width:"300px"}}></input>
                <p class="position-relative">
                    <FontAwesomeIcon icon={faBell} style={{ margin: "5px 0 0 0", height: "40px", width: "30px" }} />
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ margin: "5px 0 0 0", height: "auto" }}>
                        99+
                        <span class="visually-hidden">unread messages</span>
                    </span>
                </p>
                <b>
                    Bill Staff
                    <Profile ></Profile>
                </b>
            </nav>
            <br />

            

            <TableForm></TableForm>


        </div>
    );
}

export default BillingDept;