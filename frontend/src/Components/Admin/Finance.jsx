import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/finance.css";
// import { Finance } from "../../api/admin/adminApi";

function Finance() {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0,
  });

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/finance");

    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-finance-container">
      <div className="admin-finance-header">
        <h2>Finance Dashboard</h2>
      </div>

      <div className="admin-finance-cards">
        <div className="admin-finance-card admin-finance-income-card">
          <h3>Total Income</h3>
          <h2>₹{stats.totalIncome}</h2>
        </div>

        <div className="admin-finance-card admin-finance-expense-card">
          <h3>Total Expense</h3>
          <h2>₹{stats.totalExpense}</h2>
        </div>

        <div className="admin-finance-card admin-finance-profit-card">
          <h3>Net Profit</h3>
          <h2>₹{stats.netProfit}</h2>
        </div>
      </div>
    </div>
  );
}

export default Finance;
