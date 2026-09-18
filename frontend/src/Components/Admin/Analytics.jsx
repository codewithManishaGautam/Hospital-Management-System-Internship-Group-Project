import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/table.css";

function Analytics() {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    profit: 0,
    daily: [],
  });

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/analytics?year=${year}&month=${month}`,
      );

      setData(res.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [year, month]);

  const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  return (
    <div className="admin-analytics-container">
      <div className="admin-analytics-header">
        <h2>Hospital Analytics</h2>
      </div>

      {/* Year and Month Selection */}
      <div className="admin-analytics-filters">
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, index) => currentYear - index).map(
            (itemYear) => (
              <option key={itemYear} value={itemYear}>
                {itemYear}
              </option>
            ),
          )}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Summary */}
      <div className="admin-analytics-summary">
        <div className="admin-analytics-card">
          <h3>Total Income</h3>
          <p>₹{data.totalIncome || 0}</p>
        </div>

        <div className="admin-analytics-card">
          <h3>Total Expense</h3>
          <p>₹{data.totalExpense || 0}</p>
        </div>

        <div className="admin-analytics-card">
          <h3>Monthly Profit</h3>
          <p>₹{data.profit || 0}</p>
        </div>
      </div>

      {/* Daily Profit Table */}
      <div className="admin-analytics-daily-container">
        <h3 className="admin-analytics-daily-title">
          Daily Income, Expense & Profit
        </h3>
        <table className="admin-analytics-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>
            {data.daily && data.daily.length > 0 ? (
              data.daily.map((item) => (
                <tr key={item.date}>
                  <td>{item.date}</td>
                  <td>₹{item.income}</td>
                  <td>₹{item.expense}</td>
                  <td>₹{item.profit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No financial data found.</td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <th>Monthly Total</th>
              <th>₹{data.totalIncome || 0}</th>
              <th>₹{data.totalExpense || 0}</th>
              <th>₹{data.profit || 0}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
