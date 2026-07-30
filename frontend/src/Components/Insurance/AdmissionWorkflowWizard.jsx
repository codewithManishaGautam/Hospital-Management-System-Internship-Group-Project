import React, { useState, useEffect } from 'react';
import { insuranceService } from '../../services/insuranceService';
import PatientLookup from '../PatientLookup';

const AdmissionWorkflowWizard = ({ onCaseCreated }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Data State
  const [patientId, setPatientId] = useState('');
  const [admissionData, setAdmissionData] = useState({
    admissionDate: new Date().toISOString().split('T')[0],
    wardType: 'General',
    admittingDoctor: '',
    diagnosis: '',
    admissionType: 'Planned',
  });
  
  // Need to pick policy/scheme
  const [policies, setPolicies] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [selectedSchemeId, setSelectedSchemeId] = useState('');

  // Step 2: Verification Result
  const [createdCaseId, setCreatedCaseId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  // Step 3 & 4: Forms
  const [forms, setForms] = useState([]);
  const [activeFormIndex, setActiveFormIndex] = useState(null);
  const [currentFormData, setCurrentFormData] = useState({});

  useEffect(() => {
    if (patientId) {
      fetchPatientInsurance(patientId);
    }
  }, [patientId]);

  const fetchPatientInsurance = async (id) => {
    try {
      const polRes = await insuranceService.getPoliciesByPatientId(id);
      if (polRes.data.success) setPolicies(polRes.data.data);
      
      const schRes = await insuranceService.getSchemesByPatientId(id);
      if (schRes.data.success) setSchemes(schRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // STEP 1: Create Case
  const handleCreateCase = async (e) => {
    e.preventDefault();
    if (!patientId) return setMessage({ text: 'Please select a patient', type: 'error' });
    if (!selectedPolicyId && !selectedSchemeId) return setMessage({ text: 'Please select a policy or scheme', type: 'error' });

    setLoading(true);
    try {
      const payload = {
        patientId,
        policyId: selectedPolicyId || null,
        schemeId: selectedSchemeId || null,
        ...admissionData
      };
      const res = await insuranceService.createInsuranceCase(payload);
      if (res.data.success) {
        setCreatedCaseId(res.data.data._id);
        setMessage({ text: 'Case created. Proceeding to verification...', type: 'success' });
        setTimeout(() => setStep(2), 1000);
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || err.message, type: 'error' });
    }
    setLoading(false);
  };

  // STEP 2: Verify Insurance
  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await insuranceService.verifyInsuranceCase(createdCaseId, {});
      setVerificationResult(res.data.data.verificationResult);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || err.message, type: 'error' });
    }
    setLoading(false);
  };

  // STEP 3: Load Forms
  const handleLoadForms = async () => {
    setLoading(true);
    try {
      const res = await insuranceService.getRequiredFormsForCase(createdCaseId);
      setForms(res.data.data);
      setStep(3);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || err.message, type: 'error' });
    }
    setLoading(false);
  };

  // STEP 4: Fill Form
  const handleFormChange = (e) => {
    setCurrentFormData({ ...currentFormData, [e.target.name]: e.target.value });
  };

  const handleSaveForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await insuranceService.fillCaseForm(createdCaseId, activeFormIndex, { formData: currentFormData });
      setMessage({ text: res.data.message, type: 'success' });
      
      // Update local forms state
      const updatedForms = [...forms];
      updatedForms[activeFormIndex].status = 'Filled';
      setForms(updatedForms);
      setActiveFormIndex(null); // close form view
    } catch (err) {
      setMessage({ text: err.response?.data?.message || err.message, type: 'error' });
    }
    setLoading(false);
  };

  const handleGeneratePdf = async (idx) => {
    setLoading(true);
    try {
      const res = await insuranceService.generateCaseFormPdf(createdCaseId, idx);
      const updatedForms = [...forms];
      updatedForms[idx].status = 'Generated';
      updatedForms[idx].generatedPdfPath = res.data.data.downloadUrl;
      setForms(updatedForms);
      setMessage({ text: res.data.message, type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || err.message, type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="wizard-container dashboard-container">
      <div className="section-header">
        <h2>Admission Workflow Wizard</h2>
      </div>

      <div className="wizard-progress">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Registration</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Verification</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Forms</div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Workspace</div>
      </div>

      {message.text && <p className={`alert alert-${message.type}`}>{message.text}</p>}

      {/* STEP 1: Registration */}
      {step === 1 && (
        <form className="form-container" onSubmit={handleCreateCase}>
          <h3>Patient & Admission Details</h3>
          <PatientLookup label="Patient" value={patientId} onChange={setPatientId} />
          
          <div className="form-row">
            <div className="form-group">
              <label>Admission Date</label>
              <input type="date" value={admissionData.admissionDate} onChange={e => setAdmissionData({...admissionData, admissionDate: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Ward Type</label>
              <select value={admissionData.wardType} onChange={e => setAdmissionData({...admissionData, wardType: e.target.value})}>
                <option value="General">General</option>
                <option value="Semi-Private">Semi-Private</option>
                <option value="Private">Private</option>
                <option value="ICU">ICU</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Diagnosis</label>
            <input type="text" value={admissionData.diagnosis} onChange={e => setAdmissionData({...admissionData, diagnosis: e.target.value})} required />
          </div>

          <h3>Select Coverage</h3>
          <div className="form-group">
            <label>Policy</label>
            <select value={selectedPolicyId} onChange={e => { setSelectedPolicyId(e.target.value); setSelectedSchemeId(''); }}>
              <option value="">-- No Private Policy --</option>
              {policies.map(p => <option key={p._id} value={p._id}>{p.insuranceCompanyId?.companyName} - {p.policyNumber}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Government Scheme</label>
            <select value={selectedSchemeId} onChange={e => { setSelectedSchemeId(e.target.value); setSelectedPolicyId(''); }}>
              <option value="">-- No Scheme --</option>
              {schemes.map(s => <option key={s._id} value={s._id}>{s.schemeName}</option>)}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>Create Case & Proceed</button>
        </form>
      )}

      {/* STEP 2: Verification */}
      {step === 2 && (
        <div className="form-container">
          <h3>Insurance Verification</h3>
          {!verificationResult ? (
            <button className="btn btn-primary" onClick={handleVerify} disabled={loading}>Run Verification API</button>
          ) : (
            <div className={`alert ${verificationResult.policyValid ? 'alert-success' : 'alert-danger'}`}>
              <h4>Verification {verificationResult.policyValid ? 'Passed' : 'Failed'}</h4>
              <p><strong>Status:</strong> {verificationResult.policyStatus}</p>
              <p><strong>Balance:</strong> ₹{verificationResult.remainingBalance}</p>
              <p><strong>Room Elig:</strong> {verificationResult.roomEligibility}</p>
              
              <button className="btn btn-primary mt-3" onClick={handleLoadForms} disabled={loading}>Load Required Forms</button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Forms */}
      {step === 3 && (
        <div className="form-container">
          <h3>Required Forms</h3>
          
          {activeFormIndex === null ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Form Name</th>
                  <th>Mandatory</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((f, idx) => (
                  <tr key={idx}>
                    <td>{f.formName}</td>
                    <td>{f.isMandatory ? 'Yes' : 'No'}</td>
                    <td><span className={`badge ${f.status === 'Generated' ? 'badge-success' : f.status === 'Filled' ? 'badge-info' : 'badge-warning'}`}>{f.status}</span></td>
                    <td>
                      {f.status === 'Pending' && <button className="btn btn-sm btn-primary" onClick={() => setActiveFormIndex(idx)}>Fill</button>}
                      {f.status === 'Filled' && <button className="btn btn-sm btn-success" onClick={() => handleGeneratePdf(idx)} disabled={loading}>Generate PDF</button>}
                      {f.status === 'Generated' && <a href={f.generatedPdfPath} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">Download</a>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <form onSubmit={handleSaveForm}>
              <h4>Filling: {forms[activeFormIndex].formName}</h4>
              <p><em>Note: Core fields are auto-populated on the backend. Provide any additional missing fields below.</em></p>
              <div className="form-group">
                <label>Additional Notes / Clinical Info</label>
                <textarea name="clinicalNotes" onChange={handleFormChange} required></textarea>
              </div>
              <div className="form-group">
                <label>Estimated Cost (₹)</label>
                <input type="number" name="totalEstimatedCost" onChange={handleFormChange} required />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>Save Form</button>
              <button type="button" className="btn btn-secondary" onClick={() => setActiveFormIndex(null)} style={{marginLeft: '10px'}}>Cancel</button>
            </form>
          )}

          <div style={{ marginTop: '30px' }}>
            <button className="btn btn-primary" onClick={() => onCaseCreated(createdCaseId)}>Finish & Open Workspace</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionWorkflowWizard;
