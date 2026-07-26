import React from 'react';

const BaseFormLayout = ({ title, subtitle, pdfLink, mode, loading, onSubmit, children }) => {
  return (
    <div className="form-paper">
      <div className="form-header" style={{ position: 'relative' }}>
        <div className="logo-placeholder">🏢</div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        {pdfLink && (
          <a 
            href={`/official-forms/${pdfLink}`} 
            target="_blank" 
            rel="noreferrer"
            className="download-pdf-link"
            style={{ position: 'absolute', top: '15px', right: '15px', padding: '8px 12px', background: '#e74c3c', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            📥 Download Blank Official PDF
          </a>
        )}
      </div>

      <form onSubmit={onSubmit}>
        {children}

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => window.print()}>🖨️ Print Form to PDF</button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Submitting Request..." : `📤 Submit Cashless ${mode === "claim" ? "Claim" : "Pre-Auth"}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BaseFormLayout;
