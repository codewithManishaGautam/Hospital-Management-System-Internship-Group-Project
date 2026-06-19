import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';

const PatientLookup = ({ value, onChange, label = 'Patient', placeholder = 'Search patient by name...' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!value) {
      setSelectedPatient(null);
      setQuery('');
    }
  }, [value]);

  const handleSearch = async (searchTerm) => {
    setQuery(searchTerm);
    if (searchTerm.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`/patients?search=${encodeURIComponent(searchTerm)}`);
      setResults(res.data || []);
      setShowDropdown(true);
    } catch (err) {
      console.error('Patient search error:', err);
    }
    setLoading(false);
  };

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    setQuery(patient.name);
    setShowDropdown(false);
    if (onChange) onChange(patient._id, patient);
  };

  const handleClear = () => {
    setSelectedPatient(null);
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    if (onChange) onChange('', null);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '4px' }}>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
          style={{ flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
        />
        {selectedPatient && (
          <button
            type="button"
            onClick={handleClear}
            style={{ padding: '8px 12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
          >
            ✕
          </button>
        )}
      </div>
      {selectedPatient && (
        <div style={{ marginTop: '6px', padding: '8px 12px', background: '#e8f5e9', borderRadius: '4px', fontSize: '13px' }}>
          <strong>{selectedPatient.name}</strong> — Age: {selectedPatient.age}, Mobile: {selectedPatient.mobile}
          {selectedPatient.adhaar && <> — Aadhaar: {selectedPatient.adhaar}</>}
        </div>
      )}
      {showDropdown && results.length > 0 && (
        <ul style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000,
          background: '#fff', border: '1px solid #ddd', borderRadius: '4px',
          listStyle: 'none', margin: 0, padding: 0, maxHeight: '200px', overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {results.map((patient) => (
            <li
              key={patient._id}
              onClick={() => handleSelect(patient)}
              style={{
                padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #eee',
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
            >
              <strong>{patient.name}</strong>
              <span style={{ color: '#777', marginLeft: '8px', fontSize: '13px' }}>
                Age: {patient.age} — {patient.mobile}
              </span>
              {patient.adhaar && (
                <span style={{ display: 'block', color: '#999', fontSize: '12px', marginTop: '2px' }}>
                  Aadhaar: {patient.adhaar}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div style={{ position: 'absolute', right: '12px', top: '38px' }}>
          <span style={{ fontSize: '12px', color: '#999' }}>Searching...</span>
        </div>
      )}
    </div>
  );
};

export default PatientLookup;
