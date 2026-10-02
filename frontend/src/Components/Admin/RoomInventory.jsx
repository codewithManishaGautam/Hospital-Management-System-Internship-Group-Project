import React, { useEffect, useState } from "react";
import { getRooms, deleteRoom } from "../../api/admin/adminApi";
import "../../styles/admin/roomInventory.css";

function RoomInventory() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const res = await getRooms();

    setRooms(res.data);
  };

  const handleDeleteRoom = async (id) => {
    await deleteRoom(id);

    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();

    const interval = setInterval(fetchRooms, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-room-inventory-container">
      <div className="admin-room-inventory-header">
        <h2>Room Inventory</h2>
      </div>

      <table className="admin-room-inventory-table">
        <thead>
          <tr>
            <th>Room No</th>
            <th>Type</th>
            <th>Floor</th>
            <th>Charge / Day</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.floor}</td>
              <td>₹{room.chargesPerDay}</td>

              <td>
                <span
                  className={
                    room.status === "Available"
                      ? "admin-room-inventory-status-available"
                      : "admin-room-inventory-status-unavailable"
                  }
                >
                  {room.status}
                </span>
              </td>

              <td>
                <button
                  className="admin-room-inventory-delete-btn"
                  onClick={() => handleDeleteRoom(room._id)}
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

export default RoomInventory;
