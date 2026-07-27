import React, { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import api from '../../services/api';

const ClaimPackageGenerator = ({ caseId, caseNumber }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      // Calls the backend endpoint to merge the PDFs
      const response = await api.post(`/insurance/cases/${caseId}/generate-claim-package`);
      
      if (response.data.success) {
        // Construct the full URL to the generated PDF
        // Assuming the backend serves the 'generated' folder statically or returns a full URL
        const path = response.data.data.claimPackagePath;
        setDownloadUrl(`http://localhost:5000/${path}`);
      } else {
        setError(response.data.message || 'Failed to generate claim package');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error generating claim package');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Final Claim Package</h3>
          <p className="text-sm text-blue-700 mt-1">
            Generate a single, unified PDF containing the Cover Page, Index, Provider Forms, and all uploaded Physical Documents.
          </p>
        </div>
        
        {!downloadUrl ? (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin mr-2" size={18} /> : <FileDown className="mr-2" size={18} />}
            {isGenerating ? 'Generating...' : 'Generate PDF'}
          </button>
        ) : (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <FileDown className="mr-2" size={18} />
            Download Package
          </a>
        )}
      </div>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      
      {downloadUrl && (
        <p className="text-green-600 text-sm mt-2">
          Success! The claim package for {caseNumber} is ready.
        </p>
      )}
    </div>
  );
};

export default ClaimPackageGenerator;
