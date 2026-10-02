import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, ShieldCheck, Stethoscope } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, padding: '120px 0 60px', background: 'var(--gradient-hero)', color: 'white' }}>
        <div className="container">
          <div className="text-center animate-fade-in" style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Welcome to <span style={{ color: 'var(--primary-teal)' }}>Alzaware</span></h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
              AI-powered Early Cognitive Health Monitoring Platform. <br />
              Precision screening for Alzheimer's through multi-modal analysis.
            </p>
          </div>

          <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {/* Patient Option */}
            <div 
              className="glass-card animate-float" 
              style={{ cursor: 'pointer', textAlign: 'center', transition: 'transform 0.3s ease', padding: '48px' }}
              onClick={() => navigate('/login')}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-ai)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <User size={40} color="white" />
              </div>
              <h2 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>Login as Patient</h2>
              <p style={{ color: '#555', marginBottom: '24px' }}>
                Track your cognitive health, upload medical records, and receive AI-driven risk assessments.
              </p>
              <button className="btn btn-primary" style={{ width: '100%' }}>Enter Patient Portal</button>
            </div>

            {/* Doctor Option */}
            <div 
              className="glass-card animate-float" 
              style={{ cursor: 'pointer', textAlign: 'center', transition: 'transform 0.3s ease', padding: '48px', animationDelay: '0.2s' }}
              onClick={() => navigate('/doctor/login')}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Stethoscope size={40} color="white" />
              </div>
              <h2 style={{ marginBottom: '16px', color: 'var(--primary-navy)' }}>Login as Doctor</h2>
              <p style={{ color: '#555', marginBottom: '24px' }}>
                Manage multiple patients, analyze diagnostic imaging, and monitor risk trajectories.
              </p>
              <button className="btn btn-outline" style={{ width: '100%' }}>Enter Clinician Portal</button>
            </div>
          </div>

          <div style={{ marginTop: '80px', textAlign: 'center', opacity: 0.8 }}>
              <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} /> HIPAA Compliant & Secure Medical Data Storage
              </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
