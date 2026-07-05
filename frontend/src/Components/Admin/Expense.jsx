import React, { useEffect, useState } from "react";
import axios from "axios";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

const [newExpense, setNewExpense] = useState({
  expenseName: "",
  category: "",
  amount: "",
  description: "",
});

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/expenses");

    setExpenses(res.data);
  };

  const addExpense = async () => {
    await axios.post("http://localhost:5000/api/admin/expense/add", newExpense);

setNewExpense({
  expenseName: "",
  category: "",
  amount: "",
  description: "",
});

    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/expense/delete/${id}`);

    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Expenses Management</h2>
      </div>

      <div className="staff-form">
        <input
          placeholder="Expense Name"
          value={newExpense.expenseName}
          onChange={(e) =>
            setNewExpense({
              ...newExpense,
              expenseName: e.target.value,
            })
          }
        />

<input
  placeholder="Category"
  value={newExpense.category}
  onChange={(e) =>
    setNewExpense({
      ...newExpense,
      category: e.target.value,
    })
  }
/>

        <input
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({
              ...newExpense,
              amount: e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({
              ...newExpense,
              description: e.target.value,
            })
          }
        />

        <button className="add-btn" onClick={addExpense}>
          Add Expense
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.expenseName}</td>
              <td>₹{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(expense._id)}
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

export default Expenses;
