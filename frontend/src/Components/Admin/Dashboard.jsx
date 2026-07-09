import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


import "../../styles/admin/dashboard.css";

function Dashboard({ dashboard, finance, activities }) {
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

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome Administrator</h2>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>Total Doctors</h3>
          <p>{dashboard.totalDoctors}</p>
        </div>

        <div className="stats-card">
          <h3>Total Staff</h3>
          <p>{dashboard.totalStaff}</p>
        </div>

        <div className="stats-card">
          <h3>Total Patients</h3>
          <p>{dashboard.totalPatients}</p>
        </div>

        <div className="stats-card">
          <h3>Admitted Patients</h3>
          <p>{dashboard.admittedPatients}</p>
        </div>

        <div className="stats-card">
          <h3>Discharged Patients</h3>
          <p>{dashboard.dischargedPatients}</p>
        </div>

        <div className="stats-card">
          <h3>Total Income</h3>
          <p>₹{finance.totalIncome || 0}</p>
        </div>

        <div className="stats-card">
          <h3>Total Expense</h3>
          <p>₹{finance.totalExpense || 0}</p>
        </div>

        <div className="stats-card">
          <h3>Net Profit</h3>
          <p>₹{finance.profit || 0}</p>
        </div>

        <div className="stats-card">
          <h3>Insurance Claims</h3>
          <p>12</p>
        </div>

        <div className="stats-card">
          <h3>Approved Claims</h3>
          <p>8</p>
        </div>
      </div>

      <div className="finance-chart-card">
        <h3>Finance Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={140} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>

        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Net Profit: ₹{finance.profit || 0}
        </div>
      </div>

      <div className="activity-card">
        <h3>Recent Activities</h3>

        {activities?.map((a) => (
          <p key={a._id}>{a.message}</p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
