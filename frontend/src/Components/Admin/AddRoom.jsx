import React, { useState } from "react";
import axios from "axios";

function AddRoom() {
  const [room, setRoom] = useState({
    roomNumber: "",
    roomType: "",
    floor: "",
    chargesPerDay: "",
  });

  const addRoom = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/room/add",
        room
      );

      alert("Room Added");

      setRoom({
        roomNumber: "",
        roomType: "",
        floor: "",
        chargesPerDay: "",
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

      <input
        placeholder="Room Type"
        value={room.roomType}
        onChange={(e) =>
          setRoom({
            ...room,
            roomType: e.target.value,
          })
        }
      />

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
        placeholder="Charges Per Day"
        value={room.chargesPerDay}
        onChange={(e) =>
          setRoom({
            ...room,
            chargesPerDay: e.target.value,
          })
        }
      />

      <button
        className="add-btn"
        onClick={addRoom}
      >
        Add Room
      </button>
    </div>
  </div>
);
}

export default AddRoom;