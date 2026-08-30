import React, { useEffect, useState } from "react";
import "../../styles/admin/table.css";
import { insuranceService } from "../../services/insuranceService";

function Insurance() {
  const [insuranceData, setInsuranceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsurance();
  }, []);

  const fetchInsurance = async () => {
    try {
      setLoading(true);

      const res = await insuranceService.getClaims();

      console.log("Insurance Claims Response:", res.data);

      const claims = res.data?.data || [];

      setInsuranceData(claims);
    } catch (err) {
      console.error(
        "Error fetching insurance claims:",
        err.response?.data || err.message
      );

      setInsuranceData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-container">
      <div className="section-header">
        <h2>Insurance Records</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Claim No</th>
            <th>Patient</th>
            <th>Claim Type</th>
            <th>Diagnosis</th>
            <th>Total Bill</th>
            <th>Approved Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Loading Insurance Records...
              </td>
            </tr>
          ) : insuranceData.length > 0 ? (
            insuranceData.map((item) => (
              <tr key={item._id}>
                <td>{item.claimNumber || "-"}</td>

                <td>
                  {item.patientId?.name ||
                    item.patientId?.uhid ||
                    item.patientId?._id ||
                    "-"}
                </td>

                <td>{item.claimType || "-"}</td>

                <td>{item.diagnosis || "-"}</td>

                <td>₹{item.totalBillAmount || 0}</td>

                <td>₹{item.approvedAmount || 0}</td>

                <td>{item.status || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Insurance Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Insurance;