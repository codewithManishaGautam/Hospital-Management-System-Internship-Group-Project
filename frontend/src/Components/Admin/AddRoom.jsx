import React, { useState } from "react";
import axios from "axios";
import "../../styles/admin/forms.css";
import "../../styles/admin/table.css";

function AddRoom() {
  const [room, setRoom] = useState({
    roomNumber: "",
    roomType: "",
    floor: "",
    chargesPerDay: "",
    totalBeds: "",
  });

  const addRoom = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/room/add", room);

      alert("Room Added");

      setRoom({
        roomNumber: "",
        roomType: "",
        floor: "",
        chargesPerDay: "",
        totalBeds: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Add Room</h2>
      </div>

      <div className="staff-form">
        <input
          placeholder="Room Number"
          value={room.roomNumber}
          onChange={(e) =>
            setRoom({
              ...room,
              roomNumber: e.target.value,
            })
          }
        />

        <select
          value={room.roomType}
          onChange={(e) =>
            setRoom({
              ...room,
              roomType: e.target.value,
            })
          }
        >
          <option value="">Select Type</option>

          <option value="General">General</option>

          <option value="ICU">ICU</option>

          <option value="Private">Private</option>

          <option value="Semi Private">Semi Private</option>
        </select>

        <input
          placeholder="Floor"
          value={room.floor}
          onChange={(e) =>
            setRoom({
              ...room,
              floor: e.target.value,
            })
          }
        />

        <input
          placeholder="Total Beds"
          value={room.totalBeds}
          onChange={(e) =>
            setRoom({
              ...room,
              totalBeds: e.target.value,
            })
          }
        />

        <input
          placeholder="Charges Per Day"
          value={room.chargesPerDay}
          onChange={(e) =>
            setRoom({
              ...room,
              chargesPerDay: e.target.value,
            })
          }
        />

        <button className="add-btn" onClick={addRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
}

export default AddRoom;
