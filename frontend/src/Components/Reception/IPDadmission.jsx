import React, { useState } from "react";
import "../../styles/Reception/IPDadmission.css";

function IPDAdmission({ patient }) {
  const [ipdData, setIpdData] = useState({
    doctorName: "",
    roomNo: "",
    bedNo: "",
    admissionDate: "",
    condition: "",
  });

  const rooms = [
    {
      roomNo: "101",
      bedNo: "B1",
      bedType: "General",
      status: "Available",
    },
    {
      roomNo: "101",
      bedNo: "B2",
      bedType: "General",
      status: "Occupied",
    },
    {
      roomNo: "102",
      bedNo: "B1",
      bedType: "Semi-Private",
      status: "Available",
    },
    {
      roomNo: "103",
      bedNo: "B1",
      bedType: "Private",
      status: "Available",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIpdData({
      ...ipdData,
      [name]: value,
    });
  };

  const handleAdmission = (e) => {
    e.preventDefault();

    if (
      !patient ||
      !ipdData.roomNo ||
      !ipdData.bedNo
    ) {
      alert("Please select room and bed");
      return;
    }

    const ipdNumber =
      "IPD" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    alert(
      `Patient Admitted Successfully\nIPD No : ${ipdNumber}`
    );
  };

  return (
    <div className="ipd-container">
      <div className="ipd-header">
        <h2>IPD Admission</h2>
      </div>

      <div className="ipd-form-card">
        <form onSubmit={handleAdmission}>
          {/* Auto Filled Patient Details */}

          <div className="ipd-grid">
            <div className="ipd-group">
              <label>UHID</label>

              <input
                type="text"
                value={patient?.uhid || ""}
                readOnly
              />
            </div>

            <div className="ipd-group">
              <label>Patient Name</label>

              <input
                type="text"
                value={
                  patient?.patientName || ""
                }
                readOnly
              />
            </div>

            <div className="ipd-group">
              <label>Age</label>

              <input
                type="text"
                value={patient?.age || ""}
                readOnly
              />
            </div>

            <div className="ipd-group">
              <label>Gender</label>

              <input
                type="text"
                value={
                  patient?.gender || ""
                }
                readOnly
              />
            </div>

            <div className="ipd-group">
              <label>Mobile</label>

              <input
                type="text"
                value={
                  patient?.mobile || ""
                }
                readOnly
              />
            </div>

            <div className="ipd-group">
              <label>Doctor Name</label>

              <input
                type="text"
                name="doctorName"
                value={
                  ipdData.doctorName
                }
                onChange={handleChange}
                placeholder="Doctor Name"
              />
            </div>

            <div className="ipd-group">
              <label>
                Admission Date
              </label>

              <input
                type="date"
                name="admissionDate"
                value={
                  ipdData.admissionDate
                }
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="ipd-group">
            <label>
              Patient Condition
            </label>

            <textarea
              rows="4"
              name="condition"
              value={
                ipdData.condition
              }
              onChange={handleChange}
              placeholder="Patient Condition"
            />
          </div>

          {/* Available Rooms & Beds */}

          <div className="room-table-card">
            <h3>
              Available Rooms & Beds
            </h3>

            <table className="room-table">
              <thead>
                <tr>
                  <th>Room No.</th>
                  <th>Bed No.</th>
                  <th>Bed Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map(
                  (room, index) => (
                    <tr key={index}>
                      <td>
                        {room.roomNo}
                      </td>

                      <td>
                        {room.bedNo}
                      </td>

                      <td>
                        {room.bedType}
                      </td>

                      <td>
                        {room.status}
                      </td>

                      <td>
                        {room.status ===
                        "Available" ? (
                          <button
                            type="button"
                            className="assign-btn"
                            onClick={() =>
                              setIpdData({
                                ...ipdData,
                                roomNo:
                                  room.roomNo,
                                bedNo:
                                  room.bedNo,
                              })
                            }
                          >
                            Assign
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div className="ipd-btn-group">
            <button
              type="submit"
              className="admit-btn"
            >
              Admit Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IPDAdmission;