import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';
import ClaimPackageGenerator from './ClaimPackageGenerator';

const InsuranceCaseWorkspace = ({ caseId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCaseData();
    fetchDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  const fetchCaseData = async () => {
    try {
      const res = await insuranceService.getInsuranceCaseById(caseId);
      setCaseData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await insuranceService.getCaseDocuments(caseId);
      setDocuments(res.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleStatusChange = async (e) => {
    try {
      await insuranceService.updateInsuranceCaseStatus(caseId, { status: e.target.value });
      fetchCaseData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleGeneratePackage = async () => {
    setMessage('Generating claim package...');
    try {
      await insuranceService.generateClaimPackage(caseId, {});
      setMessage('Package generated successfully!');
      fetchCaseData(); // Refresh to get the link
    } catch (err) {
      setMessage('Failed: ' + err.response?.data?.message);
    }
  };

  if (loading || !caseData) return <p>Loading workspace...</p>;

  return (
    <div className="workspace-container" style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
        <div>
          <button className="btn btn-sm btn-secondary" onClick={onBack} style={{ marginBottom: '10px' }}>← Back to Dashboard</button>
          <h2>Case Workspace: {caseData.caseNumber}</h2>
          <p>Patient: <strong>{caseData.patientId?.name}</strong> | Status: 
            <select value={caseData.status} onChange={handleStatusChange} style={{ marginLeft: '10px', padding: '5px' }}>
              <option value="OPEN">Open</option>
              <option value="VERIFICATION_PENDING">Verification Pending</option>
              <option value="VERIFICATION_COMPLETE">Verification Complete</option>
              <option value="FORMS_PENDING">Forms Pending</option>
              <option value="FORMS_COMPLETE">Forms Complete</option>
              <option value="PREAUTH_SUBMITTED">Pre-Auth Submitted</option>
              <option value="PREAUTH_APPROVED">Pre-Auth Approved</option>
              <option value="TREATMENT_IN_PROGRESS">Treatment In Progress</option>
              <option value="CLAIM_SUBMITTED">Claim Submitted</option>
              <option value="CLAIM_SETTLED">Claim Settled</option>
            </select>
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h4>Billed: ₹{caseData.financials?.totalBilled || 0}</h4>
          <h4 style={{ color: 'green' }}>Approved: ₹{caseData.financials?.approvedAmount || 0}</h4>
        </div>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {/* Tabs Nav */}
      <div className="workspace-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['overview', 'forms', 'documents', 'communications', 'audit'].map(tab => (
          <button 
            key={tab} 
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab(tab)}
            style={{ textTransform: 'capitalize' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content" style={{ minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="card" style={{ border: '1px solid #ccc', padding: '15px' }}>
              <h3>Insurance Verification</h3>
              <p><strong>Provider:</strong> {caseData.insuranceCompanyId?.companyName || 'N/A'}</p>
              <p><strong>Policy Valid:</strong> {caseData.verificationResult?.policyValid ? 'Yes' : 'No'}</p>
              <p><strong>Balance:</strong> ₹{caseData.verificationResult?.remainingBalance}</p>
              <p><strong>Room Elig:</strong> {caseData.verificationResult?.roomEligibility}</p>
            </div>
            
            <div className="card" style={{ border: '1px solid #ccc', padding: '15px' }}>
              <h3>Final Claim Package</h3>
              {caseData.claimPackagePath ? (
                <div>
                  <p className="text-success">Package Generated: {new Date(caseData.claimPackageGeneratedAt).toLocaleString()}</p>
                  <a href={caseData.claimPackagePath} target="_blank" rel="noreferrer" className="btn btn-primary">Download Claim Package</a>
                </div>
              ) : (
                <div>
                  <p>No package generated yet. Assemble all documents before generating.</p>
                  <button className="btn btn-success" onClick={handleGeneratePackage}>Generate Now</button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'forms' && (
          <div>
            <h3>Official Forms</h3>
            <table className="data-table">
              <thead>
                <tr><th>Form Name</th><th>Category</th><th>Mandatory</th><th>Status</th><th>PDF</th></tr>
              </thead>
              <tbody>
                {caseData.requiredForms?.map((f, i) => (
                  <tr key={i}>
                    <td>{f.formName}</td>
                    <td>{f.formCategory}</td>
                    <td>{f.isMandatory ? 'Yes' : 'No'}</td>
                    <td>{f.status}</td>
                    <td>{f.generatedPdfPath ? <a href={f.generatedPdfPath} target="_blank" rel="noreferrer">View</a> : 'N/A'}</td>
                  </tr>
                ))}
                {(!caseData.requiredForms || caseData.requiredForms.length === 0) && (
                  <tr><td colSpan="5">No forms loaded. Run the admission wizard.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <h3>Department Documents</h3>
            {Object.keys(documents).length === 0 ? <p>No documents uploaded yet.</p> : (
              Object.entries(documents).map(([dept, docs]) => (
                <div key={dept} style={{ marginBottom: '20px' }}>
                  <h4 style={{ background: '#f8f9fa', padding: '10px', borderLeft: '4px solid #007bff' }}>{dept} Department</h4>
                  <table className="data-table">
                    <thead><tr><th>Name</th><th>Category</th><th>Date</th><th>Action</th></tr></thead>
                    <tbody>
                      {docs.map(d => (
                        <tr key={d._id}>
                          <td>{d.documentName}</td>
                          <td>{d.category}</td>
                          <td>{new Date(d.uploadedAt).toLocaleString()}</td>
                          <td><a href={d.documentUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-info">View</a></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
            
            <hr style={{ margin: '30px 0' }} />
            <ClaimPackageGenerator caseId={caseId} caseNumber={caseData.caseNumber} />
          </div>
        )}

        {activeTab === 'communications' && (
          <div>
            <h3>TPA Queries & Communication</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              {caseData.queryLog?.map((q, i) => (
                <div key={i} style={{ border: '1px solid #ff9800', padding: '10px', borderRadius: '5px' }}>
                  <p><strong>Query:</strong> {q.queryText}</p>
                  <p><strong>Status:</strong> <span className="badge badge-warning">{q.status}</span></p>
                  {q.responseText ? (
                    <p><strong>Response:</strong> {q.responseText}</p>
                  ) : (
                    <p><em>Awaiting response...</em></p>
                  )}
                </div>
              ))}
              {(!caseData.queryLog || caseData.queryLog.length === 0) && <p>No queries logged.</p>}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div>
            <h3>Audit Trail</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {caseData.auditTrail?.map((log, i) => (
                <li key={i} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                  <strong>{new Date(log.timestamp).toLocaleString()}</strong> - 
                  <span className="badge badge-secondary" style={{ margin: '0 10px' }}>{log.action}</span>
                  {log.details}
                </li>
              )).reverse()}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default InsuranceCaseWorkspace;
