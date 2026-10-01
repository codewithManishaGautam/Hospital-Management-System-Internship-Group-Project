import React, { useState, useEffect } from "react";
import "./style/BillingDept.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getTime, getDate } from "./GetDate_Time";
import Profile from "./Profile";
import TableForm from "./TableForm";
import { useNavigate } from "react-router-dom";

function BillingDept() {
  const [search, setSearch] = useState("");

  const [opdRevenue, setOpdRevenue] = useState(0);
  const [opdBills, setOpdBills] = useState([]);

  const navigate = useNavigate();

  // ============================
  // Fetch OPD Billing
  // ============================
  useEffect(() => {
    const fetchOPDBilling = async () => {
      try {
        const res = await axios.get(
          "https://hospital-management-system-internship-rtob.onrender.com/api/billing/opd-revenue"
        );

        if (res.data.success) {
          setOpdRevenue(res.data.totalRevenue || 0);
          setOpdBills(res.data.bills || []);
        }
      } catch (error) {
        console.log("OPD Billing Error:", error);
      }
    };

    fetchOPDBilling();
  }, []);

  return (
    <div className="billing-page">

      {/* ============================
          Page Heading
      ============================ */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-light btnBack"
      >
        🔙
      </button>

      <h1>Billing Department</h1>

      {/* ============================
          Navbar
      ============================ */}
      <nav className="navbar">

        <FontAwesomeIcon
          icon={faBars}
          className="billing-menu-icon"
        />

        <p className="DateTime">
          📅 {getDate()}
          <br />
          🕐 &nbsp;&nbsp; {getTime()}
        </p>

        <b>Shradha Hospital Daund</b>

        <input
          className="form-control"
          placeholder="Search Patient Name / UHID / Mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Profile currently hidden */}
        {/* <Profile /> */}

      </nav>

      {/* ============================
          OPD BILLING
      ============================ */}
      <section className="opd-billing-section">

        <div className="section-heading">
          <div>
            <h2>OPD Billing</h2>
            <p>OPD patient payment and revenue details</p>
          </div>
        </div>

        {/* ============================
            OPD Summary Cards
        ============================ */}
        <div className="opd-summary">

          <div className="opd-summary-card">
            <div className="summary-title">
              Total OPD Revenue
            </div>

            <div className="summary-value">
              ₹{Number(opdRevenue || 0).toLocaleString("en-IN")}
            </div>
          </div>

          <div className="opd-summary-card">
            <div className="summary-title">
              Paid OPD Bills
            </div>

            <div className="summary-value">
              {opdBills.length}
            </div>
          </div>

        </div>

        {/* ============================
            Paid OPD Bills Table
        ============================ */}
        <div className="opd-table-card">

          <div className="table-section-heading">
            <h3>Paid OPD Bills</h3>
            <span>
              {opdBills.length} Records
            </span>
          </div>

          <div className="opd-table-wrapper">

            <table className="opd-billing-table">

              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>UHID</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                </tr>
              </thead>

              <tbody>

                {opdBills.length > 0 ? (

                  opdBills.map((bill, index) => (

                    <tr key={bill._id}>

                      <td>{index + 1}</td>

                      <td>
                        {bill.uhid || "-"}
                      </td>

                      <td>
                        {bill.name || "-"}
                      </td>

                      <td>
                        {bill.doctor || "-"}
                      </td>

                      <td>
                        ₹{Number(bill.fee || 0).toLocaleString("en-IN")}
                      </td>

                      <td>
                        {bill.paymentMode || "-"}
                      </td>

                      <td>
                        <span className="paid-status">
                          {bill.paymentStatus || "Paid"}
                        </span>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="7"
                      className="no-opd-data"
                    >
                      No Paid OPD Bills Found
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>

      {/* ============================
          All Billing Patients
      ============================ */}
      <section className="all-billing-section">

        <div className="all-billing-heading">
          <h2>All Billing Patients</h2>

          <p>
            OPD, IPD and ICU patient billing records
          </p>
        </div>

        <TableForm search={search} />

      </section>

    </div>
  );
}

export default BillingDept;
