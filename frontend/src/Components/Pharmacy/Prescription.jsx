import React from "react";

function Prescription({ medicines, total, setStep }) {
  return (
    <>
      <h1 className="dashboard-title">Prescription</h1>

      {/* Patient Information */}
      <div
        className="table-container"
        style={{
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <h3
          className="section-label"
          style={{
            marginBottom: "15px",
            color: "var(--sidebar-bg)",
          }}
        >
          Patient Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          <p>
            <b>Patient Name :</b> Rahul Patil
          </p>

          <p>
            <b>UHID :</b> UH101
          </p>

          <p>
            <b>Doctor :</b> Dr. Kapil
          </p>

          <p>
            <b>Date :</b> 07/05/2026
          </p>

          <p>
            <b>Time :</b> 10:30 AM
          </p>
        </div>
      </div>

      {/* Doctor Prescription */}
      <div
        className="table-container"
        style={{
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h3
          className="section-label"
          style={{
            color: "var(--sidebar-bg)",
          }}
        >
          Doctor Prescription
        </h3>

        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "20px",
          }}
        >
          Medical Treatment Details
        </p>

        <div className="prescription-cards-container">

          <div className="prescription-card-item">
            <div className="card-left">
              <div className="medicine-title-text">
                NS 100ML
              </div>

              <div className="medicine-sub-text">
                2 Bottles • Morning
              </div>
            </div>

            <span className="badge-status status-active">
              Active
            </span>
          </div>

          <div className="prescription-card-item">
            <div className="card-left">
              <div className="medicine-title-text">
                DNS 500ML
              </div>

              <div className="medicine-sub-text">
                2 Bottles • Afternoon
              </div>
            </div>

            <span className="badge-status status-active">
              Active
            </span>
          </div>

          <div className="prescription-card-item">
            <div className="card-left">
              <div className="medicine-title-text">
                METRO IV
              </div>

              <div className="medicine-sub-text">
                2 Dose • Night
              </div>
            </div>

            <span className="badge-status status-active">
              Active
            </span>
          </div>

          <div className="prescription-card-item">
            <div className="card-left">
              <div className="medicine-title-text">
                Cefil 1.5 Injection
              </div>

              <div className="medicine-sub-text">
                1 Injection • Emergency
              </div>
            </div>

            <span className="badge-status status-urgent">
              Urgent
            </span>
          </div>

        </div>
      </div>

      {/* Billing Section */}
      <div
        className="table-container"
        style={{ padding: "20px" }}
      >
        <h3
          className="section-label"
          style={{
            color: "var(--sidebar-bg)",
            marginBottom: "15px",
          }}
        >
          Pharmacy Billing
        </h3>

        <table className="data-table bordered-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Company</th>
              <th>Batch</th>
              <th>Exp</th>
              <th>Qty</th>
              <th>M.R.P</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.company}</td>
                <td>{m.batch}</td>
                <td>{m.exp}</td>
                <td>{m.qty}</td>

                <td>
                  ₹ {m.price.toFixed(2)}
                </td>

                <td>
                  ₹ {(m.qty * m.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            textAlign: "left",
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: "700",
            }}
          >
            NET AMOUNT : ₹ {total.toFixed(2)}
          </h2>
        </div>

        {/* Buttons */}
        <div className="bill-btns">

          <button className="download-btn">
            Download PDF
          </button>

          <button className="send-btn">
            Send Billing Department
          </button>

          <button className="insurance-btn">
            Send Insurance Company
          </button>

        </div>

        {/* Payment Section */}
        <div className="payment-section">

          <div className="payment-box">
            <label>Payment Mode</label>

            <select>
              <option>
                Select Payment Mode
              </option>

              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>

          <div className="payment-box">
            <label>Payment Status</label>

            <select>
              <option>
                Payment Pending
              </option>

              <option>
                Payment Done
              </option>
            </select>
          </div>

        </div>

        <div
          className="bottom-actions"
          style={{
            marginTop: "24px",
          }}
        >
          <button
            className="btn-primary"
            onClick={() =>
              setStep("dashboard")
            }
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}

export default Prescription;