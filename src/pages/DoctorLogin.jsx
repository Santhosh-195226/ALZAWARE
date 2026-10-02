import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate doctor login
    login({ name: 'Dr. Sarah Smith', email, id: 'D001' }, 'doctor');
    navigate('/doctor/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px', background: 'var(--primary-navy)' }}>
        <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '48px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gradient-ai)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Stethoscope size={32} color="white" />
          </div>
          <h2 style={{ marginBottom: '8px', color: 'var(--primary-navy)' }}>Clinician Portal</h2>
          <p style={{ color: '#666', marginBottom: '32px' }}>Authorized Access Only. Please enter clinical credentials.</p>

          <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@medical.org" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Clinical ID Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'var(--primary-navy)', pointerEvents: email && password ? 'auto' : 'none', opacity: email && password ? 1 : 0.7 }}>
              <LogIn size={20} /> Authorize Clinical Login
            </button>
          </form>

          <p style={{ marginTop: '24px', color: '#666', fontSize: '0.85rem' }}>
            Unauthorized access to medical data is prohibited by federal law.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
