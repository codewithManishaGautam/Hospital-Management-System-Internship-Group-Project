import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import React from "react";

import "../../styles/admin/dashboard.css";

function Dashboard({ dashboard, finance, activities, rooms, beds }) {
  const chartData = [
    {
      name: `Income ₹${finance.totalIncome || 0}`,
      value: finance.totalIncome || 0,
    },
    {
      name: `Expense ₹${finance.totalExpense || 0}`,
      value: finance.totalExpense || 0,
    },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  // =========================
  // BED COUNTS
  // =========================

  const totalBeds = (beds || []).length;

  const availableBeds = (beds || []).filter(
    (b) => b.status === "Available"
  ).length;

  const occupiedBeds = (beds || []).filter(
    (b) => b.status === "Occupied"
  ).length;

  // =========================
  // ROOM COUNTS
  // =========================

  const availableRooms = (rooms || []).filter(
    (r) => r.status === "Available"
  ).length;

  return (
    <div className="admin-dashboard-container">

      <h2 className="admin-dashboard-title">
        Welcome Administrator
      </h2>

      {/* =========================
          DASHBOARD STATS
      ========================= */}

      <div className="admin-dashboard-stats-grid">

        <div className="admin-dashboard-stats-card">
          <h3>Total Doctors</h3>
          <p>{dashboard.totalDoctors || 0}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Total Staff</h3>
          <p>{dashboard.totalStaff || 0}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Total Patients</h3>
          <p>{dashboard.totalPatients || 0}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Admitted Patients</h3>
          <p>{dashboard.admittedPatients || 0}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Discharged Patients</h3>
          <p>{dashboard.dischargedPatients || 0}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Total Rooms</h3>
          <p>{rooms?.length || 0}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Available Rooms</h3>
          <p>{availableRooms}</p>
        </div>

        {/* =========================
            BED CARDS
        ========================= */}

        <div className="admin-dashboard-stats-card">
          <h3>Total Beds</h3>
          <p>{totalBeds}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Available Beds</h3>
          <p>{availableBeds}</p>
        </div>

        <div className="admin-dashboard-stats-card">
          <h3>Occupied Beds</h3>
          <p>{occupiedBeds}</p>
        </div>

      </div>

      {/* =========================
          FINANCE OVERVIEW
      ========================= */}

      <div className="admin-dashboard-finance-card">

        <h3>Finance Overview</h3>

        <ResponsiveContainer width="99%" height={350}>
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `₹${value}`}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
            />

          </PieChart>
        </ResponsiveContainer>

        <div className="admin-dashboard-profit">
          Net Profit: ₹{finance.profit || 0}
        </div>

      </div>

      {/* =========================
          RECENT ACTIVITIES
      ========================= */}

      <div className="admin-dashboard-activity-card">

        <h3>Recent Activities</h3>

        {activities?.map((a) => (
          <p key={a._id}>
            {a.message}
          </p>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;