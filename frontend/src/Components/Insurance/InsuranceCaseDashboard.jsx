import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';

const InsuranceCaseDashboard = ({ onViewCase }) => {
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchCases();
  }, [filter]);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const params = filter !== 'ALL' ? { status: filter } : {};
      const res = await insuranceService.getInsuranceCases(params);
      if (res.data.success) {
        setCases(res.data.data);
        if (filter === 'ALL') setStats(res.data.stats); // Only update stats on ALL to keep counts accurate
      }
    } catch (err) {
      console.error("Error fetching cases", err);
    }
    setLoading(false);
  };

  const getStatusBadgeClass = (status) => {
    if (['OPEN', 'VERIFICATION_PENDING', 'FORMS_PENDING'].includes(status)) return 'badge-warning';
    if (['VERIFICATION_COMPLETE', 'FORMS_COMPLETE', 'PREAUTH_APPROVED', 'CLAIM_SETTLED'].includes(status)) return 'badge-success';
    if (['PREAUTH_SUBMITTED', 'CLAIM_SUBMITTED', 'CLAIM_UNDER_REVIEW', 'TREATMENT_IN_PROGRESS'].includes(status)) return 'badge-info';
    return 'badge-secondary';
  };

  return (
    <div className="dashboard-container">
      <div className="section-header">
        <h2>Insurance Cases & Admission Workflow</h2>
      </div>

      {/* Stats Summary */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        <div className="stats-card" onClick={() => setFilter('ALL')} style={{ cursor: 'pointer', border: filter === 'ALL' ? '2px solid #0056b3' : '' }}>
          <h4>Total Cases</h4>
          <p>{stats.total || 0}</p>
        </div>
        <div className="stats-card warning" onClick={() => setFilter('VERIFICATION_PENDING')} style={{ cursor: 'pointer', border: filter === 'VERIFICATION_PENDING' ? '2px solid #ff9800' : '' }}>
          <h4>Verification Pending</h4>
          <p>{stats.verificationPending || 0}</p>
        </div>
        <div className="stats-card warning" onClick={() => setFilter('FORMS_PENDING')} style={{ cursor: 'pointer', border: filter === 'FORMS_PENDING' ? '2px solid #ff9800' : '' }}>
          <h4>Forms Pending</h4>
          <p>{stats.formsPending || 0}</p>
        </div>
        <div className="stats-card info" onClick={() => setFilter('TREATMENT_IN_PROGRESS')} style={{ cursor: 'pointer', border: filter === 'TREATMENT_IN_PROGRESS' ? '2px solid #17a2b8' : '' }}>
          <h4>In Treatment</h4>
          <p>{stats.treatmentInProgress || 0}</p>
        </div>
        <div className="stats-card success" onClick={() => setFilter('CLAIM_SETTLED')} style={{ cursor: 'pointer', border: filter === 'CLAIM_SETTLED' ? '2px solid #28a745' : '' }}>
          <h4>Settled</h4>
          <p>{stats.settled || 0}</p>
        </div>
      </div>

      {/* Cases Table */}
      <div className="table-container" style={{ marginTop: '20px' }}>
        {loading ? <p>Loading cases...</p> : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Case No</th>
                <th>Patient</th>
                <th>Admission Date</th>
                <th>Insurance Provider</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.length > 0 ? cases.map(c => (
                <tr key={c._id}>
                  <td>{c.caseNumber}</td>
                  <td>
                    {c.patientId?.name || 'N/A'}<br/>
                    <small>{c.patientId?.mobile}</small>
                  </td>
                  <td>{c.admissionId ? new Date(c.admissionId.admissionDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{c.insuranceCompanyId?.companyName || c.tpaId?.tpaName || 'Pending'}</td>
                  <td><span className={`badge ${getStatusBadgeClass(c.status)}`}>{c.status.replace(/_/g, ' ')}</span></td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => onViewCase(c._id)}>
                      Open Workspace
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No cases found for this filter.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InsuranceCaseDashboard;
