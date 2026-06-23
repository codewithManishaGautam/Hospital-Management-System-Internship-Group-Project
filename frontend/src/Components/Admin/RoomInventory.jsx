import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomInventory() {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/rooms");

    setRooms(res.data);
  };

  const deleteRoom = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/room/delete/${id}`);

    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Room Inventory</h2>
      </div>

      <table>
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
                      ? "status-active"
                      : "status-leave"
                  }
                >
                  {room.status}
                </span>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteRoom(room._id)}
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
