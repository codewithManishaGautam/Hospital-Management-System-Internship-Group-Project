import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadReport from "./UploadReport";
import LabBilling from "./LabBilling";
import "./style/LabDashboard.css";

function LabDashboard() {
  const [requests, setRequests] = useState([]);

  // Dashboard किंवा History
  const [activeSection, setActiveSection] = useState("Dashboard");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [billingRequest, setBillingRequest] = useState(null);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  // ==========================================
  // GET LAB REQUESTS
  // ==========================================

  const getRequests = async () => {
    try {
      setLoading(true);

      if (activeSection === "Dashboard") {
        const [pendingRes, processingRes] = await Promise.all([
          axios.get("http://localhost:5000/lab/requests/pending"),
          axios.get("http://localhost:5000/lab/requests/processing"),
        ]);

        const pendingRequests = pendingRes.data.data || [];
        const processingRequests = processingRes.data.data || [];

        setRequests([...pendingRequests, ...processingRequests]);
      } else if (activeSection === "History") {
        const res = await axios.get(
          "http://localhost:5000/lab/requests/completed",
        );

        setRequests(res.data.data || []);
      } else if (activeSection === "PaymentHistory") {
        const res = await axios.get(
          "http://localhost:5000/lab/requests/payment-history",
        );

        setRequests(res.data.data || []);
      }
    } catch (err) {
      console.log("Get Lab Requests Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD REQUESTS
  // ==========================================

  useEffect(() => {
    getRequests();
  }, [activeSection]);

  // ==========================================
  // CHANGE REQUEST STATUS TO PROCESSING
  // ==========================================

  const processRequest = async (id) => {
    try {
      await axios.put(`http://localhost:5000/lab/requests/${id}/status`, {
        status: "Processing",
      });

      getRequests();
    } catch (err) {
      console.log("Process Request Error:", err);

      alert(err.response?.data?.message || "Unable to process request");
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  // ==========================================
  // IF UPLOAD REPORT PAGE IS OPEN
  // ==========================================

  if (selectedRequest) {
    return (
      <UploadReport
        request={selectedRequest}
        onBack={() => {
          setSelectedRequest(null);
          getRequests();
        }}
        onUploaded={(uploadedRequest) => {
          setSelectedRequest(null);
          setBillingRequest(uploadedRequest);
        }}
      />
    );
  }

  if (billingRequest) {
    return (
      <LabBilling
        request={billingRequest}
        onBack={() => {
          setBillingRequest(null);
          setActiveSection("History");
          getRequests();
        }}
      />
    );
  }

  // ==========================================
  // SEARCH REQUESTS
  // ==========================================

  const filteredRequests = requests.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.patientName?.toLowerCase().includes(text) ||
      item.uhid?.toLowerCase().includes(text) ||
      item.doctorName?.toLowerCase().includes(text)
    );
  });

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="lab-layout">
      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className="lab-sidebar">
        {/* PROFILE */}
        <div className="lab-profile">
          <div className="lab-profile-icon">👨‍🔬</div>

          <h2>Lab Technician</h2>

          <p>Hospital Management System</p>
        </div>

        {/* MENU */}
        <div className="lab-menu">
          {/* DASHBOARD */}
          <button
            className={
              activeSection === "Dashboard"
                ? "lab-menu-btn active"
                : "lab-menu-btn"
            }
            onClick={() => {
              setActiveSection("Dashboard");
              setSearch("");
            }}
          >
            📊 Dashboard
          </button>

          {/* HISTORY */}
          <button
            className={
              activeSection === "History"
                ? "lab-menu-btn active"
                : "lab-menu-btn"
            }
            onClick={() => {
              setActiveSection("History");
              setSearch("");
            }}
          >
            📜 History
          </button>
        </div>

        {/* PAYMENT HISTORY */}
        <button
          className={
            activeSection === "PaymentHistory"
              ? "lab-menu-btn active"
              : "lab-menu-btn"
          }
          onClick={() => {
            setActiveSection("PaymentHistory");
            setSearch("");
          }}
        >
          💳 Payment History
        </button>

        {/* LOGOUT */}
        <button className="lab-logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="lab-main">
        {/* HEADER */}
        <div className="lab-header">
          <h1>
            {activeSection === "Dashboard"
              ? "Lab Department Dashboard"
              : activeSection === "History"
                ? "Lab History"
                : "Payment History"}
          </h1>
        </div>

        {/* SEARCH */}
        <div className="lab-search-section">
          <input
            type="text"
            className="lab-search"
            placeholder="Search Patient Name or UHID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ======================================
            DASHBOARD INFO
        ====================================== */}

        {activeSection === "Dashboard" && (
          <div className="lab-info">
            <h2>Doctor Lab Requests</h2>

            <p>Pending and processing requests sent by doctors</p>
          </div>
        )}

        {/* ======================================
            HISTORY INFO
        ====================================== */}

        {activeSection === "History" && (
          <div className="lab-info">
            <h2>Completed Lab Reports</h2>

            <p>Previously completed patient lab reports</p>
          </div>
        )}

        {activeSection === "PaymentHistory" && (
          <div className="lab-info">
            <h2>Lab Payment History</h2>

            <p>Successfully paid lab bills and payment details</p>
          </div>
        )}

        {/* ======================================
            TABLE
        ====================================== */}

        {/* ======================================
    TABLE
====================================== */}

        {loading ? (
          <div className="lab-loading">Loading...</div>
        ) : activeSection === "PaymentHistory" ? (
          /* ======================================
      PAYMENT HISTORY TABLE
  ====================================== */

          <div className="lab-table-container">
            <table className="lab-table payment-history-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bill Number</th>
                  <th>UHID</th>
                  <th>Patient Name</th>
                  <th>Tests</th>
                  <th>Total Amount</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Payment Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>

                      <td>{item.billing?.billNumber || "-"}</td>

                      <td>{item.uhid}</td>

                      <td>{item.patientName}</td>

                      <td>{item.tests?.join(", ") || item.testName || "-"}</td>

                      <td>₹{item.billing?.totalAmount || 0}</td>

                      <td>{item.billing?.paymentMode || "-"}</td>

                      <td>
                        <span className="payment-paid">
                          {item.billing?.paymentStatus || "Paid"}
                        </span>
                      </td>

                      <td>
                        {item.billing?.billedAt
                          ? new Date(item.billing.billedAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">
                      No Payment History Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* ======================================
      DASHBOARD / HISTORY TABLE
  ====================================== */

          <div className="lab-table-container">
            <table className="lab-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>UHID</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Ward</th>
                  <th>Tests</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>

                      <td>{item.uhid}</td>

                      <td>{item.patientName}</td>

                      <td>{item.doctorName}</td>

                      <td>{item.ward}</td>

                      <td>{item.tests?.join(", ")}</td>

                      <td>{item.priority}</td>

                      <td>
                        <span
                          className={
                            item.status === "Pending"
                              ? "status pending"
                              : item.status === "Processing"
                                ? "status processing"
                                : "status completed"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        {/* PENDING */}
                        {activeSection === "Dashboard" &&
                          item.status === "Pending" && (
                            <button
                              className="action-btn process-btn"
                              onClick={() => processRequest(item._id)}
                            >
                              Process
                            </button>
                          )}

                        {/* PROCESSING */}
                        {activeSection === "Dashboard" &&
                          item.status === "Processing" && (
                            <button
                              className="action-btn upload-btn"
                              onClick={() => setSelectedRequest(item)}
                            >
                              Upload Reports
                            </button>
                          )}

                        {/* HISTORY */}
                        {activeSection === "History" &&
                          item.status === "Completed" && (
                            <span className="history-completed">Completed</span>
                          )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">
                      {activeSection === "Dashboard"
                        ? "No Lab Requests Found"
                        : activeSection === "History"
                          ? "No Lab History Found"
                          : "No Payment History Found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default LabDashboard;
