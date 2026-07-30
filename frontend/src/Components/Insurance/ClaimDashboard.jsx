import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';

const ClaimDashboard = ({ onNewClaim, onViewClaim }) => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
    const interval = setInterval(fetchClaims, 60000); // Polling for updates
    return () => clearInterval(interval);
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await insuranceService.getClaims();
      if (res.data.success) {
        setClaims(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching claims", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await insuranceService.updateClaimStatus(id, { status: newStatus, notes: "Status updated from dashboard" });
      fetchClaims();
    } catch (error) {
      alert("Failed to update status: " + (error.response?.data?.message || error.message));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'DRAFT': return '#95a5a6'; // grey
      case 'SUBMITTED': case 'ACKNOWLEDGED': return '#3498db'; // blue
      case 'APPROVED': case 'SETTLED': return '#2ecc71'; // green
      case 'PARTIALLY_APPROVED': case 'PARTIALLY_SETTLED': return '#27ae60'; // dark green
      case 'REJECTED': return '#e74c3c'; // red
      case 'QUERY_RAISED': case 'DEFICIENCY_RAISED': case 'SHORTFALL_PENDING': return '#e67e22'; // orange
      case 'UNDER_REVIEW': case 'INTERNAL_REVIEW': return '#f1c40f'; // yellow
      default: return '#7f8c8d';
    }
  };

  return (
    <div className="claim-dashboard">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Unified Claim Tracking Dashboard</h2>
        <button className="primary-btn" onClick={onNewClaim} style={{ padding: '10px 15px', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + New Claim
        </button>
      </div>

      <div className="table-container">
        {loading ? <p>Loading Claims...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px' }}>Claim ID</th>
                <th style={{ padding: '12px' }}>Type</th>
                <th style={{ padding: '12px' }}>Patient</th>
                <th style={{ padding: '12px' }}>Billed Amount (₹)</th>
                <th style={{ padding: '12px' }}>Approved (₹)</th>
                <th style={{ padding: '12px' }}>Settled (₹)</th>
                <th style={{ padding: '12px' }}>Shortfall (₹)</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.length > 0 ? claims.map((claim) => (
                <tr key={claim._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>{claim.claimNumber || claim._id.substring(claim._id.length - 6).toUpperCase()}</td>
                  <td style={{ padding: '12px' }}>{claim.claimType}</td>
                  <td style={{ padding: '12px' }}>{claim.patientId?.firstName} {claim.patientId?.lastName}</td>
                  <td style={{ padding: '12px' }}>{claim.totalBillAmount || 0}</td>
                  <td style={{ padding: '12px', color: '#27ae60', fontWeight: 'bold' }}>{claim.totalApproved || 0}</td>
                  <td style={{ padding: '12px', color: '#2980b9', fontWeight: 'bold' }}>{claim.settledAmount || 0}</td>
                  <td style={{ padding: '12px', color: claim.shortfallAmount > 0 ? '#c0392b' : '#333' }}>
                    {claim.shortfallAmount || 0}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      color: '#fff', 
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      background: getStatusColor(claim.status) 
                    }}>
                      {claim.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => onViewClaim(claim)} style={{ padding: '4px 8px', background: '#34495e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', marginRight: '5px' }}>View</button>
                    {claim.status === 'DRAFT' && (
                      <button onClick={() => handleUpdateStatus(claim._id, 'SUBMITTED')} style={{ padding: '4px 8px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Submit</button>
                    )}
                    {claim.status === 'APPROVED' && claim.settledAmount === 0 && (
                      <button onClick={() => handleUpdateStatus(claim._id, 'SETTLED')} style={{ padding: '4px 8px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Mark Settled</button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="9" style={{ padding: '12px', textAlign: 'center' }}>No claims found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClaimDashboard;
