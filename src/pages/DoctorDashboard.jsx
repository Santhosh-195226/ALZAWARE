import React, { useState } from 'react';
import { Users, AlertTriangle, Activity, BarChart3, Search, ChevronRight, User } from 'lucide-react';
import { usePatients } from '../context/PatientContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PatientDetail from './PatientDetail';

export default function DoctorDashboard() {
  const { patients, calculateRisk } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const processedPatients = patients.map(p => {
    const risk = calculateRisk(p);
    return { ...p, ...risk };
  });

  const filteredPatients = processedPatients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: processedPatients.length,
    highRisk: processedPatients.filter(p => p.category.level === 'High').length,
    moderateRisk: processedPatients.filter(p => p.category.level === 'Moderate').length,
    alerts: processedPatients.filter(p => p.category.level === 'High').length
  };

  if (selectedPatientId) {
      const patient = processedPatients.find(p => p.id === selectedPatientId);
      return <PatientDetail patient={patient} onBack={() => setSelectedPatientId(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--secondary-gray)' }}>
      <Header />
      <main style={{ flex: 1, padding: '120px 0 60px' }}>
        <div className="container">
          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Clinical Dashboard</h1>
              <p style={{ opacity: 0.8 }}>Monitoring cognitive health trajectories across {stats.total} patients.</p>
            </div>
            <div style={{ position: 'relative', width: '300px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                    type="text" 
                    placeholder="Search patients..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-pill)', border: '1px solid #ddd', outline: 'none', background: 'white' }}
                />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(11, 31, 59, 0.1)', borderRadius: '12px' }}>
                <Users size={32} color="var(--primary-navy)" />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Total Patients</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.total}</div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(229, 57, 53, 0.1)', borderRadius: '12px' }}>
                <AlertTriangle size={32} color="#E53935" />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>High Risk</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E53935' }}>{stats.highRisk}</div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(244, 180, 0, 0.1)', borderRadius: '12px' }}>
                <Activity size={32} color="#F4B400" />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Moderate Risk</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#F4B400' }}>{stats.moderateRisk}</div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(31, 163, 163, 0.1)', borderRadius: '12px' }}>
                <BarChart3 size={32} color="var(--primary-teal)" />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Active Alerts</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.alerts}</div>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} /> Patient Registry
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '16px', color: '#666', fontWeight: 500 }}>Patient Name / ID</th>
                    <th style={{ padding: '16px', color: '#666', fontWeight: 500 }}>Age</th>
                    <th style={{ padding: '16px', color: '#666', fontWeight: 500 }}>Cognitive Age</th>
                    <th style={{ padding: '16px', color: '#666', fontWeight: 500 }}>Risk Score</th>
                    <th style={{ padding: '16px', color: '#666', fontWeight: 500 }}>Category</th>
                    <th style={{ padding: '16px', color: '#666', fontWeight: 500 }}>Current Stage</th>
                    <th style={{ padding: '16px', color: '#666', fontWeight: 500 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.2s' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={20} color="#999" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{p.name}</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>{p.age}</td>
                      <td style={{ padding: '16px' }}>{p.cognitiveAge || '--'}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '40px', height: '6px', background: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ width: `${p.finalScore}%`, height: '100%', background: p.category.color }}></div>
                          </div>
                          <span>{p.finalScore}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ 
                          padding: '4px 12px', 
                          borderRadius: '12px', 
                          fontSize: '0.8rem', 
                          fontWeight: 600, 
                          color: 'white',
                          background: p.category.color
                        }}>
                          {p.category.level}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '0.9rem' }}>{p.stage}</td>
                      <td style={{ padding: '16px' }}>
                        <button 
                          onClick={() => setSelectedPatientId(p.id)}
                          style={{ border: 'none', background: 'none', color: 'var(--primary-teal)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                        >
                          View Details <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
