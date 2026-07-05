import React, { useEffect, useState } from "react";
import axios from "axios";

function Charges() {
  const [charges, setCharges] = useState([]);

  const [newCharge, setNewCharge] = useState({
    chargeName: "",
    category: "",
    amount: "",
    description: "",
  });

  const fetchCharges = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/charges");

    setCharges(res.data);
  };

  const addCharge = async () => {
    await axios.post("http://localhost:5000/api/admin/charge/add", newCharge);

    setNewCharge({
      chargeName: "",
      category: "",
      amount: "",
      description: "",
    });

    fetchCharges();
  };

  const deleteCharge = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/charge/delete/${id}`);

    fetchCharges();
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Charges Management</h2>
      </div>

      <div className="staff-form">
        <input
          placeholder="Charge Name"
          value={newCharge.chargeName}
          onChange={(e) =>
            setNewCharge({
              ...newCharge,
              chargeName: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          value={newCharge.category}
          onChange={(e) =>
            setNewCharge({
              ...newCharge,
              category: e.target.value,
            })
          }
        />

        <input
          placeholder="Amount"
          value={newCharge.amount}
          onChange={(e) =>
            setNewCharge({
              ...newCharge,
              amount: e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          value={newCharge.description}
          onChange={(e) =>
            setNewCharge({
              ...newCharge,
              description: e.target.value,
            })
          }
        />

        <button className="add-btn" onClick={addCharge}>
          Add Charge
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Charge Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {charges.map((charge) => (
            <tr key={charge._id}>
              <td>{charge.chargeName}</td>
              <td>{charge.category}</td>
              <td>₹{charge.amount}</td>
              <td>{charge.description}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteCharge(charge._id)}
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

export default Charges;
