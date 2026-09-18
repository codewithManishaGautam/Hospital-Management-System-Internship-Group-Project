import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Nurse/Beds.css";

export default function Beds() {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/beds");

      setBeds(response.data);
    } catch (error) {
      console.error("Error fetching beds:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group beds according to room number
  const groupedBeds = beds.reduce((groups, bed) => {
    const room = bed.roomNumber || "Unknown";

    if (!groups[room]) {
      groups[room] = [];
    }

    groups[room].push(bed);

    return groups;
  }, {});

  if (loading) {
    return <div className="bedsContainer">Loading beds...</div>;
  }

  return (
    <div className="bedsContainer">
      <div className="nurse-topbar">Nurse Panel</div>

      <h2>Bed Status</h2>

      {Object.keys(groupedBeds).length === 0 ? (
        <p>No beds found.</p>
      ) : (
        Object.entries(groupedBeds).map(([roomNumber, roomBeds]) => {
          const occupied = roomBeds.filter(
            (bed) => bed.status === "Occupied",
          ).length;

          const available = roomBeds.filter(
            (bed) => bed.status === "Available",
          ).length;

          return (
            <div className="bedCard" key={roomNumber}>
              <h2>Room {roomNumber}</h2>

              <p>
                Total Beds : <strong>{roomBeds.length}</strong>
              </p>

              <p>
                Occupied Beds : <strong>{occupied}</strong>
              </p>

              <p>
                Available Beds : <strong>{available}</strong>
              </p>

              <div>
                {roomBeds.map((bed) => (
                  <p key={bed._id}>
                    Bed {bed.bedNo} : <strong>{bed.status}</strong>
                  </p>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
