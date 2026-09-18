import React, { useState, useEffect } from "react";
import "../Billing_Module/style/BillingDept.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getTime, getDate } from "../Billing_Module/GetDate_Time";
import InsuranceTable from "./InsuranceTable";
import { useNavigate } from "react-router-dom";

function InsuranceDashboard() {
  const [search, setSearch] = useState("");

  const [opdRevenue, setOpdRevenue] = useState(0);
  const [opdBills, setOpdBills] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOPDBilling = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/billing/opd-revenue"
        );

        if (res.data.success) {
          setOpdRevenue(res.data.totalRevenue);
          setOpdBills(res.data.bills);
        }
      } catch (error) {
        console.log("OPD Billing Error:", error);
      }
    };

    fetchOPDBilling();
  }, []);

  return (
    <div className="billing-page">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-light btnBack"
      >
        🔙
      </button>

      <h1>Insurance Department</h1>

      <nav className="navbar">
        <FontAwesomeIcon
          icon={faBars}
          style={{ margin: "5px 0 0 0" }}
        />

        <p className="DateTime">
          📅 {getDate()}
          <br />
          🕐 &nbsp;&nbsp; {getTime()}
        </p>

        <b>Shradha Hospital daund</b>

        <input
          className="form-control"
          placeholder="Patient Name"
          style={{ width: "300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
    
        {/* <Profile /> */}
      </nav>

      <br />

      <InsuranceTable search={search} />
    </div>
  );
}

export default InsuranceDashboard;