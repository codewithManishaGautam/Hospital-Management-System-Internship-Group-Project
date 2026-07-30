import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';

const PreAuthDashboard = ({ onNewRequest, onViewForm }) => {
  const [preAuths, setPreAuths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreAuths();
    // Setup polling for SLA tracking (every minute)
    const interval = setInterval(fetchPreAuths, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchPreAuths = async () => {
    try {
      const res = await insuranceService.getPreAuths();
      if (res.data.success) {
        setPreAuths(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching pre-auths", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateSLAAlert = (req) => {
    if (req.status !== 'SUBMITTED' && req.status !== 'QUERY_RAISED' && req.status !== 'ENHANCEMENT_SUBMITTED') {
      return ''; // No alert for DRAFT or closed states
    }
    
    // SLA calculated from when it was last submitted/updated
    const submitTime = new Date(req.submittedAt || req.createdAt).getTime();
    const hoursElapsed = (Date.now() - submitTime) / (1000 * 60 * 60);

    if (hoursElapsed > 4) return 'sla-critical'; // Red
    if (hoursElapsed > 2) return 'sla-warning';  // Yellow
    return 'sla-normal';
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await insuranceService.updatePreAuthStatus(id, { status: newStatus, notes: "Status updated from dashboard" });
      fetchPreAuths();
    } catch (error) {
      alert("Failed to update status: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="preauth-dashboard">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Pre-Authorization Dashboard</h2>
        <button className="primary-btn" onClick={onNewRequest}>+ New Pre-Auth Request</button>
      </div>

      <div className="table-container" style={{ marginTop: '20px' }}>
        {loading ? <p>Loading...</p> : (
          <table>
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Patient</th>
                <th>Policy / Provider</th>
                <th>Amt (₹)</th>
                <th>Status</th>
                <th>SLA</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {preAuths.length > 0 ? preAuths.map((req) => {
                const slaClass = calculateSLAAlert(req);
                return (
                  <tr key={req._id} className={slaClass === 'sla-critical' ? 'tr-critical' : slaClass === 'sla-warning' ? 'tr-warning' : ''}>
                    <td>{req._id.substring(req._id.length - 6).toUpperCase()}</td>
                    <td>{req.patientId?.firstName} {req.patientId?.lastName}</td>
                    <td>{req.policyId?.insuranceCompanyId?.companyName || 'N/A'}</td>
                    <td>₹{req.estimatedCost?.total || req.estimatedCost || 0}</td>
                    <td><span className={`status-badge status-${req.status.toLowerCase().replace(/_/g, '-')}`}>{req.status}</span></td>
                    <td>
                      {slaClass === 'sla-critical' && <span style={{color: '#c0392b', fontWeight: 'bold'}}>> 4 Hrs</span>}
                      {slaClass === 'sla-warning' && <span style={{color: '#f39c12', fontWeight: 'bold'}}>> 2 Hrs</span>}
                      {slaClass === 'sla-normal' && <span>Normal</span>}
                      {slaClass === '' && <span>-</span>}
                    </td>
                    <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => onViewForm(req)} style={{ padding: '4px 8px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', marginRight: '5px' }}>View</button>
                      {req.status === 'DRAFT' && (
                        <button onClick={() => handleUpdateStatus(req._id, 'SUBMITTED')} style={{ padding: '4px 8px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Submit</button>
                      )}
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="8">No pre-auth requests found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .tr-critical { background-color: #ffeaea; }
        .tr-warning { background-color: #fff9e6; }
        .status-badge.status-draft { background: #95a5a6; }
        .status-badge.status-submitted { background: #3498db; }
        .status-badge.status-approved { background: #2ecc71; }
        .status-badge.status-partially-approved { background: #27ae60; }
        .status-badge.status-rejected { background: #e74c3c; }
        .status-badge.status-query-raised { background: #f39c12; }
        .status-badge.status-responded { background: #d35400; }
        .status-badge.status-enhancement-submitted { background: #8e44ad; }
      `}</style>
    </div>
  );
};

export default PreAuthDashboard;
