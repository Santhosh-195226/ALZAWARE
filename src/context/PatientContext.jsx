import React, { createContext, useState, useContext, useEffect } from 'react';

const PatientContext = createContext();

const initialPatients = [
  {
    id: 'P001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    age: 68,
    cognitiveAge: 74,
    lifestyleRisk: 45,
    cognitivePerformance: 62,
    mriRisk: 78,
    eegRisk: 65,
    testResults: [
        { date: '2026-02-15', type: 'Cognitive', score: 62, summary: 'Mild memory decline detected' },
        { date: '2026-03-01', type: 'MRI', score: 78, summary: 'Atrophy noted in hippocampal region' }
    ]
  },
  {
    id: 'P002',
    name: 'Maria Garcia',
    email: 'm.garcia@example.com',
    age: 72,
    cognitiveAge: 73,
    lifestyleRisk: 25,
    cognitivePerformance: 88,
    mriRisk: 20,
    eegRisk: 15,
    testResults: [
        { date: '2026-03-10', type: 'Cognitive', score: 88, summary: 'Excellent executive function' }
    ]
  },
  {
    id: 'P003',
    name: 'Robert Wilson',
    email: 'r.wilson@example.com',
    age: 65,
    cognitiveAge: 82,
    lifestyleRisk: 85,
    cognitivePerformance: 35,
    mriRisk: 92,
    eegRisk: 88,
    testResults: [
        { date: '2026-01-20', type: 'EEG', score: 88, summary: 'Significant theta wave increase' },
        { date: '2026-02-05', type: 'MRI', score: 92, summary: 'Severe cortical thinning' }
    ]
  }
];

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('alzaware_patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [currentPatientData, setCurrentPatientData] = useState(null);

  useEffect(() => {
    localStorage.setItem('alzaware_patients', JSON.stringify(patients));
  }, [patients]);

  const calculateRisk = (data) => {
    const lifestyle = data.lifestyleRisk || 0;
    const cogRisk = 100 - (data.cognitivePerformance || 0);
    const eeg = data.eegRisk || 0;
    const mri = data.mriRisk || 0;

    // Weights: Lifestyle 20%, Cognitive 25%, EEG 25%, MRI 30%
    const finalScore = Math.round((lifestyle * 0.2) + (cogRisk * 0.25) + (eeg * 0.25) + (mri * 0.3));
    
    let category = { level: 'Low', color: '#1FA3A3' };
    if (finalScore >= 70) category = { level: 'High', color: '#E53935' };
    else if (finalScore >= 35) category = { level: 'Moderate', color: '#F4B400' };

    let stage = 'Passive Monitoring';
    if (finalScore >= 85) stage = 'MRI Stage';
    else if (finalScore >= 65) stage = 'EEG Stage';
    else if (finalScore >= 34) stage = 'Early Warning / MMSE';

    return { finalScore, category, stage };
  };

  const updatePatientData = (patientId, newData) => {
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, ...newData } : p));
  };

  const addPatient = (patient) => {
      setPatients(prev => [...prev, patient]);
  };

  return (
    <PatientContext.Provider value={{ patients, currentPatientData, setCurrentPatientData, calculateRisk, updatePatientData, addPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatients = () => useContext(PatientContext);
