import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';
import './InsuranceSplitCard.css';

const InsuranceSplitCard = ({ patientId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const res = await insuranceService.getBillingSummary(patientId);
        if (res.data.success) {
          setSummary(res.data.data);
          setError('');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch insurance summary');
        setSummary(null);
      }
      setLoading(false);
    };

    if (patientId) {
      fetchSummary();
    }
  }, [patientId]);

  if (!patientId) {
    return <div className="insurance-split-card empty">Please provide a Patient ID to view insurance coverage.</div>;
  }

  return (
    <div className="insurance-split-card">
      <h3>🏥 Insurance Coverage Summary</h3>
      {loading ? (
        <p>Calculating insurance deduction...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : summary ? (
        <div className="split-details">
          <div className="split-row">
            <span>Gross Hospital Bill:</span>
            <strong>₹{summary.totalBillAmount?.toLocaleString() || 0}</strong>
          </div>
          <div className="split-row highlight-green">
            <span>Insurance Cover ({summary.policyDetails?.providerName || 'N/A'}):</span>
            <strong>- ₹{summary.insuranceDeduction?.toLocaleString() || 0}</strong>
          </div>
          <div className="split-row">
            <span>Patient Co-Pay:</span>
            <strong>+ ₹{summary.coPayAmount?.toLocaleString() || 0}</strong>
          </div>
          <div className="split-row highlight-blue total-row">
            <span>Net Patient Payable:</span>
            <strong>₹{summary.patientPayable?.toLocaleString() || 0}</strong>
          </div>
        </div>
      ) : (
        <p>No active insurance mapping found for this patient.</p>
      )}
    </div>
  );
};

export default InsuranceSplitCard;
