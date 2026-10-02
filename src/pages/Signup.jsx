import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
        setError('Passwords do not match');
        return;
    }
    // Simulate signup
    login({ name: formData.name, email: formData.email }, 'patient');
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px', background: 'var(--secondary-gray)' }}>
        <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '48px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--secondary-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <User size={32} color="var(--primary-teal)" />
          </div>
          <h2 style={{ marginBottom: '8px', color: 'var(--primary-navy)' }}>Patient Registration</h2>
          <p style={{ color: '#666', marginBottom: '32px' }}>Join Alzaware and monitor your cognitive health today.</p>

          <form onSubmit={handleSignup} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full Name" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--primary-navy)' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input 
                  type="password" 
                  value={formData.confirm}
                  onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                  placeholder="••••••••" 
                  required
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid #ddd', outline: 'none' }}
                />
              </div>
            </div>

            {error && <p style={{ color: 'red', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <CheckCircle size={20} /> Complete Registration
            </button>
          </form>

          <p style={{ marginTop: '24px', color: '#666' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-teal)', fontWeight: 600 }}>Sign In</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
