import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Nurse/Dashboard.css";

export default function Dashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalBeds, setTotalBeds] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const patientResponse = await axios.get(
        "http://localhost:5000/api/patient/nurse/patients",
      );

      setTotalPatients(patientResponse.data.data?.length || 0);

      const bedResponse = await axios.get("http://localhost:5000/api/beds");

      setTotalBeds(bedResponse.data?.length || 0);
    } catch (error) {
      console.error("Error fetching Nurse dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nurse-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Nurse Panel</h1>
          <p>Care Today &nbsp; | &nbsp; Health Tomorrow</p>
        </div>

        <div className="dashboard-header-right">
          <span>🏥</span>
          <span>Shraddha Hospital & ICU</span>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div>
          <h2>Welcome Back, Nurse 👋</h2>

          <p>Here's a quick overview of today's ward activity.</p>
        </div>

        <div className="welcome-icon">🩺</div>
      </div>

      {/* Statistics */}
      <div className="statistics-grid">
        <div className="stat-card patients-card">
          <div className="stat-icon">👥</div>

          <div className="stat-content">
            <p>Total Patients</p>

            <h2>{loading ? "..." : totalPatients}</h2>

            <span>Patients under nursing care</span>
          </div>
        </div>

        <div className="stat-card beds-card">
          <div className="stat-icon">🛏️</div>

          <div className="stat-content">
            <p>Total Beds</p>

            <h2>{loading ? "..." : totalBeds}</h2>

            <span>Beds registered in hospital</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-section">
        <div className="section-heading">
          <h2>Quick Actions</h2>
          <p>Frequently used Nurse operations</p>
        </div>

        <div className="quick-actions">
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("nurse-open-patients"))
            }
          >
            👥
            <span>Manage Patients</span>
          </button>

          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("nurse-open-beds"))
            }
          >
            🛏️
            <span>Check Beds</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <span>© Shraddha Hospital & ICU</span>
        <span>Nurse Portal</span>
        <span>Better Care • Healthier Tomorrow</span>
      </div>
    </div>
  );
}
