import React, { useState, useEffect } from "react";
import "./style/BillingDept.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getTime, getDate } from "./GetDate_Time";
import Profile from "./Profile";
import TableForm from "./TableForm";

function BillingDept() {
  const [search, setSearch] = useState("");

  const [opdRevenue, setOpdRevenue] = useState(0);
  const [opdBills, setOpdBills] = useState([]);

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
      <h1>Billing Department</h1>

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

        <Profile />
      </nav>

      <br />

      <div className="opd-billing-section">
        <h2>OPD Billing</h2>

        <div className="opd-revenue-card">
          <h3>Total OPD Revenue</h3>
          <p>₹{opdRevenue}</p>
        </div>

        <div className="opd-count">
          <strong>Paid OPD Bills:</strong> {opdBills.length}
        </div>

        <table className="opd-billing-table">
          <thead>
            <tr>
              <th>UHID</th>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {opdBills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.uhid}</td>
                <td>{bill.name}</td>
                <td>{bill.doctor}</td>
                <td>₹{bill.fee || 0}</td>
                <td>{bill.paymentMode}</td>
                <td>{bill.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />

      <TableForm search={search} />
    </div>
  );
}

export default BillingDept;