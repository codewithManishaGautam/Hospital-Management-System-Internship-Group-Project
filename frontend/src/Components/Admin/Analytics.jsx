import React, { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/analytics");

    setData(res.data);
  };

  return (
    <div className="table-container">
      <h2>Hospital Analytics</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{data.totalIncome}</p>
        </div>

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{data.totalExpense}</p>
        </div>

        <div className="card">
          <h3>Profit</h3>
          <p>₹{data.profit}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
