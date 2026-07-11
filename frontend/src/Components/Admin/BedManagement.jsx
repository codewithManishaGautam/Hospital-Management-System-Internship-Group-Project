import React, { useEffect, useState } from "react";
import axios from "axios";

function BedManagement() {
  const [beds, setBeds] = useState([]);

  const fetchBeds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beds");
      setBeds(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Bed Management</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Room No</th>
            <th>Bed No</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {beds.map((bed) => (
            <tr key={bed._id}>
              <td>{bed.roomNumber}</td>
              <td>{bed.bedNo}</td>
              <td>
                <span
                  style={{
                    color: bed.status === "Available" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {bed.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BedManagement;
