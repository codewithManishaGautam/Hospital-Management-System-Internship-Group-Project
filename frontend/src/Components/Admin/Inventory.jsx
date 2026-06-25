import React, { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    itemName: "",
    category: "",
    quantity: "",
    unitPrice: "",
    supplier: "",
  });

  const fetchInventory = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/inventory"
    );

    setItems(res.data);
  };

  const addItem = async () => {
    await axios.post(
      "http://localhost:5000/api/admin/inventory/add",
      newItem
    );

    fetchInventory();

    setNewItem({
      itemName: "",
      category: "",
      quantity: "",
      unitPrice: "",
      supplier: "",
    });
  };

  const deleteItem = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/admin/inventory/delete/${id}`
    );

    fetchInventory();
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Inventory Management</h2>
      </div>

      <div className="staff-form">
        <input
          placeholder="Item Name"
          value={newItem.itemName}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              itemName: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          value={newItem.category}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              category: e.target.value,
            })
          }
        />

        <input
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              quantity: e.target.value,
            })
          }
        />

        <input
          placeholder="Unit Price"
          value={newItem.unitPrice}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              unitPrice: e.target.value,
            })
          }
        />

        <input
          placeholder="Supplier"
          value={newItem.supplier}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              supplier: e.target.value,
            })
          }
        />

        <button
          className="add-btn"
          onClick={addItem}
        >
          Add Item
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>₹{item.unitPrice}</td>
              <td>{item.supplier}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteItem(item._id)
                  }
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

export default Inventory;