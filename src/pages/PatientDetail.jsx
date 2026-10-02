import React from 'react';
import { ArrowLeft, Brain, Activity, Clock, FileText, Upload, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pipelineStages = [
    'Passive Monitoring',
    'Early Warning / MMSE',
    'EEG Brainwave Analysis',
    'MRI Structural Imaging'
];

export default function PatientDetail({ patient, onBack }) {
  const currentStageIndex = pipelineStages.indexOf(patient.stage);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--secondary-gray)' }}>
      <main style={{ flex: 1, padding: '120px 0 60px' }}>
        <div className="container">
          <button 
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--primary-navy)', fontWeight: 600, marginBottom: '32px' }}
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--primary-navy)' }}>{patient.name}</h1>
              <div style={{ display: 'flex', gap: '16px', fontSize: '1.1rem', opacity: 0.7 }}>
                <span>ID: {patient.id}</span>
                <span>•</span>
                <span>Age: {patient.age}</span>
                <span>•</span>
                <span>Cognitive Age: {patient.cognitiveAge}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '4px', textTransform: 'uppercase' }}>Combined Risk Score</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: patient.category.color }}>{patient.finalScore}%</div>
              <div style={{ fontWeight: 700, color: patient.category.color }}>{patient.category.level} RISK CATEGORY</div>
            </div>
          </div>

          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
            
            {/* Cognitive Symptoms Analysis */}
            <div className="glass-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-navy)' }}>
                <Brain size={20} color="var(--primary-teal)" /> Cognitive Symptom Analysis
              </h3>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '20px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span>Memory Retention</span>
                     <span style={{ color: patient.finalScore > 60 ? '#E53935' : '#4CAF50', fontWeight: 600 }}>{patient.finalScore > 60 ? 'Significant Decline' : 'Maintained'}</span>
                   </div>
                   <div style={{ height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                     <div style={{ width: `${100 - (patient.cognitivePerformance || 0)}%`, height: '100%', background: 'linear-gradient(90deg, #4CAF50, #E53935)' }}></div>
                   </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span>Language/Fluency</span>
                     <span style={{ color: patient.finalScore > 75 ? '#E53935' : '#F4B400', fontWeight: 600 }}>{patient.finalScore > 75 ? 'Mild Aphasia' : 'Normal'}</span>
                   </div>
                   <div style={{ height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                     <div style={{ width: '45%', height: '100%', background: 'var(--accent-amber)' }}></div>
                   </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <span>Executive Function</span>
                     <span style={{ color: '#4CAF50', fontWeight: 600 }}>Functional</span>
                   </div>
                   <div style={{ height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                     <div style={{ width: '25%', height: '100%', background: 'var(--accent-green)' }}></div>
                   </div>
                </div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(244, 180, 0, 0.1)', borderRadius: '12px', marginTop: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                   <AlertCircle size={16} /> Clinical Indicator
                </div>
                <p style={{ fontSize: '0.85rem' }}>Mild episodic memory impairment noted during screening. MMSE recommended.</p>
              </div>
            </div>

            {/* Diagnostic Stage Visualization */}
            <div className="glass-card" style={{ gridColumn: 'span 8' }}>
              <h3 style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-navy)' }}>
                <TrendingUp size={20} color="var(--accent-purple)" /> Diagnostic Pipeline Alignment
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', marginTop: '20px' }}>
                  <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '4px', background: '#eee', zIndex: 0 }}></div>
                  <div style={{ 
                    position: 'absolute', 
                    top: '24px', 
                    left: '10%', 
                    width: `${(currentStageIndex / 3) * 80}%`, 
                    height: '4px', 
                    background: 'var(--primary-teal)', 
                    zIndex: 1, 
                    transition: 'width 1s ease' 
                  }}></div>

                  {pipelineStages.map((stage, i) => (
                      <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1 }}>
                          <div style={{ 
                              width: '48px', height: '48px', borderRadius: '50%',
                              background: i <= currentStageIndex ? 'var(--primary-teal)' : 'white',
                              border: `4px solid ${i <= currentStageIndex ? 'var(--primary-teal)' : '#eee'}`,
                              color: i <= currentStageIndex ? 'white' : '#999',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                              boxShadow: i === currentStageIndex ? '0 0 15px rgba(31, 163, 163, 0.3)' : 'none'
                          }}>
                              {i === currentStageIndex ? <Activity size={20} /> : i + 1}
                          </div>
                          <div style={{ marginTop: '16px', fontSize: '0.8rem', textAlign: 'center', fontWeight: i === currentStageIndex ? 700 : 400, opacity: i <= currentStageIndex ? 1 : 0.5 }}>{stage}</div>
                      </div>
                  ))}
              </div>

              <div style={{ marginTop: '40px', padding: '24px', background: 'var(--secondary-mint)', borderRadius: '16px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ padding: '12px', background: 'var(--white)', borderRadius: '12px' }}>
                  <CheckCircle2 size={32} color="var(--primary-teal)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-navy)' }}>Protocol Adherence</div>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Patient is currently undergoing {patient.stage} as per clinical guidelines for {patient.category.level} risk score.</p>
                </div>
              </div>
            </div>

            {/* Test History */}
            <div className="glass-card" style={{ gridColumn: 'span 7' }}>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-navy)' }}>
                <Clock size={20} color="var(--primary-navy)" /> Multi-Modal Test History
              </h3>
              <div style={{ overflowX: 'auto' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 500 }}>Date</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 500 }}>Modality</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 500 }}>Score/Status</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontWeight: 500 }}>Clinical Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient.testResults.map((result, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f9f9f9' }}>
                          <td style={{ padding: '12px', fontSize: '0.9rem' }}>{result.date}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#f0f0f0', borderRadius: '4px', fontWeight: 600 }}>{result.type}</span>
                          </td>
                          <td style={{ padding: '12px', fontWeight: 700 }}>{result.score}%</td>
                          <td style={{ padding: '12px', fontSize: '0.85rem', color: '#555' }}>{result.summary}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            </div>

            {/* Upload & Analysis Feature */}
            <div className="glass-card" style={{ gridColumn: 'span 5' }}>
               <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Upload size={20} color="var(--primary-teal)" /> Upload Diagnostic Data
               </h3>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ 
                    border: '2px dashed #ddd', 
                    borderRadius: '16px', 
                    padding: '24px', 
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}>
                    <Activity size={32} color="var(--accent-purple)" style={{ marginBottom: '12px' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>EEG Brainwave</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>.edf, .raw</div>
                  </div>
                  <div style={{ 
                    border: '2px dashed #ddd', 
                    borderRadius: '16px', 
                    padding: '24px', 
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}>
                    <FileText size={32} color="var(--primary-teal)" style={{ marginBottom: '12px' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>MRI Imaging</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>.dcm, .jpg, .png</div>
                  </div>
               </div>
               
               <div style={{ marginTop: '24px', background: 'var(--primary-navy)', color: 'white', padding: '20px', borderRadius: '16px' }}>
                  <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Brain size={18} /> AI Diagnostic Insights
                  </h4>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '0' }}>
                    Based on current trajectory, there is a 12% probability of transition to High Risk within 9 months. Recommend prioritized EEG analysis.
                  </p>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
