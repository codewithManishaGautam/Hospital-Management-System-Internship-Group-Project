import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Dashboard({ dashboard, finance }) {
  const chartData = [
    {
      name: "Income",
      value: finance.totalIncome || 0,
    },
    {
      name: "Expense",
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
      </div>

      <div
        style={{
          width: "100%",
          height: "400px",
          marginTop: "30px",
        }}
      >
        <h3>Finance Overview</h3>

        <ResponsiveContainer>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={120} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
