import React, { useState } from "react";

import "../../styles/Reception/reports.css";

function Reports() {

  const [reportDate, setReportDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const reportData = {
    registrations: 45,
    appointments: 38,
    opdBills: 32,
    ipdAdmissions: 12,
    revenue: 18500,
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(
      "Report Download Started"
    );
  };

  return (
    <div className="reports-container">

      {/* Header */}

      <div className="reports-header">

        <h2>
          Reception Reports
        </h2>

      </div>

      {/* Filter Section */}

      <div className="report-filter-card">

        <div className="filter-group">

          <label>
            Select Date
          </label>

          <input
            type="date"
            value={reportDate}
            onChange={(e) =>
              setReportDate(
                e.target.value
              )
            }
          />

        </div>

        <div className="report-buttons">

          <button
            className="download-btn"
            onClick={
              handleDownload
            }
          >
            Download PDF
          </button>

          <button
            className="print-btn"
            onClick={
              handlePrint
            }
          >
            Print Report
          </button>

        </div>

      </div>

      {/* Statistics Cards */}

      <div className="report-cards">

        <div className="report-card">

          <h4>
            Registrations
          </h4>

          <h2>
            {
              reportData.registrations
            }
          </h2>

        </div>

        <div className="report-card">

          <h4>
            Appointments
          </h4>

          <h2>
            {
              reportData.appointments
            }
          </h2>

        </div>

        <div className="report-card">

          <h4>
            OPD Bills
          </h4>

          <h2>
            {
              reportData.opdBills
            }
          </h2>

        </div>

        <div className="report-card">

          <h4>
            IPD Admissions
          </h4>

          <h2>
            {
              reportData.ipdAdmissions
            }
          </h2>

        </div>

      </div>

      {/* Revenue Card */}

      <div className="revenue-card">

        <h3>
          Total Revenue
        </h3>

        <h1>
          ₹
          {
            reportData.revenue
          }
        </h1>

      </div>

      {/* Report Table */}

      <div className="report-table-card">

        <h3>
          Daily Report Summary
        </h3>

        <table className="report-table">

          <thead>

            <tr>

              <th>
                Report Type
              </th>

              <th>
                Count
              </th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>
                Patient Registration
              </td>

              <td>
                {
                  reportData.registrations
                }
              </td>

            </tr>

            <tr>

              <td>
                Doctor Appointments
              </td>

              <td>
                {
                  reportData.appointments
                }
              </td>

            </tr>

            <tr>

              <td>
                OPD Bills
              </td>

              <td>
                {
                  reportData.opdBills
                }
              </td>

            </tr>

            <tr>

              <td>
                IPD Admissions
              </td>

              <td>
                {
                  reportData.ipdAdmissions
                }
              </td>

            </tr>

            <tr>

              <td>
                Total Revenue
              </td>

              <td>
                ₹
                {
                  reportData.revenue
                }
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reports;