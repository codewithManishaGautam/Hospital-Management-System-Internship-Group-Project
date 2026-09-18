import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/income.css";

function Income() {
  const [income, setIncome] = useState([]);

  const [newIncome, setNewIncome] = useState({
    source: "",
    amount: "",
    date: "",
    description: "",
  });

  const fetchIncome = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/income");

    setIncome(res.data);
  };

  const addIncome = async () => {
    await axios.post("http://localhost:5000/api/admin/income/add", newIncome);

    setNewIncome({
      source: "",
      amount: "",
      date: "",
      description: "",
    });

    fetchIncome();
  };

  const deleteIncome = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/income/delete/${id}`);

    fetchIncome();
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="admin-income-container">
      <div className="admin-income-header">
        <h2>Income Management</h2>
      </div>

      <div className="admin-income-form">
        <input
          placeholder="Income Source"
          value={newIncome.source}
          onChange={(e) =>
            setNewIncome({
              ...newIncome,
              source: e.target.value,
            })
          }
        />

        <input
          placeholder="Amount"
          value={newIncome.amount}
          onChange={(e) =>
            setNewIncome({
              ...newIncome,
              amount: e.target.value,
            })
          }
        />

        <input
          type="date"
          value={newIncome.date}
          onChange={(e) =>
            setNewIncome({
              ...newIncome,
              date: e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          value={newIncome.description}
          onChange={(e) =>
            setNewIncome({
              ...newIncome,
              description: e.target.value,
            })
          }
        />

        <button className="admin-income-add-btn" onClick={addIncome}>
          Add Income
        </button>
      </div>

      <table className="admin-income-table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {income.map((item) => (
            <tr key={item._id}>
              <td>{item.source}</td>
              <td>₹{item.amount}</td>
              <td>
                {item.date
                  ? new Date(item.date).toLocaleDateString("en-IN")
                  : "-"}
              </td>
              <td>{item.description}</td>

              <td>
                <button
                  className="admin-income-delete-btn"
                  onClick={() => deleteIncome(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Income;
