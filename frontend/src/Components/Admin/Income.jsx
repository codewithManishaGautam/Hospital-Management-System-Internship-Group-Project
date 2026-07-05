import React, { useEffect, useState } from "react";
import axios from "axios";

function Income() {
  const [income, setIncome] = useState([]);

  const [newIncome, setNewIncome] = useState({
    source: "",
    amount: "",
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
    <div className="table-container">
      <div className="section-header">
        <h2>Income Management</h2>
      </div>

      <div className="staff-form">
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
          placeholder="Description"
          value={newIncome.description}
          onChange={(e) =>
            setNewIncome({
              ...newIncome,
              description: e.target.value,
            })
          }
        />

        <button className="add-btn" onClick={addIncome}>
          Add Income
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {income.map((item) => (
            <tr key={item._id}>
              <td>{item.source}</td>
              <td>₹{item.amount}</td>
              <td>{item.description}</td>

              <td>
                <button
                  className="delete-btn"
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
