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

    const interval = setInterval(fetchBeds, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-bed-container">
      <div className="admin-bed-header">
        <h2>Bed Management</h2>
      </div>

      <table className="admin-bed-table">
        <thead>
          <tr>
            <th>Room No</th>
            <th>Bed No</th>
            {/* <th>Bed Charges / Day</th> */}
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {beds.map((bed) => (
            <tr key={bed._id}>
              <td>{bed.roomNumber}</td>

              <td>{bed.bedNo}</td>

              {/* <td>
                ₹{Number(bed.chargesPerDay || 0)}
              </td> */}

              <td>
                <span
                  className={
                    bed.status === "Available"
                      ? "admin-bed-status-available"
                      : "admin-bed-status-occupied"
                  }
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
