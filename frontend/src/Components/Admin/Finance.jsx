import React, { useEffect, useState } from "react";
import axios from "axios";

function Finance() {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0,
  });

  const fetchStats = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/finance"
    );

    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Finance Dashboard</h2>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Income</h3>
          <h2>₹{stats.totalIncome}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Expense</h3>
          <h2>₹{stats.totalExpense}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Net Profit</h3>
          <h2>₹{stats.netProfit}</h2>
        </div>

      </div>
    </div>
  );
}

export default Finance;