import React from "react";

function BillPreview({ medicines, total, setStep }) {
  return (
    <>
      <h1 className="dashboard-title">Bill Preview</h1>

      <div
        className="table-container"
        style={{
          padding: "30px",
          backgroundColor: "#fff",
        }}
      >
        {/* Store Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "var(--sidebar-bg)",
            }}
          >
            SHRADDHA MEDICAL & GENERAL STORES
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
            }}
          >
            Near Shalimar Square
          </p>
        </div>

        {/* Bill Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Comp</th>
              <th>Batch No.</th>
              <th>Exp</th>
              <th>Qty</th>
              <th>M.R.P</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.description}</td>
                <td>{item.company}</td>
                <td>{item.batch}</td>
                <td>{item.exp}</td>
                <td>{item.qty}</td>
                <td>{item.mrp.toFixed(2)}</td>
                <td>{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: 1 }}>
            <p>
              For SHRADDHA MEDICAL & GENERAL STORES
            </p>

            <div
              style={{
                marginTop: "40px",
                color: "var(--text-muted)",
              }}
            >
              Signature: -----------
            </div>
          </div>

          <div
            style={{
              width: "250px",
              border: "1px solid var(--border-color)",
              padding: "15px",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>GROSS:</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                borderTop: "1px solid #ccc",
                paddingTop: "8px",
                color: "var(--primary-blue)",
              }}
            >
              <span>NET TOTAL:</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>
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
              <option value="">
                Select Payment Mode
              </option>

              <option value="cash">
                Cash
              </option>

              <option value="card">
                Card
              </option>

              <option value="upi">
                UPI
              </option>
            </select>
          </div>

          <div className="payment-box">
            <label>Payment Status</label>

            <select>
              <option value="pending">
                Payment Pending
              </option>

              <option value="done">
                Payment Done
              </option>
            </select>
          </div>

        </div>

        {/* Back Button */}
        <div
          style={{
            marginTop: "30px",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "20px",
          }}
        >
          <button
            className="download-btn"
            onClick={() => setStep("dashboard")}
          >
            Back to Dashboard
          </button>
        </div>

        {/* Close Preview */}
        <div
          className="bottom-actions"
          style={{
            marginTop: "30px",
          }}
        >
          <button
            className="btn-primary"
            onClick={() => setStep("dashboard")}
          >
            Close Preview
          </button>
        </div>

      </div>
    </>
  );
}

export default BillPreview;