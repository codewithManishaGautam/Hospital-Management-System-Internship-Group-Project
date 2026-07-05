import React, { useState } from "react";
import Layout from "../Components/Reception/Layout";
import Dashboard from "../Components/Reception/Dashboard";
import RegistrationForm from "../Components/Reception/RegistrationForm";
import OPDBilling from "../Components/Reception/OPDBilling";
import IPDAdmission from "../Components/Reception/IPDadmission";
import IPDPatientList from "../Components/Reception/IPDPatientList";
import SearchPatient from "../Components/Reception/SearchPatient";
import Reports from "../Components/Reception/Reports";

function Receptionist() {
  const [step, setStep] = useState("dashboard");
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    hasInsurance: false,
    policyNumber: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Registering patient...');
    
    // Simulate saving patient to Reception/Hospital DB
    const newPatientId = `PAT-${Math.floor(Math.random() * 10000)}`;
    
    // Trigger Insurance Integration if they have insurance
    if (formData.hasInsurance && formData.policyNumber) {
      try {
        await axios.post('http://localhost:5000/api/insurance/pre-auth', {
          patientId: newPatientId,
          policyId: formData.policyNumber, // treating policyNumber as ID for mock
          hospitalId: 'HOSP-001',
          estimatedCost: 0,
          status: 'Draft'
        });
        setMessage(`Patient ${newPatientId} registered successfully! A Draft Pre-Auth was automatically created for the Insurance Desk.`);
      } catch (err) {
        setMessage(`Patient ${newPatientId} registered, but failed to create Draft Pre-Auth. Ensure Insurance backend is running.`);
      }
    } else {
      setMessage(`Patient ${newPatientId} registered successfully as a Cash-paying patient.`);
    }
    
    setFormData({ name: '', age: '', gender: 'Male', contact: '', hasInsurance: false, policyNumber: '' });
  };

  return (
    <Layout role="Receptionist" setStep={setStep}>
      {step === "dashboard" && (
        <Dashboard />
      )}

      {step === "register" && (
        <RegistrationForm />
      )}

      {step === "billing" && (
        <OPDBilling />
      )}

      {step === "ipdAdmission" && (
        <IPDAdmission />
      )}

      {step === "ipdPatients" && (
        <IPDPatientList />
      )}

      {step === "searchPatient" && (
        <SearchPatient />
      )}

      {step === "reports" && (
        <Reports />
      )}
    </Layout>
  );
}

export default Receptionist;